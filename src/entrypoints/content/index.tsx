import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    // Create a UI container for our command palette
    const ui = await createShadowRootUi(ctx, {
      name: 'command-palette',
      position: 'inline',
      anchor: 'body',
      append: 'first',
      onMount: container => {
        // Mount React app
        const root = ReactDOM.createRoot(container)
        root.render(<App />)
        return root
      },
      onRemove: root => {
        root?.unmount()
      },
    })

    // Mount the UI
    ui.mount()
  },
})
