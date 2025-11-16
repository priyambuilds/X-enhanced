import { useState, useEffect } from 'react'
import {
  searchUsers,
  type UserSearchResult,
  type SearchResult,
} from '../services/xapi'

interface UserSearchPortalProps {
  initialQuery?: string
  onClose?: () => void
}

export default function UserSearchPortal({
  initialQuery = '',
  onClose,
}: UserSearchPortalProps) {
  const [query, setQuery] = useState(initialQuery)
  const [users, setUsers] = useState<UserSearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch users as user types (debounced)
  useEffect(() => {
    let cancelled = false

    async function fetchUsers() {
      if (query.length < 2) {
        setUsers([])
        setLoading(false)
        setError(null)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const result: SearchResult = await searchUsers(query)

        if (!cancelled) {
          if (result.error) {
            setError(result.error.message)
            setUsers([])
          } else {
            setUsers(result.users)
            setError(null)
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError('An unexpected error occurred. Please try again.')
          console.error('Search error:', err)
          setUsers([])
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    const timeoutId = setTimeout(fetchUsers, 300)

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [query])

  const handleUserClick = (username: string) => {
    window.location.href = `https://x.com/${username}`
    onClose?.()
  }

  const getBadgeIcon = (user: UserSearchResult) => {
    if (user.badges.some(b => b.badge_type === 'BusinessLabel')) {
      return '🏢'
    }
    if (user.verified) {
      return '✓'
    }
    if (user.isBlueVerified) {
      return '⭐'
    }
    return null
  }

  return (
    <div className="flex flex-col h-full max-h-[500px]">
      {/* Search Input */}
      <div className="p-cmd-4 border-b border-cmd-border-primary">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search X users..."
          className="w-full h-cmd-input px-cmd-4 bg-cmd-bg-secondary text-cmd-primary border border-cmd-border-secondary rounded-cmd-lg shadow-cmd-focus-ring focus:outline-none focus:shadow-cmd-focus transition-cmd-base"
          autoFocus
        />
        <div className="mt-cmd-2 text-cmd-xs text-cmd-tertiary">
          Type at least 2 characters to search
        </div>
      </div>

      {/* Results Area */}
      <div className="flex-1 p-cmd-4 overflow-y-auto">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-cmd-8">
            <div className="text-cmd-secondary text-center">
              <div className="w-cmd-icon-lg h-cmd-icon-lg mx-auto mb-cmd-2 border-b-2 border-cmd-blue rounded-full animate-cmd-pulse"></div>
              <div className="text-cmd-base">Searching...</div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="py-cmd-8 text-center">
            <div className="mb-cmd-2 text-cmd-xl">⚠️</div>
            <div className="mb-cmd-1 text-cmd-base font-cmd-semibold text-cmd-error">
              {error}
            </div>
            {error.includes('logged in') && (
              <div className="mt-cmd-2 text-cmd-sm text-cmd-secondary">
                Please make sure you're logged into X and try again.
              </div>
            )}
            {error.includes('rate limit') && (
              <div className="mt-cmd-2 text-cmd-sm text-cmd-secondary">
                You've made too many searches. Wait a few minutes.
              </div>
            )}
          </div>
        )}

        {/* Empty State - No query */}
        {!loading && !error && query.length < 2 && (
          <div className="py-cmd-8 text-center text-cmd-secondary">
            <div className="mb-cmd-2 text-cmd-xl">🔍</div>
            <div className="text-cmd-base">
              Start typing to search for users
            </div>
          </div>
        )}

        {/* Empty State - No results */}
        {!loading && !error && query.length >= 2 && users.length === 0 && (
          <div className="py-cmd-8 text-center text-cmd-secondary">
            <div className="mb-cmd-2 text-cmd-xl">😕</div>
            <div className="text-cmd-base">No users found for "{query}"</div>
          </div>
        )}

        {/* Results List */}
        {!loading && !error && users.length > 0 && (
          <div className="space-y-1">
            <div className="px-cmd-2 py-cmd-1 text-cmd-xs font-cmd-semibold text-cmd-tertiary">
              {users.length} {users.length === 1 ? 'user' : 'users'} found
            </div>

            {users.map(user => (
              <button
                key={user.id}
                onClick={() => handleUserClick(user.username)}
                className="h-cmd-item flex items-center w-full gap-cmd-3 px-cmd-3 text-left rounded-cmd-lg hover:bg-cmd-secondary transition-cmd-base group"
              >
                {/* Avatar */}
                <img
                  src={user.avatar}
                  alt={user.displayName}
                  className="w-cmd-avatar h-cmd-avatar shrink-0 rounded-full ring-2 ring-cmd-border-subtle group-hover:ring-cmd-blue transition-cmd-base"
                />

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  {/* Display Name + Badge */}
                  <div className="flex items-center gap-cmd-2">
                    <span className="text-cmd-base font-cmd-bold text-cmd-primary truncate">
                      {user.displayName}
                    </span>
                    {getBadgeIcon(user) && (
                      <span className="shrink-0 text-cmd-sm">
                        {getBadgeIcon(user)}
                      </span>
                    )}
                  </div>

                  {/* Username + Following Status */}
                  <div className="flex items-center gap-cmd-2 text-cmd-sm text-cmd-secondary">
                    <span className="truncate">@{user.username}</span>
                    {user.isFollowing && (
                      <span className="shrink-0 px-cmd-2 py-0.5 bg-cmd-bg-tertiary text-cmd-secondary rounded-cmd-sm text-cmd-xs">
                        Following
                      </span>
                    )}
                    {user.isFollowedBy && (
                      <span className="shrink-0 px-cmd-2 py-0.5 bg-cmd-blue text-cmd-primary rounded-cmd-sm text-cmd-xs">
                        Follows you
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="shrink-0 text-cmd-tertiary group-hover:text-cmd-blue transition-cmd-base">
                  →
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-cmd-4 border-t border-cmd-border-primary">
        <button
          onClick={onClose}
          className="w-full h-cmd-input px-cmd-4 text-cmd-base font-cmd-medium text-cmd-primary border border-cmd-border-primary rounded-cmd-lg hover:bg-cmd-secondary transition-cmd-base"
        >
          Close
        </button>
      </div>
    </div>
  )
}
