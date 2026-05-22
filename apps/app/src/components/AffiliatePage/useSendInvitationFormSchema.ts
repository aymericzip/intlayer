import { z } from 'zod/v4';

export const useSendInvitationFormSchema = () =>
  z.object({
    email: z.string().email().min(1),
    commissionRate: z.coerce.number().min(1).max(100),
    category: z
      .enum([
        'native_speaker',
        'marketing_expert',
        'copywriter',
        'certified_translator',
      ])
      .optional(),
  });

export type SendInvitationFormData = z.infer<
  ReturnType<typeof useSendInvitationFormSchema>
>;
