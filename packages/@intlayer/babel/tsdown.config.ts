import { getOptions } from '@utils/tsdown-config';
import { defineConfig, type Options } from 'tsdown';

const options: Options[] = getOptions({});

export default defineConfig(options);
