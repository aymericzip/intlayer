import { projectSchema } from '@schemas/project.schema';
import { model } from 'mongoose';
import type { Project } from '@/types/project.types';

export const ProjectModel = model<Project>('project', projectSchema);
