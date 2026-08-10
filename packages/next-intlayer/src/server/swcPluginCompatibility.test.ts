import { describe, expect, it } from 'vitest';
import {
  getIsSwcPluginSupported,
  MINIMUM_SWC_PLUGIN_NEXT_VERSION,
} from './swcPluginCompatibility';

/**
 * The expectations below are not a restatement of the implementation: each was
 * verified by attaching the built `intlayer_swc_plugin.wasm` to the matching
 * `@next/swc` native binding and running a transform. Hosts older than the
 * floor abort the build with `failed to invoke plugin`, so a regression here
 * means broken user builds rather than a merely unoptimised bundle.
 */
describe('getIsSwcPluginSupported', () => {
  describe('hosts on the rkyv plugin ABI, which cannot load the plugin', () => {
    it.each(['14.0.0', '14.2.35', '15.0.0', '15.5.18', '16.0.0', '16.0.4'])(
      'rejects Next.js %s',
      (nextVersion) => {
        expect(getIsSwcPluginSupported(nextVersion)).toBe(false);
      }
    );
  });

  describe('hosts on the forward-compatible CBOR plugin ABI', () => {
    it.each(['16.1.0', '16.1.7', '16.2.12', '16.3.0', '17.0.0'])(
      'accepts Next.js %s',
      (nextVersion) => {
        expect(getIsSwcPluginSupported(nextVersion)).toBe(true);
      }
    );
  });

  it('accepts pre-releases of a supported version', () => {
    expect(getIsSwcPluginSupported('16.3.0-preview.5')).toBe(true);
  });

  it('rejects pre-releases of an unsupported version', () => {
    expect(getIsSwcPluginSupported('16.0.0-canary.12')).toBe(false);
  });

  it('accepts the documented floor itself', () => {
    expect(getIsSwcPluginSupported(MINIMUM_SWC_PLUGIN_NEXT_VERSION)).toBe(true);
  });
});
