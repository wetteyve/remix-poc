import { routesConfig } from './routesConfig';

export function getDomainUrl(request: Request) {
  const host =
    request.headers.get('X-Forwarded-Host') ??
    request.headers.get('host') ??
    new URL(request.url).host;
  const protocol = request.headers.get('X-Forwarded-Proto') ?? 'http';
  return `${protocol}://${host}`;
}

export function getMetadataForRoute(route: string) {
  let metadata = null;
  const routeArr = route.split('/');

  if (!routeArr?.length) return null;

  if (routeArr.length === 1) {
    const routeObj = routesConfig.find((r) => r.path === route);
    const { title, description } = routeObj?.meta ?? {};

    metadata = [
      {
        title: title,
      },
      {
        name: 'description',
        content: description,
      },
    ];
  }

  if (routeArr.length > 1) {
    for (let i = 0; i <= routeArr.length; i++) {
      const currentRoute = routesConfig.find((r) => r.path === routeArr[i]);
      if (currentRoute?.children) {
      }
    }
  }

  return metadata;
}
