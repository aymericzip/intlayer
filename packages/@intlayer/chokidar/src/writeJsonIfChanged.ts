import { writeFileIfChanged } from './writeFileIfChanged';

export const writeJsonIfChanged = async <T>(
  path: string,
  data: T,
  { pretty = process.env.NODE_ENV === 'development' } = {}
): Promise<boolean> => {
  const space = pretty ? 2 : undefined;

  let json = '{}';

  try {
    json = JSON.stringify(data, null, space);
  } catch (error) {
    console.error(`Error while parsing data to JSON for ${path}:`, error);
  }

  return await writeFileIfChanged(path, json);
};
