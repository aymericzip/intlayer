import { useGetTranslatorMarketplace } from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import type { FC } from 'react';
import { useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { TranslatorCard } from './TranslatorCard';
import type { TranslatorFiltersValue } from './TranslatorFilters';
import { TranslatorFilters } from './TranslatorFilters';

export const TranslatorMarketplacePage: FC = () => {
  const { title, description, noTranslatorsFound } = useIntlayer(
    'translator-marketplace-page'
  );
  const [filters, setFilters] = useState<TranslatorFiltersValue>({});

  const { data, isLoading } = useGetTranslatorMarketplace(filters);

  const translators = data?.data ?? [];

  return (
    <div className="m-auto flex w-full max-w-5xl flex-col gap-8 p-8">
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-3xl">{title}</h1>
        <p className="text-neutral text-sm">{description}</p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <aside className="w-full shrink-0 md:w-72">
          <TranslatorFilters value={filters} onChange={setFilters} />
        </aside>

        <main className="flex-1">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          ) : translators.length === 0 ? (
            <div className="py-12 text-center text-neutral">
              {noTranslatorsFound}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {translators.map((translator) => (
                <TranslatorCard key={translator.id} translator={translator} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
