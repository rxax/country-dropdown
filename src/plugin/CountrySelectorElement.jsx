import React from 'react'
import { createRoot } from 'react-dom/client'
import CountrySelector from '../components/CountrySelector'
import getGroupedCountries from '../data/getCountries'

const { groups, countryCodeToFlagEmoji } = getGroupedCountries()

export default class CountrySelectorElement extends HTMLElement {
  constructor() {
    super()
    this._root = this.attachShadow({ mode: 'open' })
    this._mountNode = document.createElement('div')
    this._root.appendChild(this._mountNode)
    this._reactRoot = createRoot(this._mountNode)
    this._value = ''
  }

  static get observedAttributes() {
    return ['value', 'placeholder']
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return
    if (name === 'value') this._value = newVal || ''
    this._render()
  }

  connectedCallback() {
    this._render()
  }

  disconnectedCallback() {
    this._reactRoot.unmount()
  }

  _onChange = (code) => {
    this._value = code || ''
    this.setAttribute('value', this._value)
    this.dispatchEvent(new CustomEvent('change', { detail: { value: this._value } }))
  }

  _render() {
    this._reactRoot.render(
      React.createElement(CountrySelector, {
        groupedCountries: groups,
        value: this._value,
        onChange: this._onChange,
        placeholder: this.getAttribute('placeholder') || 'Choose a country',
        flagUrl: code => `https://flagcdn.com/w20/${(code||'').toLowerCase()}.png`
      })
    )
  }
}
