import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { compareVersions } from '@intlayer/config/utils';

/** Package managers supported for dependency installation. */
export type PackageManager = 'bun' | 'pnpm' | 'yarn' | 'npm';

/**
 * Configuration for the syncJSON plugin injected into intlayer.config
 * when a compat i18n library is detected.
 */
export type CompatSyncConfig = {
  /** JSON format matching the compat library's conventions. */
  format: 'icu' | 'i18next' | 'vue-i18n';
  /**
   * Source path template using ${locale} and ${key} placeholders.
   * Rendered as a template literal in the generated config.
   */
  sourceTemplate: string;
  /**
   * Force `splitKeys: true` in the generated `syncJSON(...)` call so each
   * top-level key of a single per-locale file becomes its own dictionary.
   *
   * Set for libraries whose single `messages/${locale}.json` file groups
   * namespaces by its first-level keys (`next-intl` / `use-intl`, where
   * `useTranslations('Hero')` resolves to the `Hero` dictionary). Left
   * undefined for libraries whose top-level keys are plain message keys
   * (e.g. `i18next`, `react-intl`); for those, syncJSON's auto-detection
   * (split only when the source has no `${key}` segment) stays in control.
   *
   * Only meaningful for flat templates (no `${key}` segment); it is dropped
   * automatically when the resolved template addresses one namespace per file.
   */
  splitKeys?: boolean;
};

/**
 * Configuration for injecting a compat vite plugin into vite.config.
 * The plugin replaces the generic `intlayer` plugin for libraries that
 * require alias injection (e.g. `vue-i18n` → `@intlayer/vue-i18n`).
 */
export type CompatVitePluginConfig = {
  /** Exported function name from the plugin package, e.g. `'vueI18nVitePlugin'`. */
  pluginFunctionName: string;
  /** Import path for the plugin package, e.g. `'@intlayer/vue-i18n/plugin'`. */
  pluginPackageSource: string;
  /**
   * Set when the compat plugin is a drop-in replacement for an i18n library's
   * own Vite plugin (e.g. lingui ships `@lingui/vite-plugin`). When the original
   * import is present, init rewrites only that import's module source to
   * `pluginPackageSource` — keeping the binding and its call site — instead of
   * injecting a second import and appending another plugin to the array.
   */
  replacesVitePlugin?: {
    /** Imported binding to keep, e.g. `'lingui'`. */
    importName: string;
    /** Original package source to rewrite, e.g. `'@lingui/vite-plugin'`. */
    fromPackageSource: string;
  };
};

/** Result of analyzing project dependencies for intlayer package gaps. */
export type IntlayerPackageAnalysis = {
  /** Intlayer packages that are referenced but not yet installed. */
  packagesToInstall: string[];
  /** Intlayer dev packages that are referenced but not yet installed. */
  devPackagesToInstall: string[];
  /**
   * syncJSON plugin configuration to inject when a compat i18n library is
   * detected. Undefined when no compat library is present or format is not
   * yet implemented.
   */
  compatSyncConfig: CompatSyncConfig | undefined;
  /**
   * Vite config plugin to inject when a vite-based compat library is
   * detected. Undefined for Next.js/Nuxt-only compat libs or when no compat
   * library requires alias injection.
   */
  compatVitePluginConfig: CompatVitePluginConfig | undefined;
};

/**
 * Detects the package manager in use by checking for lock files in the
 * project root. Falls back to npm when no lock file is found.
 */
