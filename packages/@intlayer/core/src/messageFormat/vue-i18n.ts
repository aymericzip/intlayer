import type { Dictionary } from '@intlayer/types/dictionary';
import * as NodeTypes from '@intlayer/types/nodeType';
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
  canHandle: (node: any) => {
    if (typeof node === 'string') return true;

    if (
      node &&
      typeof node === 'object' &&
      (node.nodeType === NodeTypes.INSERTION ||
        node.nodeType === NodeTypes.ENUMERATION ||
        node.nodeType === NodeTypes.GENDER ||
        node.nodeType === 'composite')
    ) {
      return true;
    }

    if (Array.isArray(node)) {
      if (node.length === 0) return false;

      let hasNode = false;
      let hasPlainObjectOrArray = false;

      for (const item of node) {
        if (typeof item === 'string') {
        } else if (
          item &&
          typeof item === 'object' &&
          (item.nodeType === NodeTypes.INSERTION ||
            item.nodeType === NodeTypes.ENUMERATION ||
            item.nodeType === NodeTypes.GENDER ||
            item.nodeType === 'composite')
        ) {
          hasNode = true;
        } else {
          hasPlainObjectOrArray = true;
        }
      }

      // If it contains plain objects or nested arrays, it's a structural array
      if (hasPlainObjectOrArray) return false;
      // If it contains ONLY strings, it's a structural array, not a composite string
      if (!hasNode) return false;

      return true;
    }

    return false;
  },
  transform: (node: any, props: any, next: any) => {
    if (typeof node === 'string') {
      // replace {{...}} with {...} even in strings
      return node.replace(/\{\{([^}]+)\}\}/g, '{$1}');
    }

    if (node.nodeType === NodeTypes.INSERTION) {
      // {{name}} -> {name}
      return node[NodeTypes.INSERTION].replace(/\{\{([^}]+)\}\}/g, '{$1}');
    }

    if (node.nodeType === NodeTypes.ENUMERATION) {
      const options = node[NodeTypes.ENUMERATION];

      const transformedOptions: Record<string, string> = {};
      for (const [key, val] of Object.entries(options)) {
        if (key === '__intlayer_vue_i18n_var') continue;
        const childVal = next(val, props);
        transformedOptions[key] =
          typeof childVal === 'string' ? childVal : JSON.stringify(childVal);
      }

      const keys = Object.keys(transformedOptions);

      if (keys.includes('0')) {
        const indices = keys.filter((key) => /^\d+$/.test(key)).map(Number);
        const maxIndex = Math.max(...indices);

        const fallback =
          transformedOptions.fallback || transformedOptions.other;
        const resultParts = [];

        if (maxIndex <= 1 && !keys.includes('2')) {
          const zero = transformedOptions['0'] || '';
          const one = transformedOptions['1'] || '';
          return `${zero} | ${one} | ${fallback}`;
        }

        const limit = Math.max(1, maxIndex);

        for (let i = 0; i <= limit; i++) {
          const key = i.toString();
          if (transformedOptions[key]) {
            resultParts.push(transformedOptions[key]);
          } else {
            resultParts.push('');
          }
        }
        resultParts.push(fallback);
        return resultParts.join(' | ').replace(/ \| {2}\| /g, ' | | ');
      }

      if (
        keys.includes('1') &&
        (keys.includes('fallback') || keys.includes('other'))
      ) {
        return `${transformedOptions['1']} | ${transformedOptions.fallback || transformedOptions.other}`;
      }

      if (
        keys.length === 1 &&
        (keys.includes('fallback') || keys.includes('other'))
      ) {
        return transformedOptions.fallback || transformedOptions.other;
      }

      return (
        transformedOptions.fallback || Object.values(transformedOptions)[0]
      );
    }

    if (node.nodeType === NodeTypes.GENDER) {
      const options = node[NodeTypes.GENDER];
      const transformedOptions: Record<string, any> = {};

      for (const [key, val] of Object.entries(options)) {
        let newKey = key;
        if (key === 'fallback') newKey = 'other';

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
