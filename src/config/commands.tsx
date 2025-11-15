import React from 'react'
import type { PortalContext } from '@/types/types'
import type { Command } from '@/types/types'
import navigationActions from './navigationCommands'



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

/**
 * Flattens FlatCommandConfig into a simple array of commands
 */
export function flattenCommands(config: FlatCommandConfig): Command[] {
  const allCommands: Command[] = []

  // Add all actions, portals, categories
  if (config.actions) allCommands.push(...config.actions)
  if (config.portals) allCommands.push(...config.portals)
  if (config.categories) allCommands.push(...config.categories)

  // Add commands from groups (by ID lookup)
  if (config.groups) {
    // Create lookup map for faster ID resolution
    const commandMap = new Map<string, Command>()
    allCommands.forEach(cmd => commandMap.set(cmd.id, cmd))

    Object.values(config.groups).forEach(group => {
      group.commands.forEach(cmdId => {
        const command = commandMap.get(cmdId)
        if (command && !allCommands.find(c => c.id === cmdId)) {
          allCommands.push(command)
        }
      })
    })
  }

  return allCommands
}

export const commandPaletteConfig: FlatCommandConfig = {
  actions: [
    // TWITTER/X ACTIONS
    {
      id: 'x-home',
      type: 'action',
      name: 'Twitter: Home',
      description: 'Go to X home timeline',
      icon: '🏠',
      keywords: ['twitter', 'x', 'home', 'feed', 'timeline'],
      prefixes: ['!h'],
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
      prefixes: ['!e'],
      execute: () => {
        window.location.href = 'https://x.com/explore'
      },
    },
    {
      id: 'x-notifications',
      type: 'action',
      name: 'Twitter: Notifications',
      description: 'View your notifications',
      icon: '🔔',
      keywords: ['twitter', 'x', 'notifications', 'alerts'],
      prefixes: ['!n'],
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
      prefixes: ['!m'],
      execute: () => {
        window.location.href = 'https://x.com/messages'
      },
    },
    // Deeply nested Navigation commands
    ...navigationActions, 
  ],

  portals: [
    {
      id: 'x-search',
      type: 'portal',
      name: 'Twitter: Search',
      description: 'Search Twitter/X',
      icon: '🔎',
      keywords: ['twitter', 'x', 'search', 'find'],
      prefixes: ['xs', '!se', '/'],
      showSearchInput: false,
      render: (initialQuery: string, ctx: PortalContext) => {
        return <TwitterSearchPortal initialQuery={initialQuery} onClose={ctx.onClose} />
      },
    } as unknown as Command,
  ],
}

// ============================================================================
// PORTAL COMPONENTS
// ============================================================================

function TwitterSearchPortal({
  initialQuery = '',
  onClose,
}: {
  initialQuery?: string
  onClose?: () => void
}) {
  const [query, setQuery] = React.useState(initialQuery)

  const handleSearch = (searchText: string) => {
    if (!searchText.trim()) return
    // Navigate to search with query
    window.location.href = `https://x.com/search?q=${encodeURIComponent(searchText.trim())}`
    onClose?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(query)
    } else if (e.key === 'Escape') {
      onClose?.()
    }
  }

  return (
    <div className="w-full p-4">
      <input
        autoFocus
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search X..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => handleSearch(query)}
          disabled={!query.trim()}
          className="flex-1 px-3 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Search
        </button>
        <button
          onClick={() => onClose?.()}
          className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
