import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/:locale?", "routes/page.tsx"),
    route("/:locale?/about", "routes/about/page.tsx"),
  ]),
] satisfies RouteConfig;
