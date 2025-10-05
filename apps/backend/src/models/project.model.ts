import { projectSchema } from '@schemas/project.schema';
import { model } from 'mongoose';
import type { ProjectModelType, ProjectSchema } from '@/types/project.types';

export const ProjectModel = model<ProjectSchema, ProjectModelType>(
  'project',
  projectSchema
);
