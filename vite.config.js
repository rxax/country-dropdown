import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/plugin/index.js'),
      name: 'ReactCountryDropdown',
      fileName: format => (format === 'es' ? 'index.esm' : 'index.umd')
    },
    rollupOptions: {
      // don't bundle peer deps
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
