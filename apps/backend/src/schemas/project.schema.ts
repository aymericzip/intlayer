import {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
} from '@utils/validation/validateProject';
import { Schema } from 'mongoose';
import type { Project } from './project.type';

export const projectSchema = new Schema<Project>(
  {
    name: {
      type: String,
      required: true,
      minlength: NAME_MIN_LENGTH,
      maxlength: NAME_MAX_LENGTH,
    },
  },
  {
    timestamps: true,
  }
);
