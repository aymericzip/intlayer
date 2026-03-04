import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import { getConfiguration } from '@intlayer/config/node';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { extractIntlayer } from './extractContent';

vi.mock('@intlayer/config/node', async () => {
  const actual = await vi.importActual('@intlayer/config/node');
  return {
    ...actual,
    getConfiguration: vi.fn(),
  };
});

vi.mock('@intlayer/config/logger', async () => {
  const actual = await vi.importActual('@intlayer/config/logger');
  return {
    ...actual,
    getAppLogger: () => vi.fn(),
  };
});

vi.mock('@intlayer/unmerged-dictionaries-entry', () => ({
  getUnmergedDictionaries: vi.fn().mockReturnValue({}),
}));

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

  // ==========================================
  // Existing specific ts-morph tests
  // ==========================================

  it('should extract text from advanced React patterns', async () => {
    const componentPath = join(tmpDir, 'Test.tsx');
    const componentCode = `
'use client';
import { useState } from 'react';

export const Test = () => {
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

    expect(updatedCode).toContain(
      "import { useIntlayer } from 'next-intlayer';"
    );
    expect(updatedCode).toContain("const content = useIntlayer('test');");
    expect(updatedCode).toContain('useState(content.thisIsASentenceIf.value)');
    expect(updatedCode).toContain('content.imAListOfItems.value');
    expect(updatedCode).toContain(
      '<h1>{content.helloWorldShouldBeExtracted}</h1>'
    );
    expect(updatedCode).toContain('content.clickedShouldBeExtracted.value');
    expect(updatedCode).toContain('content.clickMeShouldBeExtracted.value');
    expect(updatedCode).toContain(
      'placeholder={content.thisIsThePlaceholderShould.value}'
    );
  });

  it('should extract text from Solid patterns using accessor syntax', async () => {
    const componentPath = join(tmpDir, 'SolidTest.tsx');
    const componentCode = `
export const SolidTest = () => {
  return (
    <div>
      <h1>Hello World (should be extracted)</h1>
      <input placeholder="This is the placeholder (should be extracted)" />
    </div>
  );
};
`;
    writeFileSync(componentPath, componentCode);

    await extractIntlayer(componentPath, 'solid-intlayer');

    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toContain(
      "import { useIntlayer } from 'solid-intlayer';"
    );
    expect(updatedCode).toContain("const content = useIntlayer('solid-test');");
    expect(updatedCode).toContain(
      '<h1>{content().helloWorldShouldBeExtracted}</h1>'
    );
    expect(updatedCode).toContain(
      'placeholder={content().thisIsThePlaceholderShould.value}'
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

    expect(updatedCode).toContain('<p>camelCase</p>');
    expect(updatedCode).toContain('<p>kebab-case</p>');
    expect(updatedCode).toContain('<p>lowercase sentence</p>');
    expect(updatedCode).toContain('<p>{content.validSentence}</p>');
  });

  it('should extract text with variables from React nodes (Insertion)', async () => {
    const componentPath = join(tmpDir, 'InsertionTest.tsx');
    const componentCode = `
export const InsertionTest = () => {
  const count = 1;
  const user = { name: 'John' };
  return (
    <div>
      <p>Text with {count} var and {user.name} (should be extracted)</p>
    </div>
  );
};
`;
    writeFileSync(componentPath, componentCode);

    await extractIntlayer(componentPath, 'react-intlayer');

    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toContain(
      "import { useIntlayer } from 'react-intlayer';"
    );
    expect(updatedCode).toContain(
      "const content = useIntlayer('insertion-test');"
    );

    expect(updatedCode).toMatch(
      /<p>\s*\{content\.[a-zA-Z0-9_]+\(\{\s*count: count,\s*name: user\.name,?\s*\}\)\}\s*<\/p>/m
    );
  });

  // ==========================================
  // Babel-ported tests
  // ==========================================

  it('should ignore object keys and member expression properties (React compiler compatibility)', async () => {
    const componentPath = join(tmpDir, 'CompilerTest.tsx');
    const componentCode = `
      export function CompilerTest() {
        const obj = {
          "Compiler Generated String": () => <div>Hello World</div>
        };
        const cached = obj["Compiler Generated String"];
        return cached();
      }
    `;
    writeFileSync(componentPath, componentCode);
    await extractIntlayer(componentPath, 'react-intlayer');
    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toMatch(/['"]Compiler Generated String['"]:/);
    expect(updatedCode).toMatch(/obj\[['"]Compiler Generated String['"]\]/);
    expect(updatedCode).toContain('{content.helloWorld}');
  });

  it('should extract JSX text and inject useIntlayer properly', async () => {
    const componentPath = join(tmpDir, 'BasicJsxTest.tsx');
    const componentCode = `
      export function BasicJsxTest() {
        return <div>Hello World</div>;
      }
    `;
    writeFileSync(componentPath, componentCode);
    await extractIntlayer(componentPath, 'react-intlayer');
    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toContain('{content.helloWorld}');
    expect(updatedCode).toContain(
      "const content = useIntlayer('basic-jsx-test');"
    );
    expect(updatedCode).toContain(
      "import { useIntlayer } from 'react-intlayer';"
    );
  });

  it('should extract text from function and inject getIntlayer properly', async () => {
    const componentPath = join(tmpDir, 'UtilityTest.ts');
    const componentCode = `
      export function utilityTest() {
        return "Utility text";
      }
    `;
    writeFileSync(componentPath, componentCode);
    await extractIntlayer(componentPath, 'react-intlayer');
    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toContain('content.utilityText');
    expect(updatedCode).toContain(
      "const content = getIntlayer('utility-test');"
    );
    expect(updatedCode).toContain("import { getIntlayer } from 'intlayer';");
  });

  it('should leave user-defined imports completely untouched', async () => {
    const componentPath = join(tmpDir, 'ImportsTest.tsx');
    const componentCode = `
      import { useIntlayer, IntlayerClientProvider } from "react-intlayer";
      
      export function ImportsTest() {
        const dict = useIntlayer("some-dict");
        return <IntlayerClientProvider>{dict.hello}</IntlayerClientProvider>;
      }
    `;
    writeFileSync(componentPath, componentCode);
    await extractIntlayer(componentPath, 'react-intlayer');
    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toContain(
      'import { useIntlayer, IntlayerClientProvider } from "react-intlayer";'
    );
  });

  it('should extract multiple strings and handle attributes', async () => {
    const componentPath = join(tmpDir, 'MultipleStringsTest.tsx');
    const componentCode = `
      export function MultipleStringsTest() {
        return (
          <div title="Component Title">
            <img src="logo.png" alt="Company Logo" />
            <p>Welcome back!</p>
          </div>
        );
      }
    `;
    writeFileSync(componentPath, componentCode);
    await extractIntlayer(componentPath, 'react-intlayer');
    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toContain('title={content.componentTitle.value}');
    expect(updatedCode).toContain('alt={content.companyLogo.value}');
    expect(updatedCode).toContain('{content.welcomeBack}');
  });

  it('should not inject anything if no translatable strings are found', async () => {
    const componentPath = join(tmpDir, 'NoStringsTest.tsx');
    const componentCode = `
      import { someHelper } from "./helpers";
      export function NoStringsTest({ data }) {
        return <div className={someHelper(data)}>{data.id}</div>;
      }
    `;
    writeFileSync(componentPath, componentCode);
    await extractIntlayer(componentPath, 'react-intlayer');
    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).not.toContain('useIntlayer');
  });

  it('should handle strings in nested functions', async () => {
    const componentPath = join(tmpDir, 'NestedFunctionTest.tsx');
    const componentCode = `
      export function NestedFunctionTest() {
        const getLabel = () => "Label Text";
        return <div>{getLabel()}</div>;
      }
    `;
    writeFileSync(componentPath, componentCode);
    await extractIntlayer(componentPath, 'react-intlayer');
    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toMatch(
      /const content = useIntlayer\(['"]nested-function-test['"]\);/
    );
    expect(updatedCode).not.toMatch(
      /const content = getIntlayer\(['"]nested-function-test['"]\);/
    );
    expect(updatedCode).toContain('() => content.labelText.value');
  });

  it('should not duplicate imports if they are already present', async () => {
    const componentPath = join(tmpDir, 'ExistingImportTest.tsx');
    const componentCode = `
      import { useIntlayer } from "react-intlayer";
      export function ExistingImportTest() {
        return <div>Hello World</div>;
      }
    `;
    writeFileSync(componentPath, componentCode);
    await extractIntlayer(componentPath, 'react-intlayer');
    const updatedCode = readFileSync(componentPath, 'utf-8');

    const matches = updatedCode.match(
      /import \{ useIntlayer \} from ["']react-intlayer["']/g
    );
    expect(matches?.length).toBe(1);
  });

  it('should deduplicate identical strings', async () => {
    const componentPath = join(tmpDir, 'DeduplicateTest.tsx');
    const componentCode = `
      export function DeduplicateTest() {
        const str1 = "Identical string";
        const str2 = "Identical string";
        return <div title="Identical string">{str1} {str2}</div>;
      }
    `;
    writeFileSync(componentPath, componentCode);
    await extractIntlayer(componentPath, 'react-intlayer');
    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toContain('content.identicalString.value');
    expect(updatedCode).not.toContain('identicalString1');
    expect(updatedCode).not.toContain('identicalString2');

    const matches = updatedCode.match(/content\.identicalString/g);
    expect(matches?.length).toBe(3); // 1 for str1, 1 for str2, 1 for title
  });

  describe('extractIntlayer - Arrow Functions and Direct Returns', () => {
    const tmpDir = join(process.cwd(), 'tmp_test_arrow_functions');

    beforeEach(() => {
      if (!existsSync(tmpDir)) {
        mkdirSync(tmpDir, { recursive: true });
      }
      vi.mocked(getConfiguration).mockReturnValue({
        internationalization: { defaultLocale: 'en' },
        content: {
          baseDir: tmpDir,
          fileExtensions: ['.ts', '.tsx'],
        },
      } as any);
    });

    afterEach(() => {
      rmSync(tmpDir, { recursive: true, force: true });
    });

    it('should handle React component with direct fragment return (implicit return)', async () => {
      const componentPath = join(tmpDir, 'DirectReturn.tsx');
      const componentCode = `export const DirectReturn = () => <>My text</>;`;

      writeFileSync(componentPath, componentCode);
      await extractIntlayer(componentPath, 'react-intlayer');

      const updatedCode = readFileSync(componentPath, 'utf-8');

      // Logic check: Arrow functions with implicit returns must be wrapped
      // or handled to allow the 'const content = ...' injection
      expect(updatedCode).toContain(
        "import { useIntlayer } from 'react-intlayer';"
      );
      expect(updatedCode).toContain(
        "const content = useIntlayer('direct-return');"
      );
      expect(updatedCode).toContain('<>{content.myText}</>');
    });

    it('should handle utility functions with implicit string return', async () => {
      const componentPath = join(tmpDir, 'myUtility.ts');
      const componentCode = `export const myUtility = () => "My utility text";`;

      writeFileSync(componentPath, componentCode);
      await extractIntlayer(componentPath, 'react-intlayer');

      const updatedCode = readFileSync(componentPath, 'utf-8');

      // Logic check: camelCase function name triggers 'getIntlayer'
      expect(updatedCode).toContain("import { getIntlayer } from 'intlayer';");
      expect(updatedCode).toMatch(
        /const content = getIntlayer\(['"]my-utility['"]\);/
      );
      expect(updatedCode).toContain('return content.myUtilityText');
    });

    it('should handle functions with existing getIntlayer in block body', async () => {
      const componentPath = join(tmpDir, 'ExistingUtility.ts');
      const componentCode = `
      import { getIntlayer } from 'intlayer';
      export const existingUtility = () => {
        const content = getIntlayer('custom-utility-key');
        return "New untransformed text";
      };
    `;

      writeFileSync(componentPath, componentCode);
      await extractIntlayer(componentPath, 'react-intlayer');

      const updatedCode = readFileSync(componentPath, 'utf-8');

      // Logic check: Should detect existing getIntlayer and use its key/variable
      expect(updatedCode).toContain("getIntlayer('custom-utility-key')");
      expect(updatedCode).toContain('return content.newUntransformedText');
    });

    it('should handle components with existing useIntlayer in block body', async () => {
      const componentPath = join(tmpDir, 'ExistingComponent.tsx');
      const componentCode = `
      import { useIntlayer } from 'react-intlayer';
      export const ExistingComponent = () => {
        const content = useIntlayer('xxxx');
        return <div>New text to extract</div>;
      };
    `;

      writeFileSync(componentPath, componentCode);
      await extractIntlayer(componentPath, 'react-intlayer');

      const updatedCode = readFileSync(componentPath, 'utf-8');

      // Logic check: Should use the existing 'xxxx' key and existing 'content' variable
      expect(updatedCode).toContain("useIntlayer('xxxx')");
      expect(updatedCode).toContain('<div>{content.newTextToExtract}</div>');
    });
  });

  describe('extractIntlayer - Key and Path Resolution', () => {
    const tmpDir = join(process.cwd(), 'tmp_test_keys');

    beforeEach(() => {
      if (!existsSync(tmpDir)) {
        mkdirSync(tmpDir, { recursive: true });
      }
      vi.mocked(getConfiguration).mockReturnValue({
        internationalization: { defaultLocale: 'en' },
        content: {
          baseDir: tmpDir,
          fileExtensions: ['.content.ts'], // Custom extension
        },
      } as any);
    });

    afterEach(() => {
      rmSync(tmpDir, { recursive: true, force: true });
    });

    it('should use existing dictionary key if useIntlayer is already present', async () => {
      const componentPath = join(tmpDir, 'ExistingKey.tsx');
      const componentCode = `
      import { useIntlayer } from 'react-intlayer';
      export const ExistingKey = () => {
        const content = useIntlayer('custom-key');
        return <div>New extractable text</div>;
      };
    `;
      writeFileSync(componentPath, componentCode);

      await extractIntlayer(componentPath, 'react-intlayer');

      const updatedCode = readFileSync(componentPath, 'utf-8');
      // Should NOT use 'existing-key' but 'custom-key'
      expect(updatedCode).toContain("useIntlayer('custom-key')");
      expect(updatedCode).toContain('{content.newExtractableText}');
    });

    it('should increment the key if a naming collision occurs in the file system', async () => {
      const componentPath = join(tmpDir, 'Collision.tsx');
      const existingContentPath = join(tmpDir, 'collision.content.ts');

      // Simulate an existing content file with the same base name
      writeFileSync(existingContentPath, 'export default {}');

      const componentCode = `
      export const Collision = () => <div>Hello World</div>;
    `;
      writeFileSync(componentPath, componentCode);

      await extractIntlayer(componentPath, 'react-intlayer');

      const updatedCode = readFileSync(componentPath, 'utf-8');
      // 'collision' is taken by the file, so it should try 'collision1'
      expect(updatedCode).toContain("useIntlayer('collision1')");
    });

    it('should respect existing dictionaries from unmerged dictionaries', async () => {
      const componentPath = join(tmpDir, 'RegistryMatch.tsx');
      const componentCode = `export const RegistryMatch = () => <div>Extract Me</div>;`;
      writeFileSync(componentPath, componentCode);

      // Mock that 'registry-match' is already registered in the project with a specific path
      vi.mocked(getUnmergedDictionaries).mockReturnValue({
        'registry-match': [
          {
            key: 'registry-match',
            filePath: 'custom/path/to/existing.content.ts',
          },
        ],
      } as any);

      await extractIntlayer(componentPath, 'react-intlayer');

      const updatedCode = readFileSync(componentPath, 'utf-8');
      expect(updatedCode).toMatch(/useIntlayer\(['"]registry-match1['"]\)/);
      // Verify the logger or side effect would target the resolved path
      // (This ensures resolveContentFilePath returned the existing filePath)
    });

    it('should derive key from directory name if filename is index.tsx', async () => {
      const subDir = join(tmpDir, 'MyComponent');
      mkdirSync(subDir);
      const componentPath = join(subDir, 'index.tsx');
      const componentCode = `export const MyComponent = () => <div>Index Text</div>;`;
      writeFileSync(componentPath, componentCode);

      await extractIntlayer(componentPath, 'react-intlayer');

      const updatedCode = readFileSync(componentPath, 'utf-8');
      // Key should be kebab-case of parent directory 'MyComponent' -> 'my-component'
      expect(updatedCode).toContain("useIntlayer('my-component')");
    });

    it('should extract strings with special characters correctly', async () => {
      const componentPath = join(tmpDir, 'SpecialChars.tsx');
      const componentCode = `
        export const SpecialChars = () => {
          return (
            <span>
              This is a string including '"!@#$%^&*()_+-=[]{} special characters:
            </span>
          );
        };
      `;
      writeFileSync(componentPath, componentCode);

      await extractIntlayer(componentPath, 'react-intlayer');

      const updatedCode = readFileSync(componentPath, 'utf-8');

      // It should be one single replacement, not partial
      expect(updatedCode).toContain('{content.thisIsAStringIncluding}');
      expect(updatedCode).not.toContain('{} special characters:');
    });

    it('should preserve newlines after imports and between declarations', async () => {
      const componentPath = join(tmpDir, 'FormattingTest.ts');
      const componentCode = `
import { someHelper } from "./helpers";

export function foo() {
  return "Extract me";
}

export function bar() {
  return "And me";
}
`;
      writeFileSync(componentPath, componentCode);

      await extractIntlayer(componentPath, 'react-intlayer');

      const updatedCode = readFileSync(componentPath, 'utf-8');

      // Verify there is a newline after imports
      expect(updatedCode).toMatch(
        /import \{ someHelper \} from ['"]\.\/helpers['"];\n\n/
      );
      // Verify there is a newline between functions
      expect(updatedCode).toMatch(/\}\n\n\s*export function/);
    });
  });
});
