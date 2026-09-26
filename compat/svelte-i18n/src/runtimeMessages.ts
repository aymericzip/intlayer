import { navigatePath } from '@intlayer/core/messageFormat';
import { type Writable, writable } from 'svelte/store';
import type { LocalesDictionary } from './types';

/**
 * `$dictionary` — messages registered at runtime through `addMessages()` /
 * `register()`. Intlayer dictionaries never go through this store.
 */
export const dictionary: Writable<LocalesDictionary> = writable({});

/** Turns a raw ICU string into an intlayer node tree. */
type MessageCompiler = (message: string) => unknown;

/**
 * ICU compiler for runtime messages, installed by `addMessages()`.
 *
 * Only runtime messages can hold raw ICU (`{count, plural, …}`): intlayer
 * dictionaries are converted at build time. Keeping the parser behind this
 * hook lets bundlers drop it from apps that never register runtime messages.
 */
let messageCompiler: MessageCompiler | undefined;

/** Compiled node per raw ICU string. */
const compiledMessages = new Map<string, unknown>();

export const setMessageCompiler = (compiler: MessageCompiler): void => {
  messageCompiler = compiler;
};

/**
 * Reads a runtime message, compiling raw ICU strings when the compiler is
 * installed. Returns `undefined` when the id is not registered.
 */
export const lookupRuntimeMessage = (
  messages: LocalesDictionary,
  targetLocale: string,
  id: string
): unknown => {
  const localeMessages = messages[targetLocale];
  if (!localeMessages) return undefined;

  const message = navigatePath(localeMessages, id);
  if (typeof message !== 'string' || !messageCompiler) return message;

  let compiled = compiledMessages.get(message);
  if (compiled === undefined) {
    compiled = messageCompiler(message);
    compiledMessages.set(message, compiled);
  }
  return compiled;
};
