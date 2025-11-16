export interface UserSearchResult {
  id: string
  username: string
  displayName: string
  avatar: string
  verified: boolean
  isBlueVerified: boolean
  isFollowing: boolean
  isFollowedBy: boolean
  badges: Array<{
    badge_type: string
    description: string
  }>
}

export interface SearchError {
  type:
    | 'rate_limit'
    | 'network'
    | 'auth'
    | 'timeout'
    | 'invalid_response'
    | 'unknown'
  message: string
}

export interface SearchResult {
  users: UserSearchResult[]
  error?: SearchError | undefined
}

interface XApiUser {
  id_str: string
  screen_name: string
  name: string
  profile_image_url_https: string
  verified?: boolean
  ext_is_blue_verified?: boolean
  social_context?: {
    following?: boolean
    followed_by?: boolean
  }
  badges?: Array<{
    badge_type: string
    description: string
  }>
}

interface XApiResponse {
  users?: XApiUser[]
  num_results?: number
}

// CONSTANTS

/**
 * X's public Bearer token (hardcoded in their frontend)
 * This is required for all API requests
 */
const BEARER_TOKEN =
  'AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA'

const REQUEST_TIMEOUT = 10000 // 10 seconds
const RATE_LIMIT_MAX = 180 // X's limit: 180 requests per 15 minutes
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes in ms
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
const MIN_QUERY_LENGTH = 2
const MAX_QUERY_LENGTH = 100

// STATE MANAGEMENT

// Rate limiting state
let requestCount = 0
let windowStart = Date.now()

// Cache state
const searchCache = new Map<
  string,
  {
    data: UserSearchResult[]
    timestamp: number
  }
>()

// UTILITY FUNCTIONS

/**
 * Generate a transaction ID matching X's format
 * This mimics X's native implementation for better compatibility
 */
function generateTransactionId(): string {
  try {
    // Generate 66 random bytes (produces 88 chars when base64 encoded)
    const array = new Uint8Array(66)
    crypto.getRandomValues(array)

    // Convert to base64 (matches X's format exactly)
    return btoa(String.fromCharCode(...array))
  } catch (error) {
    // Fallback to simple random if crypto unavailable
    console.warn('Crypto API unavailable, using fallback')
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    let result = ''
    for (let i = 0; i < 88; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }
}

/**
 * Get CSRF token from cookies
 */
function getCsrfToken(): string | null {
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === 'ct0' && value) {
      return value
    }
  }
  return null
}

/**
 * Check and update rate limit
 * Returns false if rate limit exceeded
 */
function checkRateLimit(): boolean {
  const now = Date.now()

  // Reset window if 15 minutes passed
  if (now - windowStart > RATE_LIMIT_WINDOW) {
    requestCount = 0
    windowStart = now
  }

  // Check if at limit
  if (requestCount >= RATE_LIMIT_MAX) {
    console.warn(
      '⚠️ Rate limit reached (180/15min). Try again in a few minutes.'
    )
    return false
  }

  // Warn when approaching limit
  if (requestCount >= RATE_LIMIT_MAX * 0.9) {
    console.warn(
      `⚠️ Approaching rate limit (${requestCount}/${RATE_LIMIT_MAX})`
    )
  }

  requestCount++
  return true
}

/**
 * Get cached search results if available and fresh
 */
function getCachedResults(query: string): UserSearchResult[] | null {
  const cached = searchCache.get(query.toLowerCase())
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('✅ Returning cached results for:', query)
    return cached.data
  }
  return null
}

/**
 * Cache search results
 */
function setCachedResults(query: string, results: UserSearchResult[]): void {
  searchCache.set(query.toLowerCase(), {
    data: results,
    timestamp: Date.now(),
  })

  // Clean old cache entries (keep only last 50)
  if (searchCache.size > 50) {
    const firstKey = searchCache.keys().next().value
    if (firstKey) searchCache.delete(firstKey)
  }
}

/**
 * Validate query input
 */
function validateQuery(query: string): { valid: boolean; error?: SearchError } {
  if (!query || typeof query !== 'string') {
    return {
      valid: false,
      error: {
        type: 'unknown',
        message: 'Invalid query',
      },
    }
  }

  const trimmed = query.trim()

  if (trimmed.length < MIN_QUERY_LENGTH) {
    return {
      valid: false,
      error: {
        type: 'unknown',
        message: `Query must be at least ${MIN_QUERY_LENGTH} characters`,
      },
    }
  }

  if (trimmed.length > MAX_QUERY_LENGTH) {
    return {
      valid: false,
      error: {
        type: 'unknown',
        message: `Query too long (max ${MAX_QUERY_LENGTH} characters)`,
      },
    }
  }

  return { valid: true }
}

/**
 * Sanitize query input
 */
function sanitizeQuery(query: string): string {
  return query
    .trim()
    .replace(/[<>]/g, '') // Remove potentially dangerous characters
    .substring(0, MAX_QUERY_LENGTH)
}

/**
 * Type guard for user validation
 */
