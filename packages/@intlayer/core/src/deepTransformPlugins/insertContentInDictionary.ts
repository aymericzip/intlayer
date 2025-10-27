import { type Dictionary, type LocalesValues, NodeType } from '@intlayer/types';

// {
//     {
//       title: 'このページ',
//       linkLabel: 'セクションへ移動',
//       collapseButton: { label: '折りたたむ' }
//     },
//   }
//   {
//     dictionary: {
//       key: 'aside-navigation',
//       content: {
//         title: {
//           nodeType: 'translation',
//           translation: {
//             ar: 'في هذه الصفحة',
//             de: 'Auf dieser Seite',
//             en: 'In this page',
//             'en-GB': 'On this page',
//             es: 'En esta página',
//             fr: 'Dans cette page',
//             hi: 'इस पृष्ठ में',
//             it: 'In questa pagina',
//             ko: '이 페이지에서',
//             pt: 'Nesta página',
//             ru: 'На этой странице',
//             tr: 'Bu sayfada',
//             zh: '在此页面'
//           }
//         },
//         linkLabel: {
//           nodeType: 'translation',
//           translation: {
//             ar: 'اذهب إلى القسم',
//             de: 'Gehe zur Sektion',
//             en: 'Go to section',
//             'en-GB': 'Go to section',
//             es: 'Ir a la sección',
//             fr: 'Aller à la section',
//             hi: 'सेक्शन पर जाएं',
//             it: 'Vai alla sezione',
//             ja: 'セクションへ行く',
//             ko: '섹션으로 이동',
//             pt: 'Ir para a seção',
//             ru: 'Перейти к разделу',
//             tr: 'Bölüme git',
//             zh: '转到节'
//           }
//         },
//         collapseButton: {
//           label: {
//             nodeType: 'translation',
//             translation: {
//               en: 'Collapse',
//               fr: 'Réduire',
//               es: 'Colapsar',
//               'en-GB': 'Collapse',
//               de: 'Zuklappen',
//               ja: '折りたたむ',
//               ko: '접기',
//               zh: '折叠',
//               it: 'Comprimi',
//               pt: 'Recolher',
//               hi: 'संकुचित करें',
//               ar: 'اطوي التوسيع',
//               ru: 'Свернуть',
//               tr: 'Daralt'
//             }
//           }
//         }
//       },
//       localId: 'aside-navigation::local::src/components/AsideNavigation/asideNavigation.content.ts',
//       location: 'local',
//       filePath: 'src/components/AsideNavigation/asideNavigation.content.ts'
//     }
//   }

/**
 * Deep merge helper that handles translation blocks
 * @param target - The target object (dictionary content)
 * @param source - The source object (new content to merge)
 * @param locale - Optional locale to target specific translation
 * @returns Merged content
 */
