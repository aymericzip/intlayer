import { getAiProviderSetup } from '@intlayer/engine/cli';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { initAI } from './initAI';
import { SKIP_VALUE } from './utils/skipStep';

const installAiProviderPackagesMock = vi.hoisted(() => vi.fn(async () => {}));
const setupAiProviderMock = vi.hoisted(() => vi.fn(async () => {}));
const selectMock = vi.hoisted(() => vi.fn());
const passwordMock = vi.hoisted(() => vi.fn());
const outroMock = vi.hoisted(() => vi.fn());

/** What clack resolves a prompt to on Esc / Ctrl+C. */
const CANCEL = Symbol('clack:cancel');

vi.mock('@intlayer/engine/cli', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@intlayer/engine/cli')>()),
  installAiProviderPackages: installAiProviderPackagesMock,
  setupAiProvider: setupAiProviderMock,
  fetchAiProviderModels: async () => [],
}));

vi.mock('./loadPrompts', () => ({
  loadPrompts: async () => ({
    intro: vi.fn(),
    outro: outroMock,
    cancel: vi.fn(),
    select: selectMock,
    password: passwordMock,
    text: vi.fn(),
    isCancel: (value: unknown) => value === CANCEL,
    spinner: () => ({ start: vi.fn(), stop: vi.fn() }),
    log: { info: vi.fn(), error: vi.fn() },
  }),
}));

vi.mock('./utils/isInteractiveTerminal', () => ({
  isInteractiveTerminal: () => true,
}));

const SKIPPED_MESSAGE =
  'AI translation skipped. Run `intlayer init ai` to set it up later.';

describe('initAI', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('installs nothing when the provider picker is skipped', async () => {
    selectMock.mockResolvedValueOnce(SKIP_VALUE);

    await initAI(process.cwd());

    expect(passwordMock).not.toHaveBeenCalled();
    expect(installAiProviderPackagesMock).not.toHaveBeenCalled();
    expect(outroMock).toHaveBeenCalledWith(SKIPPED_MESSAGE);
  });

  it('installs nothing when the API key prompt is left with Esc', async () => {
    selectMock.mockResolvedValueOnce('anthropic');
    passwordMock.mockResolvedValueOnce(CANCEL);

    await initAI(process.cwd());

    expect(installAiProviderPackagesMock).not.toHaveBeenCalled();
    expect(setupAiProviderMock).not.toHaveBeenCalled();
    expect(outroMock).toHaveBeenCalledWith(SKIPPED_MESSAGE);
  });

  it('installs nothing when the model picker is skipped', async () => {
    selectMock
      .mockResolvedValueOnce('anthropic')
      .mockResolvedValueOnce(SKIP_VALUE);
    passwordMock.mockResolvedValueOnce('');

    await initAI(process.cwd());

    expect(installAiProviderPackagesMock).not.toHaveBeenCalled();
    expect(setupAiProviderMock).not.toHaveBeenCalled();
  });

  it('installs and configures the provider once every answer is in', async () => {
    const model = getAiProviderSetup('anthropic')?.suggestedModels[0];
    selectMock.mockResolvedValueOnce('anthropic').mockResolvedValueOnce(model);
    passwordMock.mockResolvedValueOnce('');

    await initAI(process.cwd());

    expect(installAiProviderPackagesMock).toHaveBeenCalledOnce();
    expect(setupAiProviderMock).toHaveBeenCalledWith(process.cwd(), {
      provider: 'anthropic',
      model,
      apiKey: undefined,
    });
  });
});
