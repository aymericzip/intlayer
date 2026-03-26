import { Link } from '@components/Link/Link';
import { TechLogo, TechLogoName } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

// Animated Technology logos
const logos = [
  {
    name: TechLogoName.Express,
    key: 'express',
    route: PagesRoutes.Doc_Environment_Express,
  },
  {
    name: TechLogoName.NestJS,
    key: 'nestjs',
    route: PagesRoutes.Doc_Environment_NestJS,
  },
  {
    name: TechLogoName.Hono,
    key: 'hono',
    route: PagesRoutes.Doc_Environment_Hono,
  },
  {
    name: TechLogoName.Fastify,
    key: 'fastify',
    route: PagesRoutes.Doc_Environment_Fastify,
  },
  {
    name: TechLogoName.Nextjs,
    key: 'nextjs',
    route: PagesRoutes.Doc_Environment_NextJS,
  },
  // Remove because too visible
  // {
  //   name: TechLogoName.Adonis,
  //   key: 'adonis',
  //   route: PagesRoutes.Doc_Environment_Adonis,
  // },
  {
    name: TechLogoName.Node,
    key: 'nodejs',
    route: PagesRoutes.Doc_Environment_Nodejs,
  },
  {
    name: TechLogoName.React,
    key: 'react',
    route: PagesRoutes.Doc_Environment_CRA,
  },
  {
    name: TechLogoName.Preact,
    key: 'preact',
    route: PagesRoutes.Doc_Environment_ViteAndPreact,
  },
  {
    name: TechLogoName.Vue,
    key: 'vue',
    route: PagesRoutes.Doc_Environment_ViteAndVue,
  },
  {
    name: TechLogoName.Nuxt,
    key: 'nuxt',
    route: PagesRoutes.Doc_Environment_NuxtAndVue,
  },
  {
    name: TechLogoName.Vite,
    key: 'vite',
    route: PagesRoutes.Doc_Environment_ViteAndReact,
  },
  {
    name: TechLogoName.Astro,
    key: 'astro',
    route: PagesRoutes.Doc_Environment_Astro,
  },
  {
    name: TechLogoName.Tanstack,
    key: 'tanstack',
    route: PagesRoutes.Doc_Environment_Tanstack,
  },
  {
    name: TechLogoName.Lynx,
    key: 'lynx',
    route: PagesRoutes.Doc_Intlayer_with_Lynx_and_React,
  },
  {
    name: TechLogoName.Svelte,
    key: 'svelte',
    route: PagesRoutes.Doc_Environment_ViteAndSvelte,
  },
  {
    name: TechLogoName.Solid,
    key: 'solid',
    route: PagesRoutes.Doc_Environment_ViteAndSolid,
  },
  {
    name: TechLogoName.Angular,
    key: 'angular',
    route: PagesRoutes.Doc_Environment_Angular,
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
      {logos.map((logo, index) => (
        <div key={`${logo.key}-${index}-1`} className="mx-6 sm:mx-12 md:mx-16">
          <LogoItem {...logo} label={logo.key} key={`${logo.key}-${index}-1`} />
        </div>
      ))}
      {logos.map((logo, index) => (
        <div key={`${logo.key}-${index}-2`} className="mx-6 sm:mx-12 md:mx-16">
          <LogoItem {...logo} label={logo.key} key={`${logo.key}-${index}-2`} />
        </div>
      ))}
    </div>
  </div>
);
