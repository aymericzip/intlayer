import type { ProjectModelType, ProjectSchema } from '@/types/project.types';
import { projectSchema } from '@schemas/project.schema';
import { model } from 'mongoose';

export const ProjectModel = model<ProjectSchema, ProjectModelType>(
  'project',
  projectSchema
);
