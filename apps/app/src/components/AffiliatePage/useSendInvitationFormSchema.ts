import { z } from 'zod/mini';

export const useSendInvitationFormSchema = () =>
  z.object({
    email: z.email().check(z.minLength(1)),
    commissionRate: z.coerce.number().check(z.minimum(1), z.maximum(100)),
  });

export type SendInvitationFormData = z.infer<
  ReturnType<typeof useSendInvitationFormSchema>
>;
