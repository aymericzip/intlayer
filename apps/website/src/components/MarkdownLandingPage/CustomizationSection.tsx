import { Container } from '@intlayer/design-system/container';
import { CodeBlock } from '@intlayer/design-system/ide';
import { m, type Variants } from 'framer-motion';
import { Globe, SlidersHorizontal } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { type IntlayerNode, useIntlayer } from 'react-intlayer';

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

type ScopeCardProps = {
  icon: ReactNode;
  title: IntlayerNode;
  codeBlockTitle: IntlayerNode;
  code: string;
};

const ScopeCard: FC<ScopeCardProps> = ({
  icon,
  title,
  codeBlockTitle,
  code,
}) => (
  <m.div variants={sectionFade} className="h-full">
    <Container
      roundedSize="3xl"
      transparency="md"
      padding="lg"
      className="flex h-full flex-col"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-text/15 p-2">{icon}</div>
        <div className="text-base font-semibold text-foreground">{title}</div>
      </div>

      <Container
        roundedSize="2xl"
        padding="md"
        className="text-foreground-dark mt-4"
      >
        <span className="text-foreground-dark/70 text-xs">
          {codeBlockTitle}
        </span>
        <CodeBlock lang="tsx" className="mt-2 text-sm">
          {code}
        </CodeBlock>
      </Container>
    </Container>
  </m.div>
);

export const CustomizationSection: FC = () => {
  const { title, description, global, local, footnote } = useIntlayer(
    'customization-section-markdown'
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 md:px-8 lg:px-12">
      <m.div
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mb-14 text-center"
      >
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          {description}
        </p>
      </m.div>

      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <ScopeCard
          icon={<Globe className="size-5 text-foreground" />}
          title={global.title}
          codeBlockTitle={global.codeBlockTitle}
          code={global.code.value}
        />
        <ScopeCard
          icon={<SlidersHorizontal className="size-5 text-foreground" />}
          title={local.title}
          codeBlockTitle={local.codeBlockTitle}
          code={local.code.value}
        />
      </m.div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {footnote}
      </p>
    </section>
  );
};
