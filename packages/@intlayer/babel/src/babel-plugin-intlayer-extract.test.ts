import { transformSync } from '@babel/core';
import { describe, expect, it } from 'vitest';
import {
  type ExtractPluginOptions,
  intlayerExtractBabelPlugin,
} from './babel-plugin-intlayer-extract';

const transform = (
  code: string,
  options: Partial<ExtractPluginOptions> = {},
  filename = '/app/src/components/MyComponent.tsx'
) => {
  const result = transformSync(code, {
    filename,
    plugins: [
      '@babel/plugin-syntax-jsx',
      [
        intlayerExtractBabelPlugin,
        {
          packageName: 'react-intlayer',
          defaultLocale: 'en',
          onExtract: () => {},
          ...options,
        },
      ],
    ],
    babelrc: false,
    configFile: false,
  });

  return result?.code;
};

describe('babel-plugin-intlayer-extract', () => {
  it('should ignore object keys and member expression properties (React compiler compatibility)', () => {
    const code = `
      function MyComponent() {
        const obj = {
          "Compiler Generated String": () => <div>Hello World</div>
        };
        const cached = obj["Compiler Generated String"];
        return cached();
      }
    `;

    const output = transform(code);
    expect(output).toContain('"Compiler Generated String":');
    expect(output).toContain('obj["Compiler Generated String"]');
    // Ensure "Hello World" is extracted instead
    expect(output).toContain('content?.["helloWorld"]');
  });

  it('should extract JSX text and inject useIntlayer properly', () => {
    const code = `
      function MyComponent() {
        return <div>Hello World</div>;
      }
    `;
    const output = transform(code);
    expect(output).toContain('content?.["helloWorld"]');
    expect(output).toContain(
      'const content = useIntlayer("comp-my-component");'
    );
    expect(output).toContain('import { useIntlayer } from "react-intlayer";');
  });

  it('should extract text from function and inject getIntlayer properly', () => {
    const code = `
      function myUtility() {
        return "Utility text";
      }
    `;
    const output = transform(code);
    expect(output).toContain('content?.["utilityText"]');
    expect(output).toContain(
      'const content = getIntlayer("comp-my-component");'
    );
    expect(output).toContain('import { getIntlayer } from "intlayer";');
  });

  it('should leave user-defined imports completely untouched', () => {
    const code = `
      import { useIntlayer, IntlayerClientProvider } from "react-intlayer";
      
      export function MyServerComponent() {
        const content = useIntlayer("some-dict");
        return <IntlayerClientProvider>{content.hello}</IntlayerClientProvider>;
      }
    `;
    // We mock "server component" state by making sure "use client" is missing
    const output = transform(code, { packageName: 'react-intlayer' });

    // Existing imports shouldn't be split or re-written
    expect(output).toContain(
      'import { useIntlayer, IntlayerClientProvider } from "react-intlayer";'
    );
    expect(output).not.toContain('react-intlayer/server');
  });

  it('should inject from /server for next-intlayer if no "use client" directive is present', () => {
    const code = `
      export function MyComponent() {
        return <div>Hello Server</div>;
      }
    `;
    const output = transform(code, { packageName: 'next-intlayer' });

    expect(output).toContain(
      'import { useIntlayer } from "next-intlayer/server";'
    );
  });

  it('should NOT inject from /server for next-intlayer if "use client" directive is present', () => {
    const code = `
      "use client"
      export function MyComponent() {
        return <div>Hello Client</div>;
      }
    `;
    const output = transform(code, { packageName: 'next-intlayer' });

    expect(output).toContain('import { useIntlayer } from "next-intlayer";');
    expect(output).not.toContain('next-intlayer/server');
  });

  it('should NOT inject from /server for preact-intlayer ever', () => {
    const code = `
      export function MyComponent() {
        return <div>Hello Preact</div>;
      }
    `;
    const output = transform(code, { packageName: 'preact-intlayer' });

    expect(output).toContain('import { useIntlayer } from "preact-intlayer";');
    expect(output).not.toContain('preact-intlayer/server');
  });

  it('should inject getIntlayer from "intlayer" in Next.js project functions', () => {
    const code = `
      export function myNextUtility() {
        return "Next utility";
      }
    `;
    const output = transform(code, { packageName: 'next-intlayer' });
    expect(output).toContain('import { getIntlayer } from "intlayer";');
    expect(output).not.toContain(
      'import { getIntlayer } from "next-intlayer";'
    );
  });

  it('should extract multiple strings and handle attributes', () => {
    const code = `
      export function MyComponent() {
        return (
          <div title="Component Title">
            <img src="logo.png" alt="Company Logo" />
            <p>Welcome back!</p>
          </div>
        );
      }
    `;
    const output = transform(code);
    expect(output).toContain('content?.["componentTitle"]');
    expect(output).toContain('content?.["companyLogo"]');
    expect(output).toContain('content?.["welcomeBack"]');
    expect(output).toContain('title={content?.["componentTitle"]?.value}');
    expect(output).toContain('alt={content?.["companyLogo"]?.value}');
    expect(output).toContain('>{content?.["welcomeBack"]}<');
  });

  it('should handle variable name collisions', () => {
    const code = `
      export function MyComponent() {
        const content = "Already_used";
        return <div>Hello World</div>;
      }
    `;
    const output = transform(code);
    expect(output).toContain(
      'const _compContent = useIntlayer("comp-my-component");'
    );
    expect(output).toContain('_compContent?.["helloWorld"]');
    expect(output).toContain('const content = "Already_used";');
  });

  it('should not inject anything if no translatable strings are found', () => {
    const code = `
      import { someHelper } from "./helpers";
      export function MyComponent({ data }) {
        return <div className={someHelper(data)}>{data.id}</div>;
      }
    `;
    const output = transform(code);
    expect(output).not.toContain('useIntlayer');
    expect(output).not.toContain('import { useIntlayer }');
  });

  it('should handle strings in nested functions', () => {
    const code = `
      export function MyComponent() {
        const getLabel = () => "Label Text";
        return <div>{getLabel()}</div>;
      }
    `;
    const output = transform(code);
    // Component gets useIntlayer
    expect(output).toContain(
      'const content = useIntlayer("comp-my-component");'
    );
    // Nested function should NOT get its own injection
    expect(output).not.toContain(
      'const content = getIntlayer("comp-my-component");'
    );
    expect(output).toContain('() => content?.["labelText"]?.value');
    // Check import is present
    expect(output).toContain('import { useIntlayer } from "react-intlayer";');
    expect(output).not.toContain('import { getIntlayer } from "intlayer";');
  });

  it('should not duplicate imports if they are already present', () => {
    const code = `
      import { useIntlayer } from "react-intlayer";
      export function MyComponent() {
        return <div>Hello World</div>;
      }
    `;
    const output = transform(code);
    expect(output).toBeDefined();
    // Should not add another import declaration
    const matches = output!.match(
      /import \{ useIntlayer \} from "react-intlayer"/g
    );
    expect(matches?.length).toBe(1);
  });

  it('should deduplicate identical strings', () => {
    const code = `
      export function MyComponent() {
        const str1 = "Identical string";
        const str2 = "Identical string";
        return <div title="Identical string">{str1} {str2}</div>;
      }
    `;
    const output = transform(code);

    // It should extract the key "identicalString"
    expect(output).toContain('content?.["identicalString"]');

    // It should not extract "identicalString1", "identicalString2", etc.
    expect(output).not.toContain('identicalString1');
    expect(output).not.toContain('identicalString2');

    // The usages should all point to the same key
    const matches = output!.match(
      /content\?\.(?:\["identicalString"\]|identicalString)/g
    );
    // 1 for str1, 1 for str2, 1 for title
    expect(matches?.length).toBe(3);
  });

  it('should not append .value for attributes when getIntlayer is used', () => {
    const code = `
      import { getIntlayer } from "intlayer";
      export function MyComponent() {
        const _jsx = <div title="Component Title">Hello</div>;
        return _jsx;
      }
    `;
    const output = transform(code);
    expect(output).toContain('title={content?.["componentTitle"]}');
    expect(output).toContain('const content = getIntlayer');
    expect(output).not.toContain('.value');
  });

  it('should use custom prefix for the dictionary key if provided', () => {
    const code = `
      export function MyComponent() {
        return <div>Hello World</div>;
      }
    `;
    const output = transform(code, { prefix: 'my-custom-' });
    expect(output).toContain('content?.["helloWorld"]');
    expect(output).toContain(
      'const content = useIntlayer("my-custom-my-component");'
    );
  });
});
