import type { IntlayerConfig } from '@intlayer/types/config';
import type { Plugin } from 'vite';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const COMPONENT_PATH = '/app/src/Home.tsx';

const { extractContentMock, getConfigurationMock } = vi.hoisted(() => ({
  extractContentMock: vi.fn(),
  getConfigurationMock: vi.fn(),
}));

vi.mock('@intlayer/babel', () => ({
  detectPackageName: () => 'react-intlayer',
  extractContent: extractContentMock,
  getExtractPluginOptions: () => ({
    enabled: true,
    filesList: [COMPONENT_PATH],
  }),
  writeContentHelper: vi.fn(),
}));

vi.mock('@intlayer/config/node', () => ({
  getConfiguration: getConfigurationMock,
}));

const { getCompilableModule, intlayerCompiler } =
  await import('./IntlayerCompilerPlugin');

const createConfig = (saveComponents: boolean): IntlayerConfig =>
  ({
    compiler: {
      enabled: true,
      output: './{{key}}.content.json',
      saveComponents,
    },
    internationalization: { defaultLocale: 'en' },
    log: { mode: 'disabled' },
  }) as unknown as IntlayerConfig;

/** Runs `configResolved` then `transform` the way Vite would in dev. */
const transformComponent = async (
  saveComponents: boolean,
  moduleId: string = COMPONENT_PATH
): Promise<void> => {
  getConfigurationMock.mockReturnValue(createConfig(saveComponents));

  const plugin = intlayerCompiler() as Plugin;
  const configResolved = plugin.configResolved as unknown as (viteConfig: {
    env: { DEV: boolean };
    root: string;
    plugins: Plugin[];
  }) => Promise<void>;
  const transform = plugin.transform as (
    code: string,
    moduleId: string
  ) => Promise<unknown>;

  await configResolved({ env: { DEV: true }, root: '/app', plugins: [plugin] });
  await transform('export const Home = () => <p>Add 1</p>;', moduleId);
};

describe('intlayerCompiler transform', () => {
  beforeEach(() => {
    extractContentMock.mockReset();
    extractContentMock.mockResolvedValue(undefined);
  });

  it('keeps the transformation in memory when saveComponents is false', async () => {
    await transformComponent(false);

    expect(extractContentMock).toHaveBeenCalledWith(
      COMPONENT_PATH,
      'react-intlayer',
      expect.objectContaining({ declarationOnly: true })
    );
  });

  it('writes the component back when saveComponents is true', async () => {
    await transformComponent(true);

    expect(extractContentMock).toHaveBeenCalledWith(
      COMPONENT_PATH,
      'react-intlayer',
      expect.objectContaining({ declarationOnly: false })
    );
  });

  it('compiles a TanStack Router split module under the plain file path', async () => {
    await transformComponent(true, `${COMPONENT_PATH}?tsr-split=component`);

    expect(extractContentMock).toHaveBeenCalledWith(
      COMPONENT_PATH,
      'react-intlayer',
      expect.objectContaining({ declarationOnly: true })
    );
  });

  it('skips asset and framework sub-block modules', async () => {
    await transformComponent(false, `${COMPONENT_PATH}?raw`);

    expect(extractContentMock).not.toHaveBeenCalled();
  });
});

describe('getCompilableModule', () => {
  it('keeps plain ids as they are', () => {
    expect(getCompilableModule('/app/Home.tsx')).toEqual({
      filePath: '/app/Home.tsx',
      isVirtualModule: false,
    });
  });

  it('strips the query of code-split route modules', () => {
    expect(
      getCompilableModule('/app/routes/index.tsx?tsr-split=component')
    ).toEqual({ filePath: '/app/routes/index.tsx', isVirtualModule: true });
    expect(getCompilableModule('/app/routes/index.tsx?tsr-shared=1')).toEqual({
      filePath: '/app/routes/index.tsx',
      isVirtualModule: true,
    });
  });

  it.each([
    '/app/Home.tsx?raw',
    '/app/Home.tsx?url',
    '/app/Home.tsx?worker&inline',
    '/app/Home.tsx?import',
    '/app/App.vue?vue&type=script&setup=true&lang.ts',
    '/app/App.svelte?svelte&type=style&lang.css',
    '/app/Page.astro?astro&type=script&index=0&lang.ts',
  ])('skips %s', (moduleId) => {
    expect(getCompilableModule(moduleId)).toBeUndefined();
  });
});
