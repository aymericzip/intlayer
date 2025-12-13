import { type Dictionary, NodeType } from '@intlayer/types';
import { deepTransformNode } from '../interpreter';
import { enu, insert } from '../transpiler';
import type { JsonValue } from './ICU';

// Types for our AST
type VueI18nNode =
  | string
  | {
      type: 'argument';
      name: string;
    };

const parseVueI18nPart = (text: string): VueI18nNode[] => {
  let index = 0;
  const nodes: VueI18nNode[] = [];
  let currentText = '';

  while (index < text.length) {
    const char = text[index];

    if (char === '{') {
      if (currentText) {
        nodes.push(currentText);
        currentText = '';
      }
      index++; // skip {
      let name = '';
      while (index < text.length && text[index] !== '}') {
        name += text[index];
        index++;
      }
      if (index < text.length) {
        index++; // skip }
      }
      nodes.push({ type: 'argument', name: name.trim() });
    } else {
      currentText += char;
      index++;
    }
  }

  if (currentText) {
    nodes.push(currentText);
  }

  return nodes;
};

const parseVueI18n = (text: string): VueI18nNode[][] => {
  // Split by | but handle escaped \|
  const parts: string[] = [];
  let currentPart = '';
  let index = 0;

  while (index < text.length) {
    const char = text[index];
    if (char === '\\' && index + 1 < text.length && text[index + 1] === '|') {
      currentPart += '|';
      index += 2;
    } else if (char === '|') {
      parts.push(currentPart.trim()); // Trim to remove surrounding spaces
      currentPart = '';
      index++;
    } else {
      currentPart += char;
      index++;
    }
  }
  parts.push(currentPart.trim()); // Trim last part too

  return parts.map(parseVueI18nPart);
};

const vueI18nPartToIntlayer = (nodes: VueI18nNode[]): any => {
  if (nodes.length === 0) return '';
  if (nodes.length === 1 && typeof nodes[0] === 'string') return nodes[0];

  let str = '';
  for (const node of nodes) {
    if (typeof node === 'string') {
      str += node;
    } else {
      str += `{{${node.name}}}`;
    }
  }
  return insert(str);
};

const vueI18nNodesToIntlayer = (parts: VueI18nNode[][]): any => {
  if (parts.length === 1) {
    return vueI18nPartToIntlayer(parts[0]);
  }

  // Handle pluralization (choice)
  const options: Record<string, any> = {};
  const varName = 'count'; // Default variable for vue-i18n choices

  if (parts.length === 2) {
    // 2 choices: 1 | other
    options['1'] = vueI18nPartToIntlayer(parts[0]);
    options.fallback = vueI18nPartToIntlayer(parts[1]);
  } else if (parts.length === 3) {
    // 3 choices: 0 | 1 | other
    options['0'] = vueI18nPartToIntlayer(parts[0]);
    options['1'] = vueI18nPartToIntlayer(parts[1]);
    options.fallback = vueI18nPartToIntlayer(parts[2]);
  } else {
    // > 3 choices: 0 | 1 | 2 | ... | other
    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        options.fallback = vueI18nPartToIntlayer(part);
      } else {
        options[index.toString()] = vueI18nPartToIntlayer(part);
      }
    });
  }

  // Preserve variable name
  options.__intlayer_vue_i18n_var = varName;

  return enu(options);
};

const vueI18nToIntlayerPlugin = {
  canHandle: (node: any) =>
    typeof node === 'string' && (node.includes('{') || node.includes('|')),
  transform: (node: any) => {
    try {
      const ast = parseVueI18n(node);
      return vueI18nNodesToIntlayer(ast);
    } catch {
      return node;
    }
  },
};

