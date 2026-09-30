import type { ExtensionContext, Memento } from 'vscode';

type ProjectEnvMap = Record<string, string>;

const STORE_KEY = 'intlayer.projectEnvironments';

let workspaceState: Memento | undefined;
let inMemoryStore: ProjectEnvMap = {};

export const initializeEnvironmentStore = (context: ExtensionContext) => {
  workspaceState = context.workspaceState;
  const saved = workspaceState.get<ProjectEnvMap>(STORE_KEY);
  if (saved && typeof saved === 'object') {
    inMemoryStore = { ...saved };
  }
};

export const getSelectedEnvironment = (
  projectDir: string
): string | undefined => {
  return inMemoryStore[projectDir];
};

export const setSelectedEnvironment = async (
  projectDir: string,
  env: string
): Promise<void> => {
  inMemoryStore[projectDir] = env;
  if (workspaceState) {
    await workspaceState.update(STORE_KEY, { ...inMemoryStore });
  }
};
