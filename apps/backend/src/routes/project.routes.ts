import {
  addProject,
  deleteProject,
  getProjects,
  updateProject,
} from '@controllers/project.controller';
import { Router } from 'express';

export const projectRouter: Router = Router();

projectRouter.get('/', getProjects);

projectRouter.post('/', addProject);
projectRouter.put('/', updateProject);
projectRouter.delete('/', deleteProject);
