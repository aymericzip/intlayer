import { useDictionary } from 'react-intlayer';
import { z } from 'zod';
import { signUpSchemaContent } from './useSignUpSchema.content';

export const useSignUpSchema = () => {
  const {
    requiredErrorEmail,
    invalidTypeErrorEmail,
    requiredErrorPassword,
    invalidTypeErrorPassword,
    requiredErrorPasswordConfirmation,
    invalidTypeErrorPasswordConfirmation,
    passwordNotMatchError,
  } = useDictionary(signUpSchemaContent);

  return z
    .object({
      email: z
        .string({
          required_error: requiredErrorEmail.value,
          invalid_type_error: invalidTypeErrorEmail.value,
        })
        .min(1, { message: invalidTypeErrorEmail.value })
        .email({ message: invalidTypeErrorEmail.value }),
      password: z
        .string({
          required_error: requiredErrorPassword.value,
          invalid_type_error: invalidTypeErrorPassword.value,
        })
        .min(8, { message: invalidTypeErrorPassword.value }),
      passwordConfirmation: z
        .string({
          required_error: requiredErrorPasswordConfirmation.value,
          invalid_type_error: invalidTypeErrorPasswordConfirmation.value,
        })
        .min(8, { message: invalidTypeErrorPasswordConfirmation.value }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: passwordNotMatchError.value,
      path: ['passwordConfirmation'], // This specifies which field the error should be associated with
    });
};

export type SignUp = z.infer<ReturnType<typeof useSignUpSchema>>;
