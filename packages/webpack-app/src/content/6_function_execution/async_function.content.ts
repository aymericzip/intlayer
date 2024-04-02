import type { ContentModule } from 'intlayer';

const fakeFetch = async () => {
  // Wait for 200ms to simulate a fetch from the server
  await new Promise((resolve) => setTimeout(resolve, 200));

  return 'This is the content fetched from the server';
};

const asyncFunctionContent: ContentModule = {
  id: 'async_function',
  text: fakeFetch,
};

export default asyncFunctionContent;
