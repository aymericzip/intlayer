import { getConfiguration } from '@intlayer/config/client';

const { locales } = getConfiguration().internationalization;

export const generateStaticParams = () => locales.map((locale) => ({ locale }));
