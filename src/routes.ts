import { index, type RouteConfig, route } from '@react-router/dev/routes';

export default [
  index('lib/pages/home/index.tsx'),
  route('*', 'lib/pages/404-not-found/index.tsx'),
] satisfies RouteConfig;
