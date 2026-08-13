import { createRuleTester, SOURCE_FILENAME } from '../utils/_ruleTester';
import { noDynamicFieldAccess } from './noDynamicFieldAccess';

const ruleTester = createRuleTester();

ruleTester.run('no-dynamic-field-access', noDynamicFieldAccess, {
  valid: [
    {
      name: 'field read by name',
      filename: SOURCE_FILENAME,
      code: `
        import { useIntlayer } from 'react-intlayer';
        const content = useIntlayer('home');
        const title = content.title;
      `,
    },
    {
      name: 'computed access with a string literal',
      filename: SOURCE_FILENAME,
      code: `
        import { useIntlayer } from 'react-intlayer';
        const content = useIntlayer('home');
        const title = content['title'];
      `,
    },
    {
      name: 'array index into a list field',
      filename: SOURCE_FILENAME,
      code: `
        import { useIntlayer } from 'react-intlayer';
        const content = useIntlayer('home');
        const first = content.items[0];
      `,
    },
    {
      name: 'destructured field read by name',
      filename: SOURCE_FILENAME,
      code: `
        import { useIntlayer } from 'react-intlayer';
        const { nav } = useIntlayer('home');
        const label = nav.about;
      `,
    },
    {
      name: 'translator called with a static path',
      filename: SOURCE_FILENAME,
      code: `
        import { useTranslations } from 'next-intl';
        const t = useTranslations('home');
        const title = t('hero.title');
      `,
    },
    {
      name: 'computed access on an unrelated object',
      filename: SOURCE_FILENAME,
      code: `
        const lookup = { a: 1 };
        const value = lookup[key];
      `,
    },
    {
      name: 'the i18n object of useTranslation is not a translator',
      filename: SOURCE_FILENAME,
      code: `
        import { useTranslation } from 'react-i18next';
        const { i18n } = useTranslation('home');
        i18n.changeLanguage(locale);
      `,
    },
  ],

  invalid: [
    {
      name: 'computed access with an identifier',
      filename: SOURCE_FILENAME,
      code: `
        import { useIntlayer } from 'react-intlayer';
        const content = useIntlayer('home');
        const title = content[fieldName];
      `,
      errors: [{ messageId: 'dynamicField' }],
    },
    {
      name: 'computed access on a destructured subtree',
      filename: SOURCE_FILENAME,
      code: `
        import { useIntlayer } from 'react-intlayer';
        const { nav } = useIntlayer('home');
        const label = nav[route];
      `,
      errors: [{ messageId: 'dynamicField' }],
    },
    {
      name: 'interpolated template as a computed key',
      filename: SOURCE_FILENAME,
      code: `
        import { getIntlayer } from 'intlayer';
        const content = getIntlayer('home');
        const value = content[\`item-\${index}\`];
      `,
      errors: [{ messageId: 'dynamicField' }],
    },
    {
      name: 'translator called with a runtime path',
      filename: SOURCE_FILENAME,
      code: `
        import { useTranslations } from 'next-intl';
        const t = useTranslations('home');
        const title = t(messageKey);
      `,
      errors: [
        { messageId: 'dynamicMessageId', data: { caller: 'useTranslations' } },
      ],
    },
    {
      name: 'destructured translator called with a runtime path',
      filename: SOURCE_FILENAME,
      code: `
        import { useTranslation } from 'react-i18next';
        const { t } = useTranslation('home');
        const title = t(messageKey);
      `,
      errors: [
        { messageId: 'dynamicMessageId', data: { caller: 'useTranslation' } },
      ],
    },
    {
      name: 'renamed destructured translator',
      filename: SOURCE_FILENAME,
      code: `
        import { useTranslation } from 'react-i18next';
        const { t: translate } = useTranslation('home');
        const title = translate(messageKey);
      `,
      errors: [{ messageId: 'dynamicMessageId' }],
    },
    {
      name: 'two components in one file are tracked separately',
      filename: SOURCE_FILENAME,
      code: `
        import { useIntlayer } from 'react-intlayer';
        const Page = () => {
          const content = useIntlayer('page');
          return content[key];
        };
        const App = () => {
          const content = useIntlayer('app');
          return content.title;
        };
      `,
      errors: [{ messageId: 'dynamicField' }],
    },
  ],
});
