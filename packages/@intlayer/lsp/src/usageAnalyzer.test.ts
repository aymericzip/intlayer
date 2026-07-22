import { describe, expect, it } from 'vitest';
import { findKeyAtOffset } from './findKeyAtOffset';
import {
  collectMessageUsages,
  collectNamespaceReferences,
  findMessageUsageAtOffset,
} from './usageAnalyzer';

/** Offset of the first occurrence of `search` in `text` (+ optional shift). */
const offsetOf = (text: string, search: string, shift = 0): number => {
  const index = text.indexOf(search);

  if (index === -1) throw new Error(`"${search}" not found in test source`);

  return index + shift;
};

// ---------------------------------------------------------------------------
// Base intlayer
// ---------------------------------------------------------------------------

describe('base intlayer usages', () => {
  it('resolves a member chain from useIntlayer', () => {
    const text = [
      `const content = useIntlayer('home');`,
      `console.log(content.section.title);`,
    ].join('\n');

    const usage = findMessageUsageAtOffset(text, offsetOf(text, 'title);'));

    expect(usage).toMatchObject({
      dictionaryKey: 'home',
      fieldPath: ['section', 'title'],
      kind: 'member',
      library: 'intlayer',
    });
  });

  it('trims the member chain to the segment under the cursor', () => {
    const text = [
      `const content = useIntlayer('home');`,
      `console.log(content.section.title);`,
    ].join('\n');

    const usage = findMessageUsageAtOffset(text, offsetOf(text, 'section.'));

    expect(usage?.fieldPath).toEqual(['section']);
  });

  it('skips framework accessor properties (.value)', () => {
    const text = [
      `const content = useIntlayer('home');`,
      `console.log(content.value.title.value);`,
    ].join('\n');

    const usage = findMessageUsageAtOffset(text, offsetOf(text, 'title.value'));

    expect(usage?.fieldPath).toEqual(['title']);
  });

  it('resolves nested destructures', () => {
    const text = `const { searchInput: { text: alias } } = useIntlayer('panel');`;

    const usage = findMessageUsageAtOffset(text, offsetOf(text, 'text:'));

    expect(usage).toMatchObject({
      dictionaryKey: 'panel',
      fieldPath: ['searchInput', 'text'],
      kind: 'destructure',
    });
  });

  it('scopes same-named bindings to their own component', () => {
    const text = [
      `const Page = () => {`,
      `  const content = useIntlayer('benchmark');`,
      `  return <p>{content.first}</p>;`,
      `};`,
      `const App = () => {`,
      `  const content = useIntlayer('app');`,
      `  return <p>{content.second}</p>;`,
      `};`,
    ].join('\n');

    const usages = collectMessageUsages(text).filter(
      (usage) => usage.kind === 'member'
    );

    expect(usages).toMatchObject([
      { dictionaryKey: 'benchmark', fieldPath: ['first'] },
      { dictionaryKey: 'app', fieldPath: ['second'] },
    ]);
  });

  it('resolves an outer binding from a nested scope', () => {
    const text = [
      `const content = useIntlayer('home');`,
      `const Item = () => <p>{content.title}</p>;`,
    ].join('\n');

    const usage = findMessageUsageAtOffset(text, offsetOf(text, 'title}'));

    expect(usage).toMatchObject({
      dictionaryKey: 'home',
      fieldPath: ['title'],
    });
  });

  it('scopes same-named translator bindings to their own component', () => {
    const text = [
      `import { useTranslations } from 'next-intl';`,
      `const Page = () => {`,
      `  const t = useTranslations('benchmark');`,
      `  return t('first');`,
      `};`,
      `const App = () => {`,
      `  const t = useTranslations('app');`,
      `  return t('second');`,
      `};`,
    ].join('\n');

    const usages = collectMessageUsages(text).filter(
      (usage) => usage.kind === 'call'
    );

    expect(usages).toMatchObject([
      { dictionaryKey: 'benchmark', fieldPath: ['first'] },
      { dictionaryKey: 'app', fieldPath: ['second'] },
    ]);
  });

  it('resolves Svelte store references ($content)', () => {
    const text = [
      `const content = useIntlayer('home');`,
      `const label = $content.title;`,
    ].join('\n');

    const usage = findMessageUsageAtOffset(text, offsetOf(text, 'title;'));

    expect(usage).toMatchObject({
      dictionaryKey: 'home',
      fieldPath: ['title'],
    });
  });
});

