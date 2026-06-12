import {
  interpolateMessage,
  type MessageValues,
  resolveMessageNode,
} from '@intlayer/core/messageFormat';
import type { LocalesValues } from '@intlayer/types/module_augmentation';

/**
 * Splits a vue-i18n choice message (`'no car | one car | {count} cars'`)
 * into its parts, honoring escaped pipes (`\|`).
 */
export const splitChoices = (message: string): string[] =>
  message.split(/(?<!\\)\|/).map((part) => part.replace(/\\\|/g, '|').trim());

/**
 * vue-i18n's default choice rule:
 * - 2 choices: `1 | other` — 0 picks `other`, 1 picks the first part
 * - 3+ choices: `0 | 1 | other`
 */
export const getChoiceIndex = (
  choice: number,
  choicesLength: number
): number => {
  const absoluteChoice = Math.abs(choice);

  if (choicesLength === 2) {
    return absoluteChoice ? (absoluteChoice > 1 ? 1 : 0) : 1;
  }

  return absoluteChoice ? Math.min(absoluteChoice, 2) : 0;
};

/** Arguments parsed from vue-i18n's polymorphic `t()` signatures. */
export type ParsedTranslateArguments = {
  /** Named (`{name}`) or list (`{0}`) interpolation values. */
  values: MessageValues;
  /** Plural choice count, when a number argument was provided. */
  count?: number;
  /** Default message, when a string argument was provided. */
  defaultMessage?: string;
};

/**
 * Parses vue-i18n's polymorphic `t()` arguments:
 * `t(key)`, `t(key, count)`, `t(key, defaultMsg)`, `t(key, list)`,
 * `t(key, named)`, `t(key, named, count)`, `t(key, list, count)`, …
 */
export const parseTranslateArguments = (
  args: unknown[]
): ParsedTranslateArguments => {
  const parsed: ParsedTranslateArguments = { values: {} };

  for (const arg of args) {
    if (typeof arg === 'number') {
      parsed.count = arg;
    } else if (typeof arg === 'string') {
      parsed.defaultMessage = arg;
    } else if (Array.isArray(arg)) {
      // List interpolation: ['a', 'b'] → { 0: 'a', 1: 'b' }
      parsed.values = { ...arg.map(String) } as unknown as MessageValues;
    } else if (typeof arg === 'object' && arg !== null) {
      const objectArg = arg as MessageValues & { plural?: number };
      parsed.values = objectArg;
      if (typeof objectArg.plural === 'number') {
        parsed.count = objectArg.plural;
      }
    }
  }

  return parsed;
};

/**
 * Resolves a raw dictionary value the vue-i18n way: pipe-separated choice
 * messages (positional rule, not CLDR), named `{name}` and list `{0}`
 * interpolation, and intlayer nodes (`insert`, `plural`, `enu`) produced by
 * dictionaries built with `format: 'vue-i18n'`.
 */
export const resolveVueMessage = (
  value: unknown,
  values: MessageValues,
  count: number | undefined,
  locale: LocalesValues
): string => {
  const interpolationValues: MessageValues = { ...values };
  if (count !== undefined) {
    interpolationValues.count ??= count;
    interpolationValues.n ??= count;
  }

  if (typeof value === 'string') {
    let message = value;

    if (/(?<!\\)\|/.test(message)) {
      const parts = splitChoices(message);
      message = parts[getChoiceIndex(count ?? 1, parts.length)] ?? message;
    }

    return interpolateMessage(message, interpolationValues, locale);
  }

  const resolved = resolveMessageNode(value, interpolationValues, locale);

  return typeof resolved === 'string' ? resolved : String(resolved ?? '');
};
