import { useIntlayer } from 'next-intlayer';
import { z } from 'zod';

export const useFormSectionSchema = () => {
  const { questionRequiredError, questionInvalidTypeError } = useIntlayer(
    'chat-form-section-schema'
  );

  return z.object({
    question: z.string({
      required_error: questionRequiredError.value,
      invalid_type_error: questionInvalidTypeError.value,
    }),
  });
};

export type FormSectionSchemaData = z.infer<
  ReturnType<typeof useFormSectionSchema>
>;
