import type { Locales } from 'intlayer';
import type { NextPage } from 'next';
import type { PropsWithChildren } from 'react';

export type LocalParams = {
  params: { locale: Locales };
};

export type NextPageIntlayer = NextPage<LocalParams>;
export type NextLayoutIntlayer = NextPage<PropsWithChildren<LocalParams>>;
