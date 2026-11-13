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

const { intlayerCompiler } = await import('./IntlayerCompilerPlugin');

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
const transformComponent = async (saveComponents: boolean): Promise<void> => {
  getConfigurationMock.mockReturnValue(createConfig(saveComponents));

  const plugin = intlayerCompiler() as Plugin;
  const configResolved = plugin.configResolved as (viteConfig: {
    env: { DEV: boolean };
    root: string;
    plugins: Plugin[];
  }) => Promise<void>;
  const transform = plugin.transform as (
    code: string,
    moduleId: string
  ) => Promise<unknown>;

  await configResolved({ env: { DEV: true }, root: '/app', plugins: [plugin] });
  await transform('export const Home = () => <p>Add 1</p>;', COMPONENT_PATH);
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
});
