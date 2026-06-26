import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@intlayer/config/node', async () => {
  const actual = await vi.importActual<any>('@intlayer/config/node');
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

vi.mock('@intlayer/chokidar/build', () => ({
  writeContentDeclaration: vi
    .fn()
    .mockResolvedValue({ status: 'created', path: '/temp/path.json' }),
  buildDictionary: vi.fn().mockResolvedValue({}),
  ensureIntlayerBundle: vi.fn().mockResolvedValue('/temp/path.cjs'),
  loadContentDeclaration: vi.fn().mockResolvedValue(null),
}));

vi.mock('@intlayer/chokidar/utils', async () => {
  const actual = await vi.importActual<any>('@intlayer/chokidar/utils');
  return {
    ...actual,
    getFormatFromExtension: vi.fn().mockReturnValue('json'),
    getContentExtension: vi.fn().mockReturnValue('.content.json'),
  };
});

import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { getConfiguration } from '@intlayer/config/node';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import {
  mergeWithExistingMultilingualDictionary,
  mergeWithExistingPerLocaleDictionary,
} from './contentWriter';
import { extractContent } from './extractContent';

const tmpDir = join(process.cwd(), 'tmp_test_extract_advanced');

describe('extractIntlayer', () => {
  beforeEach(() => {
    if (!existsSync(tmpDir)) {
      mkdirSync(tmpDir, { recursive: true });
    }
    vi.mocked(getConfiguration).mockReturnValue({
      internationalization: {
        locales: ['en', 'fr'],
        defaultLocale: 'en',
      },
      content: {
        baseDir: tmpDir,
        fileExtensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
      compiler: {
        noMetadata: false,
        dictionaryKeyPrefix: '',
        output: (context: any) => join(tmpDir, `${context.key}.content.ts`),
      },
      build: {
        importMode: 'esm',
      },
      system: {
        baseDir: tmpDir,
        unmergedDictionariesDir: join(
          tmpDir,
          '.intlayer/unmerged_dictionaries'
        ),
      },
      editor: {
        enabled: false,
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

    await extractContent(componentPath, 'next-intlayer');

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
    // Ternary string literals inside JSX children are IntlayerNodes — no .value
    expect(updatedCode).not.toContain('content.clickedShouldBeExtracted.value');
    expect(updatedCode).toContain('content.clickedShouldBeExtracted');
    expect(updatedCode).not.toContain('content.clickMeShouldBeExtracted.value');
    expect(updatedCode).toContain('content.clickMeShouldBeExtracted');
    expect(updatedCode).toContain(
      'placeholder={content.thisIsThePlaceholderShould.value}'
    );
  });

  it('should extract text from Solid patterns using direct proxy access', async () => {
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

    await extractContent(componentPath, 'solid-intlayer');

    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toContain(
      "import { useIntlayer } from 'solid-intlayer';"
    );
    expect(updatedCode).toContain("const content = useIntlayer('solid-test');");
    expect(updatedCode).toContain(
      '<h1>{content.helloWorldShouldBeExtracted}</h1>'
    );
    expect(updatedCode).toContain(
      'placeholder={content.thisIsThePlaceholderShould.value}'
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

    await extractContent(componentPath, 'react-intlayer');

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

    await extractContent(componentPath, 'react-intlayer');

    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toMatch(
      /import \{ useIntlayer \} from ['"]react-intlayer(\/server)?['"];/
    );
    expect(updatedCode).toContain(
      "const content = useIntlayer('insertion-test');"
    );

    expect(updatedCode).toMatch(
      /<p>\s*\{content\.[a-zA-Z0-9_]+\(\{\s*count: count,\s*name: user\.name,?\s*\}\)\}\s*<\/p>/m
    );
  });

  it('should extract JSX insertion when variable expression appears first', async () => {
    const componentPath = join(tmpDir, 'LeadingVarInsertionTest.tsx');
    const componentCode = `
export const LeadingVarInsertionTest = ({ profile }: { profile: { totalMissions: number } }) => {
  return (
    <div>
      <span>{profile.totalMissions} missions completed</span>
    </div>
  );
};
`;
    writeFileSync(componentPath, componentCode);

    await extractContent(componentPath, 'react-intlayer');

    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toMatch(
      /import \{ useIntlayer \} from ['"]react-intlayer(\/server)?['"];/
    );
    // The span children should be replaced with an insertion call
    expect(updatedCode).toMatch(
      /\{content\.[a-zA-Z0-9_]+\(\{\s*totalMissions:\s*profile\.totalMissions,?\s*\}\)\}/
    );
  });

  it('should extract text from top-level arrays', async () => {
    const componentPath = join(tmpDir, 'TopLevelArrayTest.ts');
    const componentCode = `
const tiers = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    features: [
      "Community support",
      "Public results",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    features: [
      "Priority support",
    ],
    highlighted: true,
  }
];
`;
    writeFileSync(componentPath, componentCode);

    await extractContent(componentPath, 'react-intlayer');

    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toContain("import { getIntlayer } from 'intlayer';");
    expect(updatedCode).toMatch(
      /const content = getIntlayer\(['"]top-level-array-test['"]\);/
    );
    // Single capitalized words (tier names) are treated as proper nouns and skipped
    expect(updatedCode).toMatch(/name:\s*['"]Starter['"]/);
    expect(updatedCode).toMatch(/name:\s*['"]Pro['"]/);
    expect(updatedCode).not.toContain('content.starter');
    expect(updatedCode).not.toContain('content.pro');
    // Multi-word feature labels are still extracted
    expect(updatedCode).toContain('content.communitySupport');
    expect(updatedCode).toContain('content.publicResults');
    expect(updatedCode).toContain('content.prioritySupport');
  });

  it('should inject useIntlayer inside custom hooks (React)', async () => {
    const componentPath = join(tmpDir, 'useCustomHookTestReact.ts');
    const componentCode = `
export const useCustomHook = () => {
  const t = "My translated hook string";
  return t;
};
    `;
    writeFileSync(componentPath, componentCode);

    await extractContent(componentPath, 'react-intlayer');

    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toMatch(
      /import \{ useIntlayer \} from ['"]react-intlayer(\/server)?['"];/
    );
    expect(updatedCode).toMatch(
      /const content = useIntlayer\(['"]use-custom-hook-test-react['"]\);/
    );
    expect(updatedCode).toContain('content.myTranslatedHookString.value');
  });

  it('should inject useIntlayer inside custom hooks (Next.js)', async () => {
    const componentPath = join(tmpDir, 'useCustomHookTestNext.ts');
    const componentCode = `
export const useCustomHook = () => {
  const t = "My translated hook string";
  return t;
};
    `;
    writeFileSync(componentPath, componentCode);

    await extractContent(componentPath, 'next-intlayer');

    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toMatch(
      /import \{ useIntlayer \} from ['"]next-intlayer(\/server)?['"];/
    );
    expect(updatedCode).toMatch(
      /const content = useIntlayer\(['"]use-custom-hook-test-next['"]\);/
    );
    expect(updatedCode).toContain('content.myTranslatedHookString.value');
  });

  it('should inject useIntlayer inside custom hooks (Preact)', async () => {
    const componentPath = join(tmpDir, 'useCustomHookTestPreact.ts');
    const componentCode = `
export const useCustomHook = () => {
  const t = "My translated hook string";
  return t;
};
    `;
    writeFileSync(componentPath, componentCode);

    await extractContent(componentPath, 'preact-intlayer');

    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toContain(
      "import { useIntlayer } from 'preact-intlayer';"
    );
    expect(updatedCode).toMatch(
      /const content = useIntlayer\(['"]use-custom-hook-test-preact['"]\);/
    );
    expect(updatedCode).toContain('content.myTranslatedHookString.value');
  });

  it('should inject useIntlayer inside custom hooks (Solid)', async () => {
    const componentPath = join(tmpDir, 'useCustomHookTestSolid.ts');
    const componentCode = `
export const useCustomHook = () => {
  const t = "My translated hook string";
  return t;
};
    `;
    writeFileSync(componentPath, componentCode);

    await extractContent(componentPath, 'solid-intlayer');

    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toContain(
      "import { useIntlayer } from 'solid-intlayer';"
    );
    expect(updatedCode).toMatch(
      /const content = useIntlayer\(['"]use-custom-hook-test-solid['"]\);/
    );
    expect(updatedCode).toContain('content.myTranslatedHookString.value');
  });

  it('should inject useIntlayer inside custom hooks (Angular)', async () => {
    const componentPath = join(tmpDir, 'useCustomHookTestAngular.ts');
    const componentCode = `
export const useCustomHook = () => {
  const t = "My translated hook string";
  return t;
};
    `;
    writeFileSync(componentPath, componentCode);

    await extractContent(componentPath, 'angular-intlayer');

    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toContain(
      "import { useIntlayer } from 'angular-intlayer';"
    );
    expect(updatedCode).toMatch(
      /const content = useIntlayer\(['"]use-custom-hook-test-angular['"]\);/
    );
    expect(updatedCode).toContain('content().myTranslatedHookString.value');
  });

  it('should extract text from template literals with variables', async () => {
    const componentPath = join(tmpDir, 'TemplateLiteralTest.tsx');
    const componentCode = `
      export function TemplateLiteralTest({ name }: { name: string }) {
        return <p>{\`Hello \${name}!\`}</p>;
      }
    `;
    writeFileSync(componentPath, componentCode);

    await extractContent(componentPath, 'react-intlayer');

    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toMatch(
      /const content = useIntlayer\(['"]template-literal-test['"]\);/
    );
    expect(updatedCode).toContain('content.helloName({ name: name })');
  });

  it('should extract text from complex JSX combined with template literals', async () => {
    const componentPath = join(tmpDir, 'CombinedTemplateTest.tsx');
    const componentCode = `
      export function CombinedTemplateTest({ name, count }: { name: string; count: number }) {
        return (
          <div>
            Static text
            {\`Hello \${name}, you have \${count} items.\`}
          </div>
        );
      }
    `;
    writeFileSync(componentPath, componentCode);

    await extractContent(componentPath, 'react-intlayer');

    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toMatch(
      /const content = useIntlayer\(['"]combined-template-test['"]\);/
    );
    expect(updatedCode).toContain(
      'content.staticTextHelloNameYou({ name: name, count: count })'
    );
  });

  it('should extract text from template literals without variables and add .value for React', async () => {
    const componentPath = join(tmpDir, 'SimpleTemplateTest.tsx');
    const componentCode = `
      export function SimpleTemplateTest() {
        return <p>{\`Hello World!\`}</p>;
      }
    `;
    writeFileSync(componentPath, componentCode);

    await extractContent(componentPath, 'react-intlayer');

    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toContain('content.helloWorld.value');
  });

  it('should extract text from template literals with variables (Solid)', async () => {
    const componentPath = join(tmpDir, 'TemplateLiteralSolid.tsx');
    const componentCode = `
      export function TemplateLiteralSolid({ name }: { name: string }) {
        return <p>{\`Hello \${name}!\`}</p>;
      }
    `;
    writeFileSync(componentPath, componentCode);

    await extractContent(componentPath, 'solid-intlayer');

    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toMatch(
      /const content = useIntlayer\(['"]template-literal-solid['"]\);/
    );
    expect(updatedCode).toContain('content.helloName({ name: name })');
  });

  it('should extract text from template literals with variables (Svelte/Vue/Lit)', async () => {
    const componentPath = join(tmpDir, 'TemplateLiteralSvelte.ts');
    const componentCode = `
      export const myFunc = (name: string) => {
        return \`Hello \${name}!\`;
      };
    `;
    writeFileSync(componentPath, componentCode);

    await extractContent(componentPath, 'svelte-intlayer');

    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toMatch(
      /const content = getIntlayer\(['"]template-literal-svelte['"]\);/
    );
    // getIntlayer doesn't have .value
    expect(updatedCode).toContain('content.helloName({ name: name })');
  });

  it('should extract text from template literals with variables (Angular)', async () => {
    const componentPath = join(tmpDir, 'TemplateLiteralAngular.ts');
    const componentCode = `
      export const myFunc = (name: string) => {
        return \`Hello \${name}!\`;
      };
    `;
    writeFileSync(componentPath, componentCode);

    await extractContent(componentPath, 'angular-intlayer');

    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toMatch(
      /const content = getIntlayer\(['"]template-literal-angular['"]\);/
    );
    // Angular uses signal access content().key
    expect(updatedCode).toContain('content().helloName({ name: name })');
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
    await extractContent(componentPath, 'react-intlayer');
    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toMatch(/['"]Compiler Generated String['"]:/);
    expect(updatedCode).toMatch(/obj\[['"]Compiler Generated String['"]\]/);
    expect(updatedCode).toContain('{content.helloWorld}');
  });

  it('should not extract string literals used as comparison operands', async () => {
    const componentPath = join(tmpDir, 'ComparisonTest.tsx');
    const componentCode = `
      export function ComparisonTest({ msg }: { msg: { step: string } }) {
        if (msg.step === 'ERROR') {
          return <div>Something went wrong</div>;
        }
        if (msg.step !== 'SUCCESS') {
          return null;
        }
        switch (msg.step) {
          case 'PENDING':
            return <div>Loading</div>;
          default:
            return null;
        }
      }
    `;
    writeFileSync(componentPath, componentCode);
    await extractContent(componentPath, 'react-intlayer');
    const updatedCode = readFileSync(componentPath, 'utf-8');

    // Comparison / switch-case constants must remain untouched string literals
    expect(updatedCode).toContain("msg.step === 'ERROR'");
    expect(updatedCode).toContain("msg.step !== 'SUCCESS'");
    expect(updatedCode).toContain("case 'PENDING':");
    expect(updatedCode).not.toContain('content.error');
    expect(updatedCode).not.toContain('content.success');
    expect(updatedCode).not.toContain('content.pending');

    // Genuine JSX display text is still extracted
    expect(updatedCode).toContain('{content.somethingWentWrong}');
  });

  it('should not extract string literals passed to technical method calls', async () => {
    const componentPath = join(tmpDir, 'MethodCallTest.ts');
    const componentCode = `
      export function methodCallTest(message: string, event: any) {
        if (message.includes('Loading chunk')) {
          return "A real translatable sentence here";
        }
        if (event?.reason?.message?.includes('ChunkLoadError occurred')) {
          return null;
        }
        document.querySelector('Some Selector Value');
        return null;
      }
    `;
    writeFileSync(componentPath, componentCode);
    await extractContent(componentPath, 'react-intlayer');
    const updatedCode = readFileSync(componentPath, 'utf-8');

    // String operands of method calls remain untouched literals
    expect(updatedCode).toContain("message.includes('Loading chunk')");
    expect(updatedCode).toContain(
      "event?.reason?.message?.includes('ChunkLoadError occurred')"
    );
    expect(updatedCode).toContain(
      "document.querySelector('Some Selector Value')"
    );
    expect(updatedCode).not.toContain('content.loadingChunk');

    // Genuine display text is still extracted
    expect(updatedCode).toContain('content.aRealTranslatableSentence');
  });

  it('should not extract single capitalized words (proper/brand nouns)', async () => {
    const componentPath = join(tmpDir, 'SingleWordTest.tsx');
    const componentCode = `
      export function SingleWordTest() {
        const author = "Intlayer";
        return <meta name="author" content={author} />;
      }
    `;
    writeFileSync(componentPath, componentCode);
    await extractContent(componentPath, 'react-intlayer');
    const updatedCode = readFileSync(componentPath, 'utf-8');

    // The single word "Intlayer" stays a plain string literal
    expect(updatedCode).toMatch(/const author = ['"]Intlayer['"]/);
    expect(updatedCode).not.toContain('content.intlayer');
    expect(updatedCode).not.toContain('useIntlayer');
  });

  it('should extract JSX text and inject useIntlayer properly', async () => {
    const componentPath = join(tmpDir, 'BasicJsxTest.tsx');
    const componentCode = `
      export function BasicJsxTest() {
        return <div>Hello World</div>;
      }
    `;
    writeFileSync(componentPath, componentCode);
    await extractContent(componentPath, 'react-intlayer');
    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toContain('{content.helloWorld}');
    expect(updatedCode).toContain(
      "const content = useIntlayer('basic-jsx-test');"
    );
    expect(updatedCode).toMatch(
      /import \{ useIntlayer \} from ['"]react-intlayer(\/server)?['"];/
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
    await extractContent(componentPath, 'react-intlayer');
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
    await extractContent(componentPath, 'react-intlayer');
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
    await extractContent(componentPath, 'react-intlayer');
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
    await extractContent(componentPath, 'react-intlayer');
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
    await extractContent(componentPath, 'react-intlayer');
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
    await extractContent(componentPath, 'react-intlayer');
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
    await extractContent(componentPath, 'react-intlayer');
    const updatedCode = readFileSync(componentPath, 'utf-8');

    expect(updatedCode).toContain('content.identicalString.value');
    expect(updatedCode).not.toContain('identicalString1');
    expect(updatedCode).not.toContain('identicalString2');

    const matches = updatedCode.match(/content\.identicalString/g);
    expect(matches?.length).toBe(3); // 1 for str1, 1 for str2, 1 for title
  });

  describe('Astro frontmatter', () => {
    it('should extract strings from Astro frontmatter and preserve the HTML template', async () => {
      // Use a non-index filename so the key is derived from the filename, not the directory.
      const componentPath = join(tmpDir, 'WelcomePage.astro');
      const componentCode = [
        '---',
        'const pageTitle = "Welcome to Astro";',
        'const subtitle = "Build faster websites";',
        '---',
        '<html>',
        '  <h1>{pageTitle}</h1>',
        '  <p>{subtitle}</p>',
        '</html>',
      ].join('\n');

      writeFileSync(componentPath, componentCode);

      await extractContent(componentPath, 'react-intlayer');

      const updatedCode = readFileSync(componentPath, 'utf-8');

      // Frontmatter must be modified: strings replaced with getIntlayer references
      expect(updatedCode).toContain("import { getIntlayer } from 'intlayer';");
      expect(updatedCode).toMatch(
        /const content = getIntlayer\(['"]welcome-page['"]\);/
      );
      expect(updatedCode).toContain('content.welcomeToAstro');
      expect(updatedCode).toContain('content.buildFasterWebsites');

      // HTML template (after the closing ---) must be untouched
      expect(updatedCode).toContain('  <h1>{pageTitle}</h1>');
      expect(updatedCode).toContain('  <p>{subtitle}</p>');

      // File must still have valid --- fences wrapping the frontmatter
      expect(updatedCode).toMatch(/^---\n[\s\S]*?\n---\n/);
    });

    it('should extract strings from an Astro file with no frontmatter and add frontmatter', async () => {
      const componentPath = join(tmpDir, 'static.astro');
      const componentCode = '<html><body><h1>Static page</h1></body></html>';

      writeFileSync(componentPath, componentCode);

      const result = await extractContent(componentPath, 'react-intlayer');

      expect(result).toBeDefined();
      expect(result!.transformedCode).toMatch(/^---\n[\s\S]*?\n---\n/);
      expect(result!.transformedCode).toContain('content.staticPage');
      expect(result!.transformedCode).toContain(
        '<h1>{content.staticPage}</h1>'
      );
    });

    it('should return undefined when frontmatter has no extractable strings', async () => {
      const componentPath = join(tmpDir, 'NoStrings.astro');
      const componentCode = [
        '---',
        'import { getLocaleFromPath } from "intlayer";',
        'const locale = getLocaleFromPath(Astro.url.pathname);',
        '---',
        '<p>{locale}</p>',
      ].join('\n');

      writeFileSync(componentPath, componentCode);

      const result = await extractContent(componentPath, 'react-intlayer');

      expect(result).toBeUndefined();
      expect(readFileSync(componentPath, 'utf-8')).toBe(componentCode);
    });

    it('should not write the file when codeOnly is true', async () => {
      const componentPath = join(tmpDir, 'CodeOnly.astro');
      const componentCode = [
        '---',
        'const msg = "Hello Astro";',
        '---',
        '<p>{msg}</p>',
      ].join('\n');

      writeFileSync(componentPath, componentCode);

      const result = await extractContent(componentPath, 'react-intlayer', {
        codeOnly: true,
      });

      // transformedCode is the reconstructed file (frontmatter + template)
      expect(result?.transformedCode).toContain('content.helloAstro');
      expect(result?.transformedCode).toContain('<p>{msg}</p>');
      expect(result?.transformedCode).toMatch(/^---\n[\s\S]*?\n---\n/);
    });
  });

  describe('extractIntlayer - Arrow Functions and Direct Returns', () => {
    const tmpDir = join(process.cwd(), 'tmp_test_arrow_functions');

    beforeEach(() => {
      if (!existsSync(tmpDir)) {
        mkdirSync(tmpDir, { recursive: true });
      }
      vi.mocked(getConfiguration).mockReturnValue({
        internationalization: { locales: ['en'], defaultLocale: 'en' },
        content: {
          baseDir: tmpDir,
          fileExtensions: ['.ts', '.tsx'],
        },
        compiler: {
          noMetadata: false,
          dictionaryKeyPrefix: '',
          output: (context: any) => join(tmpDir, `${context.key}.content.ts`),
        },
        build: {
          importMode: 'esm',
        },
        system: {
          baseDir: tmpDir,
          unmergedDictionariesDir: join(
            tmpDir,
            '.intlayer/unmerged_dictionaries'
          ),
        },
        editor: {
          enabled: false,
        },
      } as any);
    });

    afterEach(() => {
      rmSync(tmpDir, { recursive: true, force: true });
    });

    it('should handle object property arrow function with parenthesized JSX return', async () => {
      const componentPath = join(tmpDir, 'ObjectPropReturn.tsx');
      const componentCode = `
export const routes = {
  'custom-component': (props) => (
    <h1 style={{ color: 'red' }} {...props}>
      Custom 1
    </h1>
  ),
};
`;

      writeFileSync(componentPath, componentCode);
      await extractContent(componentPath, 'react-intlayer');

      const updatedCode = readFileSync(componentPath, 'utf-8');

      // The return statement must NOT be split by ASI
      expect(updatedCode).not.toContain('return;');
      // Content should be accessed correctly
      expect(updatedCode).toContain('{content.custom1}');
      // The block body must be syntactically valid: return followed by `(`
      expect(updatedCode).toMatch(/return\s*\(/);
    });

    it('should handle React component with direct fragment return (implicit return)', async () => {
      const componentPath = join(tmpDir, 'DirectReturn.tsx');
      const componentCode = `export const DirectReturn = () => <>My text</>;`;

      writeFileSync(componentPath, componentCode);
      await extractContent(componentPath, 'react-intlayer');

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
      await extractContent(componentPath, 'react-intlayer');

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
      await extractContent(componentPath, 'react-intlayer');

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
      await extractContent(componentPath, 'react-intlayer');

      const updatedCode = readFileSync(componentPath, 'utf-8');

      // Logic check: Should use the existing 'xxxx' key and existing 'content' variable
      expect(updatedCode).toContain("useIntlayer('xxxx')");
      expect(updatedCode).toContain('<div>{content.newTextToExtract}</div>');
    });

    it('should use the actual variable name when it differs from "content"', async () => {
      const componentPath = join(tmpDir, 'AliasedVar.tsx');
      const componentCode = `
      import { useIntlayer } from 'react-intlayer';
      export const AliasedVar = () => {
        const t = useIntlayer('my-page');
        return <div>New text to extract</div>;
      };
    `;

      writeFileSync(componentPath, componentCode);
      await extractContent(componentPath, 'react-intlayer', { codeOnly: true });

      const updatedCode = readFileSync(componentPath, 'utf-8');

      // Should reference 't.newTextToExtract', not 'content.newTextToExtract'
      expect(updatedCode).toContain("useIntlayer('my-page')");
      expect(updatedCode).toContain('<div>{t.newTextToExtract}</div>');
      expect(updatedCode).not.toContain('content.newTextToExtract');
    });

    it('should use the actual variable name for getIntlayer calls aliased to non-"content"', async () => {
      const componentPath = join(tmpDir, 'AliasedGetIntlayer.ts');
      const componentCode = `
      import { getIntlayer } from 'intlayer';
      export const generateMetadata = async ({ locale }: { locale: string }) => {
        const t = getIntlayer('locale-metadata', locale);
        return { title: "New Title" };
      };
    `;

      writeFileSync(componentPath, componentCode);
      await extractContent(componentPath, 'next-intlayer', { codeOnly: true });

      const updatedCode = readFileSync(componentPath, 'utf-8');

      // Should reference 't.newTitle', not 'content.newTitle'
      expect(updatedCode).toContain("getIntlayer('locale-metadata'");
      expect(updatedCode).toContain('t.newTitle');
      expect(updatedCode).not.toContain('content.newTitle');
    });

    it('should add missing keys to existing destructured getIntlayer call', async () => {
      const componentPath = join(tmpDir, 'DestructuredGetIntlayer.ts');
      const componentCode = `
import { getIntlayer } from 'intlayer';
export const generateMetadata = async ({ locale }: { locale: string }) => {
  const { title, description } = getIntlayer('page-meta', locale);
  return { title, description, author: "Aymeric Pineau" };
};
`;

      writeFileSync(componentPath, componentCode);
      // codeOnly: true skips content-file writing (avoids missing compiler.output config)
      await extractContent(componentPath, 'next-intlayer', { codeOnly: true });

      const updatedCode = readFileSync(componentPath, 'utf-8');

      // Missing key 'aymericPineau' should be added to the existing destructuring
      expect(updatedCode).toMatch(
        /\{\s*title,\s*description,\s*aymericPineau\s*\}/
      );
      // The string should be replaced with the bare key name (no 'content.' prefix)
      expect(updatedCode).toContain('author: aymericPineau');
      // No duplicate getIntlayer call should be injected
      const callCount = (updatedCode.match(/getIntlayer\(/g) ?? []).length;
      expect(callCount).toBe(1);
    });

    it('should add missing keys to existing destructured useIntlayer call', async () => {
      const componentPath = join(tmpDir, 'DestructuredUseIntlayer.tsx');
      const componentCode = `
import { useIntlayer } from 'react-intlayer';
export const MyComponent = () => {
  const { title } = useIntlayer('my-page');
  return (
    <div>
      <h1>{title}</h1>
      <p>New paragraph text</p>
    </div>
  );
};
`;

      writeFileSync(componentPath, componentCode);
      await extractContent(componentPath, 'react-intlayer', { codeOnly: true });

      const updatedCode = readFileSync(componentPath, 'utf-8');

      // 'newParagraphText' should be added to the existing destructuring
      expect(updatedCode).toMatch(/\{\s*title,\s*newParagraphText\s*\}/);
      // JSX text replaced with bare key name
      expect(updatedCode).toContain('{newParagraphText}');
      // No new useIntlayer call should be injected
      const callCount = (updatedCode.match(/useIntlayer\(/g) ?? []).length;
      expect(callCount).toBe(1);
    });

    it('should handle destructured call with trailing comma', async () => {
      const componentPath = join(tmpDir, 'TrailingComma.ts');
      const componentCode = `
import { getIntlayer } from 'intlayer';
export const trailingComma = (locale: string) => {
  const { title, } = getIntlayer('page', locale);
  return { title, author: "New Author Name" };
};
`;

      writeFileSync(componentPath, componentCode);
      await extractContent(componentPath, 'next-intlayer', { codeOnly: true });

      const updatedCode = readFileSync(componentPath, 'utf-8');

      // Key should be inserted without a double comma
      expect(updatedCode).not.toMatch(/,\s*,/);
      expect(updatedCode).toContain('newAuthorName');
      // No duplicate call
      const callCount = (updatedCode.match(/getIntlayer\(/g) ?? []).length;
      expect(callCount).toBe(1);
    });
    it('should inherit component key from ancestor for inner functions', async () => {
      const componentPath = join(tmpDir, 'LocaleSwitcher.tsx');
      const componentCode = `
export function LocaleSwitcher() {
  const { switchLocale } = useIntlayer("react-demo");

  return (
    <div className="locale-switcher">
      <span className="switcher-label">{switchLocale}:</span>
      <div className="locale-buttons">
        {[].map((localeItem) => (
          <button
            key={localeItem}
            onClick={() => {}}
          >
            here content to extract
            <span className="ls-code">{localeItem}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
`;

      writeFileSync(componentPath, componentCode);
      await extractContent(componentPath, 'react-intlayer', { codeOnly: true });

      const updatedCode = readFileSync(componentPath, 'utf-8');

      expect(updatedCode).toMatch(
        /const \{\s*switchLocale,\s*hereContentToExtract\s*\} = useIntlayer\(['"]react-demo['"]\);/
      );
      expect(updatedCode).toContain('{hereContentToExtract}');
      expect(updatedCode).not.toContain('getIntlayer(');
      const callCount = (updatedCode.match(/useIntlayer\(/g) ?? []).length;
      expect(callCount).toBe(1);
    });
  });

  describe('extractIntlayer - Key and Path Resolution', () => {
    const tmpDir = join(process.cwd(), 'tmp_test_keys');

    beforeEach(() => {
      if (!existsSync(tmpDir)) {
        mkdirSync(tmpDir, { recursive: true });
      }
      vi.mocked(getConfiguration).mockReturnValue({
        internationalization: { locales: ['en'], defaultLocale: 'en' },
        content: {
          baseDir: tmpDir,
          fileExtensions: ['.content.ts'], // Custom extension
        },
        compiler: {
          noMetadata: false,
          dictionaryKeyPrefix: '',
          output: (context: any) => join(tmpDir, `${context.key}.content.ts`),
        },
        build: {
          importMode: 'esm',
        },
        system: {
          baseDir: tmpDir,
          unmergedDictionariesDir: join(
            tmpDir,
            '.intlayer/unmerged_dictionaries'
          ),
        },
        editor: {
          enabled: false,
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

      await extractContent(componentPath, 'react-intlayer');

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

      await extractContent(componentPath, 'react-intlayer');

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

      await extractContent(componentPath, 'react-intlayer');

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

      await extractContent(componentPath, 'react-intlayer');

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

      await extractContent(componentPath, 'react-intlayer');

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

      await extractContent(componentPath, 'react-intlayer');

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

describe('mergeWithExistingMultilingualDictionary – insertion nodes', () => {
  it('converts a string with {{vars}} to an insertion node (multilingual)', () => {
    const result = mergeWithExistingMultilingualDictionary(
      { helloName: 'Hello {{name}}!' },
      null,
      'en'
    );
    const node = result.helloName as any;
    expect(node.nodeType).toBe('insertion');
    expect(node.insertion.nodeType).toBe('translation');
    expect(node.insertion.translation.en).toBe('Hello {{name}}!');
    expect(node.fields).toEqual(['name']);
  });

  it('keeps plain strings as translation nodes (multilingual)', () => {
    const result = mergeWithExistingMultilingualDictionary(
      { hello: 'Hello World' },
      null,
      'en'
    );
    const node = result.hello as any;
    expect(node.nodeType).toBe('translation');
    expect(node.translation.en).toBe('Hello World');
  });

  it('extracts multiple variable fields from insertion string', () => {
    const result = mergeWithExistingMultilingualDictionary(
      { greeting: 'Hi {{name}}, you have {{count}} messages' },
      null,
      'en'
    );
    const node = result.greeting as any;
    expect(node.nodeType).toBe('insertion');
    expect(node.fields).toEqual(['name', 'count']);
  });
});

describe('mergeWithExistingPerLocaleDictionary – insertion nodes', () => {
  it('converts a string with {{vars}} to an insertion node (per-locale)', () => {
    const result = mergeWithExistingPerLocaleDictionary(
      { helloName: 'Hello {{name}}!' },
      null
    );
    const node = result.helloName as any;
    expect(node.nodeType).toBe('insertion');
    expect(node.insertion).toBe('Hello {{name}}!');
    expect(node.fields).toEqual(['name']);
  });

  it('keeps plain strings as-is (per-locale)', () => {
    const result = mergeWithExistingPerLocaleDictionary(
      { hello: 'Hello World' },
      null
    );
    expect(result.hello).toBe('Hello World');
  });
});
