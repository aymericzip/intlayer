import { Schema } from 'mongoose';
import type { SessionSchema } from '@/types/session.types';

export const sessionSchema = new Schema<SessionSchema>(
  {
    activeOrganizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: false,
    },
    activeProjectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: false,
    },
  },
  {
    timestamps: true,

    toJSON: {
      virtuals: true, // keep the automatic `id` getter
      versionKey: false, // drop __v
      transform(_doc, ret: any) {
        const { _id, ...rest } = ret;
        return {
          ...rest,
          id: _id.toString(),
        };
      },
    },
    toObject: {
      virtuals: true,
      transform(_doc, ret: any) {
        const { _id, ...rest } = ret;
        return {
          ...rest,
          id: _id.toString(),
        };
      },
    },
  }
);
