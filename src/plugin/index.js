import CountrySelector from '../components/CountrySelector'
import '../styles.css'
import css from '../styles.css?inline'

// Inject styles at runtime for consumers who don't import the CSS file directly
if (typeof document !== 'undefined') {
  const id = 'simple-react-country-dropdown-styles'
  if (!document.getElementById(id)) {
    const style = document.createElement('style')
    style.id = id
    style.textContent = css
    document.head.appendChild(style)
  }
}
import CountrySelectorElement from './CountrySelectorElement'

export { CountrySelector }

export function install(root = window, tagName = 'country-selector') {
  if (root.customElements.get(tagName)) return
  root.customElements.define(tagName, CountrySelectorElement)
}

export default { install }
