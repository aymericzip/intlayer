import { fireEvent, render, screen } from '@testing-library/react';
import type { FC } from 'react';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import { useListKeyboardNavigation } from './useListKeyboardNavigation';

const ROW_LABELS = ['English', 'Français', 'Español'];

type HarnessProps = {
  itemCount?: number;
  onRowClick?: (label: string) => void;
};

/** A search input filtering a list of rows, each holding a link. */
const Harness: FC<HarnessProps> = ({
  itemCount = ROW_LABELS.length,
  onRowClick,
}) => {
  const { highlightedIndex, setItemElement, handleKeyDown } =
    useListKeyboardNavigation<HTMLLIElement>({ itemCount });

  return (
    <div>
      <input data-testid="search" onKeyDown={handleKeyDown} />
      <ul>
        {ROW_LABELS.slice(0, itemCount).map((label, index) => (
          <li
            key={label}
            data-testid={`row-${index}`}
            data-highlighted={index === highlightedIndex}
            ref={(element) => setItemElement(index, element)}
          >
            {/* biome-ignore lint/a11y/useValidAnchor: the click handler is the assertion */}
            <a href="#" onClick={() => onRowClick?.(label)}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const getHighlightedIndex = () =>
  ROW_LABELS.findIndex(
    (_, index) =>
      screen.getByTestId(`row-${index}`).dataset.highlighted === 'true'
  );

const pressKey = (key: string) =>
  fireEvent.keyDown(screen.getByTestId('search'), { key });

beforeAll(() => {
  // jsdom does not implement scrolling.
  Element.prototype.scrollIntoView = vi.fn();
});

describe('useListKeyboardNavigation', () => {
  test('highlights no row until an arrow key is pressed', () => {
    render(<Harness />);

    expect(getHighlightedIndex()).toBe(-1);
  });

  test('arrow down enters the list from the top and moves forward', () => {
    render(<Harness />);

    pressKey('ArrowDown');
    expect(getHighlightedIndex()).toBe(0);

    pressKey('ArrowDown');
    expect(getHighlightedIndex()).toBe(1);
  });

  test('arrow up enters the list from the bottom', () => {
    render(<Harness />);

    pressKey('ArrowUp');
    expect(getHighlightedIndex()).toBe(ROW_LABELS.length - 1);
  });

  test('wraps around at both ends', () => {
    render(<Harness />);

    pressKey('ArrowUp');
    pressKey('ArrowDown');
    expect(getHighlightedIndex()).toBe(0);

    pressKey('ArrowUp');
    expect(getHighlightedIndex()).toBe(ROW_LABELS.length - 1);
  });

  test('enter clicks the link of the highlighted row', () => {
    const onRowClick = vi.fn();
    render(<Harness onRowClick={onRowClick} />);

    pressKey('ArrowDown');
    pressKey('ArrowDown');
    pressKey('Enter');

    expect(onRowClick).toHaveBeenCalledTimes(1);
    expect(onRowClick).toHaveBeenCalledWith(ROW_LABELS[1]);
  });

  test('enter does nothing while no row is highlighted', () => {
    const onRowClick = vi.fn();
    render(<Harness onRowClick={onRowClick} />);

    pressKey('Enter');

    expect(onRowClick).not.toHaveBeenCalled();
  });

  test('ignores arrow keys on an empty list', () => {
    render(<Harness itemCount={0} />);

    pressKey('ArrowDown');

    expect(screen.queryByTestId('row-0')).toBeNull();
  });
});
