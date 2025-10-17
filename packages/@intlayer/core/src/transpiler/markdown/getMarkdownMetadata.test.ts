import { describe, expect, it } from 'vitest';
import { getMarkdownMetadata } from '../markdown';

describe('getMarkdownMetadata', () => {
  const markdown = [
    '---',
    'title: Mock Title',
    'description: Mock Description',
    'author: Mock Author',
    'date: 2024-01-01',
    'tags:',
    '  - tag1',
    '  - tag2',
    '  - tag3',
    '---',
    '# Mock Heading',
    'This is a mock paragraph with some sample text.',
    'Here is another mock paragraph.',
    '## Mock Section',
    'Some more mock content goes here.',
    '### Mock Subsection',
    'Final mock paragraph with test content.',
  ].join('\n');

  it('should return the metadata from the markdown file', () => {
    const metadata = getMarkdownMetadata(markdown);
    expect(metadata).toEqual({
      title: 'Mock Title',
      description: 'Mock Description',
      author: 'Mock Author',
      date: '2024-01-01',
      tags: ['tag1', 'tag2', 'tag3'],
    });
  });

  it('should return an empty object if the markdown file is empty', () => {
    const metadata = getMarkdownMetadata('');
    expect(metadata).toEqual({});
  });
});
