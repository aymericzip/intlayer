import { useIntlayer } from 'vanilla-intlayer';

/**
 * Wires up a counter button with an i18n label.
 *
 * Demonstrates `useIntlayer` with an onChange callback:
 * whenever the locale changes the button text is refreshed automatically.
 */
export function setupCounter(button: HTMLButtonElement): () => void {
  let count = 0;

  const content = useIntlayer('app');

  const setCount = (next: number) => {
    count = next;
    button.innerHTML = String(content.countIs({ count }));
  };

  button.addEventListener('click', () => setCount(count + 1));
  setCount(0);

  // Cleanup is managed by the parent (main.ts HMR dispose)
  return () => {};
}
