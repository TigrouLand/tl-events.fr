import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { formatHex, parse } from 'culori'
import postcss from 'postcss'

// head tag and web app manifest need literal hex colours, they neither can read a
// CSS custom property at runtime, so they are resolved here at config time.
// module is node-only and must never be imported from client-side code.
// manifest is light-mode only, so only :root is read
const themePath = fileURLToPath(new URL('../styles/theme.css', import.meta.url))
const theme = postcss.parse(readFileSync(themePath, 'utf8'), { from: themePath })

const rootVar = (name: string) => {
  let value!: string
  theme.walkRules(/^:root$/, (rule) => {
    rule.walkDecls(name, (decl) => {
      value = decl.value.trim()
    })
  })

  if (value) return value
  else throw new Error(`${name} is missing from the :root block in styles/theme.css`)
}

const toHex = (name: string) => {
  const value = rootVar(name)
  const color = parse(value)

  if (color) return formatHex(color)
  else throw new Error(`${name} is set to "${value}", which culori cannot convert to hex`)
}

export const THEME_COLOR = toHex('--primary')
export const THEME_BACKGROUND = toHex('--background')
