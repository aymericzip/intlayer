import { useIntlayer } from 'react-intlayer';
import { z } from 'zod';

export const useSubmitProjectFormSchema = () => {
  const { projectNameRequired, urlInvalid, projectUrlRequired } = useIntlayer(
    'submit-project-form-schema'
  );

  const ensureHttps = (val: string) => {
    if (!val) return val;
    if (val.startsWith('http://') || val.startsWith('https://')) {
      return val;
    }
    return `https://${val}`;
  };

  return z.object({
    name: z.string().min(1, projectNameRequired.value).max(255),
    url: z
      .string()
      .transform(ensureHttps)
      .pipe(
        z
          .string()
          .url(urlInvalid.value)
          .refine(
            (val) => !/github\.com|gitlab\.com|bitbucket\.org/.test(val),
            {
              message:
                'Repository URLs should be placed in the GitHub URL field',
            }
          )
      )
      .or(z.string().min(1, projectUrlRequired.value)),
    githubUrl: z
      .string()
      .transform(ensureHttps)
      .pipe(
        z
          .string()
          .url(urlInvalid.value)
          .refine(
            (val) =>
              /github\.com|gitlab\.com|bitbucket\.org/.test(val) || val === '',
            { message: 'Must be a GitHub, GitLab, or Bitbucket URL' }
          )
      )
      .optional()
      .or(z.literal('')),
    useCases: z.array(z.string()).optional(),
  });
};

export type SubmitProjectFormData = z.infer<
  ReturnType<typeof useSubmitProjectFormSchema>
>;
