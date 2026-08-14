import countries from 'world-countries'

function countryCodeToFlagEmoji(code) {
  if (!code || code.length !== 2) return ''
  const OFFSET = 127397
  const chars = [...code.toUpperCase()].map(c => c.charCodeAt(0) + OFFSET)
  return String.fromCodePoint(...chars)
}

// Map world-countries to grouped object by region (continent)
export function getGroupedCountries() {
  const groups = {}

  countries.forEach(c => {
    // Split Americas into North America and South America using subregion
    let region = c.region || 'Other'
    if (region === 'Americas') {
      const sub = c.subregion || ''
      if (sub === 'South America') region = 'South America'
      else region = 'North America'
    }

    if (!groups[region]) groups[region] = []
    groups[region].push({ code: c.cca2, name: c.name.common })
  })

  // Sort each group alphabetically by name
  Object.keys(groups).forEach(region => {
    groups[region].sort((a, b) => a.name.localeCompare(b.name))
  })

  // Order regions with Europe before North America
  const preferredOrder = ['Europe', 'North America', 'South America', 'Asia', 'Africa', 'Oceania', 'Antarctic', 'Other']
  const ordered = {}
  preferredOrder.forEach(r => {
    if (groups[r]) ordered[r] = groups[r]
  })
  // append any remaining regions not in preferredOrder
  Object.keys(groups).forEach(r => {
    if (!ordered[r]) ordered[r] = groups[r]
  })

  return { groups: ordered, countryCodeToFlagEmoji }
}

export default getGroupedCountries
