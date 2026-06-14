import { createMemo, createResource, SuspenseContext } from 'solid-js';
import { renderToString } from 'solid-js/web';

const App = () => {
  const [res] = createResource(() => new Promise((r) => setTimeout(r, 100)));
  const memo = createMemo(() => res());

  try {
    memo();
    console.log('Memo returned:', memo());
  } catch (e) {
    console.error('Memo threw:', e);
  }
  return 'Hello';
};

console.log(
  'Render:',
  renderToString(() => App())
);
