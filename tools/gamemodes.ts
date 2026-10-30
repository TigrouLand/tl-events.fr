export type Gamemode = {
  key: string
  slug: string
  material: string
  /** the cover glyph, and the item the server's icon resolves to via `material` */
  glyph: string
  /** the slot's bevel, cover field and lift shadow all hang off this one value */
  accent: string
  /** the screenshot is bright enough to wash out white text, so it needs a heavier scrim */
  bright?: boolean
  focus?: string
}

export const GAMEMODES: readonly Gamemode[] = [
  {
    key: 'jump',
    slug: 'jump',
    material: 'feather',
    glyph: 'game-icons:feather',
    accent: '#38bdf8',
    bright: true,
    focus: '70% 80%'
  },
  {
    key: 'fastbow',
    slug: 'fastbow',
    material: 'bow',
    glyph: 'game-icons:bow-arrow',
    accent: '#4ade80',
    bright: true,
    focus: '45% 62%'
  },
  {
    key: 'arena',
    slug: 'arena',
    material: 'iron_sword',
    glyph: 'game-icons:crossed-swords',
    accent: '#f87171',
    bright: true,
    focus: '45% 68%'
  },
  { key: 'tigroubrain', slug: 'tigroubrain', material: 'sandstone', glyph: 'game-icons:goal-keeper', accent: '#fb923c' },
  { key: 'bingo', slug: 'bingo', material: 'decorated_pot', glyph: 'game-icons:perspective-dice-six', accent: '#e879f9' },
  {
    key: 'rftd',
    slug: 'rftd',
    material: 'dragon_egg',
    glyph: 'game-icons:dragon-orb',
    accent: '#a78bfa',
    focus: '55% 42%'
  },
  { key: 'switch', slug: 'switch', material: 'chest_minecart', glyph: 'game-icons:body-swapping', accent: '#2dd4bf', bright: true },
  { key: 'taupegun', slug: 'taupegun', material: 'tnt', glyph: 'game-icons:mole', accent: '#b08968', bright: true },
  { key: 'uhc', slug: 'uhc', material: 'golden_apple', glyph: 'game-icons:apple-core', accent: '#facc15', bright: true }
]

export const artUrl = (mode: Gamemode): string => `/gamemodes/${mode.slug}.webp`

export const slotNumber = (index: number): string => String(index + 1).padStart(2, '0')
