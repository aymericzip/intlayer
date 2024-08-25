import { projectSchema } from '@schemas/project.schema';
import type { Project } from '@types/project.type';
import { model } from 'mongoose';

export const ProjectModel = model<Project>('project', projectSchema);
