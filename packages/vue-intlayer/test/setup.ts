import { TextDecoder, TextEncoder } from 'node:util';
import { vi } from 'vitest';

/**
 * FIX for esbuild invariant violation.
 * 1. We force the native Node.js TextEncoder/Decoder.
 * 2. We force the global Uint8Array to be the native Node.js one.
 * * We extract the native constructor directly from a native instance to ensure
 * (new TextEncoder().encode("") instanceof Uint8Array) returns true.
 */
globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder as any;
globalThis.Uint8Array = new TextEncoder().encode('')
  .constructor as unknown as Uint8ArrayConstructor;

/**
 * Fix for esbuild invariant violation in JSDOM.
 * esbuild relies on "new TextEncoder().encode("") instanceof Uint8Array" being true.
 * In JSDOM, the global Uint8Array might differ from the one used by Node's TextEncoder.
 */
if (
  typeof globalThis.TextEncoder === 'undefined' ||
  !(new TextEncoder().encode('') instanceof Uint8Array)
) {
  Object.defineProperties(globalThis, {
    TextEncoder: { value: TextEncoder },
    TextDecoder: { value: TextDecoder },
    Uint8Array: { value: Uint8Array },
  });
}
