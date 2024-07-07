# tl-events.fr

An application created with Vue through NuxtJS with the goal of building a site to view various information and statistics of TL events.

## Used technologies

The application is developed with [Vue](https://vuejs.org/), a powerful Javascript framework for building user interfaces through the [NuxtJS 3](https://v3.nuxtjs.org/) framework which facilitates development by providing many powerful tools. We thus take advantage of the use of NuxtJS to integrate [Nitropack](https://nitro.unjs.io/) allowing to build serverless applications.
The advantages of creating a serverless application and thus server-side rendered are mainly to improve the performance on the user side and SEO.
To deploy this serverless application, we use [Cloudflare Workers](https://workers.cloudflare.com/), an excellent platform to deliver and serve content anywhere in the world with low latency.

## Contributing

To facilitate development, maintainability and thus use the same code standards.
We use [ESLint](https://eslint.org/) for linting and [Prettier](https://prettier.io/) for formatting.
Please check that no rules are violated before committing a change with the `pnpm lint` command.
If you need or have any questions about the contribution, don't hesitate to open an issue.

## Run locally

```bash
  # First, clone this repository on your machine:
  git clone https://github.com/TigrouLand/tl-events.fr.git --depth=1

  # Go to the project directory:
  cd tl-events.fr

  # Install dependencies:
  pnpm i

  # Start the development server on http://127.0.0.1:3000:
  pnpm dev
```

## Deployment

To deploy this project on a Cloudflare worker, please follow [their documentation](https://developers.cloudflare.com/workers/wrangler/get-started/) to get started and install Wrangler.

```bash
  # Then build the application with the Cloudflare preset:
  NITRO_PRESET=cloudflare pnpm build

  # And finally, publish to Cloudflare Workers:
  wrangler publish
```

## License

This project is licensed under the [GNU GPL 3](https://github.com/TigrouLand/tl-events.fr/blob/main/LICENCE).
