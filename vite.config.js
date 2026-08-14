import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, 'src/plugin/index.js'),
      name: 'ReactCountryDropdown',
      fileName: format => (format === 'es' ? 'index.esm.js' : 'index.umd.js')
    },
    rollupOptions: {
      // don't bundle peer deps
      external: ['react', 'react-dom', 'react-dom/client'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-dom/client': 'ReactDOM'
        }
      }
    }
  }
})