const intlayerToVueI18nPlugin = {
  canHandle: (node: any) =>
    typeof node === 'string' ||
    (node &&
      typeof node === 'object' &&
      (node.nodeType === NodeType.Insertion ||
        node.nodeType === NodeType.Enumeration ||
        node.nodeType === NodeType.Gender ||
        node.nodeType === 'composite')) ||
    Array.isArray(node),
  transform: (node: any, props: any, next: any) => {
    if (typeof node === 'string') {
      // replace {{...}} with {...} even in strings
      return node.replace(/\{\{([^}]+)\}\}/g, '{$1}');
    }

    if (node.nodeType === NodeType.Insertion) {
      // {{name}} -> {name}
      return node.insertion.replace(/\{\{([^}]+)\}\}/g, '{$1}');
    }

    if (node.nodeType === NodeType.Enumeration) {
      const options = node.enumeration;

      const transformedOptions: Record<string, string> = {};
      for (const [key, val] of Object.entries(options)) {
        if (key === '__intlayer_vue_i18n_var') continue;
        const childVal = next(val, props);
        transformedOptions[key] =
          typeof childVal === 'string' ? childVal : JSON.stringify(childVal);
      }

      // We need to reconstruct the pipe-separated string.
      // 2 parts: 1, fallback
      // 3 parts: 0, 1, fallback

      const keys = Object.keys(transformedOptions);

      // Heuristic to decide format
      // Use loose condition for 3 parts: if 0 exists, OR if 2 exists, etc.
      // But typically 0, 1, 2...
      // If '0' is present, we likely want the 3+ parts format.
      if (keys.includes('0')) {
        const indices = keys.filter((key) => /^\d+$/.test(key)).map(Number);
        const maxIndex = Math.max(...indices);

        const fallback =
          transformedOptions.fallback || transformedOptions.other;
        const resultParts = [];

        // Check if we can use simple 3-part: 0 | 1 | fallback
        // Only if maxIndex <= 1
        if (maxIndex <= 1 && !keys.includes('2')) {
          const zero = transformedOptions['0'] || '';
          const one = transformedOptions['1'] || ''; // Gap handling?
          return `${zero} | ${one} | ${fallback}`;
        }

        // General case: loop until maxIndex
        const limit = Math.max(1, maxIndex);

        for (let i = 0; i <= limit; i++) {
          const key = i.toString();
          if (transformedOptions[key]) {
            resultParts.push(transformedOptions[key]);
          } else {
            resultParts.push(''); // Empty string for gaps
          }
        }
        resultParts.push(fallback);
        return resultParts.join(' | ').replace(/ \| {2}\| /g, ' | | ');
      }

      // 2 parts: 1 | fallback
      if (
        keys.includes('1') &&
        (keys.includes('fallback') || keys.includes('other'))
      ) {
        return `${transformedOptions['1']} | ${transformedOptions.fallback || transformedOptions.other}`;
      }

      // Fallback for only fallback?
      if (
        keys.length === 1 &&
        (keys.includes('fallback') || keys.includes('other'))
      ) {
        return transformedOptions.fallback || transformedOptions.other;
      }

      // Default fallback
      return (
        transformedOptions.fallback || Object.values(transformedOptions)[0]
      );
    }

    // Gender not supported by vue-i18n string format, return object
    if (node.nodeType === NodeType.Gender) {
      const options = node.gender;
      const transformedOptions: Record<string, any> = {};

      // Just map values
      for (const [key, val] of Object.entries(options)) {
        let newKey = key;
        if (key === 'fallback') newKey = 'other'; // vue-i18n doesn't strictly have 'other' for gender objects but standard convention often uses similar keys

        const childVal = next(val, props);
        transformedOptions[newKey] = childVal;
      }
      return transformedOptions;
    }

    if (
      Array.isArray(node) ||
      (node.nodeType === 'composite' && Array.isArray(node.composite))
    ) {
      const arr = Array.isArray(node) ? node : node.composite;
      const items = arr.map((item: any) => next(item, props));
      return items.join('');
    }

    return next(node, props);
  },
};

export const intlayerToVueI18nFormatter = (
  message: Dictionary['content']
): JsonValue => {
  return deepTransformNode(message, {
    dictionaryKey: 'vue-i18n',
    keyPath: [],
    plugins: [{ id: 'vue-i18n', ...intlayerToVueI18nPlugin }],
  });
};

export const vueI18nToIntlayerFormatter = (
  message: JsonValue
): Dictionary['content'] => {
  return deepTransformNode(message, {
    dictionaryKey: 'vue-i18n',
    keyPath: [],
    plugins: [{ id: 'vue-i18n', ...vueI18nToIntlayerPlugin }],
  });
};
