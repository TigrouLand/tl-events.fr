import { defineEventHandler } from 'h3';
import DiscordProvider from '../../../app/authProvider';
import { NuxtAuthHandler } from '#auth';

export default defineEventHandler((event) => {
  const { cloudflare } = event.context;

  const secret = cloudflare.env.NUXT_AUTH_SECRET;
  const clientId = cloudflare.env.NUXT_AUTH_DISCORD_CLIENT_ID;
  const clientSecret = cloudflare.env.NUXT_AUTH_DISCORD_CLIENT_SECRET;

  const authHandler = NuxtAuthHandler({
    secret,
    providers: [
      DiscordProvider({
        clientId,
        clientSecret
      })
    ]
  });

  return authHandler(event);
});
