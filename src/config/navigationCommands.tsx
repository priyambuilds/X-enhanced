import type { Command } from '@/types/types'

const navigationActions: Command[] = [
    
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
]

export default navigationActions

