export const SUPPORTED_LANGS = {
  fr: 'Français',
  en: 'English',
  es: 'Español',
  zh: '中文'
} as const

export type Lang = keyof typeof SUPPORTED_LANGS

const localeKeys = Object.keys(SUPPORTED_LANGS) as Lang[]
export const DEFAULT_LANG = { name: SUPPORTED_LANGS.fr, code: localeKeys[0] }
export const locales = localeKeys.map((code) => ({ code, name: SUPPORTED_LANGS[code], file: `${code}.json` }))

export const getFlagIcon = (code: Lang): string => `circle-flags:${code}`
