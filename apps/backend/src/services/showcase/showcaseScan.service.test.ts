import { describe, expect, it } from 'vitest';
import { extractPackagesFromScript } from './showcaseScan.service';

// ─── extractPackagesFromScript ────────────────────────────────────────────────

describe('extractPackagesFromScript', () => {
  it('extracts intlayer version from a bundled script', () => {
    const script = `
      var x = {name:"intlayer",version:"3.1.0",doc:"https://intlayer.org/docs"};
    `;
    expect(extractPackagesFromScript(script)).toEqual({ intlayer: '3.1.0' });
  });

  it('extracts react-intlayer with single quotes', () => {
    const script = `window.__I18N__={name:'react-intlayer',version:'3.2.1'}`;
    expect(extractPackagesFromScript(script)).toEqual({
      'react-intlayer': '3.2.1',
    });
  });

  it('extracts @intlayer/core scoped package', () => {
    const script = `{name:"@intlayer/core",version:"3.0.0"}`;
    expect(extractPackagesFromScript(script)).toEqual({
      '@intlayer/core': '3.0.0',
    });
  });

  it('extracts multiple intlayer packages from one script', () => {
    const script = `
      {name:"intlayer",version:"3.5.0",doc:"https://intlayer.org/docs"}
      {name:"next-intlayer",version:"3.5.0"}
      {name:"@intlayer/config",version:"3.5.0"}
    `;
    expect(extractPackagesFromScript(script)).toEqual({
      intlayer: '3.5.0',
      'next-intlayer': '3.5.0',
      '@intlayer/config': '3.5.0',
    });
  });

  it('returns empty object for a script with no intlayer packages', () => {
    const script = `
      {name:"react",version:"18.0.0"}
      {name:"lodash",version:"4.17.21"}
    `;
    expect(extractPackagesFromScript(script)).toEqual({});
  });

  it('returns empty object for an empty string', () => {
    expect(extractPackagesFromScript('')).toEqual({});
  });

  it('handles whitespace around colons and commas', () => {
    const script = `{ name : "intlayer" , version : "3.0.0" }`;
    expect(extractPackagesFromScript(script)).toEqual({ intlayer: '3.0.0' });
  });

  it('strips leading non-digit characters from version', () => {
    // Some bundles include the raw semver range
    const script = `{name:"intlayer",version:"^3.1.0"}`;
    const result = extractPackagesFromScript(script);
    // The regex strips leading ^ so we get clean version
    expect(result.intlayer).toBe('3.1.0');
  });

  it('does not false-positive on a package called "not-intlayer-related"', () => {
    // Must contain the word "intlayer" to match
    const script = `{name:"some-unrelated-lib",version:"1.0.0"}`;
    expect(extractPackagesFromScript(script)).toEqual({});
  });

  it('extracts vue-intlayer', () => {
    const script = `{name:"vue-intlayer",version:"3.3.0"}`;
    expect(extractPackagesFromScript(script)).toEqual({
      'vue-intlayer': '3.3.0',
    });
  });
});
