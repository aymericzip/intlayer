import type { Dictionary } from 'intlayer';

const appContent = {
  key: 'newTest',
  locale: 'en',
  fill: (ctx) => `./${ctx.fileName}.${ctx.locale}.content.ts`,
  content: {
    title: 'Vite + React',
  },
} satisfies Dictionary;

export default appContent;
