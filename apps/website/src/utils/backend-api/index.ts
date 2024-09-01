import { authAPI } from './auth';
import { organizationAPI } from './organization';
import { projectAPI } from './project';
import { userAPI } from './user';

export const backendAPI = {
  organization: organizationAPI,
  project: projectAPI,
  user: userAPI,
  auth: authAPI,
};
