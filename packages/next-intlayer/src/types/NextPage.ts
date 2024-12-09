import type { Locales } from 'intlayer';
import type { NextPage } from 'next';
import type { PropsWithChildren, ReactNode } from 'react';

export type LocalParams<T = undefined> = {
  params: { locale: Locales } & T;
};

export type LocalPromiseParams<T = undefined> = {
  params: Promise<{ locale: Locales } & T>;
};

export type Next14PageIntlayer<T = undefined> = NextPage<LocalParams<T>>;
export type Next15PageIntlayer<T = undefined> = (
  props: LocalPromiseParams<T>
) => ReactNode | Promise<ReactNode>;
export type NextPageIntlayer<T = undefined> = Next15PageIntlayer<T>;

export type Next14LayoutIntlayer<T = undefined> = NextPage<
  PropsWithChildren<LocalParams<T>>
>;
export type Next15LayoutIntlayer<T = undefined> = (
  props: PropsWithChildren<LocalPromiseParams<T>>
) => ReactNode | Promise<ReactNode>;
export type NextLayoutIntlayer<T = undefined> = Next15LayoutIntlayer<T>;
