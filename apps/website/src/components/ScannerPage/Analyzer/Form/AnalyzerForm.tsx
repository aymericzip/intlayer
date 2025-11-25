'use client';

import { Form, useForm } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { useSearchParamState } from '@/hooks/useSearchParamState';
import type { AnalyzerFormData } from './useAnalyzerUrlSchema';
import { useAnalyzerUrlSchema } from './useAnalyzerUrlSchema';

type AnalyzerFormProps = {
  onAnalyze: (url: string) => void;
  loading?: boolean;
  className?: string;
};

export const AnalyzerForm: FC<AnalyzerFormProps> = ({
  onAnalyze,
  loading = false,
  className,
}) => {
  const { params, setParam } = useSearchParamState({
    url: { type: 'string', fallbackValue: '' },
  });
  const { input, button } = useIntlayer('analyzer-form');
  const urlSchema = useAnalyzerUrlSchema();
  const { form, isSubmitting } = useForm(urlSchema, {
    defaultValues: { url: params.url },
  });

  const onSubmitSuccess = (data: AnalyzerFormData) => {
    setParam('url', data.url);
    if (params.url !== data.url) {
      onAnalyze(data.url);
    }
  };

  return (
    <Form
      schema={urlSchema}
      onSubmitSuccess={onSubmitSuccess}
      className={cn(
        'flex w-full max-w-lg flex-col gap-2 rounded-2xl bg-card p-2 shadow-sm md:flex-row',
        className
      )}
      {...form}
    >
      <Form.Input
        name="url"
        aria-label={input.label.value}
        type="url"
        placeholder={input.placeholder.value}
        className="flex-1 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2"
      />
      <div className="flex items-stretch">
        <Form.Button
          type="submit"
          label={button.analyze.value}
          disabled={loading}
          size="md"
          variant="fade"
          color="custom"
          isLoading={isSubmitting || loading}
          className="w-full rounded-xl px-5 py-2 font-medium"
        >
          {loading ? button.analyzing : button.analyze}
        </Form.Button>
      </div>
    </Form>
  );
};
