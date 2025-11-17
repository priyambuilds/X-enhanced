import type { Command } from '@/types/types'

const settingsNavigations: Command[] = [
  // Create post
  {
    id: 'x-compose-post',
    type: 'action',
    name: 'X: Compose Post',
    description: 'Create a new post',
    icon: '✏️',
    keywords: ['x', 'compose', 'post', 'tweet', 'create', 'write'],
    prefixes: ['!xcomposepost'],
    execute: () => {
      window.location.href = 'https://x.com/compose/post'
    },
  },

  // Account related Settings navigation
  {
    id: 'x-settings-account',
    type: 'action',
    name: 'X: Account Settings',
    description: 'Manage account information and email',
    icon: '👤',
    keywords: ['x', 'settings', 'account', 'email', 'username'],
    prefixes: ['!xsettingsaccount'],
    execute: () => {
      window.location.href = 'https://x.com/settings/account'
    },
  },
  {
    id: 'x-settings-twitter-data',
    type: 'action',
    name: 'X: Your Twitter Data',
    description: 'View your Twitter account data',
    icon: '📊',
    keywords: ['x', 'settings', 'data', 'twitter', 'account'],
    prefixes: ['!xsettingsdata'],
    execute: () => {
      window.location.href = 'https://x.com/settings/your_twitter_data/account'
    },
  },
  {
    id: 'x-settings-password',
    type: 'action',
    name: 'X: Password Settings',
    description: 'Change your password',
    icon: '🔐',
    keywords: ['x', 'settings', 'password', 'security'],
    prefixes: ['!xsettingspassword'],
    execute: () => {
      window.location.href = 'https://x.com/settings/password'
    },
  },
  {
    id: 'x-settings-download-data',
    type: 'action',
    name: 'X: Download Your Data',
    description: 'Download your account data archive',
    icon: '⬇️',
    keywords: ['x', 'settings', 'download', 'data', 'archive', 'export'],
    prefixes: ['!xdownloaddata'],
    execute: () => {
      window.location.href = 'https://x.com/settings/download_your_data'
    },
  },
  {
    id: 'x-settings-deactivate',
    type: 'action',
    name: 'X: Deactivate Account',
    description: 'Deactivate or delete your account',
    icon: '⚠️',
    keywords: ['x', 'settings', 'deactivate', 'delete', 'account'],
    prefixes: ['!xdeactivate'],
    execute: () => {
      window.location.href = 'https://x.com/settings/deactivate'
    },
  },

  // Monetization
  {
    id: 'x-settings-manage-subscriptions',
    type: 'action',
    name: 'X: Manage Subscriptions',
    description: 'Manage your subscriptions and memberships',
    icon: '💳',
    keywords: ['x', 'settings', 'subscriptions', 'memberships', 'manage'],
    prefixes: ['!xmanagesubscriptions'],
    execute: () => {
      window.location.href = 'https://x.com/settings/manage_subscriptions'
    },
  },

  // Security and account access
  {
    id: 'x-settings-security',
    type: 'action',
    name: 'X: Security Settings',
    description: 'Manage two-factor authentication and login alerts',
    icon: '🔒',
    keywords: ['x', 'settings', 'security', '2fa', 'authentication'],
    prefixes: ['!xsettingssecurity'],
    execute: () => {
      window.location.href = 'https://x.com/settings/security'
    },
  },
  {
    id: 'x-settings-apps-sessions',
    type: 'action',
    name: 'X: Apps and Sessions',
    description: 'Manage connected apps and active sessions',
    icon: '📱',
    keywords: ['x', 'settings', 'apps', 'sessions', 'devices', 'connected'],
    prefixes: ['!xsettingsapps'],
    execute: () => {
      window.location.href = 'https://x.com/settings/apps_and_sessions'
    },
  },
  {
    id: 'x-settings-connected-accounts',
    type: 'action',
    name: 'X: Connected Accounts',
    description: 'Manage connected social accounts',
    icon: '🔗',
    keywords: ['x', 'settings', 'connected', 'accounts', 'third-party'],
    prefixes: ['!xconnectedaccounts'],
    execute: () => {
      window.location.href = 'https://x.com/settings/connected_accounts'
    },
  },
  {
    id: 'x-settings-delegate',
    type: 'action',
    name: 'X: Delegate',
    description: 'Manage account delegates',
    icon: '👥',
    keywords: ['x', 'settings', 'delegate', 'access', 'permissions'],
    prefixes: ['!xsettingsdelegate'],
    execute: () => {
      window.location.href = 'https://x.com/settings/delegate'
    },
  },

  // Privacy and safety
  {
    id: 'x-settings-audience-tagging',
    type: 'action',
    name: 'X: Audience and Tagging',
    description: 'Control who can tag you and see your account',
    icon: '👁️',
    keywords: ['x', 'settings', 'privacy', 'audience', 'tagging', 'visibility'],
    prefixes: ['!xaudience'],
    execute: () => {
      window.location.href = 'https://x.com/settings/audience_and_tagging'
    },
  },
  {
    id: 'x-settings-your-tweets',
    type: 'action',
    name: 'X: Your Tweets',
    description: 'Control who can reply to and retweet your posts',
    icon: '🗣️',
    keywords: ['x', 'settings', 'tweets', 'replies', 'retweets'],
    prefixes: ['!xyourtweets'],
    execute: () => {
      window.location.href = 'https://x.com/settings/your_tweets'
    },
  },
  {
    id: 'x-settings-content-you-see',
    type: 'action',
    name: 'X: Content You See',
    description: 'Control search results and content filters',
    icon: '🔍',
    keywords: ['x', 'settings', 'content', 'filters', 'search'],
    prefixes: ['!xcontent'],
    execute: () => {
      window.location.href = 'https://x.com/settings/content_you_see'
    },
  },
  {
    id: 'x-settings-mute-block',
    type: 'action',
    name: 'X: Mute and Block',
    description: 'Manage muted and blocked accounts',
    icon: '🚫',
    keywords: ['x', 'settings', 'mute', 'block', 'accounts'],
    prefixes: ['!xmuteblock'],
    execute: () => {
      window.location.href = 'https://x.com/settings/mute_and_block'
    },
  },
  {
    id: 'x-settings-direct-messages',
    type: 'action',
    name: 'X: Direct Messages',
    description: 'Control direct message settings',
    icon: '💌',
    keywords: ['x', 'settings', 'messages', 'dm', 'direct'],
    prefixes: ['!xdmsettings'],
    execute: () => {
      window.location.href = 'https://x.com/settings/direct_messages'
    },
  },
  {
    id: 'x-settings-spaces',
    type: 'action',
    name: 'X: Spaces Settings',
    description: 'Control who can invite you to Spaces',
    icon: '🎙️',
    keywords: ['x', 'settings', 'spaces', 'audio', 'invites'],
    prefixes: ['!xspacessettings'],
    execute: () => {
      window.location.href = 'https://x.com/settings/spaces'
    },
  },
  {
    id: 'x-settings-contacts',
    type: 'action',
    name: 'X: Contacts',
    description: 'Manage contact sync and imports',
    icon: '📇',
    keywords: ['x', 'settings', 'contacts', 'sync', 'import'],
    prefixes: ['!xcontacts'],
    execute: () => {
      window.location.href = 'https://x.com/settings/contacts'
    },
  },
  {
    id: 'x-settings-about-account',
    type: 'action',
    name: 'X: About Your Account',
    description: 'View account information and privacy details',
    icon: 'ℹ️',
    keywords: ['x', 'settings', 'about', 'account', 'info'],
    prefixes: ['!xabout'],
    execute: () => {
      window.location.href = 'https://x.com/settings/about_your_account'
    },
  },

  // Data sharing and personalization
  {
    id: 'x-settings-ads-preferences',
    type: 'action',
    name: 'X: Ads Preferences',
    description: 'Manage personalized ad settings',
    icon: '📢',
    keywords: ['x', 'settings', 'ads', 'preferences', 'advertising'],
    prefixes: ['!xadsprefs'],
    execute: () => {
      window.location.href = 'https://x.com/settings/ads_preferences'
    },
  },
  {
    id: 'x-settings-off-twitter-activity',
    type: 'action',
    name: 'X: Off-Twitter Activity',
    description: 'Control off-platform data sharing',
    icon: '🌐',
    keywords: ['x', 'settings', 'data', 'sharing', 'off-platform'],
    prefixes: ['!xofftwitter'],
    execute: () => {
      window.location.href = 'https://x.com/settings/off_twitter_activity'
    },
  },
  {
    id: 'x-settings-data-sharing-partners',
    type: 'action',
    name: 'X: Data Sharing with Business Partners',
    description: 'Manage data sharing with business partners',
    icon: '🤝',
    keywords: ['x', 'settings', 'data', 'sharing', 'partners', 'business'],
    prefixes: ['!xdatasharing'],
    execute: () => {
      window.location.href = 'https://x.com/settings/data_sharing_with_business_partners'
    },
  },
  {
    id: 'x-settings-location',
    type: 'action',
    name: 'X: Location Information',
    description: 'Control location data collection',
    icon: '📍',
    keywords: ['x', 'settings', 'location', 'geolocation', 'privacy'],
    prefixes: ['!xlocation'],
    execute: () => {
      window.location.href = 'https://x.com/settings/location_information'
    },
  },
  {
    id: 'x-settings-grok-settings',
    type: 'action',
    name: 'X: Grok Settings',
    description: 'Configure Grok AI preferences',
    icon: '🤖',
    keywords: ['x', 'settings', 'grok', 'ai', 'preferences'],
    prefixes: ['!xgroksets'],
    execute: () => {
      window.location.href = 'https://x.com/settings/grok_settings'
    },
  },

  // Notification settings
  {
    id: 'x-settings-notification-filters',
    type: 'action',
    name: 'X: Notification Filters',
    description: 'Filter notifications by type',
    icon: '🔔',
    keywords: ['x', 'settings', 'notifications', 'filters'],
    prefixes: ['!xnotiffilters'],
    execute: () => {
      window.location.href = 'https://x.com/settings/notifications/filters'
    },
  },
  {
    id: 'x-settings-notification-preferences',
    type: 'action',
    name: 'X: Notification Preferences',
    description: 'Manage notification delivery and frequency',
    icon: '📲',
    keywords: ['x', 'settings', 'notifications', 'preferences', 'delivery'],
    prefixes: ['!xnotifprefs'],
    execute: () => {
      window.location.href = 'https://x.com/settings/notifications/preferences'
    },
  },

  // Accessibility
  {
    id: 'x-settings-accessibility',
    type: 'action',
    name: 'X: Accessibility',
    description: 'Accessibility features and options',
    icon: '♿',
    keywords: ['x', 'settings', 'accessibility', 'a11y', 'screen reader'],
    prefixes: ['!xaccessibility'],
    execute: () => {
      window.location.href = 'https://x.com/settings/accessibility'
    },
  },
  {
    id: 'x-settings-display',
    type: 'action',
    name: 'X: Display Settings',
    description: 'Customize theme, text size, and appearance',
    icon: '🎨',
    keywords: ['x', 'settings', 'display', 'theme', 'appearance', 'dark mode'],
    prefixes: ['!xdisplay'],
    execute: () => {
      window.location.href = 'https://x.com/settings/display'
    },
  },
  {
    id: 'x-settings-languages',
    type: 'action',
    name: 'X: Languages',
    description: 'Select your preferred language',
    icon: '🌍',
    keywords: ['x', 'settings', 'language', 'languages', 'locale'],
    prefixes: ['!xlanguages'],
    execute: () => {
      window.location.href = 'https://x.com/settings/languages'
    },
  },
  {
    id: 'x-settings-data',
    type: 'action',
    name: 'X: Data Settings',
    description: 'Manage data usage and storage',
    icon: '💾',
    keywords: ['x', 'settings', 'data', 'storage', 'usage'],
    prefixes: ['!xdatasettings'],
    execute: () => {
      window.location.href = 'https://x.com/settings/data'
    },
  },
  {
    id: 'x-keyboard-shortcuts',
    type: 'action',
    name: 'X: Keyboard Shortcuts',
    description: 'View and manage keyboard shortcuts',
    icon: '⌨️',
    keywords: ['x', 'keyboard', 'shortcuts', 'hotkeys'],
    prefixes: ['!xkeyboard'],
    execute: () => {
      window.location.href = 'https://x.com/i/keyboard_shortcuts'
    },
  },
]

export default settingsNavigations
