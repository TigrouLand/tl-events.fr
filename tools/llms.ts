import type { LLMsSection, ModuleOptions } from 'nuxt-llms'
import { DEFAULT_LANG, type Lang, SUPPORTED_LANGS } from './i18n'
import { API_URL, FULL_APP_NAME, PROD_URL, SERVER_IP, socialLinks } from './seo'

export type LlmsSection = LLMsSection & { contentCollection?: string }

type LlmsConfig = Omit<ModuleOptions, 'sections'> & { sections: LlmsSection[] }

const pages = [
  {
    path: '/',
    title: 'Home',
    description: 'Landing page: unique member and played game counters, links to every section of the site.'
  },
  {
    path: '/members',
    title: 'Members',
    description: 'Player directory: rank, kills, deaths and wins per member, searchable and sortable.'
  },
  {
    path: '/gamemodes',
    title: 'Gamemodes',
    description: 'Rules of the mini-games played during events: Jump, FastBow, Arena, TigrouBrain, Bingo, RFTD, Switch, TaupeGun, UHC.'
  },
  {
    path: '/games',
    title: 'Games',
    description: 'Past, live and scheduled event games with their players, teams, scenarios, modifiers and results.'
  },
  {
    path: '/news',
    title: 'News',
    description: 'Announcements and patch notes for the server, grouped by tag and date.'
  }
]

/** only the default locale is unprefixed: /en/members, /es/members, /zh/members ... */
const pageUrl = (code: Lang, path: string) => `${PROD_URL}${code === DEFAULT_LANG.code ? '' : `/${code}`}${path === '/' ? '/' : path}`

const linkPage = (code: Lang) => (page: (typeof pages)[number]) => ({
  title: page.title,
  description: page.description,
  href: pageUrl(code, page.path)
})

const locales = Object.keys(SUPPORTED_LANGS) as Lang[]

export const llms: LlmsConfig = {
  domain: PROD_URL,
  title: FULL_APP_NAME,
  description: 'TigrouLand is a French Minecraft community running mini-games and public events on its own server (Java, version 26.1.2).',
  full: {
    title: 'Complete documentation',
    description: 'The site index, followed by the full Markdown text of every news post.'
  },
  sections: [
    {
      title: 'Pages',
      description: 'Core application pages, served in the default locale (French). Page names and summaries are in English.',
      links: pages.map(linkPage(DEFAULT_LANG.code))
    },
    ...locales
      .filter((code) => code !== DEFAULT_LANG.code)
      .map<LlmsSection>((code) => ({
        title: `${SUPPORTED_LANGS[code]} pages`,
        description: `Translated copy of every page, served under ${PROD_URL}/${code}/.`,
        links: pages.map(linkPage(code))
      })),
    {
      title: 'News & patch notes',
      contentCollection: 'docs'
    }
  ],
  notes: [
    `Available in ${locales.length} locales: ${locales.map((code) => SUPPORTED_LANGS[code]).join(', ')}. Only Français is unprefixed, the others take their code as a URL prefix (${pageUrl('zh', '/members')}).`,
    'News posts are authored in French; the rest of the interface is translated, in-game text follows the client language.',
    `Every content page is also served as raw Markdown at ${PROD_URL}/raw/<path>.md, which is what the news links above point to.`,
    `This index plus the full text of every news post is available at ${PROD_URL}/llms-full.txt.`,
    `Member, game and gamemode data is loaded client-side from a JSON API rooted at ${API_URL}.`,
    `The Minecraft server is reached at the IP ${SERVER_IP} (Java Edition).`,
    `Community links: ${socialLinks.map((link) => `${link.label} — ${link.to}`).join(', ')}.`
  ]
}
