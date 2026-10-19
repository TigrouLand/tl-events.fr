# tl-events.fr

An application created to view various information and statistics of Tigrouland events.

## Used technologies

| 🛠️ Technologies | 📝 Descriptions |
| --------------- | --------------- |
| [![NuxtJS](https://img.shields.io/badge/Nuxt-002E3B?style=flat-square&logo=nuxt&logoColor=%2300DC82)](https://nuxt.com) | Vue framework, file-based routing |
| [![Nitro](https://img.shields.io/badge/Nitro-090F2C?style=flat-square&logo=unjs&logoColor=%23ECDC5A)](https://nitro.unjs.io/) | Serverless engine, SSR for perf & SEO |
| [![Nuxt Content](https://img.shields.io/badge/Nuxt%20Content-002E3B?style=flat-square&logo=nuxt&logoColor=%2300DC82)](https://content.nuxt.com/) | `docs` collection over `news/*.md` |
| [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com) | CSS Framework |
| [![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=flat-square&logo=shadcnui&logoColor=white)](https://ui.shadcn.com) | Accessible UI primitives on reka-ui |
| [![Lucide](https://img.shields.io/badge/Lucide-F56565?style=flat-square&logo=lucide&logoColor=white)](https://lucide.dev/) | UI icons |
| [![VueUse](https://img.shields.io/badge/VueUse-41B883?style=flat-square&logo=vueuse&logoColor=white)](https://vueuse.org/) | Vue composables |
| [![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-F6821F?style=flat-square&logo=Cloudflare-Pages&logoColor=white)](https://pages.cloudflare.com/) | Hosting & edge runtime |
| [![Biome](https://img.shields.io/badge/Biome-60A5FA?style=flat-square&logo=biome&logoColor=white)](https://biomejs.dev/) | Formatting & linting |

## Contributing

To facilitate development, maintainability and thus use the same code standards.
We use [Biome](https://biomejs.dev/) toolchain for both formatting and linting.
Please check that no rules are violated before committing a change with the `npm lint` command.
If you need or have any questions about the contribution, don't hesitate to open an issue.

## Run locally

```bash
  # Clone this repository on your machine — keep the full history, article dates are read from it
  git clone https://gitlab.com/tigrouland/web/tl-events.fr
  # Go to project directory and install deps
  cd tl-events.fr && npm i
  # Start the development server on http://localhost:3000
  npm run dev
```

## Deployment

Production runs on a Cloudflare Pages project connected to this repository: pushing to `main` builds the app and publishes it, other branches get preview deployments. The build command, output directory, D1 `DB` binding and environment variables all live in the Pages dashboard rather than in this repository.

`.node-version` pins the build to the Node release that bundles the npm writing `package-lock.json`. Pages otherwise defaults to an older npm, which resolves optional peer dependencies differently and refuses the lock as out of sync, failing `npm ci` before the build even starts.

News article publish and update dates are read from git history at build time, and Pages checks the repository out shallow. Set the build command to deepen it first:

```bash
  # Pages build command
  git fetch --unshallow || git fetch --deepen=1000 || true; npm run build
```

Without that, the build logs `[news-git] ... no git history` and every article falls back to its checkout date.

```bash
  # Build the application for Cloudflare Pages (nitro.preset in nuxt.config.ts)
  npm run build
  # Serve that build locally, public/_headers rules included
  npx wrangler pages dev dist
```

## License

This project is licensed under the [GNU GPL 3](https://gitlab.com/tigrouland/web/tl-events.fr/blob/main/LICENCE).
