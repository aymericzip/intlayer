import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { CONTENT_DIR, FILE_EXTENSION } from '../settings';
import { listFiles } from './listFiles';

const formatFileExtension = (fileExtension: string[] | (string | number)[]) => {
  return fileExtension.map((ext) => `${ext}`);
};

/**
 * Call processFiles with the provided directory and extension
 * from the CLI arguments
 *
 * Usage:
 * pnpm process-files --dir <directory> --extension <extension>
 *
 */
const processFilesCLI = async () => {
  const argv = await yargs(hideBin(process.argv))
    .option('dir', {
      describe: 'Directory to process',
      type: 'string',
      demandOption: true,
      default: CONTENT_DIR,
    })
    .option('extension', {
      describe: 'File extension to process',
      type: 'array',
      default: FILE_EXTENSION,
    })
    .parse();

  const fileExtensions = formatFileExtension(argv.extension);

  await listFiles(argv.dir, fileExtensions);
};

void processFilesCLI();