// ---------------------------------------------------------------------------
// react-i18next / next-i18next
// ---------------------------------------------------------------------------

describe('react-i18next usages', () => {
  it('resolves t() from a destructured useTranslation', () => {
    const text = [
      `const { t } = useTranslation('about');`,
      `t('counter.label');`,
    ].join('\n');

    const usage = findMessageUsageAtOffset(
      text,
      offsetOf(text, `'counter.label'`)
    );

    expect(usage).toMatchObject({
      dictionaryKey: 'about',
      fieldPath: ['counter', 'label'],
      kind: 'call',
      library: 'react-i18next',
    });
  });

  it('resolves an aliased t ({ t: translate })', () => {
    const text = [
      `const { t: translate } = useTranslation('about');`,
      `translate('title');`,
    ].join('\n');

    const usage = findMessageUsageAtOffset(text, offsetOf(text, `'title'`));

    expect(usage).toMatchObject({
      dictionaryKey: 'about',
      fieldPath: ['title'],
    });
  });

  it('applies the keyPrefix option', () => {
    const text = [
      `const { t } = useTranslation('about', { keyPrefix: 'counter' });`,
      `t('label');`,
    ].join('\n');

    const usage = findMessageUsageAtOffset(text, offsetOf(text, `'label'`));

    expect(usage?.fieldPath).toEqual(['counter', 'label']);
  });

  it('handles i18next ns:key overrides', () => {
    const text = [
      `const { t } = useTranslation('about');`,
      `t('home:title');`,
    ].join('\n');

    const usage = findMessageUsageAtOffset(
      text,
      offsetOf(text, `'home:title'`)
    );

    expect(usage).toMatchObject({
      dictionaryKey: 'home',
      fieldPath: ['title'],
    });
  });

  it('resolves <Trans ns i18nKey>', () => {
    const text = `const node = <Trans ns="about" i18nKey="richText" />;`;

    const usage = findMessageUsageAtOffset(text, offsetOf(text, 'richText'));

    expect(usage).toMatchObject({
      dictionaryKey: 'about',
      fieldPath: ['richText'],
      kind: 'jsx',
    });
  });

  it('falls back to the single translator namespace for <Trans i18nKey>', () => {
    const text = [
      `const { t } = useTranslation('about');`,
      `const node = <Trans i18nKey="richText" />;`,
    ].join('\n');

    const usage = findMessageUsageAtOffset(text, offsetOf(text, 'richText'));

    expect(usage).toMatchObject({
      dictionaryKey: 'about',
      fieldPath: ['richText'],
    });
  });
});

// ---------------------------------------------------------------------------
// i18next getFixedT
// ---------------------------------------------------------------------------

describe('i18next getFixedT usages', () => {
  it('resolves t() from an awaited method call with keyPrefix', () => {
    const text = [
      `const t = await i18n.getFixedT('en', 'home', 'hero');`,
      `t('title');`,
    ].join('\n');

    const usage = findMessageUsageAtOffset(text, offsetOf(text, `'title'`));

    expect(usage).toMatchObject({
      dictionaryKey: 'home',
      fieldPath: ['hero', 'title'],
      library: 'i18next',
    });
  });

  it('findKeyAtOffset targets the namespace argument, not the locale', () => {
    const text = `const t = i18n.getFixedT('en', 'home');`;

    expect(findKeyAtOffset(text, offsetOf(text, `'home'`, 2))).toBe('home');
    expect(findKeyAtOffset(text, offsetOf(text, `'en'`, 1))).toBeNull();
    expect(findKeyAtOffset(text, offsetOf(text, 'getFixedT'))).toBe('home');
  });
});

// ---------------------------------------------------------------------------
// next-intl / use-intl
// ---------------------------------------------------------------------------

