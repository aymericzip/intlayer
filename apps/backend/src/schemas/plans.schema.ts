import type { PlanSchema } from '@/types/plan.types';
import { Schema } from 'mongoose';

export const planSchema = new Schema<PlanSchema>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      alias: 'id',
    },
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

    toJSON: {
      virtuals: true, // keep the automatic `id` getter
      versionKey: false, // drop __v
      transform(doc, ret) {
        ret.id = ret._id.toString(); // convert _id to id
        delete ret._id; // remove _id
      },
    },
    toObject: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id.toString(); // convert _id to id
        delete ret._id; // remove _id
      },
    },
  }
);
