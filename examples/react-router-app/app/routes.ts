import { layout, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  layout('routes/layout.tsx', [
    route('/', 'routes/page.tsx'),
    route('/:lang', 'routes/[lang]/page.tsx'),
    route('/:lang/about', 'routes/[lang]/about/page.tsx'),
  ]),
] satisfies RouteConfig;
