import { options } from '@utils/tsdown-config';
import { defineConfig, type UserConfig } from 'tsdown';

const [, cjs, types] = options;

export default defineConfig([cjs, types] as UserConfig[]);
