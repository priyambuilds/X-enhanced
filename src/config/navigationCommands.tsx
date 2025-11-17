import type { Command } from '@/types/types'

const navigationActions: Command[] = [
    
   {
      id: 'x-home',
      type: 'action',
      name: 'Twitter: Home',
      description: 'Go to X home timeline',
      icon: '🏠',
      keywords: ['twitter', 'x', 'home', 'feed', 'timeline'],
      prefixes: ['!xh'],
      execute: () => {
        window.location.href = 'https://x.com/home'
      },
    },
    {
      id: 'x-explore',
      type: 'action',
      name: 'Twitter: Explore',
      description: 'Browse trending topics and content',
      icon: '🔍',
      keywords: ['twitter', 'x', 'explore', 'discover', 'trending'],
      prefixes: ['!xex'],
      execute: () => {
        window.location.href = 'https://x.com/explore'
      },
    },
    {
      id: 'x-trending',
      type: 'action',
      name: 'X: Trending',
      description: 'View trending topics',
      icon: '🔥',
      keywords: ['x', 'trending', 'explore', 'topics'],
      prefixes: ['!xtrend'],
      execute: () => {
        window.location.href = 'https://x.com/explore/tabs/trending'
      },
    },
    {
      id: 'x-news',
      type: 'action',
      name: 'X: News',
      description: 'Browse latest news',
      icon: '📰',
      keywords: ['x', 'news', 'explore', 'articles'],
      prefixes: ['!xnews'],
      execute: () => {
        window.location.href = 'https://x.com/explore/tabs/news'
      },
    },
    {
      id: 'x-sports',
      type: 'action',
      name: 'X: Sports',
      description: 'View sports updates and scores',
      icon: '⚽',
      keywords: ['x', 'sports', 'explore', 'games'],
      prefixes: ['!xsports'],
      execute: () => {
        window.location.href = 'https://x.com/explore/tabs/sports'
      },
    },
    {
      id: 'x-entertainment',
      type: 'action',
      name: 'X: Entertainment',
      description: 'Explore entertainment content',
      icon: '🎬',
      keywords: ['x', 'entertainment', 'explore', 'movies', 'shows'],
      prefixes: ['!xent'],
      execute: () => {
        window.location.href = 'https://x.com/explore/tabs/entertainment'
      },
    },
    {
      id: 'x-notifications',
      type: 'action',
      name: 'Twitter: Notifications',
      description: 'View your notifications',
      icon: '🔔',
      keywords: ['twitter', 'x', 'notifications', 'alerts'],
      prefixes: ['!xnotif'],
      execute: () => {
        window.location.href = 'https://x.com/notifications'
      },
    },
    {
      id: 'x-messages',
      type: 'action',
      name: 'Twitter: Messages',
      description: 'Open direct messages',
      icon: '💬',
      keywords: ['twitter', 'x', 'messages', 'dm', 'direct'],
      prefixes: ['!xdm'],
      execute: () => {
        window.location.href = 'https://x.com/messages'
      },
    },
    {
      id: 'x-verified',
      type: 'action',
      name: 'X: Verified Notifications',
      description: 'Notifications from verified accounts',
      icon: '✅',
      keywords: ['x', 'verified', 'notifications', 'blue', 'check'],
      prefixes: ['!xverif'],
      execute: () => {
        window.location.href = 'https://x.com/notifications/verified'
      },
    },
    {
      id: 'x-mentions',
      type: 'action',
      name: 'X: Mentions',
      description: 'View your mentions and replies',
      icon: '@',
      keywords: ['x', 'mentions', 'replies', 'notifications', 'tags'],
      prefixes: ['!xment'],
      execute: () => {
        window.location.href = 'https://x.com/notifications/mentions'
      },
    },
    {
      id: 'x-chat',
      type: 'action',
      name: 'X: Chat',
      description: 'Open X Chat conversations',
      icon: '💭',
      keywords: ['x', 'chat', 'direct', 'messages', 'conversation'],
      prefixes: ['!xchat'],
      execute: () => {
        window.location.href = 'https://x.com/i/chat'
      },
    },
    {
      id: 'x-message-requests',
      type: 'action',
      name: 'X: Message Requests',
      description: 'Check pending message requests',
      icon: '📬',
      keywords: ['x', 'messages', 'requests', 'pending', 'inbox'],
      prefixes: ['!xreq'],
      execute: () => {
        window.location.href = 'https://x.com/messages/requests'
      },
    },
    {
      id: 'x-compose-message',
      type: 'action',
      name: 'X: Compose Message',
      description: 'Start a new direct message',
      icon: '✍️',
      keywords: ['x', 'compose', 'message', 'new', 'dm', 'write'],
      prefixes: ['!xcompose'],
      execute: () => {
        window.location.href = 'https://x.com/messages/compose'
      },
    },
    {
      id: 'x-message-settings',
      type: 'action',
      name: 'X: Message Settings',
      description: 'Configure message preferences',
      icon: '⚙️',
      keywords: ['x', 'messages', 'settings', 'preferences', 'config'],
      prefixes: ['!xmsgsettings'],
      execute: () => {
        window.location.href = 'https://x.com/messages/settings'
      },
    },
    // Grok
    {
      id: 'x-grok',
      type: 'action',
      name: 'X: Grok',
      description: 'Open Grok (AI) on X',
      icon: '🤖',
      keywords: ['x', 'grok', 'ai', 'assistant'],
      prefixes: ['!xgrok'],
      execute: () => {
        window.location.href = 'https://x.com/i/grok'
      },
    },
    // Lists (profile-scoped)
    {
      id: 'x-lists',
      type: 'action',
      name: 'X: Lists (Profile)',
      description: 'View lists for a profile (example user)',
      icon: '📋',
      keywords: ['x', 'lists', 'profile', 'collections'],
      prefixes: ['!xlists'],
      execute: () => {
        window.location.href = 'https://x.com/hehe000777000/lists'
      },
    },
    {
      id: 'x-list-create',
      type: 'action',
      name: 'X: Create List',
      description: 'Create a new list',
      icon: '➕',
      keywords: ['x', 'lists', 'create', 'new'],
      prefixes: ['!xlistcreate'],
      execute: () => {
        window.location.href = 'https://x.com/i/lists/create'
      },
    },
    {
      id: 'x-list-memberships',
      type: 'action',
      name: 'X: List Memberships',
      description: 'Lists the memberships for a profile (example user)',
      icon: '👥',
      keywords: ['x', 'lists', 'memberships'],
      prefixes: ['!xlistmembers'],
      execute: () => {
        window.location.href = 'https://x.com/hehe000777000/lists/memberships'
      },
    },
    // Bookmarks
    {
      id: 'x-bookmarks',
      type: 'action',
      name: 'X: Bookmarks',
      description: 'Open your bookmarks',
      icon: '🔖',
      keywords: ['x', 'bookmarks', 'save'],
      prefixes: ['!xbookmarks'],
      execute: () => {
        window.location.href = 'https://x.com/i/bookmarks'
      },
    },
    // Communities (focuses the communities search bar)
    {
      id: 'x-communities-explore',
      type: 'action',
      name: 'X: Communities Explore',
      description: 'Explore communities — focuses on the search bar',
      icon: '🏘️',
      keywords: ['x', 'communities', 'explore', 'groups', 'search'],
      prefixes: ['!xcommunities'],
      execute: () => {
        window.location.href = 'https://x.com/{USER}/communities/explore'
      },
    },
    // External tools / monetization
    {
      id: 'x-monetization',
      type: 'action',
      name: 'X: Monetization',
      description: 'Monetization & creator tools',
      icon: '💰',
      keywords: ['x', 'monetization', 'creator', 'tips'],
      prefixes: ['!xmonetization'],
      execute: () => {
        window.location.href = 'https://x.com/i/monetization'
      },
    },
    {
      id: 'x-ads',
      type: 'action',
      name: 'X: Ads (Ads Manager)',
      description: 'Open ads manager (external site)',
      icon: '📣',
      keywords: ['x', 'ads', 'advertising', 'ads manager'],
      prefixes: ['!xads'],
      execute: () => {
        window.location.href = 'https://ads.x.com/'
      },
    },
    // Spaces
    {
      id: 'x-spaces-start',
      type: 'action',
      name: 'X: Start Space',
      description: 'Start a new Space (live audio)',
      icon: '🎙️',
      keywords: ['x', 'spaces', 'audio', 'start'],
      prefixes: ['!xspacesstart'],
      execute: () => {
        window.location.href = 'https://x.com/i/spaces/start'
      },
    },
    {
      id: 'x-spaces',
      type: 'action',
      name: 'X: Spaces',
      description: 'Browse active Spaces',
      icon: '🎧',
      keywords: ['x', 'spaces', 'audio', 'listen'],
      prefixes: ['!xspaces'],
      execute: () => {
        window.location.href = 'https://x.com/i/spaces/'
      },
    },
    // User-related navigation examples
    {
      id: 'x-profile',
      type: 'action',
      name: 'X: Profile (user)',
      description: 'Open a user profile — replace {USER} with the handle',
      icon: '👤',
      keywords: ['x', 'profile', 'user', 'handle'],
      prefixes: ['!xprofile'],
      execute: () => {
        window.location.href = 'https://x.com/{USER}'
      },
    },
    {
      id: 'x-setup-profile',
      type: 'action',
      name: 'X: Setup Profile',
      description: 'Open profile setup flow',
      icon: '🛠️',
      keywords: ['x', 'setup', 'profile', 'flow'],
      prefixes: ['!xsetupprofile'],
      execute: () => {
        window.location.href = 'https://x.com/i/flow/setup_profile'
      },
    },
    {
      id: 'x-with-replies',
      type: 'action',
      name: 'X: With Replies (user)',
      description: 'View a user timeline with replies (example user)',
      icon: '↪️',
      keywords: ['x', 'replies', 'with replies', 'timeline'],
      prefixes: ['!xwithreplies'],
      execute: () => {
        window.location.href = 'https://x.com/hehe000777000/with_replies'
      },
    },
    {
      id: 'x-highlights',
      type: 'action',
      name: 'X: Highlights (user)',
      description: 'View profile highlights (example user)',
      icon: '✨',
      keywords: ['x', 'highlights', 'profile'],
      prefixes: ['!xhighlights'],
      execute: () => {
        window.location.href = 'https://x.com/hehe000777000/highlights'
      },
    },
    {
      id: 'x-articles',
      type: 'action',
      name: 'X: Articles (user)',
      description: 'View user articles (example user)',
      icon: '📝',
      keywords: ['x', 'articles', 'profile'],
      prefixes: ['!xarticles'],
      execute: () => {
        window.location.href = 'https://x.com/hehe000777000/articles'
      },
    },
    {
      id: 'x-media',
      type: 'action',
      name: 'X: Media (user)',
      description: 'View media posted by a user (example user)',
      icon: '🖼️',
      keywords: ['x', 'media', 'photos', 'videos'],
      prefixes: ['!xmedia'],
      execute: () => {
        window.location.href = 'https://x.com/hehe000777000/media'
      },
    },
    {
      id: 'x-likes',
      type: 'action',
      name: 'X: Likes (user)',
      description: 'View liked posts for a user (example user)',
      icon: '❤️',
      keywords: ['x', 'likes', 'favorites'],
      prefixes: ['!xlikes'],
      execute: () => {
        window.location.href = 'https://x.com/hehe000777000/likes'
      },
    },
]

export default navigationActions

