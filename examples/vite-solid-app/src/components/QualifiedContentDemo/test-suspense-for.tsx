import {
  createMemo,
  createResource,
  For,
  Suspense,
  SuspenseContext,
} from 'solid-js';
import { renderToStringAsync } from 'solid-js/web';

const App = () => {
  const [res] = createResource(
    () => new Promise((r) => setTimeout(() => r([1, 2, 3]), 100))
  );
  const proxy = new Proxy(
    {},
    {
      get(t, p) {
        if (p === 'length') {
          const val = res();
          return val ? val.length : 0;
        }
        return res()[p];
      },
    }
  );

  return (
    <Suspense fallback="LOADING">
      <For each={proxy as any[]}>{(item) => <div>{item}</div>}</For>
    </Suspense>
  );
};

renderToStringAsync(() => <App />).then(console.log);