export const detectPackageManager = (rootDir: string): PackageManager => {
  if (
    existsSync(join(rootDir, 'bun.lock')) ||
    existsSync(join(rootDir, 'bun.lockb'))
  ) {
    return 'bun';
  }
  if (existsSync(join(rootDir, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }
  if (existsSync(join(rootDir, 'yarn.lock'))) {
    return 'yarn';
  }
  return 'npm';
};

/**
 * Returns the install command for the given package manager and package list.
 */
const buildInstallCommand = (
  packageManager: PackageManager,
  packages: string[],
  isDev: boolean = false
): string => {
  const packageList = packages.join(' ');
  switch (packageManager) {
    case 'bun':
      return `bun add ${isDev ? '-d ' : ''}${packageList}`;
    case 'pnpm':
      return `pnpm add ${isDev ? '-D ' : ''}${packageList}`;
    case 'yarn':
      return `yarn add ${isDev ? '-D ' : ''}${packageList}`;
    case 'npm':
      return `npm install ${isDev ? '-D ' : ''}${packageList}`;
  }
};

/**
 * Analyzes existing project dependencies to determine which intlayer packages
 * are missing and what syncJSON configuration to inject when compat i18n
 * libraries are present.
 */
export const detectMissingIntlayerPackages = (
  allDependencies: Record<string, string>
): IntlayerPackageAnalysis => {
  const packagesToInstall: string[] = [];
  const devPackagesToInstall: string[] = [];
  let compatSyncConfig: CompatSyncConfig | undefined;
  let compatVitePluginConfig: CompatVitePluginConfig | undefined;

  const isInstalled = (packageName: string): boolean =>
    Boolean(allDependencies[packageName]);

  const addIfMissing = (packageName: string): void => {
    if (!isInstalled(packageName)) {
      packagesToInstall.push(packageName);
    }
  };

  const addDevIfMissing = (packageName: string): void => {
    if (!isInstalled(packageName)) {
      devPackagesToInstall.push(packageName);
    }
  };

  // Core package — always required
  addIfMissing('intlayer');

  // Framework-specific runtime integrations
  if (isInstalled('next')) {
    addIfMissing('next-intlayer');
  } else if (isInstalled('react')) {
    addIfMissing('react-intlayer');
  }

  // React Native / Expo — the Metro plugin lives in react-native-intlayer,
  // installed as a dev dependency (it is only used by the bundler).
  if (isInstalled('react-native') || isInstalled('expo')) {
    addDevIfMissing('react-native-intlayer');
  }

  if (isInstalled('svelte')) {
    addIfMissing('svelte-intlayer');
  }

  if (isInstalled('solid-js')) {
    addIfMissing('solid-intlayer');
  }

  if (isInstalled('@angular/core')) {
    addIfMissing('angular-intlayer');
  }

  if (isInstalled('vue')) {
    addIfMissing('vue-intlayer');
  }

  if (isInstalled('vite')) {
    addIfMissing('vite-intlayer');
  }

  // -------------------------------------------------------------------------
  // Compat adapters for existing i18n libraries.
  //
  // Detection order matters: more specific libraries are checked first so that
  // `compatSyncConfig ??=` and `compatVitePluginConfig ??=` capture the most
  // relevant match.  Libraries that only affect the Next.js or Nuxt config do
  // not set `compatVitePluginConfig` (handled separately in init/index.ts).
  // Libraries whose JSON format is not yet supported leave `compatSyncConfig`
  // undefined so no syncJSON plugin is injected.
  // -------------------------------------------------------------------------

  // next-intl — next.js only, ICU format. Default layout is a single file per
  // locale (`messages/${locale}.json`) whose top-level keys are namespaces;
  // syncJSON `splitKeys` auto-detection (no `${key}` segment) turns each
  // top-level key into its own dictionary. The exact path is refined from
  // `i18n/request.ts` in init/index.ts when present.
  if (isInstalled('next-intl') || isInstalled('@intlayer/next-intl')) {
    addIfMissing('@intlayer/next-intl');
    addIfMissing('next-intl');
    compatSyncConfig ??= {
      format: 'icu',
      sourceTemplate: './messages/${locale}.json',
      // next-intl groups namespaces by the first-level keys of one file.
      splitKeys: true,
    };
    // next config handled via updateNextConfigForNextIntl in init/index.ts
  }

  // next-i18next — next.js only, i18next JSON format
  if (isInstalled('next-i18next') || isInstalled('@intlayer/next-i18next')) {
    addIfMissing('@intlayer/next-i18next');
    addIfMissing('next-i18next');
    compatSyncConfig ??= {
      format: 'i18next',
      sourceTemplate: './src/locales/${locale}/${key}.json',
    };
    // next config handled via updateNextConfigForNextI18next in init/index.ts
  }

  // next-translate — next.js only, i18next-style flat-namespace JSON
  if (
    isInstalled('next-translate') ||
    isInstalled('@intlayer/next-translate')
  ) {
    addIfMissing('@intlayer/next-translate');
    addIfMissing('next-translate');
    compatSyncConfig ??= {
      format: 'i18next',
      sourceTemplate: './locales/${locale}/${key}.json',
    };
    // next config handled via updateNextConfigForNextTranslate in init/index.ts
  }

  // i18next — explicit import from @intlayer/i18next (no alias injection needed)
  if (isInstalled('i18next') || isInstalled('@intlayer/i18next')) {
    addIfMissing('@intlayer/i18next');
    // Ensure the required peer dependency is installed
    addIfMissing('i18next');
    compatSyncConfig ??= {
      format: 'i18next',
      sourceTemplate: './src/locales/${locale}/${key}.json',
    };
  }

  // react-i18next — explicit import from @intlayer/react-i18next (no alias)
  if (isInstalled('react-i18next') || isInstalled('@intlayer/react-i18next')) {
    addIfMissing('@intlayer/react-i18next');
    // Ensure the required peer dependency is installed
    addIfMissing('react-i18next');
    compatSyncConfig ??= {
      format: 'i18next',
      sourceTemplate: './src/locales/${locale}/${key}.json',
    };
  }

  // vue-i18n — vite alias injection required
  if (isInstalled('vue-i18n') || isInstalled('@intlayer/vue-i18n')) {
    addIfMissing('@intlayer/vue-i18n');
    addIfMissing('vue-i18n');
    compatSyncConfig ??= {
      format: 'vue-i18n',
      sourceTemplate: './locales/${locale}/${key}.json',
    };
    compatVitePluginConfig ??= {
      pluginFunctionName: 'vueI18nVitePlugin',
      pluginPackageSource: '@intlayer/vue-i18n/plugin',
    };
  }

  // use-intl — framework-agnostic React core of next-intl; vite alias
  // injection required, ICU format. Commonly a single `messages/${locale}.json`
  // file whose top-level keys are namespaces, handled by syncJSON `splitKeys`
  // auto-detection (no `${key}` segment in the source template).
  if (isInstalled('use-intl') || isInstalled('@intlayer/use-intl')) {
    addIfMissing('@intlayer/use-intl');
    addIfMissing('use-intl');
    compatSyncConfig ??= {
      format: 'icu',
      sourceTemplate: './messages/${locale}.json',
      // use-intl (the core of next-intl) uses the same single-file namespace model.
      splitKeys: true,
    };
    compatVitePluginConfig ??= {
      pluginFunctionName: 'useIntlVitePlugin',
      pluginPackageSource: '@intlayer/use-intl/plugin',
    };
  }

  // react-intl — vite alias injection required, ICU format
  if (isInstalled('react-intl') || isInstalled('@intlayer/react-intl')) {
    addIfMissing('@intlayer/react-intl');
    addIfMissing('react-intl');
    compatSyncConfig ??= {
      format: 'icu',
      sourceTemplate: './src/i18n/${locale}.json',
    };
    compatVitePluginConfig ??= {
      pluginFunctionName: 'reactIntlVitePlugin',
      pluginPackageSource: '@intlayer/react-intl/plugin',
    };
  }

  // @ngneat/transloco — vite alias injection required
  // @todo syncJSON format not yet implemented for transloco
  if (isInstalled('@ngneat/transloco') || isInstalled('@intlayer/transloco')) {
    addIfMissing('@intlayer/transloco');
    addIfMissing('@ngneat/transloco');
    compatVitePluginConfig ??= {
      pluginFunctionName: 'translocoVitePlugin',
      pluginPackageSource: '@intlayer/transloco/plugin',
    };
  }

  // svelte-i18n — vite alias injection required, flat JSON (i18next-compatible)
  if (isInstalled('svelte-i18n') || isInstalled('@intlayer/svelte-i18n')) {
    addIfMissing('@intlayer/svelte-i18n');
    addIfMissing('svelte-i18n');
    compatSyncConfig ??= {
      format: 'i18next',
      sourceTemplate: './src/locales/${locale}.json',
    };
    compatVitePluginConfig ??= {
      pluginFunctionName: 'svelteI18nVitePlugin',
      pluginPackageSource: '@intlayer/svelte-i18n/plugin',
    };
  }

  // node-polyglot — vite alias injection required
  // @todo syncJSON format not yet implemented for polyglot
  if (isInstalled('node-polyglot') || isInstalled('@intlayer/polyglot')) {
    addIfMissing('@intlayer/polyglot');
    addIfMissing('node-polyglot');
    compatVitePluginConfig ??= {
      pluginFunctionName: 'polyglotVitePlugin',
      pluginPackageSource: '@intlayer/polyglot/plugin',
    };
  }

  // @nuxtjs/i18n — nuxt module (no vite plugin), vue-i18n JSON format
  if (isInstalled('@nuxtjs/i18n') || isInstalled('@intlayer/nuxtjs-i18n')) {
    addIfMissing('@intlayer/nuxtjs-i18n');
    addIfMissing('@nuxtjs/i18n');
    compatSyncConfig ??= {
      format: 'vue-i18n',
      sourceTemplate: './locales/${locale}/${key}.json',
    };
    // nuxt config handled via updateNuxtConfigForNuxtjsI18n in init/index.ts
  }

  // @ngx-translate/core — vite alias injection required, flat JSON (i18next)
  if (
    isInstalled('@ngx-translate/core') ||
    isInstalled('@intlayer/ngx-translate')
  ) {
    addIfMissing('@intlayer/ngx-translate');
    addIfMissing('@ngx-translate/core');
    compatSyncConfig ??= {
      format: 'i18next',
      sourceTemplate: './assets/i18n/${locale}.json',
    };
    compatVitePluginConfig ??= {
      pluginFunctionName: 'ngxTranslateVitePlugin',
      pluginPackageSource: '@intlayer/ngx-translate/plugin',
    };
  }

  // @lingui/core — vite alias injection required
  // @todo syncJSON format not yet implemented for lingui (uses PO files)
  if (
    isInstalled('@lingui/core') ||
    isInstalled('@lingui/react') ||
    isInstalled('@intlayer/lingui')
  ) {
    addIfMissing('@intlayer/lingui');
    addIfMissing('@lingui/core');
    compatVitePluginConfig ??= {
      // `@intlayer/lingui/plugin` exports `lingui` as a drop-in replacement for
      // `@lingui/vite-plugin`, so a fresh project gets `lingui()` injected and a
      // project already using `@lingui/vite-plugin` only has its import source
      // rewritten (see `replacesVitePlugin`).
      pluginFunctionName: 'lingui',
      pluginPackageSource: '@intlayer/lingui/plugin',
      replacesVitePlugin: {
        importName: 'lingui',
        fromPackageSource: '@lingui/vite-plugin',
      },
    };
  }

  // i18n-js — vite alias injection required
  // @todo syncJSON format not yet implemented for i18n-js
  if (isInstalled('i18n-js') || isInstalled('@intlayer/i18n-js')) {
    addIfMissing('@intlayer/i18n-js');
    addIfMissing('i18n-js');
    compatVitePluginConfig ??= {
      pluginFunctionName: 'i18nJsVitePlugin',
      pluginPackageSource: '@intlayer/i18n-js/plugin',
    };
  }

  if (compatSyncConfig) {
    addDevIfMissing('@intlayer/sync-json-plugin');
  }

  return {
    packagesToInstall,
    devPackagesToInstall,
    compatSyncConfig,
    compatVitePluginConfig,
  };
};

/**
 * Runs the package install command synchronously.
 * Throws if the install process exits with a non-zero code.
 */
export const installPackages = (
  rootDir: string,
  packages: string[],
  packageManager: PackageManager,
  isDev: boolean = false
): void => {
  const command = buildInstallCommand(packageManager, packages, isDev);
  execSync(command, { cwd: rootDir, stdio: 'inherit' });
};

/**
 * Determines whether a dependency name belongs to the Intlayer ecosystem.
 *
 * Matches the core `intlayer` package, every scoped `@intlayer/*` package
 * (including compat adapters such as `@intlayer/next-intl`) and the framework
 * runtime integrations that follow the `<framework>-intlayer` convention
 * (e.g. `next-intlayer`, `react-intlayer`, `express-intlayer`).
 */
export const isIntlayerPackageName = (packageName: string): boolean =>
  packageName === 'intlayer' ||
  packageName.startsWith('@intlayer/') ||
  /-intlayer$/.test(packageName);

/**
 * Reduces a semver range or full version to its `major.minor.patch` core,
 * stripping range prefixes (`^`, `~`), pre-release identifiers and build
 * metadata. Returns `null` when no `major.minor.patch` can be extracted.
 *
 * @example normalizeVersion('^9.0.0-canary.3') // '9.0.0'
 */
export const normalizeVersion = (version?: string): string | null => {
  if (!version || typeof version !== 'string') return null;
  const match = version.match(/(\d+)\.(\d+)\.(\d+)/);
  return match ? `${match[1]}.${match[2]}.${match[3]}` : null;
};

/**
 * Reads the installed version of a package from its `package.json` inside the
 * project's `node_modules`. Returns `null` when the package is not installed or
 * its manifest cannot be read.
 */
export const getInstalledPackageVersion = (
  rootDir: string,
  packageName: string
): string | null => {
  try {
    const manifestPath = join(
      rootDir,
      'node_modules',
      packageName,
      'package.json'
    );
    if (!existsSync(manifestPath)) return null;
    const { version } = JSON.parse(readFileSync(manifestPath, 'utf-8'));
    return typeof version === 'string' ? version : null;
  } catch {
    return null;
  }
};

/**
 * Returns the Intlayer packages from `dependencies` whose installed version is
 * behind `targetVersion` (compared on `major.minor.patch`). Packages that are
 * not installed yet are ignored — those are handled by
 * {@link detectMissingIntlayerPackages}.
 */
export const detectOutdatedIntlayerPackages = (
  rootDir: string,
  dependencies: Record<string, string>,
  targetVersion: string
): string[] => {
  const normalizedTarget = normalizeVersion(targetVersion);
  if (!normalizedTarget) return [];

  return Object.keys(dependencies)
    .filter(isIntlayerPackageName)
    .filter((packageName) => {
      const installedVersion = getInstalledPackageVersion(rootDir, packageName);
      const normalizedInstalled = normalizeVersion(
        installedVersion ?? undefined
      );
      if (!normalizedInstalled) return false;
      return compareVersions(normalizedInstalled, '<', normalizedTarget);
    });
};

/**
 * Upgrades the given packages to `targetVersion` synchronously, preserving the
 * dependency type via the `isDev` flag. Throws if the install process exits
 * with a non-zero code.
 */
export const upgradePackages = (
  rootDir: string,
  packages: string[],
  packageManager: PackageManager,
  targetVersion: string,
  isDev: boolean = false
): void => {
  if (packages.length === 0) return;
  const versionedPackages = packages.map(
    (packageName) => `${packageName}@${targetVersion}`
  );
  const command = buildInstallCommand(packageManager, versionedPackages, isDev);
  execSync(command, { cwd: rootDir, stdio: 'inherit' });
};
