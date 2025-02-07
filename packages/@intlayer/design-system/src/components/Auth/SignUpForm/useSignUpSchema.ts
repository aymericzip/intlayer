import { t, useDictionary } from 'react-intlayer';
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
          required_error: requiredErrorEmail,
          invalid_type_error: invalidTypeErrorEmail,
        })
        .min(1, { message: invalidTypeErrorEmail })
        .email({ message: invalidTypeErrorEmail }),
      password: z
        .string({
          required_error: requiredErrorPassword,
          invalid_type_error: invalidTypeErrorPassword,
        })
        .min(8, { message: invalidTypeErrorPassword }),
      passwordConfirmation: z
        .string({
          required_error: requiredErrorPasswordConfirmation,
          invalid_type_error: invalidTypeErrorPasswordConfirmation,
        })
        .min(8, { message: invalidTypeErrorPasswordConfirmation }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: passwordNotMatchError,
      path: ['passwordConfirmation'], // This specifies which field the error should be associated with
    });
};

export type SignUp = z.infer<ReturnType<typeof useSignUpSchema>>;
