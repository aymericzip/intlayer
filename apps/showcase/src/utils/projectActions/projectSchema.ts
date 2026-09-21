import { z } from 'zod/mini';

export const urlSchema = z.pipe(
  z.union([z.optional(z.url()), z.literal('')]),
  z.transform((value) => (value === '' ? undefined : value))
);

export const submitProjectSchema = z.object({
  name: z.string().check(z.minLength(1)),
  url: z.url().check(
    z.refine((val) => !/github\.com|gitlab\.com|bitbucket\.org/.test(val), {
      message: 'Repository URLs should be placed in the GitHub URL field',
    })
  ),
  githubUrl: urlSchema,
  tagline: z.string().check(z.minLength(1)),
  description: z.optional(z.string()),
  useCases: z.optional(z.array(z.string())),
});

export type SubmitProjectSchema = z.infer<typeof submitProjectSchema>;
