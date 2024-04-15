import { intlayerIntlConfiguration } from '@intlayer/config/client';

const { locales } = intlayerIntlConfiguration;

export const generateStaticParams = () => locales.map((locale) => ({ locale }));
