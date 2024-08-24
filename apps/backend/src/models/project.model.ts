import { projectSchema } from '@schemas/project.schema';
import type { Project } from '@schemas/project.type';
import { model } from 'mongoose';

export const ProjectModel = model<Project>('project', projectSchema);
