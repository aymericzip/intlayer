import { packageBuildOptions } from '@utils/tsup-config';
import { defineConfig, type Options } from 'tsup';

const option: Options[] = packageBuildOptions as Options[];

export default defineConfig(option);