describe('next-intl usages', () => {
  it('resolves t() from useTranslations', () => {
    const text = [
      `const t = useTranslations('about');`,
      `t('counter.label');`,
    ].join('\n');

    const usage = findMessageUsageAtOffset(
      text,
      offsetOf(text, `'counter.label'`)
    );

    expect(usage).toMatchObject({
      dictionaryKey: 'about',
      fieldPath: ['counter', 'label'],
    });
  });

  it('resolves getTranslations({ namespace })', () => {
    const text = [
      `const t = await getTranslations({ locale, namespace: 'about' });`,
      `t('title');`,
    ].join('\n');

    const usage = findMessageUsageAtOffset(text, offsetOf(text, `'title'`));

    expect(usage).toMatchObject({
      dictionaryKey: 'about',
      fieldPath: ['title'],
    });

    expect(findKeyAtOffset(text, offsetOf(text, `'about'`, 2))).toBe('about');
  });

  it('splits nested namespaces (useTranslations("about.counter"))', () => {
    const text = [
      `const t = useTranslations('about.counter');`,
      `t('label');`,
    ].join('\n');

    const usage = findMessageUsageAtOffset(text, offsetOf(text, `'label'`));

    expect(usage).toMatchObject({
      dictionaryKey: 'about',
      fieldPath: ['counter', 'label'],
    });

    expect(findKeyAtOffset(text, offsetOf(text, `'about.counter'`, 2))).toBe(
      'about'
    );
  });

  it('resolves bare useTranslations() root scope from the id first segment', () => {
    const text = [
      `const t = useTranslations();`,
      `t('about.counter.label');`,
    ].join('\n');

    const usage = findMessageUsageAtOffset(
      text,
      offsetOf(text, `'about.counter.label'`)
    );

    expect(usage).toMatchObject({
      dictionaryKey: 'about',
      fieldPath: ['counter', 'label'],
    });
  });

  it('resolves createTranslator({ namespace })', () => {
    const text = [
      `const t = createTranslator({ locale: 'en', messages, namespace: 'about' });`,
      `t('title');`,
    ].join('\n');

    const usage = findMessageUsageAtOffset(text, offsetOf(text, `'title'`));

    expect(usage?.dictionaryKey).toBe('about');
  });
});

// ---------------------------------------------------------------------------
// vue-i18n
// ---------------------------------------------------------------------------

describe('vue-i18n usages', () => {
  it('resolves t() from useI18n({ namespace })', () => {
    const text = [
      `const { t } = useI18n({ namespace: 'about' });`,
      `t('counter.label');`,
    ].join('\n');

    const usage = findMessageUsageAtOffset(
      text,
      offsetOf(text, `'counter.label'`)
    );

    expect(usage).toMatchObject({
      dictionaryKey: 'about',
      fieldPath: ['counter', 'label'],
      library: 'vue-i18n',
    });
  });

  it('findKeyAtOffset resolves the namespace option value', () => {
    const text = `const { t } = useI18n({ namespace: 'about' });`;

    expect(findKeyAtOffset(text, offsetOf(text, `'about'`, 2))).toBe('about');
    expect(findKeyAtOffset(text, offsetOf(text, 'useI18n'))).toBe('about');
  });

  it('resolves bare useI18n() root scope from the id first segment', () => {
    const text = [`const { t } = useI18n();`, `t('footer.github');`].join('\n');

    const usage = findMessageUsageAtOffset(
      text,
      offsetOf(text, `'footer.github'`)
    );

    expect(usage).toMatchObject({
      dictionaryKey: 'footer',
      fieldPath: ['github'],
    });
  });
});

// ---------------------------------------------------------------------------
// react-intl
// ---------------------------------------------------------------------------

describe('react-intl usages', () => {
  it('resolves formatMessage({ id }) with path-first-segment', () => {
    const text = [
      `const intl = useIntl();`,
      `intl.formatMessage({ id: 'home.hero.title' });`,
    ].join('\n');

    const usage = findMessageUsageAtOffset(
      text,
      offsetOf(text, `'home.hero.title'`)
    );

    expect(usage).toMatchObject({
      dictionaryKey: 'home',
      fieldPath: ['hero', 'title'],
      kind: 'call',
      library: 'react-intl',
    });
  });

  it('resolves a destructured formatMessage identifier call', () => {
    const text = [
      `const { formatMessage } = useIntl();`,
      `formatMessage({ id: 'home.title' });`,
    ].join('\n');

    const usage = findMessageUsageAtOffset(
      text,
      offsetOf(text, `'home.title'`)
    );

    expect(usage).toMatchObject({
      dictionaryKey: 'home',
      fieldPath: ['title'],
    });
  });

  it('resolves <FormattedMessage id>', () => {
    const text = `const node = <FormattedMessage id="home.title" defaultMessage="Hi" />;`;

    const usage = findMessageUsageAtOffset(text, offsetOf(text, 'home.title'));

    expect(usage).toMatchObject({
      dictionaryKey: 'home',
      fieldPath: ['title'],
      kind: 'jsx',
    });
  });
});

// ---------------------------------------------------------------------------
// lingui
// ---------------------------------------------------------------------------

