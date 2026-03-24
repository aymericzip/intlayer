import { buildBrowserConfiguration } from '@intlayer/config/node';
import type { IntlayerConfig } from '@intlayer/types/config';

export const generateConfigurationContent = (
  configuration: IntlayerConfig,
  format: 'cjs' | 'esm'
): string => {
  const { internationalization, routing, editor, log, metadata } =
    buildBrowserConfiguration(configuration);

  let content = '';

  content += `const internationalization = ${JSON.stringify(internationalization, null, 2)};\n`;
  content += `const routing = ${JSON.stringify(routing, null, 2)};\n`;
  content += `const editor = ${JSON.stringify(editor, null, 2)};\n`;
  content += `const log = ${JSON.stringify(log, null, 2)};\n`;
  content += `const metadata = ${JSON.stringify(metadata, null, 2)};\n`;
  content += `const configuration = { internationalization, routing, editor, log, metadata };\n`;

  if (format === 'esm') {
    content += `\nexport { internationalization, routing, editor, log, metadata, configuration };\n`;
    content += `export default configuration;\n`;
  } else {
    content += `\nmodule.exports.internationalization = internationalization;\n`;
    content += `module.exports.routing = routing;\n`;
    content += `module.exports.editor = editor;\n`;
    content += `module.exports.log = log;\n`;
    content += `module.exports.metadata = metadata;\n`;
    content += `module.exports = configuration;\n`;
  }

  return content;
};
