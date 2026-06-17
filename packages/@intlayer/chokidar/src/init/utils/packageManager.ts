import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

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

  // next-intl — next.js only, ICU format
  if (isInstalled('next-intl')) {
    addIfMissing('@intlayer/next-intl');
    compatSyncConfig ??= {
      format: 'icu',
      sourceTemplate: './locales/${locale}/${key}.json',
    };
    // next config handled via updateNextConfigForNextIntl in init/index.ts
  }

  // next-i18next — next.js only, i18next JSON format
  if (isInstalled('next-i18next')) {
    addIfMissing('@intlayer/next-i18next');
    compatSyncConfig ??= {
      format: 'i18next',
      sourceTemplate: './src/locales/${locale}/${key}.json',
    };
    // next config handled via updateNextConfigForNextI18next in init/index.ts
  }

  // next-translate — next.js only, i18next-style flat-namespace JSON
  if (isInstalled('next-translate')) {
    addIfMissing('@intlayer/next-translate');
    compatSyncConfig ??= {
      format: 'i18next',
      sourceTemplate: './locales/${locale}/${key}.json',
    };
    // next config handled via updateNextConfigForNextTranslate in init/index.ts
  }

  // i18next — explicit import from @intlayer/i18next (no alias injection needed)
  if (isInstalled('i18next')) {
    addIfMissing('@intlayer/i18next');
    compatSyncConfig ??= {
      format: 'i18next',
      sourceTemplate: './src/locales/${locale}/${key}.json',
    };
  }

  // react-i18next — explicit import from @intlayer/react-i18next (no alias)
  if (isInstalled('react-i18next')) {
    addIfMissing('@intlayer/react-i18next');
    compatSyncConfig ??= {
      format: 'i18next',
      sourceTemplate: './src/locales/${locale}/${key}.json',
    };
  }

  // vue-i18n — vite alias injection required
  if (isInstalled('vue-i18n')) {
    addIfMissing('@intlayer/vue-i18n');
    compatSyncConfig ??= {
      format: 'vue-i18n',
      sourceTemplate: './locales/${locale}/${key}.json',
    };
    compatVitePluginConfig ??= {
      pluginFunctionName: 'vueI18nVitePlugin',
      pluginPackageSource: '@intlayer/vue-i18n/plugin',
    };
  }

  // react-intl — vite alias injection required, ICU format
  if (isInstalled('react-intl')) {
    addIfMissing('@intlayer/react-intl');
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
  if (isInstalled('@ngneat/transloco')) {
    addIfMissing('@intlayer/transloco');
    compatVitePluginConfig ??= {
      pluginFunctionName: 'translocoVitePlugin',
      pluginPackageSource: '@intlayer/transloco/plugin',
    };
  }

  // svelte-i18n — vite alias injection required, flat JSON (i18next-compatible)
  if (isInstalled('svelte-i18n')) {
    addIfMissing('@intlayer/svelte-i18n');
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
  if (isInstalled('node-polyglot')) {
    addIfMissing('@intlayer/polyglot');
    compatVitePluginConfig ??= {
      pluginFunctionName: 'polyglotVitePlugin',
      pluginPackageSource: '@intlayer/polyglot/plugin',
    };
  }

  // @nuxtjs/i18n — nuxt module (no vite plugin), vue-i18n JSON format
  if (isInstalled('@nuxtjs/i18n')) {
    addIfMissing('@intlayer/nuxtjs-i18n');
    compatSyncConfig ??= {
      format: 'vue-i18n',
      sourceTemplate: './locales/${locale}/${key}.json',
    };
    // nuxt config handled via updateNuxtConfigForNuxtjsI18n in init/index.ts
  }

  // @ngx-translate/core — vite alias injection required, flat JSON (i18next)
  if (isInstalled('@ngx-translate/core')) {
    addIfMissing('@intlayer/ngx-translate');
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
  if (isInstalled('@lingui/core') || isInstalled('@lingui/react')) {
    addIfMissing('@intlayer/lingui');
    compatVitePluginConfig ??= {
      pluginFunctionName: 'linguiVitePlugin',
      pluginPackageSource: '@intlayer/lingui/plugin',
    };
  }

  // i18n-js — vite alias injection required
  // @todo syncJSON format not yet implemented for i18n-js
  if (isInstalled('i18n-js')) {
    addIfMissing('@intlayer/i18n-js');
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
