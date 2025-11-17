import type { PortalContext } from '@/types/types'
import type { Command } from '@/types/types'
import navigationActions from './navigationCommands'

import UserSearchPortal from './components/userSearchPortal'

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
  
    
    // Deeply nested Navigation commands
    ...navigationActions,
  ],

  portals: [
    {
      id: 'x-user-search',
      type: 'portal',
      name: 'Search X Users',
      description: 'Search for users on X (Twitter)',
      icon: '🔎',
      keywords: ['search', 'users', 'people', 'x', 'twitter', 'find', 'user'],
      prefixes: ['@', 'user', 'search'], // Trigger with @username or "search"
      showSearchInput: false, // Portal has its own search input
      render: (initialQuery: string, ctx: PortalContext) => {
        return (
          <UserSearchPortal initialQuery={initialQuery} onClose={ctx.onClose} />
        )
      },
    } as unknown as Command,
  ],
}

// PORTAL COMPONENTS
