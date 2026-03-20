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

describe('ContentEditableTextArea input handling', () => {
  test('controlled value updates reflected in DOM', () => {
    const { rerender } = render(<ContentEditableTextArea value="initial" />);
    const el = screen.getByRole('textbox');
    expect(el.textContent).toContain('initial');
    rerender(<ContentEditableTextArea value="updated" />);
    expect(el.textContent).toContain('updated');
  });

  test('multiline controlled value renders correct number of lines', () => {
    render(<ContentEditableTextArea value={'line1\nline2\nline3'} />);
    const el = screen.getByRole('textbox');
    expect(el.querySelectorAll('[data-line]').length).toBe(3);
  });

  test('empty value shows placeholder', () => {
    render(<ContentEditableTextArea value="" placeholder="Enter text..." />);
    expect(screen.getByText('Enter text...')).toBeDefined();
  });

  test('non-empty value hides placeholder', () => {
    render(
      <ContentEditableTextArea value="hello" placeholder="Enter text..." />
    );
    expect(screen.queryByText('Enter text...')).toBeNull();
  });

  test('disabled prevents contentEditable', () => {
    render(<ContentEditableTextArea value="read only" disabled />);
    const el = screen.getByRole('textbox');
    expect(el.getAttribute('contenteditable')).toBe('false');
    expect(el.getAttribute('tabindex')).toBe('-1');
  });

  test('aria-disabled is set when disabled', () => {
    render(<ContentEditableTextArea disabled />);
    expect(screen.getByRole('textbox').getAttribute('aria-disabled')).toBe(
      'true'
    );
  });

  test('ghost text sets aria-autocomplete=inline', () => {
    render(
      <ContentEditableTextArea
        value="test"
        ghostText="suggestion"
        ghostLine={0}
        ghostOffset={4}
      />
    );
    expect(screen.getByRole('textbox').getAttribute('aria-autocomplete')).toBe(
      'inline'
    );
  });

  test('no ghost text means no aria-autocomplete', () => {
    render(<ContentEditableTextArea value="test" />);
    expect(
      screen.getByRole('textbox').getAttribute('aria-autocomplete')
    ).toBeNull();
  });

  test('dir prop is passed to element', () => {
    render(<ContentEditableTextArea value="test" dir="rtl" data-testid="ce" />);
    expect(screen.getByTestId('ce').getAttribute('dir')).toBe('rtl');
  });
});

describe('useContentEditable utilities', () => {
  test('single line text gives correct lines', () => {
    const { result } = renderHook(() =>
      useContentEditable({ value: 'no newlines here' })
    );
    expect(result.current.lines).toEqual(['no newlines here']);
  });

  test('trailing newline creates empty last line', () => {
    const { result } = renderHook(() =>
      useContentEditable({ value: 'hello\n' })
    );
    expect(result.current.lines).toEqual(['hello', '']);
  });

  test('multiple consecutive newlines preserved', () => {
    const { result } = renderHook(() =>
      useContentEditable({ value: 'a\n\n\nb' })
    );
    expect(result.current.lines).toEqual(['a', '', '', 'b']);
  });

  test('defaultValue is used when value is undefined', () => {
    const { result } = renderHook(() =>
      useContentEditable({ defaultValue: 'fallback' })
    );
    expect(result.current.getText()).toBe('fallback');
  });

  test('empty options gives single empty line', () => {
    const { result } = renderHook(() => useContentEditable({}));
    expect(result.current.lines).toEqual(['']);
    expect(result.current.getText()).toBe('');
  });
});
