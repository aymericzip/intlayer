import type { Dictionary } from '@intlayer/types/dictionary';
import * as NodeTypes from '@intlayer/types/nodeType';
import { deepTransformNode } from '../interpreter';
import { enu, gender, html, insert, plural } from '../transpiler';
import type { JsonValue } from './ICU';

export type PortableObject = {
  msgid: string;
  msgctxt?: string;
  msgid_plural?: string;
  msgstr: string[];
};

/**
 * Extracts the string value from a transformed AST node or generic object.
 */
const extractStringValue = (val: any): string => {
  if (typeof val === 'string') return val;
  if (val && typeof val === 'object' && 'msgstr' in val) {
    return val.msgstr[0] || '';
  }
  return JSON.stringify(val);
};

const intlayerToPoPlugin = {
  canHandle: (node: any) => {
    if (typeof node === 'string') return true;

    if (
      node &&
      typeof node === 'object' &&
      (node.nodeType === NodeTypes.INSERTION ||
        node.nodeType === NodeTypes.HTML ||
        node.nodeType === NodeTypes.ENUMERATION ||
        node.nodeType === NodeTypes.PLURAL ||
        node.nodeType === NodeTypes.GENDER ||
        node.nodeType === 'composite')
    ) {
      return true;
    }

    // Handle structural string arrays (composite phrases)
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
            item.nodeType === NodeTypes.HTML ||
            item.nodeType === NodeTypes.ENUMERATION ||
            item.nodeType === NodeTypes.PLURAL ||
            item.nodeType === NodeTypes.GENDER ||
            item.nodeType === 'composite')
        ) {
          hasNode = true;
        } else {
          hasPlainObjectOrArray = true;
        }
      }

      if (hasPlainObjectOrArray) return false;
      if (!hasNode) return false;
      return true;
    }

    return false;
  },
  transform: (node: any, props: any, next: any): PortableObject => {
    // 1. Strings
    if (typeof node === 'string') {
      const poVal = node.replace(/\{\{([^}]+)\}\}/g, '%($1)s');
      return { msgid: poVal, msgstr: [poVal] };
    }

    // 2. Insertions & Variables
    if (node.nodeType === NodeTypes.INSERTION) {
      return next(node[NodeTypes.INSERTION], props);
    }

    // 3. HTML
    if (node.nodeType === NodeTypes.HTML) {
      const val = node[NodeTypes.HTML];
      return { msgid: val, msgstr: [val] };
    }

    // 4. Plurals & Enumerations
    if (
      node.nodeType === NodeTypes.PLURAL ||
      node.nodeType === NodeTypes.ENUMERATION
    ) {
      const isPlural = node.nodeType === NodeTypes.PLURAL;
      const options = isPlural
        ? node[NodeTypes.PLURAL]
        : node[NodeTypes.ENUMERATION];

      const rawMsgid = isPlural
        ? options.one || options.other || options.fallback
        : options.fallback || options['0'];

      const msgid = extractStringValue(next(rawMsgid, props));
      const msgid_plural = isPlural
        ? extractStringValue(
            next(options.other || options.fallback || rawMsgid, props)
          )
        : extractStringValue(next(options.fallback || rawMsgid, props));

      const msgstr: string[] = [];

      if (isPlural) {
        // Standard CLDR/Gettext mapping fallback
        if ('zero' in options)
          msgstr.push(extractStringValue(next(options.zero, props)));
        msgstr.push(
          extractStringValue(next(options.one || options.fallback, props))
        );
        if ('two' in options)
          msgstr.push(extractStringValue(next(options.two, props)));
        if ('few' in options)
          msgstr.push(extractStringValue(next(options.few, props)));
        if ('many' in options)
          msgstr.push(extractStringValue(next(options.many, props)));

        // Ensure 'other' is always the last fallback if others are missing
        const otherVal = extractStringValue(
          next(options.other || options.fallback, props)
        );
        if (!msgstr.includes(otherVal)) msgstr.push(otherVal);
      } else {
        // Enums don't have standard PO mapping, pack linearly
        msgstr[0] = extractStringValue(
          next(options.fallback || options['0'], props)
        );
        msgstr[1] = msgstr[0];
      }

      return {
        msgctxt: isPlural ? undefined : 'enumeration',
        msgid,
        msgid_plural,
        msgstr,
      };
    }

    // 5. Gender (mapped to PO via msgctxt)
    if (node.nodeType === NodeTypes.GENDER) {
      const options = node[NodeTypes.GENDER];
      const fallback = extractStringValue(next(options.fallback, props));
      return {
        msgctxt: 'gender',
        msgid: fallback,
        msgstr: [
          extractStringValue(next(options.male || options.fallback, props)),
          extractStringValue(next(options.female || options.fallback, props)),
          fallback,
        ],
      };
    }

    // 6. Arrays / Composites
    if (
      Array.isArray(node) ||
      (node.nodeType === 'composite' && Array.isArray(node.composite))
    ) {
      const arr = Array.isArray(node) ? node : node.composite;
      const combined = arr
        .map((item: any) => extractStringValue(next(item, props)))
        .join('');
      return { msgid: combined, msgstr: [combined] };
    }

    return node;
  },
};

