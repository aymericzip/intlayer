import type { Dictionary } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { t } from '../transpiler';
import { insertContentInDictionary } from './insertContentInDictionary';

describe('insertContentInDictionary', () => {
  describe('Deep merge without locale', () => {
    it('should merge simple content into dictionary', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: {
          title: t({ en: 'Original Title', fr: 'Titre Original' }),
        },
      };

      const newContent = {
        description: 'New Description',
      };

      const result = insertContentInDictionary(dictionary, newContent);

      expect(result.key).toBe('test');
      expect(result.content).toHaveProperty('title');
      expect(result.content).toHaveProperty('description');
    });

    it('should overwrite existing keys with new content', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: {
          title: t({ en: 'Original Title', fr: 'Titre Original' }),
        },
      };

      const newContent = {
        title: t({ en: 'New Title', fr: 'Nouveau Titre' }),
      };

      const result = insertContentInDictionary(dictionary, newContent);

      expect(result.content.title).toEqual(newContent.title);
    });

    it('should handle nested objects', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: {
          section: {
            title: t({ en: 'Section Title', fr: 'Titre de Section' }),
          },
        },
      };

      const newContent = {
        section: {
          description: 'Section Description',
        },
      };

      const result = insertContentInDictionary(dictionary, newContent);

      expect(result.content.section).toHaveProperty('title');
      expect(result.content.section).toHaveProperty('description');
    });

    it('should handle deeply nested objects', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: {
          level1: {
            level2: {
              level3: t({ en: 'Deep Value', fr: 'Valeur Profonde' }),
            },
          },
        },
      };

      const newContent = {
        level1: {
          level2: {
            newLevel3: 'New Deep Value',
          },
        },
      };

      const result = insertContentInDictionary(dictionary, newContent);

      expect(result.content.level1.level2).toHaveProperty('level3');
      expect(result.content.level1.level2).toHaveProperty('newLevel3');
    });

    it('should handle arrays', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: {
          items: [
            t({ en: 'Item 1', fr: 'Article 1' }),
            t({ en: 'Item 2', fr: 'Article 2' }),
          ],
        },
      };

      const newContent = {
        items: [
          t({ en: 'Updated Item 1', fr: 'Article 1 Mis à Jour' }),
          t({ en: 'Updated Item 2', fr: 'Article 2 Mis à Jour' }),
          t({ en: 'Item 3', fr: 'Article 3' }),
        ],
      };

      const result = insertContentInDictionary(dictionary, newContent);

      expect(result.content.items).toHaveLength(3);
    });

    it('should merge translation nodes from different sources', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: {
          title: t({ en: 'Title', fr: 'Titre' }),
        },
      };

      const newContent = {
        title: t({ es: 'Título', de: 'Titel' }),
      };

      const result = insertContentInDictionary(dictionary, newContent);

      expect(result.content.title).toHaveProperty('nodeType', 'translation');
      expect(result.content.title.translation).toHaveProperty('en');
      expect(result.content.title.translation).toHaveProperty('fr');
      expect(result.content.title.translation).toHaveProperty('es');
      expect(result.content.title.translation).toHaveProperty('de');
    });
  });

  describe('Deep merge with locale', () => {
    it('should insert content for specific locale in translation node', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: {
          title: t({
            en: 'In this page',
            fr: 'Dans cette page',
            es: 'En esta página',
          }),
        },
      };

      const newContent = {
        title: 'このページ',
      };

      const result = insertContentInDictionary(dictionary, newContent, 'ja');

      expect(result.content.title.translation).toHaveProperty(
        'en',
        'In this page'
      );
      expect(result.content.title.translation).toHaveProperty(
        'fr',
        'Dans cette page'
      );
      expect(result.content.title.translation).toHaveProperty(
        'es',
        'En esta página'
      );
      expect(result.content.title.translation).toHaveProperty(
        'ja',
        'このページ'
      );
    });

    it('should update existing locale content', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: {
          title: t({
            en: 'Old English',
            fr: 'Old French',
            ja: 'Old Japanese',
          }),
        },
      };

      const newContent = {
        title: 'New Japanese',
      };

      const result = insertContentInDictionary(dictionary, newContent, 'ja');

      expect(result.content.title.translation).toHaveProperty(
        'en',
        'Old English'
      );
      expect(result.content.title.translation).toHaveProperty(
        'fr',
        'Old French'
      );
      expect(result.content.title.translation).toHaveProperty(
        'ja',
        'New Japanese'
      );
    });

    it('should handle nested content with locale', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: {
          section: {
            title: t({
              en: 'Section Title',
              fr: 'Titre de Section',
            }),
            description: t({
              en: 'Section Description',
              fr: 'Description de Section',
            }),
          },
        },
      };

      const newContent = {
        section: {
          title: 'セクションタイトル',
          description: 'セクション説明',
        },
      };

      const result = insertContentInDictionary(dictionary, newContent, 'ja');

      expect(result.content.section.title.translation).toHaveProperty(
        'ja',
        'セクションタイトル'
      );
      expect(result.content.section.description.translation).toHaveProperty(
        'ja',
        'セクション説明'
      );
    });

    it('should create new key with locale-wrapped translation when key is missing', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: {
          title: t({ en: 'Title', fr: 'Titre' }),
        },
      };

      const newContent = {
        description: 'New Description',
      };

      const result = insertContentInDictionary(dictionary, newContent, 'ja');

      expect(result.content).toHaveProperty('title');
      expect(result.content).toHaveProperty('description');
      expect(result.content.description).toHaveProperty(
        'nodeType',
        'translation'
      );
      expect(result.content.description.translation).toHaveProperty(
        'ja',
        'New Description'
      );
    });

    it('should handle object content within translation node for specific locale', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: {
          button: t({
            en: { label: 'Click Me', aria: 'Button' },
            fr: { label: 'Cliquez Moi', aria: 'Bouton' },
          }),
        },
      };

      const newContent = {
        button: {
          label: 'クリックしてください',
        },
      };

      const result = insertContentInDictionary(dictionary, newContent, 'ja');

      expect(result.content.button.translation.en).toEqual({
        label: 'Click Me',
        aria: 'Button',
      });
      expect(result.content.button.translation.fr).toEqual({
        label: 'Cliquez Moi',
        aria: 'Bouton',
      });
      expect(result.content.button.translation.ja).toEqual({
        label: 'クリックしてください',
      });
    });

    it('should deep merge object content within translation node for specific locale', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: {
          button: t({
            en: {
              label: 'Click Me',
              aria: 'Button',
              tooltip: 'Click this button',
            },
            fr: {
              label: 'Cliquez Moi',
              aria: 'Bouton',
              tooltip: 'Cliquez sur ce bouton',
            },
            ja: {
              label: '古いラベル',
              aria: 'ボタン',
              tooltip: '古いツールチップ',
            },
          }),
        },
      };

      const newContent = {
        button: {
          label: '新しいラベル',
        },
      };

      const result = insertContentInDictionary(dictionary, newContent, 'ja');

      expect(result.content.button.translation.ja).toEqual({
        label: '新しいラベル',
        aria: 'ボタン',
        tooltip: '古いツールチップ',
      });
    });

    it('should handle translations of arrays within locale-specific content', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: {
          items: t({
            en: ['Item 1', 'Item 2'],
            fr: ['Article 1', 'Article 2'],
          }),
        },
      };

      const newContent = {
        items: ['アイテム 1', 'アイテム 2', 'アイテム 3'],
      };

      const result = insertContentInDictionary(dictionary, newContent, 'ja');

      expect(result.content.items.translation.ja).toEqual([
        'アイテム 1',
        'アイテム 2',
        'アイテム 3',
      ]);
      expect(result.content.items.translation.en).toEqual(['Item 1', 'Item 2']);
    });

    it('should handle arrays of translations within locale-specific content', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: {
          items: [
            t({
              en: 'Item 1',
              fr: 'Article 1',
            }),
            t({
              en: 'Item 2',
              fr: 'Article 2',
            }),
          ],
        },
      };

      const newContent = {
        items: ['アイテム 1', 'アイテム 2', 'アイテム 3'],
      };

      const result = insertContentInDictionary(dictionary, newContent, 'ja');

      expect(result.content.items[0].translation.en).toEqual('Item 1');
      expect(result.content.items[1].translation.en).toEqual('Item 2');
      expect(result.content.items[0].translation.ja).toEqual('アイテム 1');
      expect(result.content.items[1].translation.ja).toEqual('アイテム 2');
    });

    it('should handle append arrays of translations within locale-specific content', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: {
          test: {
            items: [
              t({
                en: 'Item 1',
                fr: 'Article 1',
              }),
            ],
          },
        },
      };

      const newContent = {
        test: {
          items: ['عنصر 1'],
        },
      };

      const result = insertContentInDictionary(dictionary, newContent, 'ar');

      expect(Object.keys(result.content.test.items[0].translation)).toEqual([
        'en',
        'fr',
        'ar',
      ]);
    });
  });

  describe('Complex scenarios', () => {
    it('should handle the example from comments - without locale', () => {
      const dictionary: Dictionary = {
        key: 'aside-navigation',
        content: {
          title: t({
            ar: 'في هذه الصفحة',
            de: 'Auf dieser Seite',
            en: 'In this page',
            'en-GB': 'On this page',
            es: 'En esta página',
            fr: 'Dans cette page',
            hi: 'इस पृष्ठ में',
            it: 'In questa pagina',
            ko: '이 페이지에서',
            pt: 'Nesta página',
            ru: 'На этой странице',
            tr: 'Bu sayfada',
            zh: '在此页面',
          }),
          linkLabel: t({
            ar: 'اذهب إلى القسم',
            de: 'Gehe zur Sektion',
            en: 'Go to section',
            'en-GB': 'Go to section',
            es: 'Ir a la sección',
            fr: 'Aller à la section',
            hi: 'सेक्शन पर जाएं',
            it: 'Vai alla sezione',
            ja: 'セクションへ行く',
            ko: '섹션으로 이동',
            pt: 'Ir para a seção',
            ru: 'Перейти к разделу',
            tr: 'Bölüme git',
            zh: '转到节',
          }),
          collapseButton: {
            label: t({
              en: 'Collapse',
              fr: 'Réduire',
              es: 'Colapsar',
              'en-GB': 'Collapse',
              de: 'Zuklappen',
              ja: '折りたたむ',
              ko: '접기',
              zh: '折叠',
              it: 'Comprimi',
              pt: 'Recolher',
              hi: 'संकुचित करें',
              ar: 'اطوي التوسيع',
              ru: 'Свернуть',
              tr: 'Daralt',
            }),
          },
        },
      };

      const newContent = {
        title: 'このページ',
        linkLabel: 'セクションへ移動',
        collapseButton: { label: '折りたたむ' },
      };

      const result = insertContentInDictionary(dictionary, newContent);

      expect(result.key).toBe('aside-navigation');
      expect(result.content).toHaveProperty('title');
      expect(result.content).toHaveProperty('linkLabel');
      expect(result.content.collapseButton).toHaveProperty('label');
    });

    it('should handle the example from comments - with locale', () => {
      const dictionary: Dictionary = {
        key: 'aside-navigation',
        content: {
          title: t({
            ar: 'في هذه الصفحة',
            de: 'Auf dieser Seite',
            en: 'In this page',
            'en-GB': 'On this page',
            es: 'En esta página',
            fr: 'Dans cette page',
            hi: 'इस पृष्ठ में',
            it: 'In questa pagina',
            ko: '이 페이지에서',
            pt: 'Nesta página',
            ru: 'На этой странице',
            tr: 'Bu sayfada',
            zh: '在此页面',
          }),
          linkLabel: t({
            ar: 'اذهب إلى القسم',
            de: 'Gehe zur Sektion',
            en: 'Go to section',
            'en-GB': 'Go to section',
            es: 'Ir a la sección',
            fr: 'Aller à la section',
            hi: 'सेक्शन पर जाएं',
            it: 'Vai alla sezione',
            ja: 'セクションへ行く',
            ko: '섹션으로 이동',
            pt: 'Ir para a seção',
            ru: 'Перейти к разделу',
            tr: 'Bölüme git',
            zh: '转到节',
          }),
          collapseButton: {
            label: t({
              en: 'Collapse',
              fr: 'Réduire',
              es: 'Colapsar',
              'en-GB': 'Collapse',
              de: 'Zuklappen',
              ja: '折りたたむ',
              ko: '접기',
              zh: '折叠',
              it: 'Comprimi',
              pt: 'Recolher',
              hi: 'संकुचित करें',
              ar: 'اطوي التوسيع',
              ru: 'Свернуть',
              tr: 'Daralt',
            }),
          },
        },
      };

      const newContent = {
        title: 'このページ',
        linkLabel: 'セクションへ移動',
        collapseButton: { label: '折りたたむ' },
      };

      const result = insertContentInDictionary(dictionary, newContent, 'ja');

      expect(result.key).toBe('aside-navigation');
      expect(result.content.title.translation).toHaveProperty(
        'ja',
        'このページ'
      );
      expect(result.content.linkLabel.translation).toHaveProperty(
        'ja',
        'セクションへ移動'
      );
      expect(result.content.collapseButton.label.translation).toHaveProperty(
        'ja',
        '折りたたむ'
      );
      // Ensure other locales are preserved
      expect(result.content.title.translation).toHaveProperty(
        'en',
        'In this page'
      );
      expect(result.content.title.translation).toHaveProperty(
        'fr',
        'Dans cette page'
      );
    });

    it('should handle mixed content types', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: {
          stringValue: 'Simple String',
          translationNode: t({ en: 'English', fr: 'French' }),
          nested: {
            deepValue: t({ en: 'Deep English', fr: 'Deep French' }),
          },
          arrayValue: ['item1', 'item2'],
        },
      };

      const newContent = {
        newStringValue: 'New String',
        nested: {
          newDeepValue: 'New Deep Value',
        },
      };

      const result = insertContentInDictionary(dictionary, newContent, 'ja');

      expect(result.content).toHaveProperty('stringValue');
      expect(result.content).toHaveProperty('translationNode');
      expect(result.content).toHaveProperty('newStringValue');
      expect(result.content.nested).toHaveProperty('deepValue');
      expect(result.content.nested).toHaveProperty('newDeepValue');
      expect(result.content.newStringValue.translation).toHaveProperty(
        'ja',
        'New String'
      );
    });

    it('should preserve dictionary metadata', () => {
      const dictionary: Dictionary = {
        key: 'test-key',
        content: {
          title: t({ en: 'Title', fr: 'Titre' }),
        },
        filePath: 'test/path.ts',
      };

      const newContent = {
        description: 'Description',
      };

      const result = insertContentInDictionary(dictionary, newContent);

      expect(result.key).toBe('test-key');
      expect(result.filePath).toBe('test/path.ts');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty content', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: {},
      };

      const newContent = {
        title: 'New Title',
      };

      const result = insertContentInDictionary(dictionary, newContent);

      expect(result.content).toHaveProperty('title');
    });

    it('should handle null values gracefully', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: {
          title: t({ en: 'Title' }),
        },
      };

      const newContent = {
        description: null,
      };

      const result = insertContentInDictionary(dictionary, newContent as any);

      expect(result.content).toHaveProperty('title');
      expect(result.content.description).toBeNull();
    });

    it('should handle undefined values gracefully', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: {
          title: t({ en: 'Title' }),
        },
      };

      const newContent = {
        description: undefined,
      };

      const result = insertContentInDictionary(dictionary, newContent as any);

      expect(result.content).toHaveProperty('title');
    });

    it('should handle empty arrays', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: {
          items: [],
        },
      };

      const newContent = {
        items: ['new item'],
      };

      const result = insertContentInDictionary(dictionary, newContent);

      expect(result.content.items).toHaveLength(1);
    });

    it('should handle deeply nested arrays', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: {
          matrix: [
            [t({ en: 'A1', fr: 'A1' }), t({ en: 'A2', fr: 'A2' })],
            [t({ en: 'B1', fr: 'B1' }), t({ en: 'B2', fr: 'B2' })],
          ],
        },
      };

      const newContent = {
        matrix: [
          [
            t({ en: 'New A1', fr: 'Nouveau A1' }),
            t({ en: 'New A2', fr: 'Nouveau A2' }),
          ],
        ],
      };

      const result = insertContentInDictionary(dictionary, newContent);

      expect(result.content.matrix).toHaveLength(1);
      expect(result.content.matrix[0]).toHaveLength(2);
    });

    it('should not mutate original dictionary', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: {
          title: t({ en: 'Original', fr: 'Original' }),
        },
      };

      const originalTitle = dictionary.content.title;
      const newContent = {
        title: t({ en: 'New', fr: 'Nouveau' }),
      };

      insertContentInDictionary(dictionary, newContent);

      // Original should remain unchanged
      expect(dictionary.content.title).toBe(originalTitle);
    });
  });

  describe('Different dictionary formats', () => {
    it('should handle object-based translation format', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: t({
          en: { title: 'In this page' },
          ja: { title: 'このページ' },
        }),
      };

      const newContent = {
        subtitle: 'New subtitle',
      };

      const result = insertContentInDictionary(dictionary, newContent, 'en');

      expect(result.content.translation.en).toHaveProperty(
        'title',
        'In this page'
      );
      expect(result.content.translation.en).toHaveProperty(
        'subtitle',
        'New subtitle'
      );
    });

    it('should handle string-based translation format', () => {
      const dictionary: Dictionary = {
        key: 'test',
        content: {
          title: t({ en: 'In this page', ja: 'このページ' }),
        },
      };

      const newContent = {
        title: 'Updated page',
      };

      const result = insertContentInDictionary(dictionary, newContent, 'fr');

      expect(result.content.title.translation).toHaveProperty(
        'en',
        'In this page'
      );
      expect(result.content.title.translation).toHaveProperty(
        'ja',
        'このページ'
      );
      expect(result.content.title.translation).toHaveProperty(
        'fr',
        'Updated page'
      );
    });
  });
});
