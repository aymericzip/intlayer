import { createRuleTester, SOURCE_FILENAME } from '../utils/_ruleTester';
import { staticDictionaryKey } from './staticDictionaryKey';

const ruleTester = createRuleTester();

ruleTester.run('static-dictionary-key', staticDictionaryKey, {
  valid: [
    {
      name: 'string literal key',
      filename: SOURCE_FILENAME,
      code: `
        import { useIntlayer } from 'react-intlayer';
        const content = useIntlayer('home');
      `,
    },
    {
      name: 'key wrapped in a TypeScript assertion is still static',
      filename: SOURCE_FILENAME,
      code: `
        import { useIntlayer } from 'react-intlayer';
        const content = useIntlayer('home' as const);
      `,
    },
    {
      name: 'uninterpolated template literal',
      filename: SOURCE_FILENAME,
      code: `
        import { getIntlayer } from 'intlayer';
        const content = getIntlayer(\`home\`);
      `,
    },
    {
      name: 'generic type argument does not hide the key',
      filename: SOURCE_FILENAME,
      code: `
        import { useIntlayer } from 'react-intlayer';
        const content = useIntlayer<'home'>('home');
      `,
    },
    {
      name: 'next-intl root scope may omit the namespace',
      filename: SOURCE_FILENAME,
      code: `
        import { useTranslations } from 'next-intl';
        const t = useTranslations();
      `,
    },
    {
      name: 'next-intl options object with a literal namespace',
      filename: SOURCE_FILENAME,
      code: `
        import { getTranslations } from 'next-intl/server';
        const t = await getTranslations({ locale: 'en', namespace: 'home' });
      `,
    },
    {
      name: 'unrelated function with the same argument shape',
      filename: SOURCE_FILENAME,
      code: `
        const useSomethingElse = (key: string) => key;
        const value = useSomethingElse(dynamicKey);
      `,
    },
    {
      name: 'static id on a JSX message component',
      filename: SOURCE_FILENAME,
      code: `
        import { FormattedMessage } from 'react-intl';
        const Component = () => <FormattedMessage id="home.title" />;
      `,
    },
  ],

  invalid: [
    {
      name: 'identifier key',
      filename: SOURCE_FILENAME,
      code: `
        import { useIntlayer } from 'react-intlayer';
        const content = useIntlayer(dictionaryKey);
      `,
      errors: [{ messageId: 'dynamicKey', data: { caller: 'useIntlayer' } }],
    },
    {
      name: 'a const bound to a literal is still invisible to the compiler',
      filename: SOURCE_FILENAME,
      code: `
        import { useIntlayer } from 'react-intlayer';
        const key = 'home';
        const content = useIntlayer(key);
      `,
      errors: [{ messageId: 'dynamicKey' }],
    },
    {
      name: 'interpolated template key',
      filename: SOURCE_FILENAME,
      code: `
        import { useIntlayer } from 'react-intlayer';
        const content = useIntlayer(\`home-\${suffix}\`);
      `,
      errors: [
        { messageId: 'dynamicTemplateKey', data: { caller: 'useIntlayer' } },
      ],
    },
    {
      name: 'member expression key',
      filename: SOURCE_FILENAME,
      code: `
        import { getIntlayer } from 'intlayer';
        const content = getIntlayer(keys.home);
      `,
      errors: [{ messageId: 'dynamicKey', data: { caller: 'getIntlayer' } }],
    },
    {
      name: 'next-intl dynamic namespace in an options object',
      filename: SOURCE_FILENAME,
      code: `
        import { getTranslations } from 'next-intl/server';
        const t = await getTranslations({ namespace: page });
      `,
      errors: [
        { messageId: 'dynamicKey', data: { caller: 'getTranslations' } },
      ],
    },
    {
      name: 'dynamic id on a JSX message component',
      filename: SOURCE_FILENAME,
      code: `
        import { FormattedMessage } from 'react-intl';
        const Component = () => <FormattedMessage id={messageId} />;
      `,
      errors: [
        {
          messageId: 'dynamicJsxKey',
          data: { attribute: 'id', caller: 'FormattedMessage' },
        },
      ],
    },
  ],
});