const deepMergeContent = (
  target: any,
  source: any,
  locale?: LocalesValues
): any => {
  // If source is null or undefined, return target
  if (source === null || source === undefined) return target;

  // If target is null or undefined, initialize based on source type
  if (target === null || target === undefined) {
    if (Array.isArray(source)) {
      target = [];
    } else if (typeof source === 'object') {
      target = {};
    } else {
      return source;
    }
  }

  // Handle translation nodes FIRST (before arrays) to support arrays within translations
  if (
    target &&
    typeof target === 'object' &&
    target.nodeType === NodeType.Translation
  ) {
    // Target is a translation block
    if (locale) {
      // Update only the specific locale - create new object to preserve order
      const existingLocaleContent = target.translation[locale];
      let newLocaleContent: any;

      if (typeof source === 'object' && !Array.isArray(source)) {
        // Source is an object, need to deep merge for this locale
        newLocaleContent = deepMergeContent(
          existingLocaleContent,
          source,
          undefined // Don't pass locale down for nested content
        );
      } else if (Array.isArray(source)) {
        // Source is an array, set it directly for this locale
        newLocaleContent = source;
      } else {
        // Source is a primitive, directly set it
        newLocaleContent = source;
      }

      // Return new object with locale appended at the end (preserve insertion order)
      return {
        ...target,
        translation: {
          ...target.translation,
          [locale]: newLocaleContent,
        },
      };
    } else {
      // No locale specified, replace/merge the entire translation
      if (
        typeof source === 'object' &&
        !Array.isArray(source) &&
        source.nodeType === NodeType.Translation
      ) {
        // Source is also a translation node, merge translations
        return {
          ...target,
          translation: {
            ...target.translation,
            ...source.translation,
          },
        };
      } else {
        // Source is not a translation node, wrap it
        return processNewContent(source, locale);
      }
    }
  }

  // Handle arrays
  if (Array.isArray(source)) {
    if (locale && Array.isArray(target)) {
      // When locale is specified and target is also an array, merge element by element
      const result = [];
      const maxLength = Math.max(source.length, target.length);

      for (let i = 0; i < maxLength; i++) {
        if (i < source.length) {
          if (i < target.length && target[i] !== undefined) {
            // Both source and target have element at this index - merge them
            result[i] = deepMergeContent(target[i], source[i], locale);
          } else {
            // Only source has element at this index - process new content
            result[i] = processNewContent(source[i], locale);
          }
        } else {
          // Only target has element at this index - keep it
          result[i] = target[i];
        }
      }

      return result;
    } else {
      // No locale or target is not an array - replace entirely
      return source.map((item) => {
        // Process each item in case it needs locale wrapping
        if (
          item &&
          typeof item === 'object' &&
          item.nodeType === NodeType.Translation
        ) {
          return item;
        }
        return processNewContent(item, locale);
      });
    }
  }

  // Handle objects
  if (typeof source === 'object' && !Array.isArray(source)) {
    if (typeof target !== 'object' || Array.isArray(target)) {
      target = {};
    }

    // Create new object to preserve key order and avoid mutation
    const result: any = { ...target };

    for (const key in source) {
      if (Object.hasOwn(source, key)) {
        if (target[key] !== undefined) {
          result[key] = deepMergeContent(target[key], source[key], locale);
        } else {
          result[key] = processNewContent(source[key], locale);
        }
      }
    }

    return result;
  }

  // For primitives, just return the source
  return source;
};

/**
 * Process new content that doesn't exist in target
 * @param content - New content to process
 * @param locale - Optional locale
 * @returns Processed content
 */
const processNewContent = (content: any, locale?: LocalesValues): any => {
  // Handle null and undefined
  if (content === null || content === undefined) {
    return content;
  }

  // If content is already a translation node, return as-is
  if (
    content &&
    typeof content === 'object' &&
    content.nodeType === NodeType.Translation
  ) {
    return content;
  }

  // Handle arrays
  if (Array.isArray(content)) {
    return content.map((item) => processNewContent(item, locale));
  }

  // Handle objects
  if (content && typeof content === 'object') {
    const result: any = {};

    for (const key in content) {
      if (Object.hasOwn(content, key)) {
        result[key] = processNewContent(content[key], locale);
      }
    }
    return result;
  }

  // Handle primitives
  if (locale) {
    // Wrap in translation node with the specific locale
    return {
      nodeType: NodeType.Translation,
      translation: {
        [locale]: content,
      },
    };
  } else {
    // If no locale, just return the content as-is (don't wrap)
    return content;
  }
};

/**
 * Insert content into a dictionary with deep merge support
 * Handles translation blocks and nested structures
 *
 * @param dictionary - The dictionary to insert content into
 * @param content - The content to insert
 * @param locale - Optional locale to target specific translation
 * @returns Updated dictionary
 *
 * @example
 * // Without locale - deep merge all content
 * insertContentInDictionary(dictionary, { title: 'New Title' })
 *
 * @example
 * // With locale - insert content for specific locale
 * insertContentInDictionary(dictionary, { title: 'このページ' }, 'ja')
 */
export const insertContentInDictionary = (
  dictionary: Dictionary,
  content: Dictionary['content'],
  locale?: LocalesValues
): Dictionary => {
  const mergedContent = deepMergeContent(
    Array.isArray(dictionary.content)
      ? [...dictionary.content]
      : { ...dictionary.content },
    content,
    locale
  );

  return {
    ...dictionary,
    content: mergedContent,
  };
};
