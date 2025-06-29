import { describe, expect, it } from 'vitest';
import { listSpecialChars } from './listSpecialChars';

const test = [
  'Lorem ipsum dolor sit amet consectetur adipiscing elit. (Quisque faucibus ex sapien vitae pellentesque sem placerat). In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
  'Lorem ipsum dolor sit amet consectetur adipiscing elit! Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
  'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
  'Lorem ipsum dolor sit amet consectetur adipiscing elit.. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
  'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
].join('\n');

describe('listSpecialChars', () => {
  it('should return an empty array if the text is empty', () => {
    const text = '';
    const result = listSpecialChars(text);
    expect(result).toEqual([]);
  });

  it('should return an array of special characters', () => {
    const result = listSpecialChars(test);
    expect(result).toEqual([
      {
        char: '(',
        charStart: 56,
        lineStart: 0,
      },
      {
        char: ')',
        charStart: 115,
        lineStart: 0,
      },
      {
        char: '\\',
        charStart: 439,
        lineStart: 0,
      },
      {
        char: '!',
        charStart: 494,
        lineStart: 1,
      },
      {
        char: '\\',
        charStart: 877,
        lineStart: 1,
      },
      {
        char: '\\',
        charStart: 1315,
        lineStart: 2,
      },
      {
        char: '\\',
        charStart: 1754,
        lineStart: 3,
      },
    ]);
  });
});
