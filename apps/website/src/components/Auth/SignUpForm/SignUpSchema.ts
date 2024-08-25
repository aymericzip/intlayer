import { z } from 'zod';

export const SignUpSchema = z
  .object({
    // mobile: z
    //   .string({
    //     required_error: 'Please enter your mobile number',
    //     invalid_type_error: 'Please enter a valid mobile number',
    //   })
    //   .min(1, {
    //     message: 'Enter a mobile number',
    //   }),

    // firstname: z
    //   .string({
    //     required_error: 'Please enter your first name',
    //     invalid_type_error: 'Please enter a valid first name',
    //   })
    //   .min(1, { message: 'Enter your firstname' }),
    // lastname: z
    //   .string({
    //     required_error: 'Please enter your last name',
    //     invalid_type_error: 'Please enter a valid last name',
    //   })
    //   .min(1, { message: 'Enter your lastname' }),
    email: z
      .string({
        required_error: 'Please enter your email address',
        invalid_type_error: 'Please enter a valid email address',
      })
      .min(1, { message: 'Enter an email address' })
      .email({ message: 'Enter a valid email address' }),
    password: z
      .string({
        required_error: 'Please enter a password',
        invalid_type_error: 'Please enter a valid password',
      })
      .min(8, { message: 'Your password must be at least 8 characters' }),
    passwordConfirmation: z
      .string({
        required_error: 'Please enter a password',
        invalid_type_error: 'Please enter a valid password',
      })
      .min(8, { message: 'Your password must be at least 8 characters' }),
    // termsAndConditions: z
    //   .boolean({
    //     required_error: 'You must accept the Terms of Service and Privacy Policy',
    //   })
    //   .refine(
    //     (v) => v === true,
    //     'Please read and accept the Terms of Service and Privacy Policy to proceed'
    //   ),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Password and password confirmation must match',
    path: ['passwordConfirmation'], // This specifies which field the error should be associated with
  });

export type SignUp = z.infer<typeof SignUpSchema>;
