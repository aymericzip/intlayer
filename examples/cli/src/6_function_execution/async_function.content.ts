import type { DeclarationContent } from 'intlayer';

const fakeFetch = async (): Promise<string> => {
  // Create a Promise that resolves after 200ms
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('This is the content fetched from the server');
    }, 200);
  });
};

const asyncFunctionContent = {
  key: 'async_function',
  content: {
    text: fakeFetch,
  },
} satisfies DeclarationContent;

export default asyncFunctionContent;
