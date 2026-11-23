import {
  Website_Doc_Environment_Angular_Path,
  Website_Doc_Environment_NextJS_Path,
  Website_Doc_Environment_NuxtAndVue_Path,
  Website_Doc_Environment_ViteAndPreact_Path,
  Website_Doc_Environment_ViteAndReact_Path,
  Website_Doc_Environment_ViteAndSolid_Path,
  Website_Doc_Environment_ViteAndSvelte_Path,
  Website_Doc_Environment_ViteAndVue_Path,
} from '@intlayer/design-system/routes';
import { TechLogo, type TechLogoName } from '@intlayer/design-system/tech-logo';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';
import {
  ProductSection,
  SectionHeading,
} from '~/components/ProductLanding/layout';
import { RevealGroup, RevealItem } from '~/components/ProductLanding/motion';

/**
 * The frameworks a Markdown node renders natively into, with the output shape
 * each of them receives. Names and outputs are technical identifiers, so they
 * live here rather than in the dictionary.
 */
const FRAMEWORKS: {
  logo: TechLogoName;
  name: string;
  output: string;
  route: string;
}[] = [
  {
    logo: 'react',
    name: 'React',
    output: 'JSX',
    route: Website_Doc_Environment_ViteAndReact_Path,
  },
  {
    logo: 'nextjs',
    name: 'Next.js',
    output: 'JSX',
    route: Website_Doc_Environment_NextJS_Path,
  },
  {
    logo: 'vue',
    name: 'Vue',
    output: 'VNode',
    route: Website_Doc_Environment_ViteAndVue_Path,
  },
  {
    logo: 'nuxt',
    name: 'Nuxt',
    output: 'VNode',
    route: Website_Doc_Environment_NuxtAndVue_Path,
  },
  {
    logo: 'svelte',
    name: 'Svelte',
    output: 'HTML',
    route: Website_Doc_Environment_ViteAndSvelte_Path,
  },
  {
    logo: 'solid',
    name: 'Solid',
    output: 'JSX',
    route: Website_Doc_Environment_ViteAndSolid_Path,
  },
  {
    logo: 'preact',
    name: 'Preact',
    output: 'JSX',
    route: Website_Doc_Environment_ViteAndPreact_Path,
  },
  {
    logo: 'angular',
    name: 'Angular',
    output: 'HTML',
    route: Website_Doc_Environment_Angular_Path,
  },
];

export const FrameworksSection: FC = () => {
  const { title, description, outputLabel } = useIntlayer(
    'frameworks-section-markdown'
  );

  return (
    <ProductSection>
      <SectionHeading title={title} description={description} />

      <RevealGroup className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {FRAMEWORKS.map(({ logo, name, output, route }) => (
          <RevealItem key={name}>
            <Link
              to={route}
              variant="invisible-link"
              color="text"
              label={name}
              className="flex h-full items-center gap-4 rounded-xl border border-text/10 bg-card p-4 transition-colors duration-150 hover:bg-text/5"
            >
              <TechLogo name={logo} className="size-8 shrink-0" />
              <span className="flex min-w-0 flex-col gap-1">
                <span className="text-sm font-medium text-foreground">
                  {name}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {outputLabel} <span className="font-mono">{output}</span>
                </span>
              </span>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </ProductSection>
  );
};
