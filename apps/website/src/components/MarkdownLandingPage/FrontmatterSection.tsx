import { Container } from '@intlayer/design-system/container';
import { CodeBlock } from '@intlayer/design-system/ide';
import { Website_Doc_HTML_Path } from '@intlayer/design-system/routes';
import { m, type Variants } from 'framer-motion';
import { ArrowRight, CodeXml } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';

const sectionFade: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export const FrontmatterSection: FC = () => {
  const {
    title,
    description,
    markdownCodeBlockTitle,
    markdownCode,
    usageCodeBlockTitle,
    usageCode,
    html,
  } = useIntlayer('frontmatter-section-markdown');

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 md:px-8 lg:px-12">
      <m.div
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
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
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2"
      >
        <m.div variants={sectionFade}>
          <Container
            roundedSize="3xl"
            padding="md"
            className="h-full text-foreground-dark"
          >
            <span className="text-foreground-dark/70 text-xs">
              {markdownCodeBlockTitle}
            </span>
            <CodeBlock lang="markdown" className="mt-2 text-sm">
              {markdownCode.value}
            </CodeBlock>
          </Container>
        </m.div>

        <m.div variants={sectionFade}>
          <Container
            roundedSize="3xl"
            padding="md"
            className="h-full text-foreground-dark"
          >
            <span className="text-foreground-dark/70 text-xs">
              {usageCodeBlockTitle}
            </span>
            <CodeBlock lang="tsx" className="mt-2 text-sm">
              {usageCode.value}
            </CodeBlock>
          </Container>
        </m.div>
      </m.div>

      <m.div
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-4"
      >
        <Container
          roundedSize="3xl"
          transparency="md"
          padding="lg"
          className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-text/15 p-2">
              <CodeXml className="size-5 text-foreground" />
            </div>
            <div>
              <div className="font-semibold text-base text-foreground">
                {html.title}
              </div>
              <p className="mt-1 max-w-2xl text-foreground/70 text-sm">
                {html.description}
              </p>
            </div>
          </div>

          <Link
            to={Website_Doc_HTML_Path}
            variant="button-outlined"
            color="text"
            label={html.cta.value}
            className="shrink-0"
          >
            <span className="flex items-center gap-2">
              {html.cta}
              <ArrowRight className="size-4" />
            </span>
          </Link>
        </Container>
      </m.div>
    </section>
  );
};
