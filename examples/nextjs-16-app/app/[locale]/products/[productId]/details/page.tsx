import type { NextPageIntlayer } from 'next-intlayer';
import { useIntlayer } from 'next-intlayer/server';
import { LocaleSwitcher } from '@/components/LocaleSwitcher/LocaleSwitcher';

// Generate static params for product pages at build time
export function generateStaticParams() {
  // Example product IDs to pre-generate at build time
  // In a real app, you would fetch these from your database or API
  return [
    { productId: 'product-1' },
    { productId: 'product-2' },
    { productId: 'product-3' },
    { productId: 'laptop-123' },
    { productId: 'phone-456' },
  ];
}

const ProductIdPageContent = ({ productId }: { productId: string }) => {
  const content = useIntlayer('product-id-page');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="fixed top-4 right-4 z-50">
        <LocaleSwitcher />
      </div>
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center bg-white px-16 py-32 dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="font-semibold text-3xl text-black leading-10 tracking-tight dark:text-zinc-50">
            {content.productPage}
          </h1>
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="font-medium text-sm text-zinc-600 dark:text-zinc-400">
              {content.productIdSlug}
            </p>
            <p className="mt-2 font-bold font-mono text-black text-lg dark:text-zinc-50">
              {productId}
            </p>
          </div>
          <p className="max-w-md text-lg text-zinc-600 leading-8 dark:text-zinc-400">
            {content.thisPageTestsTheDynamic}
          </p>
        </div>
      </main>
    </div>
  );
};

const ProductIdPage: NextPageIntlayer<{ productId: string }> = async ({
  params,
}) => {
  const { productId } = await params;

  return <ProductIdPageContent productId={productId} />;
};

export default ProductIdPage;
