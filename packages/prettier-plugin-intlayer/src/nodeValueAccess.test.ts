import { format } from 'prettier';
import { describe, expect, it } from 'vitest';
import intlayerPlugin from './index';

const formatWithPlugin = (
  source: string,
  parser: string,
  intlayerNodeValueAccess?: boolean
): Promise<string> =>
  format(source, {
    parser,
    plugins: [intlayerPlugin],
    singleQuote: true,
    ...(intlayerNodeValueAccess === undefined
      ? {}
      : { intlayerNodeValueAccess }),
  });

const PARSERS = ['typescript', 'babel-ts', 'babel'] as const;

describe('intlayerNodeValueAccess', () => {
  it.each(PARSERS)(
    'appends .value only where a string is required (%s)',
    async (parser) => {
      const source = `import { useIntlayer } from 'react-intlayer';

export const Hero = () => {
  const content = useIntlayer('hero');
  const label = \`\${content.title}!\`;
  const greeting = 'Hi ' + content.name;
  const upper = content.name.toUpperCase();
  const optional = content.section?.title.trim();
  return (
    <div>
      <img alt={content.alt} />
      <h1>{content.title}</h1>
      <Card title={content.title} />
      <p>{String(content.description)}</p>
    </div>
  );
};
`;

      expect(await formatWithPlugin(source, parser))
        .toBe(`import { useIntlayer } from 'react-intlayer';

export const Hero = () => {
  const content = useIntlayer('hero');
  const label = \`\${content.title}!\`;
  const greeting = 'Hi ' + content.name;
  const upper = content.name.value.toUpperCase();
  const optional = content.section?.title.value.trim();
  return (
    <div>
      <img alt={content.alt.value} />
      <h1>{content.title}</h1>
      <Card title={content.title} />
      <p>{String(content.description)}</p>
    </div>
  );
};
`);
    }
  );

  it('handles destructured fields, aliases and awaited server getters', async () => {
    const source = `import { getIntlayer as get } from 'next-intlayer/server';

const { title } = await get('page');
export const metadata = { title: title.trim() };
`;

    expect(await formatWithPlugin(source, 'typescript'))
      .toBe(`import { getIntlayer as get } from 'next-intlayer/server';

const { title } = await get('page');
export const metadata = { title: title.value.trim() };
`);
  });

  it('is idempotent', async () => {
    const source = `import { useIntlayer } from 'vue-intlayer';
const content = useIntlayer('hero');
const label = content.title.toUpperCase();
`;
    const once = await formatWithPlugin(source, 'typescript');

    expect(await formatWithPlugin(once, 'typescript')).toBe(once);
  });

  it('leaves shadowed names, tagged templates and primitive getters alone', async () => {
    const source = `import { useIntlayer } from 'lit-intlayer';
import { getIntlayer } from 'intlayer';

const content = useIntlayer('hero');
const view = html\`<h1>\${content.title}</h1>\`;
const format = (content: { title: string }) => content.title.trim();
const raw = getIntlayer('hero');
const label = raw.title.trim();
`;

    expect(await formatWithPlugin(source, 'typescript')).toBe(source);
  });

  it.each(PARSERS)(
    'removes .value from a JSX child of a JSX-renderable node (%s)',
    async (parser) => {
      const source = `import { useIntlayer } from 'next-intlayer';

export const Hero = () => {
  const { title } = useIntlayer('hero');
  const content = useIntlayer('hero');
  return (
    <>
      <h1>{title.value}</h1>
      <p>{content.section.description.value}</p>
      <Card title={content.title.value} />
      <p>{content.title.value.toUpperCase()}</p>
    </>
  );
};
`;

      expect(await formatWithPlugin(source, parser))
        .toBe(`import { useIntlayer } from 'next-intlayer';

export const Hero = () => {
  const { title } = useIntlayer('hero');
  const content = useIntlayer('hero');
  return (
    <>
      <h1>{title}</h1>
      <p>{content.section.description}</p>
      <Card title={content.title.value} />
      <p>{content.title.value.toUpperCase()}</p>
    </>
  );
};
`);
    }
  );

  it('keeps .value on JSX children of vanilla-based nodes', async () => {
    const source = `import { useIntlayer } from 'vanilla-intlayer';
const content = useIntlayer('hero');
const view = <h1>{content.title.value}</h1>;
`;

    expect(await formatWithPlugin(source, 'typescript')).toBe(source);
  });

  it('can be disabled', async () => {
    const source = `import { useIntlayer } from 'react-intlayer';
const content = useIntlayer('hero');
const label = content.title.toUpperCase();
`;

    expect(await formatWithPlugin(source, 'typescript', false)).toBe(source);
  });
});
