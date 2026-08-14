import React, { useState, useRef, useEffect } from 'react'

function defaultFlagUrl(code) {
  if (!code) return ''
  return `https://flagcdn.com/w20/${code.toLowerCase()}.png`
}

export default function CountrySelector({ groupedCountries = {}, value, onChange, placeholder = 'Select a country', flagUrl = defaultFlagUrl }) {
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState({ region: null, index: -1 })
  const buttonRef = useRef(null)
  const listRef = useRef(null)

  const regions = Object.keys(groupedCountries)

  useEffect(() => {
    if (open) {
      setTimeout(() => { listRef.current?.focus() }, 0)
    }
  }, [open])

  function close() {
    setOpen(false)
    setHighlight({ region: null, index: -1 })
    buttonRef.current?.focus()
  }

  function handleSelect(code) {
    onChange?.(code)
    close()
  }

  function flattenItems() {
    const items = []
    regions.forEach(region => {
      groupedCountries[region].forEach((c, i) => items.push({ region, index: i, code: c.code }))
    })
    return items
  }

  function moveHighlight(delta) {
    const items = flattenItems()
    if (!items.length) return
    let pos = items.findIndex(it => it.code === (highlight.code || value))
    if (pos === -1 && value) pos = items.findIndex(it => it.code === value)
    let next = pos + delta
    if (next < 0) next = items.length - 1
    if (next >= items.length) next = 0
    const item = items[next]
    setHighlight({ region: item.region, index: item.index, code: item.code })
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault(); moveHighlight(1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault(); moveHighlight(-1)
    } else if (e.key === 'Enter') {
      e.preventDefault(); if (highlight.code) handleSelect(highlight.code)
    } else if (e.key === 'Escape') {
      e.preventDefault(); close()
    }
  }

  return (
    <div className="country-select">
      <button
        ref={buttonRef}
        type="button"
        className="cd-button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(s => !s)}
      >
        {value ? (
          <>
            <img src={flagUrl(value)} alt="" className="cd-flag-inline" />
            <span className="cd-selected-name">
              {(() => {
                for (const r of regions) {
                  const f = groupedCountries[r].find(c => c.code === value)
                  if (f) return f.name
                }
                return placeholder
              })()}
            </span>
          </>
        ) : (
          <span>{placeholder}</span>
        )}
      </button>

      {open && (
        <div
          className="cd-list"
          role="listbox"
          tabIndex={0}
          ref={listRef}
          onKeyDown={onKeyDown}
        >
          {regions.map(region => (
            <div key={region} className="cd-region">
              <div className="cd-region-label">{region}</div>
              {groupedCountries[region].map((c, idx) => {
                const isHighlighted = highlight.region === region && highlight.index === idx
                return (
                  <div
                    key={c.code}
                    role="option"
                    aria-selected={value === c.code}
                    className={`cd-item ${isHighlighted ? 'highlight' : ''}`}
                    onMouseEnter={() => setHighlight({ region, index: idx, code: c.code })}
                    onClick={() => handleSelect(c.code)}
                  >
                    <img src={flagUrl(c.code)} alt="" className="cd-flag" />
                    <span className="cd-name">{c.name}</span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
