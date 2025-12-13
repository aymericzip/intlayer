import type { Dictionary } from '@intlayer/types';
import { NodeType } from '@intlayer/types';
import { deepTransformNode } from '../interpreter';
import { enu, gender, insert } from '../transpiler';
import type { JsonValue } from './ICU';

// Types for our AST
type I18NextNode =
  | string
  | {
      type: 'argument';
      name: string;
      format?: { type: string; style?: string };
    }
  | { type: 'plural'; name: string; options: Record<string, I18NextNode[]> }
  | { type: 'select'; name: string; options: Record<string, I18NextNode[]> };

const parseI18Next = (text: string): I18NextNode[] => {
  let index = 0;

  const parseNodes = (): I18NextNode[] => {
    const nodes: I18NextNode[] = [];
    let currentText = '';

    while (index < text.length) {
      const char = text[index];

      // Standard i18next variable: {{var}}
      if (char === '{' && text[index + 1] === '{') {
        if (currentText) {
          nodes.push(currentText);
          currentText = '';
        }
        index += 2; // skip {{
        nodes.push(parseStandardArgument());
      }
      // ICU syntax: {var} or {var, plural, ...}
      else if (char === '{') {
        if (currentText) {
          nodes.push(currentText);
          currentText = '';
        }
        index++; // skip {
        nodes.push(parseICUArgument());
      } else if (char === '}') {
        // End of current block (likely ICU block end)
        break;
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

  const parseStandardArgument = (): I18NextNode => {
    // We are past '{{'
    let name = '';
    while (index < text.length) {
      // Check for closing }}
      if (text[index] === '}' && text[index + 1] === '}') {
        index += 2; // skip }}
        return { type: 'argument', name: name.trim() };
      }
      name += text[index];
      index++;
    }
    throw new Error('Unclosed i18next variable');
  };

  const parseICUArgument = (): I18NextNode => {
    // We are past '{'
    let name = '';
    while (index < text.length && /[^,}]/.test(text[index])) {
      name += text[index];
      index++;
    }
    name = name.trim();

    if (index >= text.length) throw new Error('Unclosed argument');

    if (text[index] === '}') {
      index++;
      return { type: 'argument', name };
    }

    // Must be comma
    if (text[index] === ',') {
      index++;
      // Parse type
      let type = '';
      while (index < text.length && /[^,}]/.test(text[index])) {
        type += text[index];
        index++;
      }
      type = type.trim();

      if (index >= text.length) throw new Error('Unclosed argument');

      if (text[index] === '}') {
        index++;
        return { type: 'argument', name, format: { type } };
      }

      if (text[index] === ',') {
        index++;

        // If plural or select, parse options
        if (type === 'plural' || type === 'select') {
          const options: Record<string, I18NextNode[]> = {};

          while (index < text.length && text[index] !== '}') {
            while (index < text.length && /\s/.test(text[index])) index++;

            let key = '';
            while (index < text.length && /[^{\s]/.test(text[index])) {
              key += text[index];
              index++;
            }

            while (index < text.length && /\s/.test(text[index])) index++;

            if (text[index] !== '{')
              throw new Error('Expected { after option key');
            index++; // skip {

            const value = parseNodes();

            if (text[index] !== '}')
              throw new Error('Expected } after option value');
            index++; // skip }

            options[key] = value;

            while (index < text.length && /\s/.test(text[index])) index++;
          }

          index++; // skip closing argument }

          if (type === 'plural') {
            return { type: 'plural', name, options };
          } else if (type === 'select') {
            return { type: 'select', name, options };
          }
        } else {
          // Parse style for number/date/time
          let style = '';
          while (index < text.length && text[index] !== '}') {
            style += text[index];
            index++;
          }
          if (index >= text.length) throw new Error('Unclosed argument');

          style = style.trim();
          index++; // skip }

          return { type: 'argument', name, format: { type, style } };
        }
      }
    }

    throw new Error('Malformed argument');
  };

  return parseNodes();
};

const i18nextNodesToIntlayer = (nodes: I18NextNode[]): any => {
  if (nodes.length === 0) return '';
  if (nodes.length === 1 && typeof nodes[0] === 'string') return nodes[0];

  const canFlatten = nodes.every(
    (node) => typeof node === 'string' || node.type === 'argument'
  );

  if (canFlatten) {
    let str = '';
    for (const node of nodes) {
      if (typeof node === 'string') {
        str += node;
      } else if (typeof node !== 'string' && node.type === 'argument') {
        if (node.format) {
          // For formatted arguments, use ICU syntax: {name, type, style}
          str += `{${node.name}, ${node.format.type}${
            node.format.style ? `, ${node.format.style}` : ''
          }}`;
        } else {
          // For simple arguments, use standard i18next: {{name}}
          str += `{{${node.name}}}`;
        }
      }
    }
    return insert(str);
  }

  if (nodes.length === 1) {
    const node = nodes[0];
    if (typeof node === 'string') return node;

    if (node.type === 'argument') {
      if (node.format) {
        return insert(
          `{${node.name}, ${node.format.type}${
            node.format.style ? `, ${node.format.style}` : ''
          }}`
        );
      }
      return insert(`{{${node.name}}}`);
    }

    if (node.type === 'plural') {
      const options: Record<string, any> = {};
      for (const [key, val] of Object.entries(node.options)) {
        let newKey = key;
        if (key.startsWith('=')) {
          newKey = key.substring(1);
        } else if (key === 'one') {
          newKey = '1';
        } else if (key === 'two') {
          newKey = '2';
        } else if (key === 'few') {
          newKey = '<=3';
        } else if (key === 'many') {
          newKey = '>=4';
        } else if (key === 'other') {
          newKey = 'fallback';
        }
        // Handle # replacement
        const replacedVal = val.map((v) => {
          if (typeof v === 'string') {
            // In ICU plural, # is replaced by the number
            // In i18next, if using ICU plugin, it behaves same.
            // We map it to {{varName}} in Intlayer
            return v.replace(/#/g, `{{${node.name}}}`);
          }
          return v;
        });

        options[newKey] = i18nextNodesToIntlayer(replacedVal);
      }

      // Preserve variable name
      options.__intlayer_icu_var = node.name;

      return enu(options);
    }

    if (node.type === 'select') {
      const options: Record<string, any> = {};
      for (const [key, val] of Object.entries(node.options)) {
        options[key] = i18nextNodesToIntlayer(val);
      }

      // Check for gender
      const optionKeys = Object.keys(options);
      const isGender =
        (options.male || options.female) &&
        optionKeys.every((k) =>
          ['male', 'female', 'other', 'fallback'].includes(k)
        );

      if (isGender) {
        return gender({
          fallback: options.other,
          male: options.male,
          female: options.female,
        });
      }

      // Preserve variable name for generic select
      options.__intlayer_icu_var = node.name;

      return enu(options);
    }
  }

  return nodes.map((node) => i18nextNodesToIntlayer([node]));
};

const i18nextToIntlayerPlugin = {
  canHandle: (node: any) =>
    typeof node === 'string' && (node.includes('{') || node.includes('}')),
  transform: (node: any) => {
    try {
      const ast = parseI18Next(node);
      return i18nextNodesToIntlayer(ast);
    } catch {
      return node;
    }
  },
};

const intlayerToI18nextPlugin = {
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
      return node;
    }

    if (node.nodeType === NodeType.Insertion) {
      // If it contains ICU format syntax (curly braces but not double curly), keep it as is
      // But standard insert creates {{var}}.
      // Check if the original string was formatted (e.g. {val, number})
      if (node.insertion.match(/\{[^}]*,[^}]*\}/)) {
        // It's likely an ICU format string like {val, number}
        // We might need to ensure variables inside are not double-braced if they are part of the format
        // But wait, our parser outputs {val, number} as string for insertion.
        return node.insertion;
      }

      // Otherwise keep {{name}} for i18next
      return node.insertion;
    }

    if (node.nodeType === NodeType.Enumeration) {
      const options = node.enumeration;

      const transformedOptions: Record<string, string> = {};
      for (const [key, val] of Object.entries(options)) {
        if (key === '__intlayer_icu_var') continue;
        const childVal = next(val, props);
        transformedOptions[key] =
          typeof childVal === 'string' ? childVal : JSON.stringify(childVal);
      }

      // Infer variable name
      let varName = options.__intlayer_icu_var || 'count';

      if (!options.__intlayer_icu_var) {
        const fallbackVal =
          transformedOptions.fallback ||
          transformedOptions.other ||
          Object.values(transformedOptions)[0];

        // Search for {{var}} or {var}
        // Match {variable} but avoid {variable, ...} (which are nested ICUs)
        const match =
          fallbackVal.match(/\{\{([a-zA-Z0-9_]+)\}\}/) ||
          fallbackVal.match(/\{([a-zA-Z0-9_]+)\}(?!,)/);
        if (match) {
          varName = match[1];
        }
      }

      const keys = Object.keys(transformedOptions);
      const pluralKeys = [
        '1',
        '2',
        '<=3',
        '>=4',
        'fallback',
        'other',
        'zero',
        'one',
        'two',
        'few',
        'many',
      ];
      // Check if it is a plural
      const isPlural = keys.every(
        (k) => pluralKeys.includes(k) || /^[<>=]?\d+(\.\d+)?$/.test(k)
      );

      const parts = [];

      if (isPlural) {
        for (const [key, val] of Object.entries(transformedOptions)) {
          let icuKey = key;
          if (key === 'fallback') icuKey = 'other';
          else if (key === '<=3') icuKey = 'few';
          else if (key === '>=4') icuKey = 'many';
          else if (/^\d+$/.test(key)) icuKey = `=${key}`;

          let strVal = val;

          // Convert {{var}} to {var} inside ICU string
          // Also replace {varName} with # if it matches
          strVal = strVal.replace(/\{\{([^}]+)\}\}/g, '{$1}');
          strVal = strVal.replace(new RegExp(`\\{${varName}\\}`, 'g'), '#');

          parts.push(`${icuKey} {${strVal}}`);
        }
        return `{${varName}, plural, ${parts.join(' ')}}`;
      } else {
        // Select
        const entries = Object.entries(transformedOptions).sort(
          ([keyA], [keyB]) => {
            if (keyA === 'fallback' || keyA === 'other') return 1;
            if (keyB === 'fallback' || keyB === 'other') return -1;
            return 0;
          }
        );

        for (const [key, val] of entries) {
          let icuKey = key;
          if (key === 'fallback') icuKey = 'other';

          let strVal = val;
          strVal = strVal.replace(/\{\{([^}]+)\}\}/g, '{$1}');

          parts.push(`${icuKey} {${strVal}}`);
        }
        return `{${varName}, select, ${parts.join(' ')}}`;
      }
    }

    if (node.nodeType === NodeType.Gender) {
      const options = node.gender;
      const varName = 'gender';
      const parts = [];

      const entries = Object.entries(options).sort(([keyA], [keyB]) => {
        if (keyA === 'fallback') return 1;
        if (keyB === 'fallback') return -1;
        return 0;
      });

      for (const [key, val] of entries) {
        let icuKey = key;
        if (key === 'fallback') icuKey = 'other';

        const childVal = next(val, props);
        let strVal =
          typeof childVal === 'string' ? childVal : JSON.stringify(childVal);

        strVal = strVal.replace(/\{\{([^}]+)\}\}/g, '{$1}');
        parts.push(`${icuKey} {${strVal}}`);
      }
      return `{${varName}, select, ${parts.join(' ')}}`;
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

export const intlayerToI18nextFormatter = (
  message: Dictionary['content']
): JsonValue => {
  return deepTransformNode(message, {
    dictionaryKey: 'i18next',
    keyPath: [],
    plugins: [{ id: 'i18next', ...intlayerToI18nextPlugin }],
  });
};

export const i18nextToIntlayerFormatter = (
  message: JsonValue
): Dictionary['content'] => {
  return deepTransformNode(message, {
    dictionaryKey: 'i18next',
    keyPath: [],
    plugins: [{ id: 'i18next', ...i18nextToIntlayerPlugin }],
  });
};
