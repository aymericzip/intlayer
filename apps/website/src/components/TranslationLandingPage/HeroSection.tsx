import { Website_Doc_CLI_Fill_Path } from '@intlayer/design-system/routes';
import { ArrowDown, FileJson, FileText, HandCoins, Server } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { CodePanel } from '~/components/ProductLanding/CodePanel';
import { LocaleKey, WindowFrame } from '~/components/ProductLanding/layout';
import { ProductAction } from '~/components/ProductLanding/ProductAction';
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
      <CodePanel
        isFlat
        label="Terminal"
        code={card.code.value}
        lang="bash"
        className="border-b border-text/10"
      />
      <div className="grid grid-cols-1 divide-y divide-text/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <CodePanel
          isFlat
          label={SOURCE_FILE.path}
          code={SOURCE_FILE.code}
          lang="json"
          aside={<LocaleKey locale={SOURCE_FILE.locale} />}
        />
        <CodePanel
          isFlat
          label={FILLED_FILE.path}
          code={FILLED_FILE.code}
          lang="json"
          aside={<LocaleKey locale={FILLED_FILE.locale} isActive />}
        />
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
          <ProductAction
            isPrimary
            to={Website_Doc_CLI_Fill_Path}
            label={getStartedForFree.value}
          >
            {getStartedForFree}
          </ProductAction>
          <ProductAction to="#commands" label={seeCLICommands.value}>
            <span className="flex items-center gap-2">
              {seeCLICommands}
              <ArrowDown className="size-4" />
            </span>
          </ProductAction>
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
