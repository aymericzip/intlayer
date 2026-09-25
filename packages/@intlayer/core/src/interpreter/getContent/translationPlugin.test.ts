import { describe, expect, it } from 'vitest';
import { t } from '../../transpiler';
import { deepTransformNode } from './deepTransform';
import { type NodeProps, type Plugins, translationPlugin } from './plugins';

const nodeProps: NodeProps = {
  dictionaryKey: 'test',
  keyPath: [],
};

/** Records every string leaf the transform visits. */
const createLeafRecorder = () => {
  const visitedLeaves: string[] = [];
  const recorderPlugin: Plugins = {
    id: 'leaf-recorder',
    canHandle: (node) => typeof node === 'string',
    transform: (node: string) => {
      visitedLeaves.push(node);
      return node;
    },
  };

  return { visitedLeaves, recorderPlugin };
};

const transform = (
  node: unknown,
  locale: string,
  fallback?: string,
  extraPlugins: Plugins[] = []
) =>
  deepTransformNode(node, {
    ...nodeProps,
    plugins: [translationPlugin(locale, fallback), ...extraPlugins],
  });

describe('translationPlugin', () => {
  const content = t({
    en: { title: 'Title', subtitle: 'Subtitle', nested: { label: 'Label' } },
    fr: { title: 'Titre', nested: {} },
    de: {
      title: 'Titel',
      subtitle: 'Untertitel',
      nested: { label: 'Etikett' },
    },
    es: {
      title: 'Título',
      subtitle: 'Subtítulo',
      nested: { label: 'Etiqueta' },
    },
  });

  it('should resolve the requested locale', () => {
    expect(transform(content, 'de', 'en')).toEqual({
      title: 'Titel',
      subtitle: 'Untertitel',
      nested: { label: 'Etikett' },
    });
  });

  it('should complement missing keys from the fallback locale', () => {
    expect(transform(content, 'fr', 'en')).toEqual({
      title: 'Titre',
      subtitle: 'Subtitle',
      nested: { label: 'Label' },
    });
  });

  it('should resolve a regional locale through its base language', () => {
    expect(transform(t({ en: 'Hello', fr: 'Bonjour' }), 'fr-CA', 'en')).toBe(
      'Bonjour'
    );
  });

  it('should not transform locales that cannot be displayed', () => {
    const { visitedLeaves, recorderPlugin } = createLeafRecorder();

    const result = transform(content, 'de', 'en', [recorderPlugin]);
    JSON.stringify(result);

    expect(visitedLeaves).toEqual(['Titel', 'Untertitel', 'Etikett']);
  });

  it('should only transform the fallback leaves the locale is missing', () => {
    const { visitedLeaves, recorderPlugin } = createLeafRecorder();

    const result = transform(content, 'fr', 'en', [recorderPlugin]);
    JSON.stringify(result);

    expect(visitedLeaves.sort()).toEqual(['Label', 'Subtitle', 'Titre']);
  });

  it('should not transform the fallback when the locale is complete', () => {
    const { visitedLeaves, recorderPlugin } = createLeafRecorder();

    const result = transform(content, 'de', 'en', [recorderPlugin]);
    JSON.stringify(result);

    expect(visitedLeaves).not.toContain('Title');
  });

  it('should still merge nested translations of a complete locale', () => {
    const nestedContent = t({
      en: { section: t({ en: { a: 'A', b: 'B' } }) },
      fr: { section: t({ fr: { a: 'A-fr' } }) },
    });

    expect(transform(nestedContent, 'fr', 'en')).toEqual({
      section: { a: 'A-fr', b: 'B' },
    });
  });

  it('should not transform the fallback when the locale value is final', () => {
    const { visitedLeaves, recorderPlugin } = createLeafRecorder();

    transform(t({ en: 'Hello', fr: 'Bonjour' }), 'fr', 'en', [recorderPlugin]);

    expect(visitedLeaves).toEqual(['Bonjour']);
  });

  it('should defer the fallback merge until a key is read', () => {
    const { visitedLeaves, recorderPlugin } = createLeafRecorder();

    const result = transform(content, 'fr', 'en', [recorderPlugin]);

    expect(visitedLeaves).toEqual([]);
    expect(result.subtitle).toBe('Subtitle');
    expect(visitedLeaves).toEqual(['Subtitle']);
  });
});