const poToIntlayerPlugin = {
  canHandle: (node: any) =>
    node && typeof node === 'object' && 'msgid' in node && 'msgstr' in node,

  transform: (node: PortableObject) => {
    const msgstr = node.msgstr || [];
    const isPlural = Boolean(node.msgid_plural) || msgstr.length > 1;

    const processString = (str: string) => {
      if (!str) return '';
      // Convert Python/C-style gettext variables %(name)s or %(name)d -> {{name}}
      const parsed = str.replace(/%\(([a-zA-Z0-9_-]+)\)[sdf]/g, '{{$1}}');

      if (/<[a-zA-Z0-9-]+[^>]*>/.test(parsed)) return html(parsed);
      if (parsed.includes('{{')) return insert(parsed);
      return parsed;
    };

    // Fast-path: Single string translation
    if (!isPlural) {
      return processString(msgstr[0] || node.msgid || '');
    }

    // Handle Plural/Enum/Gender matrix
    const options: Record<string, any> = {};

    if (node.msgctxt === 'gender') {
      return gender({
        male: processString(msgstr[0] || node.msgid),
        female: processString(msgstr[1] || msgstr[0]),
        fallback: processString(msgstr[2] || msgstr[msgstr.length - 1]),
      });
    }

    if (node.msgctxt === 'enumeration') {
      return enu({
        '0': processString(msgstr[0]),
        fallback: processString(msgstr[msgstr.length - 1]),
      });
    }

    // Plural Form Mapping based on array length (Gettext Plural-Forms approximation)
    if (msgstr.length === 2) {
      options.one = processString(msgstr[0]);
      options.other = processString(msgstr[1]);
    } else if (msgstr.length === 3) {
      // E.g., Polish/Russian: one, few, many/other
      options.one = processString(msgstr[0]);
      options.few = processString(msgstr[1]);
      options.other = processString(msgstr[2]);
    } else if (msgstr.length === 6) {
      // E.g., Arabic: zero, one, two, few, many, other
      options.zero = processString(msgstr[0]);
      options.one = processString(msgstr[1]);
      options.two = processString(msgstr[2]);
      options.few = processString(msgstr[3]);
      options.many = processString(msgstr[4]);
      options.other = processString(msgstr[5]);
    } else {
      // Generic arbitrary length mapping
      options.one = processString(msgstr[0]);
      options.other = processString(msgstr[msgstr.length - 1]);
      for (let i = 1; i < msgstr.length - 1; i++) {
        options[`${i + 1}`] = processString(msgstr[i]);
      }
    }

    return plural(options as any);
  },
};

export const intlayerToPortableObjectFormatter = (
  dictionary: Dictionary['content']
): JsonValue => {
  return deepTransformNode(dictionary, {
    dictionaryKey: 'po',
    keyPath: [],
    plugins: [{ id: 'po', ...intlayerToPoPlugin }],
  });
};

export const portableObjectToIntlayerFormatter = (
  message: JsonValue
): Dictionary['content'] => {
  return deepTransformNode(message, {
    dictionaryKey: 'po',
    keyPath: [],
    plugins: [{ id: 'po', ...poToIntlayerPlugin }],
  });
};
