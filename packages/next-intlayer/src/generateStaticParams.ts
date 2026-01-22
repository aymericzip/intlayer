import configuration from '@intlayer/config/built';

const { locales } = configuration.internationalization;

/**
 * Generates static parameters for Next.js's dynamic routes based on the configured locales.
 *
 * This function is typically used in Next.js App Router for `generateStaticParams`
 * to ensure all supported locales are pre-rendered at build time.
 *
 * @returns An array of objects containing the `locale` parameter for each configured locale.
 *
 * @example
 * ```tsx
 * // app/[locale]/layout.tsx
 * export { generateStaticParams } from 'next-intlayer';
 *
 * export default async function RootLayout({ children, params }) {
 *   // ...
 * }
 * ```
 */
export const generateStaticParams = () => locales.map((locale) => ({ locale }));
