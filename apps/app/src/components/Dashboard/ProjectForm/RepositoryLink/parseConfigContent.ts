import { transpileTSToCJS } from '@intlayer/config/file';
import { buildConfigurationFields } from '@intlayer/config/node';
import type { CustomIntlayerConfig } from '@intlayer/types/config';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { safeParseJS } from '#utils/safeParseJS';

// Reject configs larger than 256 KB — a real intlayer.config.ts is never this big.
const MAX_CONTENT_BYTES = 256 * 1024;

const schema = z.object({
  content: z.string(),
});

export const parseConfigContent = createServerFn({ method: 'POST' })
  .inputValidator(schema)
  .handler(async ({ data }) => {
    const { content } = data;

    if (Buffer.byteLength(content, 'utf-8') > MAX_CONTENT_BYTES) {
      throw new Error('Config file too large');
    }

    // Transpile TypeScript → self-contained CJS.
    //
    // We override `packages` from 'external' (the library default) to 'bundle'
    // so that all npm imports (e.g. @intlayer/types/locales) are inlined into
    // the output. The child process that safeParseJS spawns has FS read access
    // only to the temp file, so it cannot read node_modules — the code must be
    // fully self-contained before it reaches the sandbox.
    //
    // The filename is hardcoded so that dirname() always resolves to '.'
    // (process.cwd()), preventing any path-traversal through a crafted name.
    const cjsCode = await transpileTSToCJS(content, 'intlayer.config.ts', {
      packages: 'bundle',
    });
    if (!cjsCode) throw new Error('Failed to transpile configuration file');

    const customConfig = await safeParseJS<CustomIntlayerConfig>(cjsCode);

    const config = buildConfigurationFields(customConfig);
    return JSON.parse(JSON.stringify(config));
  });
