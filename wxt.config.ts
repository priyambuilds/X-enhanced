import { defineConfig } from 'wxt'
import { resolve } from 'node:path'

export default defineConfig({
  srcDir: 'src',

  modules: ['@wxt-dev/module-react'],

  alias: {
    '@': resolve('src'),
  },

  manifest: ({ browser, manifestVersion }) => {
    return {
      name: 'X-enhanced',
      description: 'X-enhanced',
      version: '1.0.0',

      permissions: ['tabs', 'storage', 'activeTab'],
      host_permissions: ['<all_urls>'],

      action: {
        default_title: 'X-enhanced',
        default_popup: 'popup.html',
      },

      // options_ui: {
      //   page: 'options.html',
      //   open_in_tab: true,
      // },

      icons: {
        16: 'icon/16.png',
        48: 'icon/48.png',
        128: 'icon/128.png',
      },

      // Strict MV3 CSP: do NOT add 'unsafe-eval' or any extra script sources.
      ...(manifestVersion === 3 && {
        content_security_policy: {
          extension_pages:
            "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';",
        },
      }),

      commands: {
        'toggle-palette': {
          suggested_key: {
            default: 'Ctrl+K',
            mac: 'Command+K',
          },
          description: 'Toggle command palette',
        },
      },
    }
  },

  vite: () => ({
    css: { postcss: './postcss.config.js' },
    build: { target: 'esnext', minify: 'esbuild' },
  }),
})