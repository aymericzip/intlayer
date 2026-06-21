import { options } from '@utils/tsdown-config';
import { defineConfig, type UserConfig } from 'tsdown';

const [esm, , types] = options;

export default defineConfig([esm, types] as UserConfig[]);
