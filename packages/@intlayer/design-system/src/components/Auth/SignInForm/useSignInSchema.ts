// @ts-ignore react-intlayer not build yet
import { useDictionary } from 'react-intlayer';
import { z } from 'zod';
import { signInSchemaContent } from './useSignInSchema.content';

export const useSignInSchema = () => {
  const {
    requiredErrorEmail,
    invalidTypeErrorEmail,
    requiredErrorPassword,
    invalidTypeErrorPassword,
  } = useDictionary(signInSchemaContent);

  return z.object({
    email: z
      .string({
        required_error: requiredErrorEmail,
        invalid_type_error: invalidTypeErrorEmail,
      })
      .min(1, { message: invalidTypeErrorEmail })
      .default(''),
    password: z
      .string({
        required_error: requiredErrorPassword,
        invalid_type_error: invalidTypeErrorPassword,
      })
      .min(1, { message: invalidTypeErrorPassword })
      .default(''),
  });
};
export type SignIn = z.infer<ReturnType<typeof useSignInSchema>>;
