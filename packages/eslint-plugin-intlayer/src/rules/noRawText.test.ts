import {
  CONTENT_FILENAME,
  createRuleTester,
  SOURCE_FILENAME,
} from '../utils/_ruleTester';
import { noRawText } from './noRawText';

const ruleTester = createRuleTester();

ruleTester.run('no-raw-text', noRawText, {
  valid: [
    {
      name: 'text read from a dictionary',
      filename: SOURCE_FILENAME,
      code: `
        import { useIntlayer } from 'react-intlayer';
        const Component = () => {
          const { title } = useIntlayer('home');
          return <h1>{title}</h1>;
        };
      `,
    },
    {
      name: 'content declaration files hold the copy themselves',
      filename: CONTENT_FILENAME,
      code: `
        export default {
          key: 'home',
          content: { title: 'Welcome to our documentation' },
        };
      `,
    },
    {
      name: 'single capitalized word reads as a brand name',
      filename: SOURCE_FILENAME,
      code: `const Component = () => <span>Intlayer</span>;`,
    },
    {
      name: 'className strings are not copy',
      filename: SOURCE_FILENAME,
      code: `const Component = () => <div className="flex items-center gap-4" />;`,
    },
    {
      name: 'code samples are skipped',
      filename: SOURCE_FILENAME,
      code: `const Component = () => <code>Install the package first</code>;`,
    },
    {
      name: 'untargeted attributes are ignored',
      filename: SOURCE_FILENAME,
      code: `const Component = () => <div data-testid="Open the main menu" />;`,
    },
    {
      name: 'string literals outside JSX are opt-in',
      filename: SOURCE_FILENAME,
      code: `const message = 'Please confirm your email address';`,
    },
    {
      name: 'ignorePatterns suppresses matching copy',
      filename: SOURCE_FILENAME,
      code: `const Component = () => <p>Powered by Intlayer</p>;`,
      options: [{ ignorePatterns: ['^Powered by'] }],
    },
    {
      name: 'import specifiers are never copy',
      filename: SOURCE_FILENAME,
      code: `import { useIntlayer } from 'react-intlayer';`,
      options: [{ includeStringLiterals: true }],
    },
  ],

  invalid: [
    {
      name: 'raw JSX text',
      filename: SOURCE_FILENAME,
      code: `const Component = () => <h1>Welcome to our documentation</h1>;`,
      errors: [
        {
          messageId: 'rawText',
          data: { text: 'Welcome to our documentation' },
        },
      ],
    },
    {
      name: 'raw text in a targeted attribute',
      filename: SOURCE_FILENAME,
      code: `const Component = () => <input placeholder="Enter your email address" />;`,
      errors: [
        {
          messageId: 'rawAttribute',
          data: { attribute: 'placeholder', text: 'Enter your email address' },
        },
      ],
    },
    {
      name: 'attribute written as an expression container',
      filename: SOURCE_FILENAME,
      code: `const Component = () => <img alt={'A photo of the team'} />;`,
      errors: [
        {
          messageId: 'rawAttribute',
          data: { attribute: 'alt', text: 'A photo of the team' },
        },
      ],
    },
    {
      name: 'custom attribute list',
      filename: SOURCE_FILENAME,
      code: `const Component = () => <div tooltip="Click to expand the panel" />;`,
      options: [{ attributes: ['tooltip'] }],
      errors: [
        {
          messageId: 'rawAttribute',
          data: { attribute: 'tooltip', text: 'Click to expand the panel' },
        },
      ],
    },
    {
      name: 'string literals when opted in',
      filename: SOURCE_FILENAME,
      code: `const message = 'Please confirm your email address';`,
      options: [{ includeStringLiterals: true }],
      errors: [{ messageId: 'rawStringLiteral' }],
    },
    {
      name: 'long text is truncated in the report',
      filename: SOURCE_FILENAME,
      code: `const Component = () => <p>This sentence is quite a lot longer than the reporting limit allows</p>;`,
      errors: [
        {
          messageId: 'rawText',
          data: { text: 'This sentence is quite a lot longer than…' },
        },
      ],
    },
  ],
});
