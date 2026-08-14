import CountrySelector from '../components/CountrySelector'
import CountrySelectorElement from './CountrySelectorElement'

export { CountrySelector }

export function install(root = window, tagName = 'country-selector') {
  if (root.customElements.get(tagName)) return
  root.customElements.define(tagName, CountrySelectorElement)
}

export default { install }
