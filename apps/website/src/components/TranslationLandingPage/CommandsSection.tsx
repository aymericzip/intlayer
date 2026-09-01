import { Container } from '@intlayer/design-system/container';
import { CodeBlock } from '@intlayer/design-system/ide';
import { motion, type Variants } from 'framer-motion';
import { Braces, FileText, Languages } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

type IconMap = {
  [key: string]: FC<{ className?: string }>;
};

const iconMap: IconMap = {
  'translate-json': Braces,
  'translate-markdown': FileText,
  'review-translations': Languages,
};

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
  show: { transition: { staggerChildren: 0.08 } },
};

export const CommandsSection: FC = () => {
  const { title, description, commands } = useIntlayer(
    'translation-commands-section'
  );

  return (
    <section id="commands" className="mx-auto max-w-6xl px-8 py-20 md:py-28">
      <motion.div
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <h2 className="font-semibold text-2xl text-foreground md:text-3xl">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-base text-foreground/70">
          {description}
        </p>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {commands.map((cmd) => {
          const IconComponent = iconMap[cmd.id.value] || Braces;
          return (
            <motion.div key={cmd.id.value} variants={sectionFade}>
              <Container
                roundedSize="3xl"
                transparency="md"
                padding="lg"
                className="h-full"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="rounded-2xl bg-card/40 p-2">
                      <IconComponent className="size-5 text-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-base text-foreground">
                        {cmd.title}
                      </div>
                      <div className="mt-1 text-foreground/70 text-sm">
                        {cmd.description}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Container
                    roundedSize="2xl"
                    padding="md"
                    className="relative overflow-hidden text-foreground-dark"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-foreground-dark/70 text-xs">
                        {cmd.title}
                      </span>
                      <span className="text-foreground-dark/40 text-xs">
                        CLI
                      </span>
                    </div>
                    <CodeBlock lang="bash" className="text-sm">
                      {cmd.code.value}
                    </CodeBlock>
                  </Container>
                </div>
              </Container>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
