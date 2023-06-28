import { useRequestEvent } from '#app';
import DiscordProvider from '../../../app/authProvider';
import { NuxtAuthHandler } from '#auth';
import { getEnv } from '~/app/env';

export default NuxtAuthHandler({
  secret: 'secret',
  providers: [
    DiscordProvider({
      clientId: getEnv(useRequestEvent(), 'NUXT_AUTH_DISCORD_CLIENT_ID'),
      clientSecret: getEnv(useRequestEvent(), 'NUXT_AUTH_DISCORD_CLIENT_SECRET')
    })
  ]
});
