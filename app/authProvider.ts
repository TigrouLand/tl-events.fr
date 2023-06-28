import { OAuthConfig, OAuthUserConfig } from 'next-auth/src/providers';
import { DiscordProfile } from 'next-auth/src/providers/discord';

export default function Discord<P extends DiscordProfile> (
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: 'discord',
    name: 'Discord',
    type: 'oauth',
    authorization: 'https://discord.com/api/oauth2/authorize?scope=identify+role_connections.write',
    token: 'https://discord.com/api/oauth2/token',
    userinfo: 'https://discord.com/api/users/@me',
    profile (profile) {
      return {
        id: profile.id,
        name: profile.username
      };
    },
    style: {
      logo: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg',
      logoDark: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg',
      bg: '#fff',
      text: '#5865F2',
      bgDark: '#5865F2',
      textDark: '#fff'
    },
    options
  };
}
