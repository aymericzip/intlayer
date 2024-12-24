'use client';

import {
  type FC,
  type PropsWithChildren,
  createContext,
  useContext,
} from 'react';
import { usePersistedStore } from '../../hooks';

export type PackageManager = 'npm' | 'pnpm' | 'yarn';
export type CodeFormat = 'typescript' | 'commonjs' | 'esm';
export type ContentDeclarationFormat =
  | 'typescript'
  | 'commonjs'
  | 'esm'
  | 'json';

type CodeContextValue = {
  packageManager: PackageManager;
  setPackageManager: (packageManager: PackageManager) => void;
  codeFormat: CodeFormat;
  setCodeFormat: (codeFormat: CodeFormat) => void;
  contentDeclarationFormat: ContentDeclarationFormat;
  setContentDeclarationFormat: (
    contentDeclarationFormat: ContentDeclarationFormat
  ) => void;
};

/**
 * Context that store the current locale on the client side
 */
export const CodeContext = createContext<CodeContextValue>({
  packageManager: 'npm',
  setPackageManager: () => {},
  codeFormat: 'typescript',
  setCodeFormat: () => {},
  contentDeclarationFormat: 'typescript',
  setContentDeclarationFormat: () => {},
});

/**
 * Hook that provides the current locale
 */
export const useCodeContext = () => useContext(CodeContext);

/**
 * Provider that store the current locale on the client side
 */
export const CodeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [packageManager, setPackageManager] = usePersistedStore<PackageManager>(
    'packageManager',
    'npm'
  );
  const [codeFormat, setCodeFormat] = usePersistedStore<CodeFormat>(
    'codeFormat',
    'typescript'
  );
  const [contentDeclarationFormat, setContentDeclarationFormat] =
    usePersistedStore<ContentDeclarationFormat>(
      'contentDeclarationFormat',
      'typescript'
    );

  return (
    <CodeContext.Provider
      value={{
        packageManager,
        setPackageManager,
        codeFormat,
        setCodeFormat,
        contentDeclarationFormat,
        setContentDeclarationFormat,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
};
