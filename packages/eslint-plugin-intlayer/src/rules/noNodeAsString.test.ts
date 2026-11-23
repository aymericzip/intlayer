import { createRuleTester, SOURCE_FILENAME } from '../utils/_ruleTester';
import { noNodeAsString } from './noNodeAsString';

const ruleTester = createRuleTester();

const IMPORT = `import { useIntlayer } from 'react-intlayer';`;

ruleTester.run('no-node-as-string', noNodeAsString, {
  valid: [
    {
      name: 'string method already reading .value',
      filename: SOURCE_FILENAME,
      code: `${IMPORT}
        const content = useIntlayer('home');
        const label = content.title.value.toUpperCase();`,
    },
    {
      name: 'node rendered as a JSX child',
      filename: SOURCE_FILENAME,
      code: `${IMPORT}
        const C = () => { const content = useIntlayer('home'); return <h1>{content.title}</h1>; };`,
    },
    {
      name: 'node passed to a component prop',
      filename: SOURCE_FILENAME,
      code: `${IMPORT}
        const C = () => { const content = useIntlayer('home'); return <Card title={content.title} />; };`,
    },
    {
      name: 'event handler attribute',
      filename: SOURCE_FILENAME,
      code: `${IMPORT}
        const C = () => { const content = useIntlayer('home'); return <button onClick={content.handler} />; };`,
    },
    {
      name: 'tagged template receives the node (Lit html``)',
      filename: SOURCE_FILENAME,
      code: `import { useIntlayer } from 'lit-intlayer';
        const content = useIntlayer('home');
        const view = html\`<h1>\${content.title}</h1>\`;`,
    },
    {
      name: 'string method on the whole dictionary',
      filename: SOURCE_FILENAME,
      code: `${IMPORT}
        const content = useIntlayer('home');
        const dump = content.toUpperCase();`,
    },
    {
      name: 'core getIntlayer returns primitives',
      filename: SOURCE_FILENAME,
      code: `import { getIntlayer } from 'intlayer';
        const content = getIntlayer('home');
        const label = content.title.toLowerCase();`,
    },
    {
      name: 'dynamic access is left to no-dynamic-field-access',
      filename: SOURCE_FILENAME,
      code: `${IMPORT}
        const content = useIntlayer('home');
        const label = content[key].toUpperCase();`,
    },
    {
      name: 'array method on a list field',
      filename: SOURCE_FILENAME,
      code: `${IMPORT}
        const content = useIntlayer('home');
        const joined = content.items.join(', ');`,
    },
    {
      name: '.value in an attribute of a component',
      filename: SOURCE_FILENAME,
      code: `${IMPORT}
        const C = () => { const content = useIntlayer('home'); return <Card title={content.title.value} />; };`,
    },
    {
      name: '.value as a JSX child of a vanilla-based node (Astro, Lit)',
      filename: SOURCE_FILENAME,
      code: `import { useIntlayer } from 'vanilla-intlayer';
        const content = useIntlayer('home');
        const view = <h1>{content.title.value}</h1>;`,
    },
    {
      name: '.value inside a larger child expression',
      filename: SOURCE_FILENAME,
      code: `${IMPORT}
        const C = () => { const content = useIntlayer('home'); return <h1>{content.title.value.toUpperCase()}</h1>; };`,
    },
    {
      name: 'template literal, concatenation and String() accept any type',
      filename: SOURCE_FILENAME,
      code: `${IMPORT}
        const content = useIntlayer('home');
        const label = \`\${content.title}!\`;
        const greeting = 'Hi ' + content.name;
        const converted = String(content.name);`,
    },
    {
      name: 'shadowed name is not content',
      filename: SOURCE_FILENAME,
      code: `${IMPORT}
        const C = () => { const content = useIntlayer('home'); return null; };
        const other = (content) => content.title.toUpperCase();`,
    },
  ],

  invalid: [
    {
      name: 'nested field and optional chain',
      filename: SOURCE_FILENAME,
      code: `${IMPORT}
        const content = useIntlayer('home');
        const label = content.hero?.title.toUpperCase();`,
      output: `${IMPORT}
        const content = useIntlayer('home');
        const label = content.hero?.title.value.toUpperCase();`,
      errors: [{ messageId: 'nodeAsString' }],
    },
    {
      name: 'string-only method',
      filename: SOURCE_FILENAME,
      code: `${IMPORT}
        const content = useIntlayer('home');
        const label = content.name.toUpperCase();`,
      output: `${IMPORT}
        const content = useIntlayer('home');
        const label = content.name.value.toUpperCase();`,
      errors: [{ messageId: 'nodeAsString' }],
    },
    {
      name: 'native element attribute',
      filename: SOURCE_FILENAME,
      code: `${IMPORT}
        const C = () => { const content = useIntlayer('home'); return <img alt={content.alt} />; };`,
      output: `${IMPORT}
        const C = () => { const content = useIntlayer('home'); return <img alt={content.alt.value} />; };`,
      errors: [{ messageId: 'nodeAsString' }],
    },
    {
      name: 'destructured field and aliased getter',
      filename: SOURCE_FILENAME,
      code: `import { useIntlayer as useContent } from 'next-intlayer';
        const { title } = useContent('home');
        const label = title.trim();`,
      output: `import { useIntlayer as useContent } from 'next-intlayer';
        const { title } = useContent('home');
        const label = title.value.trim();`,
      errors: [{ messageId: 'nodeAsString' }],
    },
    {
      name: 'awaited server getter from a subpath',
      filename: SOURCE_FILENAME,
      code: `import { getIntlayer } from 'next-intlayer/server';
        const content = await getIntlayer('home');
        const label = content.title.toLowerCase();`,
      output: `import { getIntlayer } from 'next-intlayer/server';
        const content = await getIntlayer('home');
        const label = content.title.value.toLowerCase();`,
      errors: [{ messageId: 'nodeAsString' }],
    },
    {
      name: 'Angular signal accessor',
      filename: SOURCE_FILENAME,
      code: `import { useIntlayer } from 'angular-intlayer';
        const content = useIntlayer('home');
        const label = content().title.split(' ');`,
      output: `import { useIntlayer } from 'angular-intlayer';
        const content = useIntlayer('home');
        const label = content().title.value.split(' ');`,
      errors: [{ messageId: 'nodeAsString' }],
    },
    {
      name: '.value rendered as a JSX child',
      filename: SOURCE_FILENAME,
      code: `${IMPORT}
        const C = () => { const content = useIntlayer('home'); return <h1>{content.title.value}</h1>; };`,
      output: `${IMPORT}
        const C = () => { const content = useIntlayer('home'); return <h1>{content.title}</h1>; };`,
      errors: [{ messageId: 'redundantValue' }],
    },
    {
      name: '.value of a destructured field in a fragment (Solid)',
      filename: SOURCE_FILENAME,
      code: `import { useIntlayer } from 'solid-intlayer';
        const C = () => { const { title } = useIntlayer('home'); return <>{title.value}</>; };`,
      output: `import { useIntlayer } from 'solid-intlayer';
        const C = () => { const { title } = useIntlayer('home'); return <>{title}</>; };`,
      errors: [{ messageId: 'redundantValue' }],
    },
  ],
});
