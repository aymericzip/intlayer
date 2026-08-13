import type { JSRuleDefinition } from 'eslint';

const DOCUMENTATION_BASE_URL =
  'https://github.com/aymericzip/intlayer/blob/main/packages/eslint-plugin-intlayer/README.md';

/**
 * A rule of this plugin, with its option tuple and message ids pinned so
 * `context.options` and `context.report({ messageId })` are checked rather than
 * inferred as `any[]` / `string`.
 */
export type IntlayerRule<
  Options extends readonly unknown[] = [],
  MessageIds extends string = string,
> = JSRuleDefinition<{
  RuleOptions: [...Options];
  MessageIds: MessageIds;
}>;

/**
 * Build a rule with the plugin's shared metadata conventions applied: a
 * documentation anchor derived from the rule name, and `meta.schema` defaulting
 * to "no options" so an unknown option is rejected instead of ignored.
 *
 * @param name - The rule name as it appears in config, e.g. `'no-raw-text'`.
 * @param rule - The rule definition.
 */
export const createRule = <
  Options extends readonly unknown[] = [],
  MessageIds extends string = string,
>(
  name: string,
  rule: IntlayerRule<Options, MessageIds>
): IntlayerRule<Options, MessageIds> => ({
  ...rule,
  meta: {
    ...rule.meta,
    docs: {
      ...rule.meta?.docs,
      url: `${DOCUMENTATION_BASE_URL}#${name}`,
    },
    schema: rule.meta?.schema ?? [],
  },
});
