import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { KeyboardShortcut } from './KeyboardShortcut';

describe('KeyboardShortcut', () => {
  test('renders keyboard shortcut', () => {
    render(<KeyboardShortcut shortcut="⌘ + F" />);

    const kbdElement = screen.getByRole('generic');
    expect(kbdElement).toBeDefined();
  });

  test('displays correct keys', () => {
    const { container } = render(<KeyboardShortcut shortcut="⌘ + F" />);

    const kbdElement = container.querySelector('kbd');
    expect(kbdElement).toBeDefined();
    expect(kbdElement?.textContent).toContain('F');
  });

  test('triggers callback on keyboard shortcut', () => {
    const mockCallback = vi.fn();
    render(<KeyboardShortcut shortcut="⌘ + F" onTriggered={mockCallback} />);

    // Simulate ⌘ + F (Meta + F)
    fireEvent.keyDown(window, {
      key: 'f',
      metaKey: true,
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  test('does not trigger callback on wrong key combination', () => {
    const mockCallback = vi.fn();
    render(<KeyboardShortcut shortcut="⌘ + F" onTriggered={mockCallback} />);

    // Simulate wrong key combination
    fireEvent.keyDown(window, {
      key: 'k',
      metaKey: true,
    });

    expect(mockCallback).not.toHaveBeenCalled();
  });

  test('displays correct size classes', () => {
    const { container: containerSm } = render(
      <KeyboardShortcut shortcut="⌘ + F" size="sm" />
    );
    const { container: containerMd } = render(
      <KeyboardShortcut shortcut="⌘ + F" size="md" />
    );
    const { container: containerLg } = render(
      <KeyboardShortcut shortcut="⌘ + F" size="lg" />
    );

    const kbdSm = containerSm.querySelector('kbd');
    const kbdMd = containerMd.querySelector('kbd');
    const kbdLg = containerLg.querySelector('kbd');

    expect(kbdSm?.className).toContain('text-xs');
    expect(kbdMd?.className).toContain('text-sm');
    expect(kbdLg?.className).toContain('text-base');
  });

  test('hides display when display prop is false', () => {
    const { container } = render(
      <KeyboardShortcut shortcut="⌘ + F" display={false} />
    );

    const kbdElement = container.querySelector('kbd');
    expect(kbdElement).toBeNull();
  });

  test('applies custom className', () => {
    const customClass = 'custom-test-class';
    const { container } = render(
      <KeyboardShortcut shortcut="⌘ + F" className={customClass} />
    );

    const kbdElement = container.querySelector('kbd');
    expect(kbdElement?.className).toContain(customClass);
  });

  test('handles multi-key combinations', () => {
    const mockCallback = vi.fn();
    render(
      <KeyboardShortcut shortcut="⌘ + Shift + K" onTriggered={mockCallback} />
    );

    // Simulate ⌘ + Shift + K
    fireEvent.keyDown(window, {
      key: 'k',
      metaKey: true,
      shiftKey: true,
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  test('prevents default behavior when shortcut is triggered', () => {
    const mockCallback = vi.fn();
    render(<KeyboardShortcut shortcut="⌘ + F" onTriggered={mockCallback} />);

    const event = new KeyboardEvent('keydown', {
      key: 'f',
      metaKey: true,
    });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    window.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
