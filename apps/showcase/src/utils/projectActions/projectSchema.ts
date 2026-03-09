import { z } from 'zod';

export const urlSchema = z
  .url()
  .optional()
  .or(z.literal(''))
  .transform((value) => (value === '' ? undefined : value));

export const submitProjectSchema = z.object({
  name: z.string().min(1),
  url: z
    .url()
    .refine((val) => !/github\.com|gitlab\.com|bitbucket\.org/.test(val), {
      message: 'Repository URLs should be placed in the GitHub URL field',
    }),
  githubUrl: urlSchema,
  tagline: z.string().min(1),
  description: z.string().optional(),
  useCases: z.array(z.string()).optional(),
});

export type SubmitProjectSchema = z.infer<typeof submitProjectSchema>;
