/* eslint-disable no-global-assign */
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { CopyToClipboard } from '.';

describe.skip('CopyToClipboard ', () => {
  afterEach(cleanup);

  const mockedNavigator = {
    clipboard: {
      writeText: vi.fn().mockResolvedValue(null), // Resolved promise with no value
    },
  } as unknown as Navigator;
  // mock navigator
  navigator = mockedNavigator;

  test('Run as Standalone Component', async () => {
    render(<CopyToClipboard text="Hello World" />);

    const button = screen.getByTestId('copy-to-clipboard');
    expect(button).toBeDefined();

    // Simulate the user clicking the button
    userEvent.click(button);

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

    userEvent.click(button);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Hello World');

    expect(screen.queryByText('Content')).toBeDefined();
  });
});
