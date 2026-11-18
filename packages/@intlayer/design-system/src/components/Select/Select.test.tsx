import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Select } from './Select';

type HarnessProps = {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

const Harness = ({ defaultValue, onValueChange }: HarnessProps) => (
  <Select
    name="fruit"
    defaultValue={defaultValue}
    onValueChange={onValueChange}
  >
    <Select.Trigger aria-label="Fruit">
      <Select.Value placeholder="Pick a fruit" />
    </Select.Trigger>
    <Select.Content>
      <Select.Item value="apple">Apple</Select.Item>
      <Select.Item value="banana" disabled>
        Banana
      </Select.Item>
      <Select.Item value="cherry">Cherry</Select.Item>
    </Select.Content>
  </Select>
);

const getTrigger = () => screen.getByRole('combobox', { name: 'Fruit' });

describe('Select', () => {
  test('shows the placeholder without a value', () => {
    render(<Harness />);

    expect(getTrigger().textContent).toContain('Pick a fruit');
    expect(getTrigger().hasAttribute('data-placeholder')).toBe(true);
  });

  test('shows the selected label while closed', async () => {
    render(<Harness defaultValue="cherry" />);

    await waitFor(() => expect(getTrigger().textContent).toContain('Cherry'));
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  test('opens on click and selects an option', async () => {
    const onValueChange = vi.fn();
    const { container } = render(<Harness onValueChange={onValueChange} />);

    fireEvent.click(getTrigger());
    const option = await screen.findByRole('option', { name: 'Cherry' });

    expect(getTrigger().getAttribute('aria-expanded')).toBe('true');

    fireEvent.click(option);

    expect(onValueChange).toHaveBeenCalledWith('cherry');
    await waitFor(() => expect(screen.queryByRole('listbox')).toBeNull());
    expect(getTrigger().textContent).toContain('Cherry');
    expect(
      container.querySelector<HTMLInputElement>('input[name="fruit"]')?.value
    ).toBe('cherry');
  });

  test('navigates with the keyboard, skipping disabled options', async () => {
    const onValueChange = vi.fn();
    render(<Harness defaultValue="apple" onValueChange={onValueChange} />);

    fireEvent.keyDown(getTrigger(), { key: 'ArrowDown' });
    const listbox = await screen.findByRole('listbox');

    await waitFor(() =>
      expect(document.activeElement?.textContent).toBe('Apple')
    );

    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    expect(document.activeElement?.textContent).toBe('Cherry');

    fireEvent.keyDown(listbox, { key: 'Enter' });
    expect(onValueChange).toHaveBeenCalledWith('cherry');
  });

  test('closes on Escape and returns focus to the trigger', async () => {
    render(<Harness />);

    fireEvent.click(getTrigger());
    const listbox = await screen.findByRole('listbox');

    fireEvent.keyDown(listbox, { key: 'Escape' });

    await waitFor(() => expect(screen.queryByRole('listbox')).toBeNull());
    expect(document.activeElement).toBe(getTrigger());
  });

  test('typeahead on the closed trigger selects the matching option', async () => {
    const onValueChange = vi.fn();
    render(<Harness onValueChange={onValueChange} />);

    await waitFor(() => {
      fireEvent.keyDown(getTrigger(), { key: 'c' });
      expect(onValueChange).toHaveBeenCalledWith('cherry');
    });
  });
});
