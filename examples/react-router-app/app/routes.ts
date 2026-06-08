import { type RouteConfig, route } from '@react-router/dev/routes';

const routes: RouteConfig = [
  route('/:locale?', 'routes/page.tsx'),
  route('/:locale?/about', 'routes/about/page.tsx'),
  route('/:locale?/server', 'routes/server/page.tsx'),
];

export default routes;
