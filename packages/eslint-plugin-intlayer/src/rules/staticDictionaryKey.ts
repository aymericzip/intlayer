import type { CallerDescriptor } from '@intlayer/config/callers';
import {
  type AstNode,
  getJsxAttributeName,
  getJsxAttributeValueNode,
  getJsxElementName,
  getStaticStringValue,
  toAstNode,
} from '../utils/ast';
import {
  type CallerMatch,
  collectImportSources,
  getActiveDescriptors,
  matchCaller,
  matchJsxCaller,
} from '../utils/callerMatcher';
import { createRule } from '../utils/createRule';

type MessageIds = 'dynamicKey' | 'dynamicTemplateKey' | 'dynamicJsxKey';

/**
 * True when the call may legitimately omit its namespace — next-intl's
 * `useTranslations()` root scope derives the dictionary from each message id
 * instead, so an absent argument is not a violation.
 *
 * @param descriptor - The matched registry entry.
 */
const allowsMissingNamespace = (descriptor: CallerDescriptor): boolean =>
  descriptor.allowRootScope === true;

/**
 * Distinguish an interpolated template from any other runtime expression, so
 * the report can name the actual problem.
 *
 * @param node - The namespace node.
 */
const isInterpolatedTemplate = (node: AstNode): boolean =>
  node.type === 'TemplateLiteral' &&
  ((node['expressions'] as unknown[] | undefined)?.length ?? 0) > 0;

export const staticDictionaryKey = createRule<[], MessageIds>(
  'static-dictionary-key',
  {
    meta: {
      type: 'problem',
      docs: {
        description:
          'Require the dictionary key of an Intlayer content read to be a static string literal',
      },
      messages: {
        dynamicKey:
          'The dictionary key passed to `{{caller}}` must be a string literal. A computed key is invisible to the Intlayer compiler, which then skips the optimize pass and bundles every dictionary.',
        dynamicTemplateKey:
          'The dictionary key passed to `{{caller}}` interpolates a value. Use a string literal — an interpolated key is invisible to the Intlayer compiler, which then skips the optimize pass and bundles every dictionary.',
        dynamicJsxKey:
          'The `{{attribute}}` of `<{{caller}}>` must be a static string. A computed value is invisible to the Intlayer compiler, which then cannot resolve the dictionary at build time.',
      },
    },

    create: (context) => {
      let activeDescriptors = getActiveDescriptors(new Set());

      /** Report the namespace of a matched call when it is not static. */
      const reportDynamicNamespace = (match: CallerMatch): void => {
        const { descriptor, namespace } = match;

        if (!namespace) return;

        // A `fixed` namespace is a compile-time constant by construction.
        if (namespace.source.from === 'fixed') return;

        if (!namespace.node) {
          // Nothing was passed at all — only a problem for callers that require it.
          return;
        }

        if (namespace.value !== null) return;

        context.report({
          node: namespace.node as never,
          messageId: isInterpolatedTemplate(namespace.node)
            ? 'dynamicTemplateKey'
            : 'dynamicKey',
          data: { caller: descriptor.callerName },
        });
      };

      return {
        Program: (node) => {
          activeDescriptors = getActiveDescriptors(
            collectImportSources(toAstNode(node))
          );
        },

        CallExpression: (node) => {
          const match = matchCaller(toAstNode(node), activeDescriptors);

          if (!match) return;

          if (!match.namespace && allowsMissingNamespace(match.descriptor)) {
            return;
          }

          reportDynamicNamespace(match);
        },

        TaggedTemplateExpression: (node) => {
          const match = matchCaller(toAstNode(node), activeDescriptors);

          if (match) reportDynamicNamespace(match);
        },

        JSXOpeningElement: (node) => {
          const astNode = toAstNode(node);
          const descriptor = matchJsxCaller(
            getJsxElementName(astNode),
            activeDescriptors
          );

          if (!descriptor) return;

          const attributes =
            (astNode['attributes'] as AstNode[] | undefined) ?? [];

          const targetAttributes = [
            descriptor.jsxIdAttribute,
            descriptor.jsxNamespaceAttribute,
          ].filter((name): name is string => typeof name === 'string');

          for (const attribute of attributes) {
            const attributeName = getJsxAttributeName(attribute);

            if (!attributeName || !targetAttributes.includes(attributeName)) {
              continue;
            }

            const valueNode = getJsxAttributeValueNode(attribute);

            if (!valueNode) continue;

            if (getStaticStringValue(valueNode) !== null) continue;

            context.report({
              node: attribute as never,
              messageId: 'dynamicJsxKey',
              data: {
                attribute: attributeName,
                caller: descriptor.callerName,
              },
            });
          }
        },
      };
    },
  }
);
