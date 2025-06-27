import { describe, expect, it } from 'vitest';
import { chunkText } from './calculateChunks';
import { getChunk } from './getChunk';

// Sample multiline string reused across test cases
const sampleText = [
  'Line 0: The quick brown fox jumps over the lazy dog.',
  'Line 1: Pack my box with five dozen liquor jugs.',
  'Line 2: How razorback-jumping frogs can level six piqued gymnasts!',
  'Line 3: 1. 2. 3. 4. 5. 6. 7. 8. 9. 10. 11. 12. 13. 14. 15. 16. 17. 18. 19. 20. 21. 22. 23. 24. 25. 26. 27. 28. 29. 30. 31. 32. 33. 34. 35. 36. 37. 38. 39. 40. 41. 42. 43. 44. 45. 46. 47. 48. 49. 50. 51. 52. 53. 54. 55. 56. 57. 58. 59. 60. ',
  'Line 4: A mad boxer shot a quick, gloved jab to the jaw of his dizzy opponent.',
].join('\n');

describe('calculateChunks', () => {
  it.skip('creates chunks with custom parameters', () => {
    const chunks = chunkText(sampleText, 200);

    expect(chunks).toStrictEqual([
      {
        content:
          'Line 0: The quick brown fox jumps over the lazy dog.\n' +
          'Line 1: Pack my box with five dozen liquor jugs.\n' +
          'Line 2: How razorback-jumping frogs can level six piqued gymnasts!',
        lineStart: 0,
        lineEnd: 2,
        charStart: 0,
        charEnd: 167,
      },
      {
        content:
          'Line 3: 1. 2. 3. 4. 5. 6. 7. 8. 9. 10. 11. 12. 13. 14. 15. 16. 17. 18. 19. 20. 21. 22. 23. 24. 25. 26. 27. 28. 29. 30. 31. 32. 33. 34. 35. 36. 37. 38. 39. 40. 41. 42. 43. 44. 45. 46. 47. 48. 49. 50. 5',
        lineStart: 3,
        lineEnd: 3,
        charStart: 0,
        charEnd: 199,
      },
      {
        content: '1. 52. 53. 54. 55. 56. 57. 58. 59. 60. ',
        lineStart: 3,
        lineEnd: 3,
        charStart: 200,
        charEnd: 238,
      },
      {
        content:
          'Line 4: A mad boxer shot a quick, gloved jab to the jaw of his dizzy opponent.',
        lineStart: 4,
        lineEnd: 4,
        charStart: 0,
        charEnd: 77,
      },
    ]);
  });

  it('creates chunks with overlap', () => {
    const chunks = chunkText(sampleText, 200, 100);

    expect(chunks).toStrictEqual([
      {
        content:
          'Line 0: The quick brown fox jumps over the lazy dog.\n' +
          'Line 1: Pack my box with five dozen liquor jugs.\n' +
          'Line 2: How razorback-jumping frogs can level six piqued gymnasts!\n',
        lineStart: 0,
        lineLength: 3,
        charStart: 0,
        charLength: 169,
      },
      {
        content:
          'Line 2: How razorback-jumping frogs can level six piqued gymnasts!\n' +
          'Line 3: 1. 2. 3. 4. 5. 6. 7. 8. 9. 10. 11. 12. 13. 14. 15. 16. 17. 18. 19. 20. 21. 22. 23. 24. 25. 26. 27. 28. 29. 30. 31. 32. 33. 34. 35. 36. 37. 38. 39. 40. 41. 42. 43. 44. 45. 46. 47. 48. 49. 50. 5',
        lineStart: 2,
        lineLength: 2,
        charStart: 102,
        charLength: 267,
      },
      {
        content:
          '6. 27. 28. 29. 30. 31. 32. 33. 34. 35. 36. 37. 38. 39. 40. 41. 42. 43. 44. 45. 46. 47. 48. 49. 50. 51. 52. 53. 54. 55. 56. 57. 58. 59. 60. \n',
        lineStart: 3,
        lineLength: 1,
        charStart: 269,
        charLength: 140,
      },
      {
        content:
          '1. 52. 53. 54. 55. 56. 57. 58. 59. 60. \n' +
          'Line 4: A mad boxer shot a quick, gloved jab to the jaw of his dizzy opponent.',
        lineStart: 3,
        lineLength: 2,
        charStart: 369,
        charLength: 118,
      },
    ]);
  });

  it('Line and char stats correspond', () => {
    const chunks = chunkText(sampleText, 200, 100);

    const firstChunk = chunks[0];
    const thirdChunk = chunks[2];

    const retrievedFirstChunk = getChunk(sampleText, firstChunk);
    const retrievedThirdChunk = getChunk(sampleText, thirdChunk);

    expect(retrievedFirstChunk).toBe(firstChunk.content);
    expect(retrievedThirdChunk).toBe(thirdChunk.content);
  });
});
