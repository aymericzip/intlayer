import { SessionSchema } from '@/export';
import { Schema } from 'mongoose';

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
      transform(doc, ret: any) {
        ret.id = ret._id.toString(); // convert _id to id
        delete ret._id; // remove _id
      },
    },
    toObject: {
      virtuals: true,
      transform(doc, ret: any) {
        ret.id = ret._id; // convert _id to id
        delete ret._id; // remove _id
      },
    },
  }
);
