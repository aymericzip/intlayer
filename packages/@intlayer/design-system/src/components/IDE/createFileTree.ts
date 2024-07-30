export type FilePath = {
  path: string;
  subPath?: FilePath[];
  isFile: boolean;
};

export const createFileTree = (paths: string[]): FilePath[] => {
  const root: FilePath = { path: '', subPath: [], isFile: false };

  paths.forEach((path) => {
    const parts = path.split('/').filter((part) => part !== ''); // Remove empty strings due to leading slash
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1; // Last part of the path is a file

      if (!current.subPath) {
        current.subPath = [];
      }

      let next = current.subPath.find((sub) => sub.path === part);

      if (!next) {
        next = { path: part, isFile, subPath: isFile ? undefined : [] };
        current.subPath.push(next);
      }

      current = next;
    }
  });

  return root.subPath ?? [];
};
