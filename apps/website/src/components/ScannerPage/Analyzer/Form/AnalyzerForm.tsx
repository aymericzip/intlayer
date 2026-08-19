import {
  Form,
  FormButton,
  FormInput,
  useForm,
} from '@intlayer/design-system/form';
import { cn } from '@intlayer/design-system/utils';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useSearchParamState } from '~/hooks/useSearchParamState';
import type { AnalyzerFormData } from './useAnalyzerUrlSchema';
import { useAnalyzerUrlSchema } from './useAnalyzerUrlSchema';

type AnalyzerFormProps = {
  onAnalyze: (url: string) => void;
  onCancel?: () => void;
  loading?: boolean;
  className?: string;
};

export const AnalyzerForm: FC<AnalyzerFormProps> = ({
  onAnalyze,
  onCancel,
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
    onAnalyze(data.url);
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
      <FormInput
        name="url"
        aria-label={input.label.value}
        type="url"
        placeholder={input.placeholder.value}
        className="flex-1 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2"
      />
      <div className="flex items-stretch gap-2">
        <FormButton
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
        </FormButton>
        {loading && onCancel && (
          <FormButton
            type="button"
            label={button.cancel.value}
            onClick={onCancel}
            size="md"
            variant="outline"
            color="text"
            className="rounded-xl px-5 py-2 font-medium"
          >
            {button.cancel}
          </FormButton>
        )}
      </div>
    </Form>
  );
};
