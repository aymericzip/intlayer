import { describe, expect, it } from 'vitest';
import { findOutdatedIntlayerDependencies } from './intlayerDependencyUpgrades';

const packageJsonText = JSON.stringify(
  {
    name: 'app',
    scripts: { intlayer: 'intlayer build' },
    overrides: { intlayer: '^7.0.1' },
    dependencies: {
      intlayer: '^7.0.1',
      react: '^19.0.0',
      'react-intlayer': '~9.8.3',
      '@intlayer/core': 'workspace:*',
    },
    devDependencies: {
      '@intlayer/swc': '9.0.0',
      intlayer: '^7.0.1',
    },
  },
  null,
  2
);

const latestVersions = new Map<string, string | null>([
  ['intlayer', '9.8.3'],
  ['react-intlayer', '9.8.3'],
  ['@intlayer/swc', '9.8.3'],
]);

describe('findOutdatedIntlayerDependencies', () => {
  const outdated = findOutdatedIntlayerDependencies(
    packageJsonText,
    latestVersions
  );

  it('lists the dependencies older than latest, keeping the range operator', () => {
    expect(
      outdated.map(({ packageName, dependencyField, nextRange }) => ({
        packageName,
        dependencyField,
        nextRange,
      }))
    ).toEqual([
      {
        packageName: 'intlayer',
        dependencyField: 'dependencies',
        nextRange: '^9.8.3',
      },
      {
        packageName: '@intlayer/swc',
        dependencyField: 'devDependencies',
        nextRange: '9.8.3',
      },
      {
        packageName: 'intlayer',
        dependencyField: 'devDependencies',
        nextRange: '^9.8.3',
      },
    ]);
  });

  it('points at the range text of the dependency field entry', () => {
    const dependenciesStart = packageJsonText.indexOf('"dependencies"');
    const devDependenciesStart = packageJsonText.indexOf('"devDependencies"');

    for (const dependency of outdated) {
      expect(
        packageJsonText.slice(
          dependency.rangeStartOffset,
          dependency.rangeEndOffset
        )
      ).toBe(dependency.currentRange);
    }

    // Not the `overrides` entry declared before
    expect(outdated[0].rangeStartOffset).toBeGreaterThan(dependenciesStart);
    expect(outdated[2].rangeStartOffset).toBeGreaterThan(devDependenciesStart);
  });

  it('skips versions ahead of latest and unknown latest versions', () => {
    expect(
      findOutdatedIntlayerDependencies(
        JSON.stringify({
          dependencies: {
            intlayer: '^10.0.0-canary.1',
            'vue-intlayer': '1.0.0',
          },
        }),
        latestVersions
      )
    ).toEqual([]);
  });

  it('returns nothing for an unparsable package.json', () => {
    expect(
      findOutdatedIntlayerDependencies('{ "dependencies": {', latestVersions)
    ).toEqual([]);
  });
});
