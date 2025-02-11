import { Schema } from 'mongoose';
import type { Plan } from '@/types/plan.types';

export const planSchema = new Schema<Plan>(
  {
    type: {
      type: String,
      required: true,
      enum: ['PREMIUM', 'ENTERPRISE'],
    },
    period: {
      type: String,
      required: true,
      enum: ['MONTHLY', 'YEARLY'],
      default: 'MONTHLY',
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subscriptionId: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    priceId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: [
        'active',
        'canceled',
        'past_due',
        'unpaid',
        'incomplete',
        'incomplete_expired',
        'paused',
        'trialing',
      ],
    },
  },
  {
    timestamps: true,
  }
);
