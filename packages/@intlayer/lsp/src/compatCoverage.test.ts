import { describe, expect, it } from 'vitest';
import { collectMessageUsages } from './usageAnalyzer';

/**
 * One case per call form of every compat library: the analyzer must resolve
 * the message to `home` / `hero.title` (dictionary + field path).
 */
const COMPAT_CASES: { library: string; form: string; source: string[] }[] = [
  // i18next
  {
    library: 'i18next',
    form: 'getFixedT',
    source: [
      `import i18n from 'i18next';`,
      `const t = await i18n.getFixedT('en', 'home');`,
      `t('hero.title');`,
    ],
  },
  {
    library: 'i18next',
    form: 'i18n.t',
    source: [`import i18n from 'i18next';`, `i18n.t('home.hero.title');`],
  },
  {
    library: 'i18next',
    form: 'imported t',
    source: [`import { t } from 'i18next';`, `t('home.hero.title');`],
  },
  // react-i18next / next-i18next
  {
    library: 'react-i18next',
    form: 'useTranslation(ns)',
    source: [
      `import { useTranslation } from 'react-i18next';`,
      `const { t } = useTranslation('home');`,
      `t('hero.title');`,
    ],
  },
  {
    library: 'react-i18next',
    form: 'useTranslation() root scope',
    source: [
      `import { useTranslation } from 'react-i18next';`,
      `const { t } = useTranslation();`,
      `t('home.hero.title');`,
    ],
  },
  {
    library: 'react-i18next',
    form: 'useTranslation keyPrefix',
    source: [
      `import { useTranslation } from 'react-i18next';`,
      `const { t } = useTranslation('home', { keyPrefix: 'hero' });`,
      `t('title');`,
    ],
  },
  {
    library: 'react-i18next',
    form: 'ns:key override',
    source: [
      `import { useTranslation } from 'react-i18next';`,
      `const { t } = useTranslation('other');`,
      `t('home:hero.title');`,
    ],
  },
  {
    library: 'react-i18next',
    form: 'useTranslation().i18n.t',
    source: [
      `import { useTranslation } from 'react-i18next';`,
      `const { i18n } = useTranslation();`,
      `i18n.t('home.hero.title');`,
    ],
  },
  {
    library: 'react-i18next',
    form: '<Trans ns i18nKey>',
    source: [
      `import { Trans } from 'react-i18next';`,
      `const element = <Trans ns="home" i18nKey="hero.title" />;`,
    ],
  },
  {
    library: 'react-i18next',
    form: '<Trans i18nKey> without namespace',
    source: [
      `import { Trans } from 'react-i18next';`,
      `const element = <Trans i18nKey="home.hero.title" />;`,
    ],
  },
  {
    library: 'next-i18next',
    form: 'useTranslation(ns)',
    source: [
      `import { useTranslation } from 'next-i18next';`,
      `const { t } = useTranslation('home');`,
      `t('hero.title');`,
    ],
  },
  // next-intl / use-intl
  {
    library: 'next-intl',
    form: 'useTranslations(ns)',
    source: [
      `import { useTranslations } from 'next-intl';`,
      `const t = useTranslations('home');`,
      `t('hero.title');`,
    ],
  },
  {
    library: 'next-intl',
    form: 'nested namespace',
    source: [
      `import { useTranslations } from 'next-intl';`,
      `const t = useTranslations('home.hero');`,
      `t('title');`,
    ],
  },
  {
    library: 'next-intl',
    form: 'useTranslations() root scope',
    source: [
      `import { useTranslations } from 'next-intl';`,
      `const t = useTranslations();`,
      `t('home.hero.title');`,
    ],
  },
  {
    library: 'next-intl',
    form: 'getTranslations(ns)',
    source: [
      `import { getTranslations } from 'next-intl/server';`,
      `const t = await getTranslations('home');`,
      `t('hero.title');`,
    ],
  },
  {
    library: 'next-intl',
    form: 'getTranslations({ namespace })',
    source: [
      `import { getTranslations } from 'next-intl/server';`,
      `const t = await getTranslations({ locale, namespace: 'home' });`,
      `t('hero.title');`,
    ],
  },
  {
    library: 'next-intl',
    form: 't.rich',
    source: [
      `import { useTranslations } from 'next-intl';`,
      `const t = useTranslations('home');`,
      `t.rich('hero.title', { strong: (chunks) => chunks });`,
    ],
  },
  {
    library: 'use-intl',
    form: 'useTranslations(ns)',
    source: [
      `import { useTranslations } from 'use-intl';`,
      `const t = useTranslations('home');`,
      `t('hero.title');`,
    ],
  },
  {
    library: 'use-intl',
    form: 'createTranslator({ namespace })',
    source: [
      `import { createTranslator } from 'use-intl/core';`,
      `const t = createTranslator({ locale, messages, namespace: 'home' });`,
      `t('hero.title');`,
    ],
  },
  // react-intl
  {
    library: 'react-intl',
    form: 'intl.formatMessage',
    source: [
      `import { useIntl } from 'react-intl';`,
      `const intl = useIntl();`,
      `intl.formatMessage({ id: 'home.hero.title' });`,
    ],
  },
  {
    library: 'react-intl',
    form: 'destructured formatMessage',
    source: [
      `import { useIntl } from 'react-intl';`,
      `const { formatMessage } = useIntl();`,
      `formatMessage({ id: 'home.hero.title' });`,
    ],
  },
  {
    library: 'react-intl',
    form: '<FormattedMessage id>',
    source: [
      `import { FormattedMessage } from 'react-intl';`,
      `const element = <FormattedMessage id="home.hero.title" />;`,
    ],
  },
  // lingui
  {
    library: 'lingui',
    form: 'i18n._(id)',
    source: [
      `import { useLingui } from '@lingui/react';`,
      `const { i18n } = useLingui();`,
      `i18n._('home.hero.title');`,
    ],
  },
  {
    library: 'lingui',
    form: 'i18n._({ id })',
    source: [
      `import { i18n } from '@lingui/core';`,
      `i18n._({ id: 'home.hero.title', message: 'Title' });`,
    ],
  },
  {
    library: 'lingui',
    form: 'macro t(id)',
    source: [
      `import { t } from '@lingui/core/macro';`,
      `t('home.hero.title');`,
    ],
  },
  {
    library: 'lingui',
    form: '<Trans id>',
    source: [
      `import { Trans } from '@lingui/react';`,
      `const element = <Trans id="home.hero.title" message="Title" />;`,
    ],
  },
  // vue-i18n / @nuxtjs/i18n
  {
    library: 'vue-i18n',
    form: 'useI18n({ namespace })',
    source: [
      `import { useI18n } from 'vue-i18n';`,
      `const { t } = useI18n({ namespace: 'home' });`,
      `t('hero.title');`,
    ],
  },
  {
    library: 'vue-i18n',
    form: 'useI18n() root scope',
    source: [
      `import { useI18n } from 'vue-i18n';`,
      `const { t } = useI18n();`,
      `t('home.hero.title');`,
    ],
  },
  {
    library: 'vue-i18n',
    form: 'global $t',
    source: [`this.$t('home.hero.title');`],
  },
  {
    library: 'vue-i18n',
    form: 'i18n.global.t',
    source: [
      `import { createI18n } from 'vue-i18n';`,
      `const i18n = createI18n({});`,
      `i18n.global.t('home.hero.title');`,
    ],
  },
  {
    library: '@nuxtjs/i18n',
    form: 'useI18n() from #imports',
    source: [
      `import { useI18n } from '#imports';`,
      `const { t } = useI18n();`,
      `t('home.hero.title');`,
    ],
  },
  {
    library: '@nuxtjs/i18n',
    form: 'auto-imported useI18n()',
    source: [`const { t } = useI18n();`, `t('home.hero.title');`],
  },
  // svelte-i18n
  ...['_', 't', 'format'].map((storeName) => ({
    library: 'svelte-i18n',
    form: `$${storeName}(id)`,
    source: [
      `import { ${storeName} } from 'svelte-i18n';`,
      `const label = $${storeName}('home.hero.title');`,
    ],
  })),
  {
    library: 'svelte-i18n',
    form: '$_({ id })',
    source: [
      `import { _ } from 'svelte-i18n';`,
      `const label = $_({ id: 'home.hero.title' });`,
    ],
  },
  // @ngx-translate/core
  ...['instant', 'get', 'stream'].map((methodName) => ({
    library: '@ngx-translate/core',
    form: `translate.${methodName}`,
    source: [
      `import { TranslateService } from '@ngx-translate/core';`,
      `this.translate.${methodName}('home.hero.title');`,
    ],
  })),
  {
    library: '@ngx-translate/core',
    form: 'translate pipe',
    source: [`<h1>{{ 'home.hero.title' | translate }}</h1>`],
  },
  {
    library: '@ngx-translate/core',
    form: 'translate pipe with params',
    source: [`<p>{{ "home.hero.title" | translate: { name: user } }}</p>`],
  },
];

describe('compat library coverage', () => {
  it.each(COMPAT_CASES)('$library — $form', ({ source }) => {
    const usages = collectMessageUsages(source.join('\n')).filter(
      (usage) => usage.kind !== 'namespace'
    );

    expect(
      usages.map((usage) => [usage.dictionaryKey, usage.fieldPath.join('.')])
    ).toContainEqual(['home', 'hero.title']);
  });
});
