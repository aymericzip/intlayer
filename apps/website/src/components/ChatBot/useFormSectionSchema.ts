import { useIntlayer } from 'next-intlayer';
import { z } from 'zod/v4';

export const useFormSectionSchema = () => {
  const { questionRequiredError, questionInvalidTypeError } = useIntlayer(
    'chat-form-section-schema'
  );

  return z.object({
    question: z.string({
      error: (issue) =>
        issue.input === undefined
          ? questionRequiredError.value
          : questionInvalidTypeError.value,
    }),
  });
};

export type FormSectionSchemaData = z.infer<
  ReturnType<typeof useFormSectionSchema>
>;
