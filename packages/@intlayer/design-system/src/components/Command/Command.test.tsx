import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Command, CommandRoot } from './index';

const Harness = ({ onSelect }: { onSelect: (value: string) => void }) => (
  <CommandRoot>
    <Command.Input placeholder="Search" />
    <Command.List>
      <Command.Empty>No results</Command.Empty>
      <Command.Group heading="Edit">
        <Command.Item value="improve" onSelect={onSelect}>
          Improve writing
        </Command.Item>
        <Command.Item onSelect={onSelect}>Fix grammar</Command.Item>
      </Command.Group>
      <Command.Separator />
      <Command.Group heading="More">
        <Command.Item value="continue" onSelect={onSelect}>
          Continue writing
        </Command.Item>
      </Command.Group>
    </Command.List>
  </CommandRoot>
);

const getInput = () => screen.getByPlaceholderText('Search');

describe('Command', () => {
  test('selects the first item and runs it on Enter', async () => {
    const onSelect = vi.fn();
    render(<Harness onSelect={onSelect} />);

    await waitFor(() =>
      expect(
        screen
          .getByRole('option', { name: 'Improve writing' })
          .getAttribute('aria-selected')
      ).toBe('true')
    );

    fireEvent.keyDown(getInput(), { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledWith('improve');
  });

  test('moves the selection with arrow keys, using text as value', async () => {
    const onSelect = vi.fn();
    render(<Harness onSelect={onSelect} />);

    await screen.findByRole('option', { name: 'Fix grammar' });
    fireEvent.keyDown(getInput(), { key: 'ArrowDown' });
    fireEvent.keyDown(getInput(), { key: 'Enter' });

    expect(onSelect).toHaveBeenCalledWith('Fix grammar');
  });

  test('filters items, hides empty groups and separators', async () => {
    render(<Harness onSelect={vi.fn()} />);

    fireEvent.change(getInput(), { target: { value: 'contin' } });

    await waitFor(() =>
      expect(screen.queryByRole('option', { name: 'Fix grammar' })).toBeNull()
    );
    expect(
      screen
        .getByRole('option', { name: 'Continue writing' })
        .getAttribute('aria-selected')
    ).toBe('true');
    expect(screen.getByText('Edit').closest('[hidden]')).not.toBeNull();
    expect(screen.queryByRole('separator')).toBeNull();
    expect(screen.queryByText('No results')).toBeNull();
  });

  test('shows the empty state without matches', async () => {
    render(<Harness onSelect={vi.fn()} />);

    fireEvent.change(getInput(), { target: { value: 'zzz' } });

    expect(await screen.findByText('No results')).toBeTruthy();
  });

  test('runs the item on click', async () => {
    const onSelect = vi.fn();
    render(<Harness onSelect={onSelect} />);

    fireEvent.click(
      await screen.findByRole('option', { name: 'Continue writing' })
    );

    expect(onSelect).toHaveBeenCalledWith('continue');
  });
});
