import { useIntlayer } from 'react-intlayer';
import { z } from 'zod/mini';

export const useAddPasskeySchema = () => {
  const { nameInput } = useIntlayer('add-passkey-schema');

  const addPasskeySchema = z.object({
    name: z.string().check(z.minLength(1, nameInput.error.value)),
  });

  return addPasskeySchema;
};

export type AddPasskey = z.infer<ReturnType<typeof useAddPasskeySchema>>;
