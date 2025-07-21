import type { Project } from '@/types/project.types';
import { projectSchema } from '@schemas/project.schema';
import { RenameId } from '@schemas/user.schema';
import { Model, model } from 'mongoose';

export const ProjectModel = model<RenameId<Project>, Model<Project>>(
  'project',
  projectSchema
);
