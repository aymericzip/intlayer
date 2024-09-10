import { authAPI } from './auth';
import { dictionaryAPI } from './dictionary';
import { organizationAPI } from './organization';
import { projectAPI } from './project';
import { userAPI } from './user';

export const intlayerAPI = {
  organization: organizationAPI,
  project: projectAPI,
  user: userAPI,
  auth: authAPI,
  dictionary: dictionaryAPI,
};
