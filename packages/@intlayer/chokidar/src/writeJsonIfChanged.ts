import { writeFileIfChanged } from './writeFileIfChanged';

export const writeJsonIfChanged = async <T>(
  path: string,
  data: T,
  { pretty = process.env.NODE_ENV === 'development' } = {}
): Promise<boolean> => {
  const space = pretty ? 2 : undefined;
  const json = JSON.stringify(data, null, space);

  return await writeFileIfChanged(path, json);
};
