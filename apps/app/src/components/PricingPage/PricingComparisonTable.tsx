import { Container } from '@intlayer/design-system/container';
import { H2 } from '@intlayer/design-system/headers';
import { Table, Td, Th, Tr } from '@intlayer/design-system/table';
import { Check, Minus } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { useIntlayer } from 'react-intlayer';

type CellValue = boolean | ReactNode;

type Feature = {
  key: string;
  label: ReactNode;
  free: CellValue;
  premium: CellValue;
  enterprise: CellValue;
  lifetime: CellValue;
};

type Category = {
  label: ReactNode;
  features: Feature[];
};

const CheckIcon: FC = () => (
  <span className="inline-flex items-center justify-center rounded-full border-[2px] border-lime-300 p-0.5 text-lime-800 dark:border-lime-900 dark:text-lime-600">
    <Check className="size-3" />
  </span>
);

const MinusIcon: FC = () => (
  <Minus className="size-4 text-neutral-400 dark:text-neutral-600" />
);

const Cell: FC<{ value: CellValue }> = ({ value }) => {
  if (value === true) return <CheckIcon />;
  if (value === false) return <MinusIcon />;

  return value;
};

export const PricingComparisonTable: FC = () => {
  const { comparisonTable } = useIntlayer('pricing') as any;
  const { title, categories, features, planNames } = comparisonTable;

  const tableCategories: Category[] = [
    {
      label: categories.core,
      features: [
        {
          key: 'visualEditor',
          label: features.visualEditor,
          free: true,
          premium: true,
          enterprise: true,
          lifetime: true,
        },
        {
          key: 'distantDictionaries',
          label: features.distantDictionaries,
          free: true,
          premium: true,
          enterprise: true,
          lifetime: true,
        },
        {
          key: 'hotReloading',
          label: features.hotReloading,
          free: false,
          premium: false,
          enterprise: true,
          lifetime: true,
        },
      ],
    },
    {
      label: categories.limits,
      features: [
        {
          key: 'storage',
          label: features.storage,
          free: '100 MB',
          premium: '500 MB',
          enterprise: '2+ GB',
          lifetime: '2+ GB',
        },
        {
          key: 'projects',
          label: features.projects,
          free: '2',
          premium: '10',
          enterprise: features.unlimited,
          lifetime: features.unlimited,
        },
        {
          key: 'users',
          label: features.users,
          free: '2',
          premium: '20',
          enterprise: features.unlimited,
          lifetime: features.unlimited,
        },
      ],
    },
    {
      label: categories.ai,
      features: [
        {
          key: 'aiContentGeneration',
          label: features.aiContentGeneration,
          free: 'At the cost of your AI provider',
          premium: true,
          enterprise: true,
          lifetime: true,
        },
      ],
    },
    {
      label: categories.support,
      features: [
        {
          key: 'premiumSupport',
          label: features.premiumSupport,
          free: false,
          premium: true,
          enterprise: true,
          lifetime: true,
        },
        {
          key: 'oneTimePayment',
          label: features.oneTimePayment,
          free: false,
          premium: false,
          enterprise: false,
          lifetime: true,
        },
      ],
    },
  ];

  const planKeys = ['free', 'premium', 'enterprise', 'lifetime'] as const;

  return (
    <section className="m-auto max-w-[1000px] px-4 pt-10 pb-20 text-xl">
      <H2 className="mb-10 text-center text-3xl">{title}</H2>
      <Container
        roundedSize="4xl"
        transparency="lg"
        gap="xl"
        className="overflow-hidden"
      >
        <Table className="table-fixed">
          <thead>
            <Tr>
              <Th className="w-2/5 text-text/80" />
              {planKeys.map((plan) => (
                <Th key={plan} className="text-center text-text/80 uppercase">
                  {planNames[plan]}
                </Th>
              ))}
            </Tr>
          </thead>
          <tbody>
            {tableCategories.map((category, catIndex) => (
              <>
                <Tr key={`cat-${catIndex}`} className="bg-background!">
                  <Td
                    colSpan={5}
                    className="h-20 pt-6 pb-2 pl-30 font-semibold text-2xl text-neutral uppercase tracking-wider"
                  >
                    {category.label}
                  </Td>
                </Tr>
                {category.features.map((feature) => (
                  <Tr key={feature.key}>
                    <Td className="text-text/80">{feature.label}</Td>
                    {planKeys.map((plan) => (
                      <Td
                        key={plan}
                        className="border border-neutral/20 border-solid"
                      >
                        <div className="m-auto flex justify-center text-center">
                          <Cell value={feature[plan]} />
                        </div>
                      </Td>
                    ))}
                  </Tr>
                ))}
              </>
            ))}
          </tbody>
        </Table>
      </Container>
    </section>
  );
};
