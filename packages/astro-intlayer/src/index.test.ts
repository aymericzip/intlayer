// @vitest-environment node

import { describe, expect, it } from 'vitest';
import intlayerDefault, { intlayer } from './index';

describe('astro-intlayer entry point', () => {
  // `astro add astro-intlayer` codemods the Astro config with a default
  // import, so losing the default export silently breaks that install path.
  it('exposes the integration as both the named and the default export', () => {
    expect(intlayerDefault).toBe(intlayer);
  });

  it('creates an integration named after the package', () => {
    expect(intlayer().name).toBe('astro-intlayer');
  });
});
