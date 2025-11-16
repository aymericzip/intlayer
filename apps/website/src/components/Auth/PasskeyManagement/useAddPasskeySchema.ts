import { useIntlayer } from 'next-intlayer';
import { z } from 'zod';

export const useAddPasskeySchema = () => {
  const { nameInput } = useIntlayer('add-passkey-schema');

  const addPasskeySchema = z.object({
    name: z.string().min(1, nameInput.error.value),
  });

  return addPasskeySchema;
};

export type AddPasskey = z.infer<ReturnType<typeof useAddPasskeySchema>>;
