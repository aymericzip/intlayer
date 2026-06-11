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
  format: 'icu' | 'i18next';
  /**
   * Source path template using ${locale} and ${key} placeholders.
   * Rendered as a template literal in the generated config.
   */
  sourceTemplate: string;
};

/** Result of analyzing project dependencies for intlayer package gaps. */
export type IntlayerPackageAnalysis = {
  /** Intlayer packages that are referenced but not yet installed. */
  packagesToInstall: string[];
  /**
   * syncJSON plugin configuration to inject when a compat i18n library is
   * detected. Undefined when no compat library is present.
   */
  compatSyncConfig: CompatSyncConfig | undefined;
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
  packages: string[]
): string => {
  const packageList = packages.join(' ');
  switch (packageManager) {
    case 'bun':
      return `bun add ${packageList}`;
    case 'pnpm':
      return `pnpm add ${packageList}`;
    case 'yarn':
      return `yarn add ${packageList}`;
    case 'npm':
      return `npm install ${packageList}`;
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
  let compatSyncConfig: CompatSyncConfig | undefined;

  const isInstalled = (packageName: string): boolean =>
    Boolean(allDependencies[packageName]);

  const addIfMissing = (packageName: string): void => {
    if (!isInstalled(packageName)) {
      packagesToInstall.push(packageName);
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

  // Compat adapters for existing i18n libraries
  if (isInstalled('next-intl')) {
    addIfMissing('@intlayer/next-intl');
    compatSyncConfig ??= {
      format: 'icu',
      sourceTemplate: './locales/${locale}/${key}.json',
    };
  }

  if (isInstalled('i18next')) {
    addIfMissing('@intlayer/i18next');
    compatSyncConfig ??= {
      format: 'i18next',
      sourceTemplate: './src/locales/${locale}/${key}.json',
    };
  }

  if (isInstalled('react-i18next')) {
    addIfMissing('@intlayer/react-i18next');
    compatSyncConfig ??= {
      format: 'i18next',
      sourceTemplate: './src/locales/${locale}/${key}.json',
    };
  }

  if (isInstalled('next-i18next')) {
    addIfMissing('@intlayer/next-i18next');
    compatSyncConfig ??= {
      format: 'i18next',
      sourceTemplate: './src/locales/${locale}/${key}.json',
    };
  }

  if (isInstalled('vue-i18n')) {
    addIfMissing('@intlayer/vue-i18n');
    compatSyncConfig ??= {
      format: 'i18next',
      sourceTemplate: './src/locales/${locale}/${key}.json',
    };
  }

  if (compatSyncConfig) {
    addIfMissing('@intlayer/sync-json-plugin');
  }

  return { packagesToInstall, compatSyncConfig };
};

/**
 * Runs the package install command synchronously.
 * Throws if the install process exits with a non-zero code.
 */
export const installPackages = (
  rootDir: string,
  packages: string[],
  packageManager: PackageManager
): void => {
  const command = buildInstallCommand(packageManager, packages);
  execSync(command, { cwd: rootDir, stdio: 'inherit' });
};
