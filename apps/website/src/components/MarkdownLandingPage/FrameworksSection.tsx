import { Container } from '@intlayer/design-system/container';
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
import { m, type Variants } from 'framer-motion';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const MotionContainer = m.create(Container);

export const FrameworksSection: FC = () => {
  const { title, description, outputLabel } = useIntlayer(
    'frameworks-section-markdown'
  );

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8 lg:px-12">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h2 className="font-bold text-3xl text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            {description}
          </p>
        </m.div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {FRAMEWORKS.map(({ logo, name, output, route }) => (
            <Link
              key={name}
              to={route}
              variant="invisible-link"
              color="text"
              label={name}
            >
              <MotionContainer
                variants={cardVariants}
                roundedSize="3xl"
                padding="lg"
                background="with"
                border={true}
                className="flex h-full flex-col items-center gap-3 text-center transition-colors hover:bg-neutral/5"
              >
                <TechLogo name={logo} className="size-10" />
                <span className="font-semibold text-foreground text-sm">
                  {name}
                </span>
                <span className="text-muted-foreground text-xs">
                  {outputLabel} <span className="font-mono">{output}</span>
                </span>
              </MotionContainer>
            </Link>
          ))}
        </m.div>
      </div>
    </section>
  );
};
