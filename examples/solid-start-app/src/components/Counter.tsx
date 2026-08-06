import { useIntlayer } from 'solid-intlayer';
import { createSignal } from 'solid-js';
import './Counter.css';

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer('counter');

  return (
    <button
      class="increment"
      onClick={() => setCount(count() + 1)}
      type="button"
    >
      {content.clicks(count())}
    </button>
  );
}
