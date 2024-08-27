import { routesConfig } from './routesConfig';

export function getDomainUrl(request: Request) {
  const host =
    request.headers.get('X-Forwarded-Host') ??
    request.headers.get('host') ??
    new URL(request.url).host;
  const protocol = request.headers.get('X-Forwarded-Proto') ?? 'http';
  return `${protocol}://${host}`;
}

export const getCurrentRoute = (location: string) => {
  return routesConfig.filter((r) => '/' + r.path === location)[0];
}
