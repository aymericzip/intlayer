import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { CopyToClipboard } from '.';

describe('CopyToClipboard ', () => {
  afterEach(cleanup);

  const mockedNavigator = {
    clipboard: {
      writeText: vi.fn().mockResolvedValue(null), // Resolved promise with no value
    },
  } as unknown as Navigator;
  // `window.navigator` is getter-only in jsdom, so it cannot be assigned
  vi.stubGlobal('navigator', mockedNavigator);

  test('Run as Standalone Component', async () => {
    render(<CopyToClipboard text="Hello World" />);

    const button = screen.getByTestId('copy-to-clipboard');
    expect(button).toBeDefined();

    // Simulate the user clicking the button
    await userEvent.click(button);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Hello World');
  });

  test('Run as Standalone Component with isLoading prop', async () => {
    render(
      <CopyToClipboard text="Hello World">
        <div>Content</div>
      </CopyToClipboard>
    );

    const button = screen.getByTestId('copy-to-clipboard');
    expect(button).toBeDefined();

    await userEvent.click(button);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Hello World');

    expect(screen.queryByText('Content')).toBeDefined();
  });
});