function isValidUserResponse(user: any): user is XApiUser {
  return (
    user &&
    typeof user.id_str === 'string' &&
    typeof user.screen_name === 'string' &&
    typeof user.name === 'string' &&
    typeof user.profile_image_url_https === 'string'
  )
}

/**
 * Transform API user to our format
 */
function transformUser(user: XApiUser): UserSearchResult {
  return {
    id: user.id_str,
    username: user.screen_name,
    displayName: user.name,
    avatar: user.profile_image_url_https.replace('_normal', '_bigger'),
    verified: user.verified || false,
    isBlueVerified: user.ext_is_blue_verified || false,
    isFollowing: user.social_context?.following || false,
    isFollowedBy: user.social_context?.followed_by || false,
    badges: user.badges || [],
  }
}

// MAIN FUNCTION

/**
 * Search for X users using the typeahead API
 *
 * @param query - Search query (min 2 characters)
 * @returns Promise with users array and optional error
 */
export async function searchUsers(query: string): Promise<SearchResult> {
  // Validate input
  const validation = validateQuery(query)
  if (!validation.valid) {
    return {
      users: [],
      error: validation.error,
    }
  }

  // Sanitize query
  query = sanitizeQuery(query)

  // Check cache first
  const cached = getCachedResults(query)
  if (cached) {
    return { users: cached }
  }

  // Check rate limit
  if (!checkRateLimit()) {
    return {
      users: [],
      error: {
        type: 'rate_limit',
        message: 'Too many requests. Please wait a few minutes and try again.',
      } as SearchError,
    }
  }

  // Get CSRF token
  const csrfToken = getCsrfToken()
  if (!csrfToken) {
    console.error('⚠️ CSRF token not found')
    return {
      users: [],
      error: {
        type: 'auth',
        message: 'Not logged into X. Please log in and try again.',
      } as SearchError,
    }
  }

  // Create abort controller for timeout
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)

  try {
    // Build request URL
    const params = new URLSearchParams({
      include_ext_is_blue_verified: '1',
      include_ext_verified_type: '1',
      include_ext_profile_image_shape: '1',
      q: query,
      src: 'search_box',
      result_type: 'events,users,topics,lists',
    })

    // Make request
    const response = await fetch(
      `https://x.com/i/api/1.1/search/typeahead.json?${params}`,
      {
        method: 'GET',
        credentials: 'include',
        signal: controller.signal,
        headers: {
          // Authorization Bearer token
          authorization: `Bearer ${BEARER_TOKEN}`,

          // CSRF token
          'x-csrf-token': csrfToken,

          // Standard headers
          'x-twitter-active-user': 'yes',
          'x-twitter-auth-type': 'OAuth2Session',
          'x-twitter-client-language': 'en',

          // Transaction ID (unique per request)
          'x-client-transaction-id': generateTransactionId(),

          // Content type
          'content-type': 'application/json',

          // Browser headers
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.9',
          referer: 'https://x.com/explore',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
        },
      }
    )
    // Clear timeout
    clearTimeout(timeoutId)
    console.log('Response status:', response.status)

    // Handle non-200 responses
    if (!response.ok) {
      console.error('❌ Request failed:', response.status, response.statusText)

      if (response.status === 429) {
        return {
          users: [],
          error: {
            type: 'rate_limit',
            message: 'Rate limit exceeded. Please wait and try again.',
          } as SearchError,
        }
      }

      return {
        users: [],
        error: {
          type: 'network',
          message: `Request failed with status ${response.status}`,
        } as SearchError,
      }
    }
    // Parse response
    const data: XApiResponse = await response.json()

    // Validate response structure
    if (!data || typeof data !== 'object') {
      console.error('Invalid response format')
      return {
        users: [],
        error: {
          type: 'invalid_response',
          message: 'Invalid response from server',
        } as SearchError,
      }
    }

    if (!Array.isArray(data.users)) {
      console.error('Response missing users array')
      return {
        users: [],
        error: {
          type: 'invalid_response',
          message: 'Invalid response structure',
        } as SearchError,
      }
    }

    // Transform and validate users
    const users = data.users
      .filter(user => {
        if (!isValidUserResponse(user)) {
          console.warn('skipping malformed user:', user)
          return false
        }
        return true
      })
      .map(transformUser)

    console.log('✅ Search successful! Found users:', users.length)

    // Cache results
    setCachedResults(query, users)

    return { users }
  } catch (error) {
    // Clear timeout on error
    clearTimeout(timeoutId)

    // Handle specific error types
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('Network error - user may be offline')
      return {
        users: [],
        error: {
          type: 'network',
          message: 'Network error. Please check your connection.',
        } as SearchError,
      }
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('Request timeout')
      return {
        users: [],
        error: {
          type: 'timeout',
          message: 'Request timed out. Please try again.',
        } as SearchError,
      }
    }

    // Generic error
    console.error('💥 Error searching users:', error)
    return {
      users: [],
      error: {
        type: 'unknown',
        message: 'An unexpected error occurred. Please try again.',
      } as SearchError,
    }
  }
}
