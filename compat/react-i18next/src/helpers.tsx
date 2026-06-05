import type { i18n, TFunction } from 'i18next';
import * as React from 'react';
import { useTranslation } from './useTranslation';

// Context
export const I18nContext = React.createContext<{ i18n: i18n }>({
  i18n: null as unknown as i18n,
});

export interface TranslationProps {
  children: (
    t: TFunction,
    options: { i18n: i18n; lng: string },
    ready: boolean
  ) => React.ReactNode;
  ns?: string | string[];
  keyPrefix?: string;
}

// Translation Render-Prop Component
export const Translation = ({
  children,
  ns,
  keyPrefix,
}: TranslationProps): React.ReactElement => {
  const { t, i18n } = useTranslation(ns, { keyPrefix });
  return children(
    t as unknown as TFunction,
    { i18n: i18n as unknown as i18n, lng: i18n.language },
    true
  ) as React.ReactElement;
};

// nodesToString implementation
export const nodesToString = (
  children: React.ReactNode,
  _i18nOptions?: unknown,
  _i18n?: unknown,
  _i18nKey?: string
): string => {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }
  if (!children) return '';
  if (Array.isArray(children)) {
    return children.map((c) => nodesToString(c)).join('');
  }
  const childElement = children as React.ReactElement<{
    children?: React.ReactNode;
  }>;

  if (childElement.props?.children) {
    return nodesToString(childElement.props.children);
  }

  return '';
};

// Global Instance Getters/Setters
let globalI18n: i18n | null = null;
let globalDefaults: unknown = {};

export const setI18n = (instance: i18n): void => {
  globalI18n = instance;
};

export const getI18n = (): i18n => {
  return globalI18n as i18n;
};

export const setDefaults = (options: unknown): void => {
  globalDefaults = options;
};

export const getDefaults = (): unknown => {
  return globalDefaults;
};

// SSR Stubs
export const useSSR = (
  _initialI18nStore: unknown,
  _initialLanguage: string
): void => {};

export const withSSR = () => {
  const Hoc = <P extends object>(
    WrappedComponent: React.ComponentType<P>
  ): React.ComponentType<P> => {
    const Component = (props: P) => <WrappedComponent {...props} />;
    const ExtendedComponent = Component as typeof Component & {
      getInitialProps: (ctx: unknown) => Promise<Record<string, unknown>>;
    };
    ExtendedComponent.getInitialProps = async (_ctx: unknown) => ({});
    return ExtendedComponent;
  };
  return Hoc;
};

export const composeInitialProps =
  (_ForComponent: unknown) => async (_ctx: unknown) => ({});

export const getInitialProps = () => ({
  initialI18nStore: {},
  initialLanguage: 'en',
});
