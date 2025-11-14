import React from 'react'
import type { PortalContext } from '@/types/types'
import type { Command } from '@/types/types'

export interface UserCommandConfig {
  commands?: Command[]
  navigables?: any[] // Legacy support during transition
}

/**
 * Flattened configuration structure for easier management
 */
export interface FlatCommandConfig {
  // Simple arrays instead of nested structures
  actions?: Command[]
  portals?: Command[]
  categories?: Command[]

  // Optional grouping for organization
  groups?: {
    [groupId: string]: {
      name: string
      icon?: string
      description?: string
      commands: string[] // Command IDs
    }
  }
}

// Utility functions for portal content
const prettyPrint = (obj: any) => JSON.stringify(obj, null, 2)
const executeCode = (code: string) => {
  try {
    // Safe evaluation for demo purposes (never do this in production!)
    return new Function('return (' + code + ')')()
  } catch (e) {
    return String(e)
  }
}

export const commandPaletteConfig: UserCommandConfig = {
  commands: [
    {
      type: 'action',
      id: 'new-tab',
      name: 'New Tab',
      description: 'Create a new browser tab',
      icon: '🆕',
      keywords: ['tab', 'new', 'create', 'open', 'window', 'browser'],
      prefixes: ['!nt'],
      execute: () => {
        console.log('Demo: Would create new tab')
      },
    },

    {
      type: 'action',
      id: 'close-tab',
      name: 'Close Tab',
      description: 'Close current tab',
      icon: '❌',
      keywords: ['tab', 'close', 'exit', 'quit', 'remove', 'x'],
      prefixes: ['!ct'],
      execute: () => {
        console.log('Demo: Would close current tab')
      },
    },

    {
      type: 'action',
      id: 'reload-page',
      name: 'Reload Page',
      description: 'Refresh current page',
      icon: '🔄',
      keywords: ['reload', 'refresh', 'page', 'update', 'restart'],
      prefixes: ['!r'],
      execute: () => window.location.reload(),
    },

    {
      type: 'action',
      id: 'copy-url',
      name: 'Copy Current URL',
      description: 'Copy current page URL to clipboard',
      icon: '📋',
      keywords: ['url', 'copy', 'clipboard', 'link', 'share', 'current'],
      execute: async () => {
        await navigator.clipboard.writeText(window.location.href)
      },
    },

    {
      type: 'action',
      id: 'fullscreen-toggle',
      name: 'Toggle Fullscreen',
      description: 'Enter/exit fullscreen mode',
      icon: '🔳',
      keywords: ['fullscreen', 'screen', 'display', 'f11', 'mode'],
      execute: () =>
        document.fullscreenElement
          ? document.exitFullscreen()
          : document.documentElement.requestFullscreen(),
    },

    {
      type: 'action',
      id: 'scroll-top',
      name: 'Scroll to Top',
      description: 'Jump to top of page',
      icon: '⬆️',
      keywords: ['scroll', 'top', 'jump', 'up', 'beginning', 'start'],
      execute: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    },

    {
      type: 'action',
      id: 'page-info',
      name: 'Page Info',
      description: 'Show information about current page',
      icon: 'ℹ️',
      keywords: ['info', 'page', 'details', 'url', 'title', 'about'],
      execute: () =>
        alert(
          `Page Title: ${document.title}\nURL: ${window.location.href}\nDate: ${new Date().toLocaleString()}`
        ),
    },

    // ===========================================================================
    // DEEP NESTED CATEGORIES - Testing infinite depth navigation
    // ===========================================================================

    {
      type: 'category',
      id: 'productivity-suite',
      name: 'Productivity Suite',
      description: 'Professional tools and workflows',
      icon: '⚡',
      keywords: ['work', 'productivity', 'business', 'office', 'professional'],
      children: [
        {
          type: 'category',
          id: 'writing-tools',
          name: 'Writing Suite',
          description: 'Document and content creation',
          icon: '✍️',
          keywords: ['writing', 'docs', 'content', 'author', 'create'],
          children: [
            {
              type: 'action',
              id: 'google-docs',
              name: 'Google Docs',
              description: 'Collaborative document editing',
              icon: '📄',
              keywords: ['google', 'docs', 'document', 'write', 'collaborate'],
              execute: () => {
                console.log('Demo: Would open Google Docs')
              },
            },

            {
              type: 'category',
              id: 'publishing-platforms',
              name: 'Publishing Platforms',
              description: 'Share and publish content',
              icon: '🌐',
              keywords: ['publish', 'blog', 'content', 'share', 'online'],
              children: [
                {
                  type: 'action',
                  id: 'medium',
                  name: 'Medium',
                  description: 'Story publishing platform',
                  icon: '📚',
                  keywords: [
                    'medium',
                    'blog',
                    'stories',
                    'writing',
                    'publication',
                  ],
                  execute: () => {
                    console.log('Demo: Would open Medium')
                  },
                },

                {
                  type: 'action',
                  id: 'devto',
                  name: 'Dev.to',
                  description: 'Developer community and blogging',
                  icon: '💻',
                  keywords: ['dev', 'developers', 'blog', 'tech', 'community'],
                  execute: () => {
                    console.log('dev.to')
                  },
                },

                {
                  type: 'category',
                  id: 'social-media',
                  name: 'Social Media',
                  description: 'Share content on social platforms',
                  icon: '📱',
                  keywords: ['social', 'media', 'share', 'twitter', 'facebook'],
                  children: [
                    {
                      type: 'action',
                      id: 'twitter',
                      name: 'Twitter',
                      description: 'Share on Twitter',
                      icon: '🐦',
                      keywords: ['twitter', 'tweet', 'social', 'share'],
                      execute: () => {
                        console.log('twitter')
                      },
                    },

                    {
                      type: 'action',
                      id: 'linkedin',
                      name: 'LinkedIn',
                      description: 'Professional networking',
                      icon: '💼',
                      keywords: [
                        'linkedin',
                        'professional',
                        'networking',
                        'career',
                      ],
                      execute: () => {
                        console.log('linkedin')
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },

        {
          type: 'category',
          id: 'communication-tools',
          name: 'Communication',
          description: 'Team messaging and email tools',
          icon: '💬',
          keywords: ['chat', 'email', 'communication', 'team', 'messages'],
          children: [
            {
              type: 'action',
              id: 'gmail',
              name: 'Gmail',
              description: 'Google email service',
              icon: '📧',
              keywords: ['gmail', 'google', 'email', 'mail', 'messages'],
              execute: () => {
                console.log('gmail')
              },
            },

            {
              type: 'action',
              id: 'slack',
              name: 'Slack',
              description: 'Team communication platform',
              icon: '💬',
              keywords: ['slack', 'team', 'chat', 'communication', 'work'],
              execute: () => {
                console.log('slack')
              },
            },

            {
              type: 'category',
              id: 'video-conferencing',
              name: 'Video Conferencing',
              description: 'Video call and meeting tools',
              icon: '📹',
              keywords: ['video', 'conference', 'meeting', 'call', 'zoom'],

              children: [
                {
                  type: 'action',
                  id: 'zoom',
                  name: 'Zoom',
                  description: 'Video conferencing platform',
                  icon: '🔍',
                  keywords: ['zoom', 'video', 'conference', 'meeting', 'call'],
                  execute: () => {
                    console.log('ZOOM')
                  },
                },

                {
                  type: 'action',
                  id: 'google-meet',
                  name: 'Google Meet',
                  description: 'Google video conferencing',
                  icon: '🎥',
                  keywords: [
                    'google',
                    'meet',
                    'video',
                    'conference',
                    'meeting',
                  ],
                  execute: () => {
                    console.log('meet')
                  },
                },
              ],
            },
          ],
        },

        {
          type: 'category',
          id: 'project-management',
          name: 'Project Management',
          description: 'Tools for managing projects and tasks',
          icon: '📊',
          keywords: ['project', 'management', 'tasks', 'kanban', 'agile'],
          children: [
            {
              type: 'action',
              id: 'trello',
              name: 'Trello',
              description: 'Kanban-style project management',
              icon: '📋',
              keywords: ['trello', 'kanban', 'project', 'management', 'tasks'],
              execute: () => {
                console.log('trello')
              },
            },

            {
              type: 'action',
              id: 'notion',
              name: 'Notion',
              description: 'All-in-one workspace',
              icon: '📝',
              keywords: ['notion', 'workspace', 'notes', 'database', 'docs'],
              execute: () => {
                console.log('notion')
              },
            },
          ],
        },
      ],
    },

// TWITTER/X COMMANDS

    {
      id: 'tw-home',
      type: 'action',
      name: 'Twitter: Home',
      description: 'Go to X home timeline',
      icon: '🏠',
      keywords: ['twitter', 'x', 'home', 'feed', 'timeline'],
      prefixes: ['xh'],
      execute: () => {
        window.location.href = 'https://x.com/home'
      },
    },

    {
      id: 'tw-explore',
      type: 'action',
      name: 'Twitter: Explore',
      description: 'Browse trending topics and content',
      icon: '🔍',
      keywords: ['twitter', 'x', 'explore', 'discover', 'trending'],
      prefixes: ['xe'],
      execute: () => {
        window.location.href = 'https://x.com/explore'
      },
    },

    {
      id: 'tw-notifications',
      type: 'action',
      name: 'Twitter: Notifications',
      description: 'View your notifications',
      icon: '🔔',
      keywords: ['twitter', 'x', 'notifications', 'alerts'],
      prefixes: ['xn'],
      execute: () => {
        window.location.href = 'https://x.com/notifications'
      },
    },

    {
      id: 'tw-messages',
      type: 'action',
      name: 'Twitter: Messages',
      description: 'Open direct messages',
      icon: '💬',
      keywords: ['twitter', 'x', 'messages', 'dm', 'direct'],
      prefixes: ['xm'],
      execute: () => {
        window.location.href = 'https://x.com/messages'
      },
    },

    {
      id: 'tw-bookmarks',
      type: 'action',
      name: 'Twitter: Bookmarks',
      description: 'View your saved bookmarks',
      icon: '📌',
      keywords: ['twitter', 'x', 'bookmarks', 'saved'],
      prefixes: ['xb'],
      execute: () => {
        window.location.href = 'https://x.com/i/bookmarks'
      },
    },

    {
      id: 'tw-grok',
      type: 'action',
      name: 'Twitter: Grok',
      description: 'Chat with Grok AI',
      icon: '🤖',
      keywords: ['twitter', 'x', 'grok', 'ai'],
      prefixes: ['xg'],
      execute: () => {
        window.location.href = 'https://x.com/i/grok'
      },
    },

    {
      id: 'tw-premium',
      type: 'action',
      name: 'Twitter: Premium',
      description: 'X Premium subscription',
      icon: '⭐',
      keywords: ['twitter', 'x', 'premium', 'verified'],
      prefixes: ['xp'],
      execute: () => {
        window.location.href = 'https://x.com/i/premium'
      },
    }
  ],
}
