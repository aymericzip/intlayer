import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/mini';

export const useSubmitProjectFormSchema = () => {
  const { projectNameRequired, urlInvalid, projectUrlRequired, maxUseCases } =
    useIntlayer('submit-project-form-schema');

  const ensureHttps = (val: string) => {
    if (!val) return val;
    if (val.startsWith('http://') || val.startsWith('https://')) {
      return val;
    }
    return `https://${val}`;
  };

  return z.object({
    name: z
      .string()
      .check(z.minLength(1, projectNameRequired.value), z.maxLength(255)),
    url: z.union([
      z.pipe(
        z.pipe(z.string(), z.transform(ensureHttps)),
        z.url(urlInvalid.value).check(
          z.refine(
            (val) => !/github\.com|gitlab\.com|bitbucket\.org/.test(val),
            {
              message:
                'Repository URLs should be placed in the GitHub URL field',
            }
          )
        )
      ),
      z.string().check(z.minLength(1, projectUrlRequired.value)),
    ]),
    githubUrl: z.union([
      z.optional(
        z.pipe(
          z.pipe(z.string(), z.transform(ensureHttps)),
          z
            .url(urlInvalid.value)
            .check(
              z.refine(
                (val) =>
                  /github\.com|gitlab\.com|bitbucket\.org/.test(val) ||
                  val === '',
                { message: 'Must be a GitHub, GitLab, or Bitbucket URL' }
              )
            )
        )
      ),
      z.literal(''),
    ]),
    useCases: z.optional(
      z.array(z.string()).check(z.maxLength(3, maxUseCases.value))
    ),
  });
};

export type SubmitProjectFormData = z.infer<
  ReturnType<typeof useSubmitProjectFormSchema>
>;
