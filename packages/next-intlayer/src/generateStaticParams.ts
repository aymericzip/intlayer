import configuration from '@intlayer/config/built';

const { locales } = configuration.internationalization;

export const generateStaticParams = () => locales.map((locale) => ({ locale }));
