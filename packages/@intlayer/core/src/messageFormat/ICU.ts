import { type Dictionary, NodeType } from '@intlayer/types';
import { deepTransformNode } from '../interpreter';
import { enu, gender, insert } from '../transpiler';

// Types for our AST
type ICUNode =
  | string
  | {
      type: 'argument';
      name: string;
      format?: { type: string; style?: string };
    }
  | { type: 'plural'; name: string; options: Record<string, ICUNode[]> }
  | { type: 'select'; name: string; options: Record<string, ICUNode[]> };

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

const parseICU = (text: string): ICUNode[] => {
  let index = 0;

  const parseNodes = (): ICUNode[] => {
    const nodes: ICUNode[] = [];
    let currentText = '';

    while (index < text.length) {
      const char = text[index];

      if (char === '{') {
        if (currentText) {
          nodes.push(currentText);
          currentText = '';
        }
        index++; // skip {
        nodes.push(parseArgument());
      } else if (char === '}') {
        // End of current block
        break;
      } else if (char === "'") {
        // Escaping
        if (index + 1 < text.length && text[index + 1] === "'") {
          currentText += "'";
          index += 2;
        } else {
          // Find next quote
          const nextQuote = text.indexOf("'", index + 1);
          if (nextQuote !== -1) {
            // Determine if this is escaping syntax characters
            // For simplicity, we'll treat content between single quotes as literal
            // provided it contains syntax chars.
            // Standard ICU: ' quoted string '
            // If it is just an apostrophe, it should be doubled.
            // But simplified: take content between quotes literally.
            currentText += text.substring(index + 1, nextQuote);
            index = nextQuote + 1;
          } else {
            currentText += "'";
            index++;
          }
        }
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

  const parseArgument = (): ICUNode => {
    // We are past '{'
    // Parse name
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
          // Parse options
          const options: Record<string, ICUNode[]> = {};

          while (index < text.length && text[index] !== '}') {
            // skip whitespace
            while (index < text.length && /\s/.test(text[index])) index++;

            // parse key
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

const icuNodesToIntlayer = (nodes: ICUNode[]): any => {
  if (nodes.length === 0) return '';
  if (nodes.length === 1 && typeof nodes[0] === 'string') return nodes[0];

  // Check if we can flatten to a single string (insert)
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
          str += `{${node.name}, ${node.format.type}${
            node.format.style ? `, ${node.format.style}` : ''
          }}`;
        } else {
          str += `{{${node.name}}}`;
        }
      }
    }
    return insert(str);
  }

  // Mix of string and complex types.
  // If we have just one complex type and it covers everything?
  if (nodes.length === 1) {
    const node = nodes[0];

    if (typeof node === 'string') return node; // already handled
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
        // Map ICU keys to Intlayer keys
        let newKey = key;
        if (key.startsWith('=')) {
          newKey = key.substring(1); // =0 -> 0
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
        // Handle # in plural value
        // For plural, we need to pass the variable name down or replace #
        // Intlayer uses {{n}} (or whatever var name)
        // We should replace # with {{n}} in the string parts of val
        const replacedVal = val.map((v) => {
          if (typeof v === 'string') {
            return v.replace(/#/g, `{{${node.name}}}`);
          }
          return v;
        });

        options[newKey] = icuNodesToIntlayer(replacedVal);
      }

      // Preserve variable name
      options.__intlayer_icu_var = node.name;

      return enu(options);
    }
    if (node.type === 'select') {
      const options: Record<string, any> = {};

      for (const [key, val] of Object.entries(node.options)) {
        options[key] = icuNodesToIntlayer(val);
      }

      // Check if it looks like gender
      const optionKeys = Object.keys(options);
      // It is gender if it has 'male' OR 'female' AND only contains gender keys (male, female, other)
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

      // Preserve variable name
      options.__intlayer_icu_var = node.name;

      return enu(options);
    }
  }

  // If multiple nodes, return array
  return nodes.map((node) => icuNodesToIntlayer([node]));
};

const icuToIntlayerPlugin = {
  canHandle: (node: any) =>
    typeof node === 'string' && (node.includes('{') || node.includes('}')),
  transform: (node: any) => {
    try {
      const ast = parseICU(node);
      return icuNodesToIntlayer(ast);
    } catch {
      // If parsing fails, return original string
      return node;
    }
  },
};

const intlayerToIcuPlugin = {
  canHandle: (node: any) =>
    (typeof node === 'string' && (node.includes('{') || node.includes('}'))) ||
    (node &&
      typeof node === 'object' &&
      (node.nodeType === NodeType.Insertion ||
        node.nodeType === NodeType.Enumeration ||
        node.nodeType === NodeType.Gender ||
        node.nodeType === 'composite')) ||
    Array.isArray(node),
  transform: (node: any, props: any, next: any) => {
    if (typeof node === 'string') {
      return node.replace(/\{\{([^}]+)\}\}/g, '{$1}');
    }

    if (node.nodeType === NodeType.Insertion) {
      // insert("Hello {{name}}") -> "Hello {name}"
      return node.insertion.replace(/\{\{([^}]+)\}\}/g, '{$1}');
    }

    if (node.nodeType === NodeType.Enumeration) {
      const options = node.enumeration;

      // Transform all values first
      const transformedOptions: Record<string, string> = {};
      for (const [key, val] of Object.entries(options)) {
        if (key === '__intlayer_icu_var') continue;
        const childVal = next(val, props);
        transformedOptions[key] =
          typeof childVal === 'string' ? childVal : JSON.stringify(childVal);
      }

      // Infer variable name
      let varName = options.__intlayer_icu_var || 'n';

      if (!options.__intlayer_icu_var) {
        const fallbackVal =
          transformedOptions.fallback ||
          transformedOptions.other ||
          Object.values(transformedOptions)[0];
        // Match {variable} but avoid {variable, ...} (which are nested ICUs)
        // Actually nested ICU starts with {var, ...
        // Simple variable is {var}
        // We look for {var} that is NOT followed by ,
        const match = fallbackVal.match(/\{([a-zA-Z0-9_]+)\}(?!,)/);
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
      // Also check for numbers
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
          else if (['zero', 'few', 'many'].includes(key)) icuKey = key;
          else icuKey = 'other';

          let strVal = val;

          // Replace {varName} with #
          // Note: next() has already converted {{var}} -> {var}
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
          // Do NOT map other keys to 'other'. Keep 'active', 'inactive', etc.

          parts.push(`${icuKey} {${val}}`);
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
        const strVal =
          typeof childVal === 'string' ? childVal : JSON.stringify(childVal);

        parts.push(`${icuKey} {${strVal}}`);
      }
      return `{${varName}, select, ${parts.join(' ')}}`;
    }

    if (
      Array.isArray(node) ||
      (node.nodeType === 'composite' && Array.isArray(node.composite))
    ) {
      // handle array/composite
      const arr = Array.isArray(node) ? node : node.composite;
      const items = arr.map((item: any) => next(item, props));
      return items.join('');
    }

    return next(node, props);
  },
};

export const intlayerToICUFormatter = (
  message: Dictionary['content']
): JsonValue => {
  return deepTransformNode(message, {
    dictionaryKey: 'icu',
    keyPath: [],
    plugins: [{ id: 'icu', ...intlayerToIcuPlugin }],
  });
};

export const icuToIntlayerFormatter = (
  message: Dictionary['content']
): JsonValue => {
  return deepTransformNode(message, {
    dictionaryKey: 'icu',
    keyPath: [],
    plugins: [{ id: 'icu', ...icuToIntlayerPlugin }],
  });
};
