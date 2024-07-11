import type { Locales } from 'intlayer';
import type { NextPage } from 'next';
import type { PropsWithChildren } from 'react';

export type LocalParams<T = undefined> = {
  params: { locale: Locales } & T;
};

export type NextPageIntlayer<T = undefined> = NextPage<LocalParams<T>>;
export type NextLayoutIntlayer<T = undefined> = NextPage<
  PropsWithChildren<LocalParams<T>>
>;
