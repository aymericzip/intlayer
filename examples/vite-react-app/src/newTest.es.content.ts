import type { Dictionary } from 'intlayer';

const newtestContent = {
  key: 'newTest',
  locale: 'es',
  filled: true,
  description:
    'Content declaration for \'newTest\' containing the title "Vite + React".',
  title: 'New Test',
  tags: ['component', 'vite', 'react', 'example'],
  content: {
    title: 'Vite + React',
  },
} satisfies Dictionary;

export default newtestContent;
