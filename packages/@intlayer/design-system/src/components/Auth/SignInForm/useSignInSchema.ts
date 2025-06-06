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
        required_error: requiredErrorEmail.value,
        invalid_type_error: invalidTypeErrorEmail.value,
      })
      .min(1, { message: invalidTypeErrorEmail.value })
      .email({ message: invalidTypeErrorEmail.value })
      .default(''),
    password: z
      .string({
        required_error: requiredErrorPassword.value,
        invalid_type_error: invalidTypeErrorPassword.value,
      })
      .min(1, { message: invalidTypeErrorPassword.value })
      .default(''),
  });
};
export type SignIn = z.infer<ReturnType<typeof useSignInSchema>>;
