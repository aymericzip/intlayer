import { Website_Doc_CLI_Fill_Path } from '@intlayer/design-system/routes';
import { ArrowDown, FileJson, FileText, HandCoins, Server } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';
import { CodePanel } from '~/components/ProductLanding/CodePanel';
import { LocaleKey, WindowFrame } from '~/components/ProductLanding/layout';
import { ProductHero } from '~/components/ProductLanding/ProductHero';

/**
 * What `intlayer fill` produces: a source locale file and the target file it
 * completes. Sample code, so it is not translated.
 */
const SOURCE_FILE = {
  locale: 'en',
  path: 'messages/en.json',
  code: JSON.stringify(
    {
      checkout: {
        title: 'Your cart',
        pay: 'Pay now',
        items: '{count} items',
      },
    },
    null,
    2
  ),
} as const;

const FILLED_FILE = {
  locale: 'fr',
  path: 'messages/fr.json',
  code: JSON.stringify(
    {
      checkout: {
        title: 'Votre panier',
        pay: 'Payer maintenant',
        items: '{count} articles',
      },
    },
    null,
    2
  ),
} as const;

const FillPreview: FC = () => {
  const { card } = useIntlayer('hero-section-translation');

  return (
    <WindowFrame
      title={card.title}
      aside={
        <>
          <LocaleKey locale={SOURCE_FILE.locale} />
          <LocaleKey locale={FILLED_FILE.locale} isActive />
        </>
      }
    >
      <div className="flex flex-col gap-3 p-3">
        <CodePanel label="Terminal" code={card.code.value} lang="bash" />
        <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2">
          <CodePanel
            label={SOURCE_FILE.path}
            code={SOURCE_FILE.code}
            lang="json"
            aside={<LocaleKey locale={SOURCE_FILE.locale} />}
          />
          <CodePanel
            label={FILLED_FILE.path}
            code={FILLED_FILE.code}
            lang="json"
            aside={<LocaleKey locale={FILLED_FILE.locale} isActive />}
          />
        </div>
      </div>
    </WindowFrame>
  );
};

export const HeroSection: FC = () => {
  const { pills, title, description, seeCLICommands, getStartedForFree } =
    useIntlayer('hero-section-translation');

  return (
    <ProductHero
      title={title}
      description={description}
      actions={
        <>
          <Link
            to={Website_Doc_CLI_Fill_Path}
            variant="button"
            color="text"
            size="lg"
            label={getStartedForFree.value}
          >
            {getStartedForFree}
          </Link>
          <Link
            to="#commands"
            variant="button-outlined"
            color="text"
            size="lg"
            label={seeCLICommands.value}
          >
            <span className="flex items-center gap-2">
              {seeCLICommands}
              <ArrowDown className="size-4" />
            </span>
          </Link>
        </>
      }
      meta={[
        {
          key: 'free',
          icon: <HandCoins />,
          label: pills.freeOpenSource,
        },
        { key: 'json', icon: <FileJson />, label: pills.jsonTranslation },
        { key: 'docs', icon: <FileText />, label: pills.docsTranslation },
        { key: 'local', icon: <Server />, label: pills.localLLM },
      ]}
      visual={<FillPreview />}
    />
  );
};
