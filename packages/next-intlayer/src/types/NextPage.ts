import type { Locales } from 'intlayer';
import type { NextPage } from 'next';
import type { PropsWithChildren } from 'react';

export type LocalParams<T = undefined> = {
  params: { locale: Locales } & T;
};

export type LocalPromiseParams<T = undefined> = {
  params: Promise<{ locale: Locales } & T>;
};

export type Next14PageIntlayer<T = undefined> = NextPage<LocalParams<T>>;
export type Next15PageIntlayer<T = undefined> = NextPage<LocalPromiseParams<T>>;
export type NextPageIntlayer<T = undefined> = Next15PageIntlayer<T>;
export type NextLayoutIntlayer<T = undefined> = NextPage<
  PropsWithChildren<LocalParams<T>>
>;
