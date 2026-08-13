import type { Scope } from 'eslint';
import {
  type AstNode,
  type AstNodeWithParent,
  getStaticStringValue,
  toAstNode,
} from '../utils/ast';
import {
  collectImportSources,
  getActiveDescriptors,
  matchCaller,
} from '../utils/callerMatcher';
import { createRule } from '../utils/createRule';

type MessageIds = 'dynamicField' | 'dynamicMessageId';

/**
 * What a variable bound from a caller call holds.
 *
 * - `content`    — the dictionary content object, or a destructured subtree of
 *                  it (`useIntlayer`, `getIntlayer`).
 * - `translator` — a translation function taking a message path
 *                  (`useTranslations`, the `t` of `useTranslation`).
 */
type BindingKind = 'content' | 'translator';

/**
 * Property name holding the translation function in a `destructured-t` result,
 * e.g. `const { t } = useTranslation('home')`.
 */
const TRANSLATOR_PROPERTY_NAME = 't';

/**
 * True when a computed member access reads a field the compiler can still name:
 * a literal (`content['title']`, `items[0]`) or an uninterpolated template.
 *
 * @param property - The `property` node of a computed MemberExpression.
 */
const isStaticComputedProperty = (property: AstNode | null): boolean => {
  if (!property) return false;

  if (property.type === 'Literal') return true;

  return getStaticStringValue(property) !== null;
};

/**
 * The variables a declarator binds, paired with the identifier that declared
 * each one — needed to tell `t` apart from `i18n` in a destructuring pattern.
 *
 * @param variables - Result of `sourceCode.getDeclaredVariables(declarator)`.
 * @param identifier - The declaring identifier to look up.
 */
const findVariableForIdentifier = (
  variables: Scope.Variable[],
  identifier: AstNode
): Scope.Variable | null =>
  variables.find((variable) =>
    variable.identifiers.some(
      (declared) => (declared as unknown as AstNode) === identifier
    )
  ) ?? null;

/**
 * Locate the identifier bound to the `t` property of an object pattern,
 * honouring renames (`const { t: translate } = …`).
 *
 * @param pattern - The declarator's `id`, expected to be an ObjectPattern.
 */
const findTranslatorIdentifier = (pattern: AstNode): AstNode | null => {
  if (pattern.type !== 'ObjectPattern') return null;

  const properties = (pattern['properties'] as AstNode[] | undefined) ?? [];

  for (const property of properties) {
    if (property.type !== 'Property' || property['computed'] === true) continue;

    const key = property['key'] as AstNode | undefined;
    const keyName =
      key?.type === 'Identifier'
        ? (key['name'] as string)
        : key?.type === 'Literal'
          ? String(key['value'])
          : null;

    if (keyName !== TRANSLATOR_PROPERTY_NAME) continue;

    const value = property['value'] as AstNode | undefined;

    return value?.type === 'Identifier' ? value : null;
  }

  return null;
};

export const noDynamicFieldAccess = createRule<[], MessageIds>(
  'no-dynamic-field-access',
  {
    meta: {
      type: 'problem',
      docs: {
        description:
          'Require the field read from an Intlayer dictionary to be statically known',
      },
      messages: {
        dynamicField:
          'Computed access on Intlayer content is not statically analyzable. The purge pass strips fields it cannot see used, so this may read `undefined` at runtime — read the field by name instead.',
        dynamicMessageId:
          'The message path passed to `{{caller}}` must be a static string. The purge pass strips fields it cannot see used, so this may read `undefined` at runtime.',
      },
    },

    create: (context) => {
      const sourceCode = context.sourceCode;
      let activeDescriptors = getActiveDescriptors(new Set());

      /** Report every computed, non-static member access on a bound variable. */
      const checkContentVariable = (variable: Scope.Variable): void => {
        for (const reference of variable.references) {
          const identifier =
            reference.identifier as unknown as AstNodeWithParent;
          const parent = identifier.parent;

          if (parent?.type !== 'MemberExpression') continue;

          if (parent['object'] !== identifier) continue;

          if (parent['computed'] !== true) continue;

          if (isStaticComputedProperty(parent['property'] as AstNode)) continue;

          context.report({
            node: parent as never,
            messageId: 'dynamicField',
          });
        }
      };

      /** Report every call of a translation function with a runtime message path. */
      const checkTranslatorVariable = (
        variable: Scope.Variable,
        callerName: string
      ): void => {
        for (const reference of variable.references) {
          const identifier =
            reference.identifier as unknown as AstNodeWithParent;
          const parent = identifier.parent;

          if (parent?.type !== 'CallExpression') continue;

          if (parent['callee'] !== identifier) continue;

          const [firstArgument] = (parent['arguments'] as AstNode[]) ?? [];

          if (!firstArgument) continue;

          if (getStaticStringValue(firstArgument) !== null) continue;

          context.report({
            node: firstArgument as never,
            messageId: 'dynamicMessageId',
            data: { caller: callerName },
          });
        }
      };

      return {
        Program: (node) => {
          activeDescriptors = getActiveDescriptors(
            collectImportSources(toAstNode(node))
          );
        },

        VariableDeclarator: (node) => {
          const astNode = toAstNode(node);
          const init = astNode['init'] as AstNode | undefined;

          if (!init) return;

          const match = matchCaller(init, activeDescriptors);

          if (!match) return;

          const { descriptor } = match;
          const shape = descriptor.translationFunction;

          const kind: BindingKind | null =
            shape === 'content'
              ? 'content'
              : shape === 'return-value' || shape === 'destructured-t'
                ? 'translator'
                : null;

          if (!kind) return;

          const declaredVariables = sourceCode.getDeclaredVariables(node);
          const id = astNode['id'] as AstNode;

          if (kind === 'content') {
            // Every variable the pattern binds is content (the root object or a
            // destructured subtree of it), so all of them are worth checking.
            for (const variable of declaredVariables) {
              checkContentVariable(variable);
            }

            return;
          }

          if (shape === 'return-value') {
            if (id.type !== 'Identifier') return;

            const variable = findVariableForIdentifier(declaredVariables, id);

            if (variable) {
              checkTranslatorVariable(variable, descriptor.callerName);
            }

            return;
          }

          const translatorIdentifier = findTranslatorIdentifier(id);

          if (!translatorIdentifier) return;

          const variable = findVariableForIdentifier(
            declaredVariables,
            translatorIdentifier
          );

          if (variable) {
            checkTranslatorVariable(variable, descriptor.callerName);
          }
        },
      };
    },
  }
);
