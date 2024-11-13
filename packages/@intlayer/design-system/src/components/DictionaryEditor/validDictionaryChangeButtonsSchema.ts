import { z } from 'zod';

export const getValidDictionaryChangeButtonsSchemaSchema = () => {
  return z.object({});
};

export type ValidDictionaryChangeButtonsSchemaData = z.infer<
  ReturnType<typeof getValidDictionaryChangeButtonsSchemaSchema>
>;
