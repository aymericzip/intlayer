import type { LocalesValues } from '@intlayer/config';
import type { NextPage } from 'next';
import type { PropsWithChildren, ReactNode } from 'react';

export type LocalParams<T = {}> = {
  params: { locale: LocalesValues } & T;
};

export type LocalPromiseParams<T = {}> = {
  params: Promise<{ locale: LocalesValues } & T>;
};

export type Next14PageIntlayer<T = {}> = NextPage<LocalParams<T>>;
export type Next15PageIntlayer<T = {}> = (
  props: LocalPromiseParams<T>
) => ReactNode | Promise<ReactNode>;
export type NextPageIntlayer<T = {}> = Next15PageIntlayer<T>;

export type Next14LayoutIntlayer<T = {}> = NextPage<
  PropsWithChildren<LocalParams<T>>
>;
export type Next15LayoutIntlayer<T = {}> = (
  props: PropsWithChildren<LocalPromiseParams<T>>
) => ReactNode | Promise<ReactNode>;
export type NextLayoutIntlayer<T = {}> = Next15LayoutIntlayer<T>;
