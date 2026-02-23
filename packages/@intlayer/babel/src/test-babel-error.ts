import { transformSync } from '@babel/core';
import { intlayerExtractBabelPlugin } from './babel-plugin-intlayer-extract';

const code = `
  export function MyComponent() {
    const getLabel = () => "Label Text";
    return <div>{getLabel()}</div>;
  }
`;

transformSync(code, {
  filename: '/app/src/components/MyComponent.tsx',
  plugins: [
    '@babel/plugin-syntax-jsx',
    [
      intlayerExtractBabelPlugin,
      {
        packageName: 'react-intlayer',
        defaultLocale: 'en',
        onExtract: () => {},
      },
    ],
  ],
  babelrc: false,
  configFile: false,
});
