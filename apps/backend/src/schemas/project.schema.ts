import type { Project } from '@types/project.type';
import {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
} from '@utils/validation/validateProject';
import { Schema } from 'mongoose';

export const projectSchema = new Schema<Project>(
  {
    organizationId: { type: Schema.Types.ObjectId, ref: 'Organization' },
    name: {
      type: String,
      required: true,
      minlength: NAME_MIN_LENGTH,
      maxlength: NAME_MAX_LENGTH,
    },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  },
  {
    timestamps: true,
  }
);
