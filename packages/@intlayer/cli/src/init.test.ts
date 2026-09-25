import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  getInitialInitSteps,
  getRoutingInitOptions,
  INIT_STEP_GROUPS,
  isEslintInstalled,
  LOCALE_ROUTING_CHOICES,
  OPT_IN_INIT_STEPS,
  parseLocaleRoutingChoice,
} from './init';

describe('getRoutingInitOptions', () => {
  it('routes through the proxy for a routing mode', () => {
    expect(getRoutingInitOptions('prefix-all')).toEqual({
      routingMode: 'prefix-all',
      enableProxy: true,
    });
  });

  it('disables the proxy when no locale routing is wanted', () => {
    expect(getRoutingInitOptions('none')).toEqual({
      routingMode: 'no-prefix',
      enableProxy: false,
    });
  });
});

describe('parseLocaleRoutingChoice', () => {
  it('accepts every offered choice', () => {
    for (const choice of LOCALE_ROUTING_CHOICES) {
      expect(parseLocaleRoutingChoice(choice)).toBe(choice);
    }
  });

  it('rejects an unknown choice', () => {
    expect(() => parseLocaleRoutingChoice('prefix')).toThrow(
      'Invalid --routing value'
    );
  });
});

describe('chromeExtension in init flow', () => {
  it('includes chromeExtension in DevTools step group', () => {
    const devTools = INIT_STEP_GROUPS.DevTools;
    const chromeExtensionOption = devTools.find(
      (opt) => opt.value === 'chromeExtension'
    );

    expect(chromeExtensionOption).toEqual({
      value: 'chromeExtension',
      label: 'Chrome extension',
      hint: 'for audit, debug and analysis purpose',
    });
  });

  it('is not selected by default (included in OPT_IN_INIT_STEPS)', () => {
    expect(OPT_IN_INIT_STEPS).toContain('chromeExtension');
  });
});

describe('isEslintInstalled', () => {
  it('detects eslint in dependencies', () => {
    expect(isEslintInstalled({ eslint: '^9.0.0' })).toBe(true);
  });

  it('detects oxlint in dependencies', () => {
    expect(isEslintInstalled({ oxlint: '^0.15.0' })).toBe(true);
  });

  it('returns false when no linting dependencies are present', () => {
    expect(isEslintInstalled({ react: '^19.0.0' })).toBe(false);
  });

  it('detects eslint config files on disk when root is provided', () => {
    const tmpDir = mkdtempSync(join(tmpdir(), 'eslint-test-'));
    try {
      expect(isEslintInstalled({}, tmpDir)).toBe(false);
      writeFileSync(join(tmpDir, 'eslint.config.mjs'), 'export default [];');
      expect(isEslintInstalled({}, tmpDir)).toBe(true);
    } finally {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});

describe('getInitialInitSteps', () => {
  it('preselects eslint when eslint is installed', () => {
    const steps = getInitialInitSteps({ eslint: '^9.0.0' });

    expect(steps).toContain('eslint');
    expect(steps).not.toContain('infra');
    expect(steps).not.toContain('chromeExtension');
  });

  it('does not preselect eslint when not installed', () => {
    const steps = getInitialInitSteps({ react: '^19.0.0' });

    expect(steps).not.toContain('eslint');
    expect(steps).not.toContain('infra');
    expect(steps).not.toContain('chromeExtension');
  });
});
