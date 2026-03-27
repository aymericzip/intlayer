import { Link } from '@components/Link/Link';
import { TechLogo, TechLogoName } from '@intlayer/design-system';
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
import { cn } from '@intlayer/design-system/utils';
import type { FC } from 'react';

// Animated Technology logos
const logos = [
  {
    name: TechLogoName.Express,
    key: 'express',
    route: Website_Doc_Environment_Express,
  },
  {
    name: TechLogoName.NestJS,
    key: 'nestjs',
    route: Website_Doc_Environment_NestJS,
  },
  {
    name: TechLogoName.Hono,
    key: 'hono',
    route: Website_Doc_Environment_Hono,
  },
  {
    name: TechLogoName.Fastify,
    key: 'fastify',
    route: Website_Doc_Environment_Fastify,
  },
  {
    name: TechLogoName.Nextjs,
    key: 'nextjs',
    route: Website_Doc_Environment_NextJS,
  },
  {
    name: TechLogoName.React,
    key: 'react',
    route: Website_Doc_Environment_CRA,
  },
  {
    name: TechLogoName.Preact,
    key: 'preact',
    route: Website_Doc_Environment_ViteAndPreact,
  },
  {
    name: TechLogoName.Vue,
    key: 'vue',
    route: Website_Doc_Environment_ViteAndVue,
  },
  {
    name: TechLogoName.Nuxt,
    key: 'nuxt',
    route: Website_Doc_Environment_NuxtAndVue,
  },
  {
    name: TechLogoName.Vite,
    key: 'vite',
    route: Website_Doc_Environment_ViteAndReact,
  },
  {
    name: TechLogoName.Astro,
    key: 'astro',
    route: Website_Doc_Environment_Astro,
  },
  {
    name: TechLogoName.Tanstack,
    key: 'tanstack',
    route: Website_Doc_Environment_Tanstack,
  },
  {
    name: TechLogoName.Lit,
    key: 'lit',
    route: Website_Doc_Environment_Lit,
  },
  {
    name: TechLogoName.Svelte,
    key: 'svelte',
    route: Website_Doc_Environment_ViteAndSvelte,
  },
  {
    name: TechLogoName.Solid,
    key: 'solid',
    route: Website_Doc_Environment_ViteAndSolid,
  },
  {
    name: TechLogoName.Angular,
    key: 'angular',
    route: Website_Doc_Environment_Angular,
  },
];

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
