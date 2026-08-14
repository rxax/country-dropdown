# Country Dropdown

Simple React app demonstrating a `CountrySelector` component.

Getting started

1. Install dependencies

```bash
npm install
```

2. Run the dev server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

Files

- [package.json](package.json) — project manifest
- [index.html](index.html) — app entry
- [src/main.jsx](src/main.jsx) — React mount
- [src/App.jsx](src/App.jsx) — example usage
- [src/components/CountrySelector.jsx](src/components/CountrySelector.jsx) — component

Fonts

- You can use any font you like. Update `src/styles.css` (or provide your own CSS) to load and configure your preferred font.

- If you prefer a hosted CDN for flags or fonts, update the `@font-face` or `flagUrl` accordingly.

Using as a React plugin / Web Component

You can use the selector as a lightweight plugin. Two main ways:

1) Import the React component directly:

```jsx
import { CountrySelector } from './src/plugin'
// then render in your React app
<CountrySelector groupedCountries={groups} value={value} onChange={setValue} />
```

2) Register and use the web component (works outside React):

```html
<script type="module">
	import plugin from './src/plugin/index.js'
	plugin.install(window, 'country-selector')
	document.querySelector('country-selector').addEventListener('change', e => console.log(e.detail.value))
</script>

<country-selector placeholder="Pick a country"></country-selector>
```

The custom element renders the React component into its Shadow DOM and dispatches a `change` event with `{ detail: { value } }` when selection changes.