describe('lingui usages', () => {
  const linguiImport = `import { useLingui } from '@lingui/react';`;

  it('resolves i18n._("id") into the messages dictionary (flat key)', () => {
    const text = [linguiImport, `i18n._('results-table.bundleSize');`].join(
      '\n'
    );

    const usage = findMessageUsageAtOffset(
      text,
      offsetOf(text, `'results-table.bundleSize'`)
    );

    expect(usage).toMatchObject({
      dictionaryKey: 'messages',
      fieldPath: ['results-table.bundleSize'],
      library: 'lingui',
    });
  });

  it('resolves the destructured _ from useLingui', () => {
    const text = [
      linguiImport,
      `const { _ } = useLingui();`,
      `_('home.title');`,
    ].join('\n');

    const usage = findMessageUsageAtOffset(
      text,
      offsetOf(text, `'home.title'`)
    );

    expect(usage).toMatchObject({
      dictionaryKey: 'messages',
      fieldPath: ['home.title'],
    });
  });

  it('resolves the t tagged template with placeholders', () => {
    const text = [
      `import { t } from '@lingui/macro';`,
      // biome-ignore lint/suspicious/noTemplateCurlyInString: the lingui macro interpolation is the test subject
      'const label = t`Hello ${name}`;',
    ].join('\n');

    const usage = findMessageUsageAtOffset(text, offsetOf(text, 'Hello'));

    expect(usage).toMatchObject({
      dictionaryKey: 'messages',
      fieldPath: ['Hello {name}'],
      kind: 'tagged-template',
    });
  });

  it('resolves <Trans id> to the messages dictionary', () => {
    const text = [
      `import { Trans } from '@lingui/react';`,
      `const node = <Trans id="home.title" message="Welcome" />;`,
    ].join('\n');

    const usage = findMessageUsageAtOffset(text, offsetOf(text, 'home.title'));

    expect(usage).toMatchObject({
      dictionaryKey: 'messages',
      fieldPath: ['home.title'],
      kind: 'jsx',
    });
  });

  it('does NOT match t() without a lingui import (import gating)', () => {
    const text = [
      `import { helper } from './helper';`,
      `const label = t\`Hello\`;`,
      `i18n._('home.title');`,
    ].join('\n');

    expect(findMessageUsageAtOffset(text, offsetOf(text, 'Hello'))).toBeNull();
    expect(
      findMessageUsageAtOffset(text, offsetOf(text, `'home.title'`))
    ).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Namespace references (diagnostics feed)
// ---------------------------------------------------------------------------

describe('collectNamespaceReferences', () => {
  it('collects every caller with an addressable namespace', () => {
    const text = [
      `const content = useIntlayer('home');`,
      `const t = useTranslations('about');`,
      `const { t: vt } = useI18n({ namespace: 'panel' });`,
    ].join('\n');

    const references = collectNamespaceReferences(text);

    expect(references.map((reference) => reference.dictionaryKey)).toEqual([
      'home',
      'about',
      'panel',
    ]);
  });

  it('anchors the namespace span on the argument node', () => {
    const text = `useTranslations('about');`;
    const [reference] = collectNamespaceReferences(text);

    expect(text.slice(reference!.namespaceStart, reference!.namespaceEnd)).toBe(
      `'about'`
    );
  });
});

// ---------------------------------------------------------------------------
// collectMessageUsages — whole-file sweep
// ---------------------------------------------------------------------------

describe('collectMessageUsages', () => {
  it('collects mixed base + compat usages ordered by offset', () => {
    const text = [
      `const content = useIntlayer('home');`,
      `const t = useTranslations('about');`,
      `const title = content.title;`,
      `const label = t('counter.label');`,
    ].join('\n');

    const usages = collectMessageUsages(text).filter(
      (usage) => usage.kind !== 'namespace'
    );

    expect(usages).toHaveLength(2);
    expect(usages[0]).toMatchObject({
      dictionaryKey: 'home',
      fieldPath: ['title'],
      kind: 'member',
    });
    expect(usages[1]).toMatchObject({
      dictionaryKey: 'about',
      fieldPath: ['counter', 'label'],
      kind: 'call',
    });
  });

  it('records namespace usages for decoration anchors', () => {
    const text = `const content = useIntlayer('home');`;
    const usages = collectMessageUsages(text);

    expect(usages).toHaveLength(1);
    expect(usages[0]).toMatchObject({
      dictionaryKey: 'home',
      kind: 'namespace',
      callerName: 'useIntlayer',
    });
  });
});
