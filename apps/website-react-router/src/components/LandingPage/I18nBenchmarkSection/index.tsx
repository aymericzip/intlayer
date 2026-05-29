import type { FC } from 'react';
import { I18nBenchmark } from '~/components/I18nBenchmark';

export const I18nBenchmarkSection: FC = () => (
  <section className="flex flex-col gap-6 px-10">
    <I18nBenchmark vertical={false} />
  </section>
);
