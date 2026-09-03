import {
  Website_Doc_Environment_Angular_Path,
  Website_Doc_Environment_Astro_Path,
  Website_Doc_Environment_CRA_Path,
  Website_Doc_Environment_Express_Path,
  Website_Doc_Environment_Fastify_Path,
  Website_Doc_Environment_Hono_Path,
  Website_Doc_Environment_Htmx_Path,
  Website_Doc_Environment_Lit_Path,
  Website_Doc_Environment_NestJS_Path,
  Website_Doc_Environment_NextJS_Path,
  Website_Doc_Environment_NuxtAndVue_Path,
  Website_Doc_Environment_Tanstack_Path,
  Website_Doc_Environment_ViteAndPreact_Path,
  Website_Doc_Environment_ViteAndReact_Path,
  Website_Doc_Environment_ViteAndReact_ReactRouterV7_Path,
  Website_Doc_Environment_ViteAndSolid_Path,
  Website_Doc_Environment_ViteAndSvelte_Path,
  Website_Doc_Environment_ViteAndVue_Path,
} from '@intlayer/design-system/routes';
import { TechLogo, type TechLogoName } from '@intlayer/design-system/tech-logo';
import { cn } from '@intlayer/design-system/utils';
import type { FC } from 'react';
import { Link } from '~/components/Link/Link';

// Animated Technology logos
const logos = [
  {
    name: 'express',
    key: 'express',
    route: Website_Doc_Environment_Express_Path,
  },
  {
    name: 'nestjs',
    key: 'nestjs',
    route: Website_Doc_Environment_NestJS_Path,
  },
  {
    name: 'hono',
    key: 'hono',
    route: Website_Doc_Environment_Hono_Path,
  },
  {
    name: 'fastify',
    key: 'fastify',
    route: Website_Doc_Environment_Fastify_Path,
  },
  {
    name: 'nextjs',
    key: 'nextjs',
    route: Website_Doc_Environment_NextJS_Path,
  },
  {
    name: 'react',
    key: 'react',
    route: Website_Doc_Environment_CRA_Path,
  },
  {
    name: 'preact',
    key: 'preact',
    route: Website_Doc_Environment_ViteAndPreact_Path,
  },
  {
    name: 'vue',
    key: 'vue',
    route: Website_Doc_Environment_ViteAndVue_Path,
  },
  {
    name: 'nuxt',
    key: 'nuxt',
    route: Website_Doc_Environment_NuxtAndVue_Path,
  },
  {
    name: 'vite',
    key: 'vite',
    route: Website_Doc_Environment_ViteAndReact_Path,
  },
  {
    name: 'astro',
    key: 'astro',
    route: Website_Doc_Environment_Astro_Path,
  },
  {
    name: 'tanstack',
    key: 'tanstack',
    route: Website_Doc_Environment_Tanstack_Path,
  },
  {
    name: 'lit',
    key: 'lit',
    route: Website_Doc_Environment_Lit_Path,
  },
  {
    name: 'svelte',
    key: 'svelte',
    route: Website_Doc_Environment_ViteAndSvelte_Path,
  },
  {
    name: 'solid',
    key: 'solid',
    route: Website_Doc_Environment_ViteAndSolid_Path,
  },
  {
    name: 'angular',
    key: 'angular',
    route: Website_Doc_Environment_Angular_Path,
  },
  {
    name: 'htmx',
    key: 'htmx',
    route: Website_Doc_Environment_Htmx_Path,
  },
  {
    name: 'remix',
    key: 'remix',
    route: Website_Doc_Environment_ViteAndReact_ReactRouterV7_Path,
  },
] as const;

const LogoItem: FC<{
  name: TechLogoName;
  label: string;
  route: string;
  className?: string;
}> = ({ name, route, label, className }) => (
  <Link to={route} label={label} color="custom">
    <TechLogo
      name={name}
      className={cn(
        'size-12 shrink-0 opacity-70 transition-opacity duration-200 hover:opacity-100 md:size-10 lg:size-15',
        className
      )}
    />
  </Link>
);

export const TechLogos: FC = () => (
  <div className="mask-[linear-gradient(to_right,transparent_0,black_170px,black_calc(100%-170px),transparent_100%)] w-full overflow-hidden">
    <div className="horizontal-loop-4 inline-flex items-center whitespace-nowrap">
      {logos.map((logo) => (
        <div key={`${logo.key}-1`} className="mx-6 sm:mx-12 md:mx-16">
          <LogoItem {...logo} label={logo.key} key={`${logo.key}-1`} />
        </div>
      ))}
      {logos.map((logo) => (
        <div key={`${logo.key}-2`} className="mx-6 sm:mx-12 md:mx-16">
          <LogoItem {...logo} label={logo.key} key={`${logo.key}-2`} />
        </div>
      ))}
    </div>
  </div>
);
