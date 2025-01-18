import { packageBuildOptions } from '@utils/tsup-config';
import { type Options, defineConfig } from 'tsup';

const option: Options[] = packageBuildOptions as Options[];

export default defineConfig(option);
