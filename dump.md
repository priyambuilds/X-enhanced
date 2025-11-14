import React from 'react'
import type { PortalContext } from '@/types/types'
import type { Command } from '@/types/types'



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

    // BROWSER ACTIONS
    {
      id: 'browser-new-tab',
      type: 'action',
      name: 'New Tab',
      description: 'Open a new browser tab',
      icon: '➕',
      keywords: ['tab', 'new', 'open', 'browser'],
      prefixes: ['nt'],
      execute: () => {
        window.open('chrome://newtab', '_blank')
      },
    },
    {
      id: 'browser-history',
      type: 'action',
      name: 'Browser History',
      description: 'View browsing history',
      icon: '📚',
      keywords: ['history', 'browsing', 'past'],
      execute: () => {
        window.location.href = 'chrome://history'
      },
    },
    {
      id: 'browser-bookmarks',
      type: 'action',
      name: 'Bookmarks',
      description: 'View browser bookmarks',
      icon: '⭐',
      keywords: ['bookmarks', 'favorites', 'saved'],
      execute: () => {
        window.location.href = 'chrome://bookmarks'
      },
    },

    // DEVELOPMENT TOOLS
    {
      id: 'dev-console',
      type: 'action',
      name: 'DevTools Console',
      description: 'Open developer console',
      icon: '⚙️',
      keywords: ['console', 'devtools', 'debug', 'javascript'],
      execute: () => {
        console.log('DevTools opened')
      },
    },
    {
      id: 'dev-inspect',
      type: 'action',
      name: 'Inspect Element',
      description: 'Inspect page elements',
      icon: '🔍',
      keywords: ['inspect', 'elements', 'html', 'css'],
      execute: () => {
        console.log('Inspect mode activated')
      },
    },
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

    {
      id: 'calculator',
      type: 'portal',
      name: 'Calculator',
      description: 'Advanced calculator with history',
      icon: '🧮',
      keywords: ['math', 'calculate', 'computation', 'numbers'],
      prefixes: ['calc'],
      showSearchInput: false,
      render: (initialQuery: string, ctx: PortalContext) => {
        return <CalculatorPortal initialQuery={initialQuery} onClose={ctx.onClose} />
      },
    } as unknown as Command,

    {
      id: 'text-utils',
      type: 'portal',
      name: 'Text Utils',
      description: 'Text processing utilities',
      icon: '📝',
      keywords: ['text', 'format', 'convert', 'uppercase', 'lowercase'],
      prefixes: ['txt'],
      showSearchInput: false,
      render: (initialQuery: string, ctx: PortalContext) => {
        return <TextUtilsPortal initialQuery={initialQuery} onClose={ctx.onClose} />
      },
    } as unknown as Command,
  ],

  categories: [
    {
      id: 'social-media',
      type: 'category',
      name: 'Social Media',
      description: 'Twitter, Facebook, Instagram, LinkedIn',
      icon: '🌐',
      keywords: ['social', 'facebook', 'twitter', 'instagram', 'linkedin'],
      children: [
        {
          id: 'facebook-home',
          type: 'action',
          name: 'Facebook Home',
          description: 'Go to Facebook feed',
          icon: '📘',
          keywords: ['facebook', 'social', 'feed'],
          execute: () => {
            window.location.href = 'https://facebook.com'
          },
        },
        {
          id: 'instagram-home',
          type: 'action',
          name: 'Instagram Home',
          description: 'Go to Instagram feed',
          icon: '📷',
          keywords: ['instagram', 'social', 'photos'],
          execute: () => {
            window.location.href = 'https://instagram.com'
          },
        },
        {
          id: 'linkedin-home',
          type: 'action',
          name: 'LinkedIn Home',
          description: 'Go to LinkedIn feed',
          icon: '💼',
          keywords: ['linkedin', 'social', 'professional'],
          execute: () => {
            window.location.href = 'https://linkedin.com'
          },
        },
      ],
    },

    {
      id: 'productivity',
      type: 'category',
      name: 'Productivity',
      description: 'Tools to boost your productivity',
      icon: '⚡',
      keywords: ['productivity', 'work', 'tools', 'efficiency'],
      children: [
        {
          id: 'todo-list',
          type: 'category',
          name: 'Task Management',
          description: 'Organize your tasks and projects',
          icon: '✅',
          keywords: ['todo', 'tasks', 'projects', 'organization'],
          children: [
            {
              id: 'add-task',
              type: 'action',
              name: 'Add New Task',
              description: 'Create a new task',
              icon: '➕',
              keywords: ['add', 'new', 'task', 'todo'],
              execute: () => {
                console.log('Add new task')
              },
            },
            {
              id: 'view-tasks',
              type: 'action',
              name: 'View All Tasks',
              description: 'See all your tasks',
              icon: '📋',
              keywords: ['view', 'tasks', 'list', 'all'],
              execute: () => {
                console.log('View all tasks')
              },
            },
            {
              id: 'task-projects',
              type: 'category',
              name: 'Projects',
              description: 'Manage project-based tasks',
              icon: '📁',
              keywords: ['projects', 'folder', 'organization'],
              children: [
                {
                  id: 'project-work',
                  type: 'action',
                  name: 'Work Project',
                  description: 'Tasks for work project',
                  icon: '💼',
                  keywords: ['work', 'office', 'professional'],
                  execute: () => {
                    console.log('Work project tasks')
                  },
                },
                {
                  id: 'project-personal',
                  type: 'action',
                  name: 'Personal Project',
                  description: 'Tasks for personal project',
                  icon: '🏠',
                  keywords: ['personal', 'home', 'hobby'],
                  execute: () => {
                    console.log('Personal project tasks')
                  },
                },
              ],
            },
          ],
        },

        {
          id: 'calendar-tools',
          type: 'category',
          name: 'Calendar & Time',
          description: 'Calendar management and time tracking',
          icon: '📅',
          keywords: ['calendar', 'time', 'schedule', 'events'],
          children: [
            {
              id: 'calendar-view',
              type: 'action',
              name: 'View Calendar',
              description: 'Open calendar view',
              icon: '📅',
              keywords: ['calendar', 'view', 'month', 'week'],
              execute: () => {
                window.open('https://calendar.google.com', '_blank')
              },
            },
            {
              id: 'schedule-meeting',
              type: 'action',
              name: 'Schedule Meeting',
              description: 'Create a new meeting',
              icon: '👥',
              keywords: ['meeting', 'schedule', 'appointment'],
              execute: () => {
                console.log('Schedule new meeting')
              },
            },
          ],
        },
      ],
    },

    {
      id: 'utilities',
      type: 'category',
      name: 'Utilities',
      description: 'Useful tools and utilities',
      icon: '🔧',
      keywords: ['tools', 'utilities', 'helpers', 'functions'],
      children: [
        {
          id: 'unit-converter',
          type: 'action',
          name: 'Unit Converter',
          description: 'Convert between different units',
          icon: '🔄',
          keywords: ['convert', 'units', 'measurement', 'math'],
          execute: () => {
            console.log('Unit converter opened')
          },
        },
        {
          id: 'color-picker',
          type: 'action',
          name: 'Color Picker',
          description: 'Pick and convert colors',
          icon: '🎨',
          keywords: ['color', 'picker', 'hex', 'rgb', 'design'],
          execute: () => {
            console.log('Color picker opened')
          },
        },
      ],
    },
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

function CalculatorPortal({
  initialQuery = '',
  onClose,
}: {
  initialQuery?: string
  onClose?: () => void
}) {
  const [expression, setExpression] = React.useState(initialQuery)
  const [result, setResult] = React.useState('')

  const calculate = () => {
    try {
      // Safe evaluation (for demo only)
      const calculatedResult = executeCode(expression)
      setResult(String(calculatedResult))
    } catch (error) {
      setResult('Error')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      calculate()
    } else if (e.key === 'Escape') {
      onClose?.()
    }
  }

  return (
    <div className="w-full p-4">
      <div className="mb-4">
        <input
          autoFocus
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter mathematical expression..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {result && (
        <div className="p-3 mb-4 rounded-lg bg-gray-50">
          <div className="text-sm text-gray-600">Result:</div>
          <div className="text-lg font-semibold">{result}</div>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={calculate}
          className="flex-1 px-3 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
        >
          Calculate
        </button>
        <button
          onClick={() => onClose?.()}
          className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          Close
        </button>
      </div>
    </div>
  )
}

function TextUtilsPortal({
  initialQuery = '',
  onClose,
}: {
  initialQuery?: string
  onClose?: () => void
}) {
  const [text, setText] = React.useState(initialQuery)

  const toUpperCase = () => setText(text.toUpperCase())
  const toLowerCase = () => setText(text.toLowerCase())
  const reverse = () => setText(text.split('').reverse().join(''))

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      onClose?.()
    }
  }

  return (
    <div className="w-full p-4">
      <textarea
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter text to process..."
        rows={4}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={toUpperCase}
          className="px-3 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          UPPERCASE
        </button>
        <button
          onClick={toLowerCase}
          className="px-3 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
        >
          lowercase
        </button>
        <button
          onClick={reverse}
          className="col-span-2 px-3 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600"
        >
          Reverse Text
        </button>
      </div>

      <button
        onClick={() => onClose?.()}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
      >
        Close
      </button>
    </div>
  )
}
