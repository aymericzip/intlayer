import { intlayerIntlConfiguration } from '@intlayer/config';

const { locales } = intlayerIntlConfiguration;

export const generateStaticParams = () => locales.map((locale) => ({ locale }));
