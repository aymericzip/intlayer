import { Schema } from 'mongoose';
import { Plan } from '@/types/plan.types';

export const planSchema = new Schema<Plan>(
  {
    type: {
      type: String,
      required: true,
      enum: ['FREE', 'PREMIUM', 'ENTERPRISE'],
      default: 'FREE',
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    priceId: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ['INACTIVE', 'ACTIVE', 'ERROR', 'CANCELLED'],
      default: 'INACTIVE',
    },
  },
  {
    timestamps: true,
  }
);
