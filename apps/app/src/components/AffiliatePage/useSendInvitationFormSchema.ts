import { z } from 'zod';

export const useSendInvitationFormSchema = () =>
  z.object({
    email: z.string().email().min(1),
    commissionRate: z.coerce.number().min(1).max(100),
  });

export type SendInvitationFormData = z.infer<
  ReturnType<typeof useSendInvitationFormSchema>
>;
