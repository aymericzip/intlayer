import { createRuleTester, SOURCE_FILENAME } from '../utils/_ruleTester';
import { enforceAdapterImport } from './enforceAdapterImport';

const ruleTester = createRuleTester();

ruleTester.run('enforce-adapter-import', enforceAdapterImport, {
  valid: [
    {
      name: 'adapter import',
      filename: SOURCE_FILENAME,
      code: `import { useTranslation } from '@intlayer/react-i18next';`,
    },
    {
      name: 'native intlayer packages have no adapter to point at',
      filename: SOURCE_FILENAME,
      code: `import { useIntlayer } from 'react-intlayer';`,
    },
    {
      name: 'unrelated package',
      filename: SOURCE_FILENAME,
      code: `import { useState } from 'react';`,
    },
  ],

  invalid: [
    {
      name: 'react-i18next import',
      filename: SOURCE_FILENAME,
      code: `import { useTranslation } from 'react-i18next';`,
      output: `import { useTranslation } from '@intlayer/react-i18next';`,
      errors: [
        {
          messageId: 'useAdapterImport',
          data: {
            adapter: '@intlayer/react-i18next',
            original: 'react-i18next',
          },
        },
      ],
    },
    {
      name: 'next-intl import',
      filename: SOURCE_FILENAME,
      code: `import { useTranslations } from 'next-intl';`,
      output: `import { useTranslations } from '@intlayer/next-intl';`,
      errors: [{ messageId: 'useAdapterImport' }],
    },
    {
      name: 'sub-path import maps to the matching adapter sub-path',
      filename: SOURCE_FILENAME,
      code: `import { getTranslations } from 'next-intl/server';`,
      output: `import { getTranslations } from '@intlayer/next-intl/server';`,
      errors: [
        {
          messageId: 'useAdapterImport',
          data: {
            adapter: '@intlayer/next-intl/server',
            original: 'next-intl/server',
          },
        },
      ],
    },
    {
      name: 'double-quoted specifier keeps its quote style',
      filename: SOURCE_FILENAME,
      code: `import { useTranslation } from "react-i18next";`,
      output: `import { useTranslation } from "@intlayer/react-i18next";`,
      errors: [{ messageId: 'useAdapterImport' }],
    },
    {
      name: 'dynamic import',
      filename: SOURCE_FILENAME,
      code: `const mod = await import('react-i18next');`,
      output: `const mod = await import('@intlayer/react-i18next');`,
      errors: [{ messageId: 'useAdapterImport' }],
    },
    {
      name: 're-export',
      filename: SOURCE_FILENAME,
      code: `export { useTranslation } from 'react-i18next';`,
      output: `export { useTranslation } from '@intlayer/react-i18next';`,
      errors: [{ messageId: 'useAdapterImport' }],
    },
  ],
});
