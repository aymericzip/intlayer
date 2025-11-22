import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import { getConfiguration } from '@intlayer/config';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { extractIntlayer } from './transformFiles';

// Mock dependencies
vi.mock('@intlayer/config', async () => {
  const actual = await vi.importActual('@intlayer/config');
  return {
    ...actual,
    getConfiguration: vi.fn(),
    getAppLogger: () => vi.fn(),
  };
});

vi.mock('../writeContentDeclaration', () => ({
  writeContentDeclaration: vi.fn(),
}));

const tmpDir = join(process.cwd(), 'tmp_test_extract_advanced');

describe('extractIntlayer', () => {
  beforeEach(() => {
    if (!existsSync(tmpDir)) {
      mkdirSync(tmpDir, { recursive: true });
    }
    vi.mocked(getConfiguration).mockReturnValue({
      internationalization: {
        defaultLocale: 'en',
      },
      content: {
        baseDir: tmpDir,
        fileExtensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    } as any);
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
    vi.clearAllMocks();
  });

  it('should extract text from advanced React patterns', async () => {
    const componentPath = join(tmpDir, 'Test.tsx');
    const componentCode = `
'use client';
import { useState } from 'react';

export const HelloWorld = () => {
  const [state, setState] = useState('This is a sentence if a state (should be extracted)');
  const [isClicked, setIsClicked] = useState(false);
  const listOfItems = ["I'm a list of items (should be extracted)"];

  return (
    <div>
      <h1>Hello World (should be extracted)</h1>
      <button onClick={() => setIsClicked(true)}>
        {isClicked ? 'Clicked (should be extracted)' : 'Click me (should be extracted)'}
      </button>
      <input placeholder="This is the placeholder (should be extracted)" />
      <ul>
        {listOfItems.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
};
`;
    writeFileSync(componentPath, componentCode);

    await extractIntlayer(componentPath, 'next-intlayer');

    const updatedCode = readFileSync(componentPath, 'utf-8');

    // Imports
    expect(updatedCode).toContain(
      'import { useIntlayer } from "next-intlayer";'
    );
    // Hook
    expect(updatedCode).toContain('const content = useIntlayer("test");');

    // State extraction
    // In useState (non-JSX), it should use content.key.value
    expect(updatedCode).toContain(
      'useState(content.thisIsASentenceIfAStateShouldBeExtracted.value)'
    );

    // Array extraction (non-JSX)
    expect(updatedCode).toContain(
      'content.imAListOfItemsShouldBeExtracted.value'
    );

    // JSX Text
    expect(updatedCode).toContain(
      '<h1>{content.helloWorldShouldBeExtracted}</h1>'
    );

    // Ternary in JSX
    expect(updatedCode).toContain(
      '{isClicked ? content.clickedShouldBeExtracted.value : content.clickMeShouldBeExtracted.value}'
    );

    // Attribute
    expect(updatedCode).toContain(
      'placeholder={content.thisIsThePlaceholderShouldBeExtracted}'
    );
  });

  it('should skip text that should not be extracted', async () => {
    const componentPath = join(tmpDir, 'SkipTest.tsx');
    const componentCode = `
 export const SkipTest = () => {
   return (
     <div className="container">
       <p>camelCase</p>
       <p>kebab-case</p>
       <p>lowercase sentence</p>
       <p>Valid Sentence</p>
     </div>
   );
 };
 `;
    writeFileSync(componentPath, componentCode);

    await extractIntlayer(componentPath, 'react-intlayer');

    const updatedCode = readFileSync(componentPath, 'utf-8');

    // Should NOT extract
    expect(updatedCode).toContain('<p>camelCase</p>');
    expect(updatedCode).toContain('<p>kebab-case</p>');
    expect(updatedCode).toContain('<p>lowercase sentence</p>');

    // Should extract
    expect(updatedCode).toContain('<p>{content.validSentence}</p>');
  });
});
