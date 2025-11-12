# Features and Phases

## Phase 1: MVP - Core Search & Navigation

### User Search
**Quick user lookup**
- Type username/name → instant suggestions
- Show: Avatar, display name, @handle, verified badge
- Navigate to profile on select
- Recent searches saved locally

### Navigation
**Go to sections**
- "Home" → Navigate to home timeline
- "Notifications" → Go to notifications
- "Messages" → Go to DMs
- "Bookmarks" → Go to saved tweets
- "Lists" → View lists
- "Profile" → Go to your profile
- "Settings" → Go to settings

### Recent Searches
🔍 **Search history**
- Save last 50 searches
- One-click re-search
- Delete individual or all

## Phase 2: Enhanced Search

### Tweet Search
🔍 **Search tweets with operators**
- Full text search: "machine learning"
- From user: "from:elonmusk AI"
- Advanced operators: "nasa min_likes:100"
- Date ranges: "since:2024-01-01"
- Media filter: "filter:images cats"
- Search within your own tweets

### Hashtag/Topic Search
🔍 **Quick topic navigation**
- Search hashtags: "#ai"
- Trending topics
- Topics you follow

### List Search
🔍 **Find and navigate lists**
- Search public lists
- Your lists
- Navigate to list timeline

**Implementation:** Use `search/tweets.json` (v1.1) or GraphQL `SearchTimeline` for richer results.

## Phase 3: Quick Actions (Week 3-4)

### One-Command Operations
⚡ **Fast common actions**
- "Follow @username" → Instant follow
- "Unfollow @username" → Instant unfollow
- "Mute @username" → Mute user
- "Block @username" → Block user
- "Tweet [text]" → Post tweet directly from palette
- "Reply to [tweet URL]" → Quick reply
- "Like [tweet URL]" → Like tweet
- "Retweet [tweet URL]" → Retweet

### Bookmarks Management
📑 **Bookmark operations**
- "Bookmarks" → View all bookmarks
- "Save [tweet URL]" → Bookmark tweet
- Search within bookmarks

### Command History
⏱️ **Recently used commands**
- Show last 10-20 commands
- Quick re-run
- Clear history option

## Phase 4: Recent Activity (Tracking)

### Recent Profiles
👥 **Recently viewed profiles**
- Cache last 20 profiles visited
- Quick return navigation
- See when you last visited

**Implementation:** All client-side using `chrome.storage.local`.

## Phase 5: Customization & Power User (Month 3+)

### Custom Commands
⚙️ **User-defined shortcuts**
- Create custom commands
- Multi-step macros
- Template tweets with variables
- Keyboard shortcuts customization

### Themes & UI
🎨 **Personalization**
- Palette themes (dark/light/custom)
- Command categories
- Pin favorite commands
- Layout customization

**Implementation:** All client-side configuration with `chrome.storage.sync`.

**Perfect—here's the quick reference guide for what tech to use for each feature:**

## MVP Features - Tech Stack

### 1. User Search
**Use:** REST v1.1 `/search/typeahead.json`
- **Why:** Stable, zero maintenance, perfect for autocomplete
- **Rate limit:** 180/15min (plenty)
- **Returns:** 5-10 user suggestions instantly
- **Complexity:** Easy

### 2. Navigation Commands
**Use:** Pure JavaScript (no API)
- **Why:** Just URL redirects
- **Implementation:** Hardcoded URL mappings
- **Special case:** Get current user via `/1.1/account/verify_credentials.json` (REST v1.1)
- **Complexity:** Super Easy

### 3. Recent Searches
**Use:** `chrome.storage.local` (no API)
- **Why:** Client-side only, no X API needed
- **Implementation:** Save/retrieve from browser storage
- **Complexity:** Easy

***

## Quick Reference Table

| Feature | Tech | Stability | Maintenance | When to Use |
|---------|------|-----------|-------------|-------------|
| **User search** | REST v1.1 | 🟢 Very Stable | Zero | Always |
| **Navigation** | Pure JS | 🟢 Very Stable | Zero | Always |

***

## Decision Matrix

### Use REST v1.1 When:
✅ Feature exists in v1.1
✅ You want zero maintenance
✅ Building MVP
✅ Stability is priority
✅ Data available is "good enough"

### Use GraphQL When:
⚠️ Feature NOT in v1.1 (bookmarks, communities)
⚠️ Need view counts/advanced metrics
⚠️ Need full tweet history beyond 3,200
⚠️ Building analytics features
⚠️ Can commit to maintenance (query ID updates)

### Use Local Storage When:m rm
✅ No backend data needed
✅ User-specific settings/history
✅ Caching results
✅ Scheduled actions queue

***