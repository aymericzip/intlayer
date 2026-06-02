import { Link } from '@components/Link/Link';
import {
  Website_Doc_Environment_Angular,
  Website_Doc_Environment_Astro,
  Website_Doc_Environment_CRA,
  Website_Doc_Environment_Express,
  Website_Doc_Environment_Fastify,
  Website_Doc_Environment_Hono,
  Website_Doc_Environment_Lit,
  Website_Doc_Environment_NestJS,
  Website_Doc_Environment_NextJS,
  Website_Doc_Environment_NuxtAndVue,
  Website_Doc_Environment_Tanstack,
  Website_Doc_Environment_ViteAndPreact,
  Website_Doc_Environment_ViteAndReact,
  Website_Doc_Environment_ViteAndSolid,
  Website_Doc_Environment_ViteAndSvelte,
  Website_Doc_Environment_ViteAndVue,
} from '@intlayer/design-system/routes';
import { TechLogo, type TechLogoName } from '@intlayer/design-system/tech-logo';
import { cn } from '@intlayer/design-system/utils';
import type { FC } from 'react';

// Animated Technology logos
const logos = [
  {
    name: 'express',
    key: 'express',
    route: Website_Doc_Environment_Express,
  },
  {
    name: 'nestjs',
    key: 'nestjs',
    route: Website_Doc_Environment_NestJS,
  },
  {
    name: 'hono',
    key: 'hono',
    route: Website_Doc_Environment_Hono,
  },
  {
    name: 'fastify',
    key: 'fastify',
    route: Website_Doc_Environment_Fastify,
  },
  {
    name: 'nextjs',
    key: 'nextjs',
    route: Website_Doc_Environment_NextJS,
  },
  {
    name: 'react',
    key: 'react',
    route: Website_Doc_Environment_CRA,
  },
  {
    name: 'preact',
    key: 'preact',
    route: Website_Doc_Environment_ViteAndPreact,
  },
  {
    name: 'vue',
    key: 'vue',
    route: Website_Doc_Environment_ViteAndVue,
  },
  {
    name: 'nuxt',
    key: 'nuxt',
    route: Website_Doc_Environment_NuxtAndVue,
  },
  {
    name: 'vite',
    key: 'vite',
    route: Website_Doc_Environment_ViteAndReact,
  },
  {
    name: 'astro',
    key: 'astro',
    route: Website_Doc_Environment_Astro,
  },
  {
    name: 'tanstack',
    key: 'tanstack',
    route: Website_Doc_Environment_Tanstack,
  },
  {
    name: 'lit',
    key: 'lit',
    route: Website_Doc_Environment_Lit,
  },
  {
    name: 'svelte',
    key: 'svelte',
    route: Website_Doc_Environment_ViteAndSvelte,
  },
  {
    name: 'solid',
    key: 'solid',
    route: Website_Doc_Environment_ViteAndSolid,
  },
  {
    name: 'angular',
    key: 'angular',
    route: Website_Doc_Environment_Angular,
  },
] as const;

const LogoItem: FC<{
  name: TechLogoName;
  label: string;
  route: string;
  className?: string;
}> = ({ name, route, label, className }) => (
  <Link href={route} label={label} color="custom">
    <TechLogo
      name={name}
      className={cn(
        'size-12 shrink-0 opacity-70 transition-opacity duration-200 hover:opacity-100 sm:size-14 md:size-16 lg:size-18',
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
