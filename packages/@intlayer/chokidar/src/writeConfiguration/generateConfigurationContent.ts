import type { IntlayerConfig } from '@intlayer/types/config';

export const generateConfigurationContent = (
  configuration: IntlayerConfig,
  format: 'cjs' | 'esm'
): string => {
  const {
    internationalization,
    routing,
    editor,
    log,
    system,
    content,
    ai,
    dictionary,
    build,
    compiler,
  } = configuration;

  let fileContent = '';

  fileContent += `const internationalization = ${JSON.stringify(internationalization, null, 2)};\n`;
  fileContent += `const routing = ${JSON.stringify(routing, null, 2)};\n`;
  fileContent += `const editor = ${JSON.stringify(editor, null, 2)};\n`;
  fileContent += `const log = ${JSON.stringify(log, null, 2)};\n`;
  fileContent += `const system = ${JSON.stringify(system, null, 2)};\n`;
  fileContent += `const content = ${JSON.stringify(content, null, 2)};\n`;
  fileContent += `const ai = ${JSON.stringify(ai, null, 2)};\n`;
  fileContent += `const dictionary = ${JSON.stringify(dictionary, null, 2)};\n`;
  fileContent += `const build = ${JSON.stringify(build, null, 2)};\n`;
  fileContent += `const compiler = ${JSON.stringify(compiler, null, 2)};\n`;
  fileContent += `const configuration = { internationalization, routing, editor, log, system, content, ai, dictionary, build, compiler };\n`;

  if (format === 'esm') {
    fileContent += `\nexport { internationalization, routing, editor, log, system, content, ai, dictionary, build, compiler, configuration };\n`;
    fileContent += `export default configuration;\n`;
  } else {
    fileContent += `\nmodule.exports.internationalization = internationalization;\n`;
    fileContent += `module.exports.routing = routing;\n`;
    fileContent += `module.exports.editor = editor;\n`;
    fileContent += `module.exports.log = log;\n`;
    fileContent += `module.exports.system = system;\n`;
    fileContent += `module.exports.content = content;\n`;
    fileContent += `module.exports.ai = ai;\n`;
    fileContent += `module.exports.dictionary = dictionary;\n`;
    fileContent += `module.exports.build = build;\n`;
    fileContent += `module.exports.compiler = compiler;\n`;
    fileContent += `module.exports = configuration;\n`;
  }

  return fileContent;
};
