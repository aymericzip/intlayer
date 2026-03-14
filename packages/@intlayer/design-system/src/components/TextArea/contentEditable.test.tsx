import { render, renderHook, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import {
  ContentEditableTextArea,
  useContentEditable,
} from './ContentEditableTextArea';

describe('useContentEditable', () => {
  test('splits value into lines', () => {
    const { result } = renderHook(() =>
      useContentEditable({ value: 'line1\nline2\nline3' })
    );
    expect(result.current.lines).toEqual(['line1', 'line2', 'line3']);
  });

  test('empty string gives single empty line', () => {
    const { result } = renderHook(() => useContentEditable({ value: '' }));
    expect(result.current.lines).toEqual(['']);
  });

  test('getText joins lines back', () => {
    const { result } = renderHook(() =>
      useContentEditable({ value: 'hello\nworld' })
    );
    expect(result.current.getText()).toBe('hello\nworld');
  });

  test('reacts to value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useContentEditable({ value }),
      { initialProps: { value: 'initial' } }
    );
    rerender({ value: 'updated\ntext' });
    expect(result.current.lines).toEqual(['updated', 'text']);
  });
});

describe('ContentEditableTextArea', () => {
  test('renders as role=textbox with aria-multiline', () => {
    render(<ContentEditableTextArea />);
    const el = screen.getByRole('textbox');
    expect(el).toBeDefined();
    expect(el.getAttribute('aria-multiline')).toBe('true');
  });

  test('renders value as line spans', () => {
    render(<ContentEditableTextArea value={'line1\nline2'} />);
    const el = screen.getByRole('textbox');
    expect(el.querySelectorAll('[data-line]').length).toBe(2);
  });

  test('shows placeholder when empty', () => {
    render(<ContentEditableTextArea placeholder="Type here..." />);
    expect(screen.getByText('Type here...')).toBeDefined();
  });

  test('disabled sets contenteditable=false', () => {
    render(<ContentEditableTextArea disabled />);
    expect(screen.getByRole('textbox').getAttribute('contenteditable')).toBe(
      'false'
    );
  });

  test('passes className through', () => {
    render(<ContentEditableTextArea className="my-class" data-testid="ce" />);
    expect(screen.getByTestId('ce').className).toContain('my-class');
  });

  test('renders ghost text on specified line', () => {
    render(
      <ContentEditableTextArea
        value="hello "
        ghostText="world"
        ghostLine={0}
        ghostOffset={6}
      />
    );
    expect(screen.getByText('world')).toBeDefined();
  });
});
