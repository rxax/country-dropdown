import React, { useState } from 'react'
import CountrySelector from './components/CountrySelector'
import getGroupedCountries from './data/getCountries'

const { groups, countryCodeToFlagEmoji } = getGroupedCountries()

export default function App() {
  const [country, setCountry] = useState('')

  // Find selected country name when set
  let selectedName = 'None'
  if (country) {
    for (const region of Object.keys(groups)) {
      const found = groups[region].find(c => c.code === country)
      if (found) {
        selectedName = found.name
        break
      }
    }
  }

  return (
    <div className="app">
      <h1>Country Selector Example</h1>
      <CountrySelector
        groupedCountries={groups}
        value={country}
        onChange={setCountry}
        placeholder="Choose a country"
        flagForCode={countryCodeToFlagEmoji}
      />

      <p>
        Selected: {selectedName}
      </p>
    </div>
  )
}
