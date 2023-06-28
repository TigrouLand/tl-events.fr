import { H3Event } from 'h3';

export function getEnv (event: H3Event, env: string) {
  if (!event || !event.context) {
    return undefined;
  }

  const { cloudflare } = event.context;
  return cloudflare.env[env];
}
