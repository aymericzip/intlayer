import { basename, join } from 'node:path';
import { parse } from 'dotenv';
import { Uri, window, workspace } from 'vscode';
import { prefix } from './logFunctions';

let hasLogged = false;

export const loadEnvFromWorkspace = async (
  baseDir: string,
  env?: string,
  logEnvFileName: boolean = false
): Promise<Record<string, string> | undefined> => {
  const folders = workspace.workspaceFolders;
  if (!folders || folders.length === 0) {
    throw new Error('No workspace is open.');
  }

  const candidates = [
    ...(env ? [`.env.${env}.local`, `.env.${env}`] : []),
    '.env.local',
    '.env',
  ];

  for (const candidate of candidates) {
    try {
      const uri = Uri.file(join(baseDir, candidate));
      const bytes = await workspace.fs.readFile(uri);
      const content = new TextDecoder('utf-8').decode(bytes);
      const parsed = parse(content);

      for (const [key, value] of Object.entries(parsed)) {
        if (process.env[key] === undefined) {
          process.env[key] = value;
        }
      }

      if (logEnvFileName) {
        const projectName = basename(baseDir);

        if (!hasLogged) {
          await window.showInformationMessage(
            `${prefix}Loaded env from ${candidate} in ${projectName}`
          );

          hasLogged = true;
        }
      }
      return parsed;
    } catch (_error) {}
  }

  return undefined;
};
