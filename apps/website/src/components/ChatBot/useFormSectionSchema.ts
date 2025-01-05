import { useIntlayer } from 'next-intlayer';
import { z } from 'zod';

export const useFormSectionSchema = () => {
  const { questionRequiredError, questionInvalidTypeError } = useIntlayer(
    'chat-form-section-schema',
    undefined,
    false
  );

  return z.object({
    question: z.string({
      required_error: questionRequiredError,
      invalid_type_error: questionInvalidTypeError,
    }),
  });
};

export type FormSectionSchemaData = z.infer<
  ReturnType<typeof useFormSectionSchema>
>;
