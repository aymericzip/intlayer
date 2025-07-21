import type { Session } from '@/types/session.types';
import { Schema } from 'mongoose';
import { RenameId } from './user.schema';

export const sessionSchema = new Schema<RenameId<Session>>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      alias: 'id',
    },
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    expires: {
      type: Date,
      required: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    organizationId: {
      type: String,
      required: false,
    },
    projectId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,

    toJSON: {
      virtuals: true, // keep the automatic `id` getter
      versionKey: false, // drop __v
      transform(doc, ret) {
        ret.id = ret.id.toString(); // or rely on the virtual
        delete ret.id; // remove _id
      },
    },
    toObject: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret.id.toString();
        delete ret.id;
      },
    },
  }
);
