import { dirname, join } from 'node:path';
import { isValidElement } from '@intlayer/core/utils';
import { Hover, type HoverProvider, MarkdownString, Uri } from 'vscode';
import { findProjectRoot } from '../utils/findProjectRoot';
import { getCachedConfig, getCachedDictionary } from '../utils/intlayerCache';
import { resolveIntlayerPath } from '../utils/intlayerPathResolver';
import { getValueFromPath } from '../utils/intlayerValueResolver';

export const intlayerHoverProvider: HoverProvider = {
  provideHover: async (document, position) => {
    // Resolve Path (Fast AST check)
    const origin = await resolveIntlayerPath(document, position);
    if (!origin) {
      return null;
    }

    const { dictionaryKey, fieldPath, moduleSource } = origin;
    const cleanPath = [...fieldPath];
    const lastKey = cleanPath[cleanPath.length - 1];

    // Check if accessing properties specific to frameworks
    const isAccessor =
      lastKey === 'value' || lastKey === 'raw' || lastKey === 'use';

    if (isAccessor) {
      cleanPath.pop();
    }

    // Find Root
    const fileDir = dirname(document.uri.fsPath);
    const projectDir = findProjectRoot(fileDir);
    if (!projectDir) {
      return null;
    }

    // Get Config (OPTIMIZED: Uses Cache)
    const config = await getCachedConfig(projectDir);

    const dictionaryJsonPath = join(
      config.system.unmergedDictionariesDir,
      `${dictionaryKey}.json`
    );

    // Get Dictionary (OPTIMIZED: Async & Cached)
    const dictionaries = await getCachedDictionary(dictionaryJsonPath);

    if (!dictionaries) {
      return null;
    }

    // --- DETERMINE TYPE (Pre-calculation) ---
    let displayType = 'unknown';

    // Scan dictionaries to find the first valid node to determine the type
    for (const dict of dictionaries) {
      if (dict.location === 'remote') {
        continue;
      }

      const targetNode = getValueFromPath(
        dict.content,
        cleanPath,
        config.internationalization?.defaultLocale,
        false
      );
      if (targetNode) {
        if (
          typeof targetNode === 'object' &&
          targetNode.nodeType === 'translation' &&
          targetNode.translation
        ) {
          const translationValues = Object.values(targetNode.translation);
          let primitiveType = 'unknown';

          // Check the first value to determine the type (String, Number, or ReactNode)
          if (translationValues.length > 0) {
            const firstValue = translationValues[0];
            if (isValidElement(firstValue)) {
              primitiveType = 'ReactNode';
            } else {
              primitiveType = typeof firstValue;
            }
          }

          // Core 'intlayer' package returns content directly
          if (moduleSource === 'intlayer') {
            displayType = primitiveType;
          }
          // Framework wrappers return Nodes, unless we accessed .value/.raw
          else {
            displayType = isAccessor
              ? primitiveType
              : `IntlayerNode<${primitiveType}>`;
          }
        } else if (typeof targetNode === 'object') {
          // If the node itself is a React Node (e.g. flat content)
          if (isValidElement(targetNode)) {
            displayType = 'ReactNode';
          } else {
            displayType = 'Object';
          }
        } else {
          displayType = typeof targetNode;
        }
        // Stop once we find the first valid definition to determine the type
        break;
      }
    }

    const hoverTexts: MarkdownString[] = [];

    // --- BUILD HEADER ---
    const header = new MarkdownString();
    header.appendMarkdown(`### Intlayer: \`${dictionaryKey}\``);
    header.appendMarkdown(`\n\n**Path**: \`${cleanPath.join('.') || 'root'}\``);
    // Type is now added to the header section
    header.appendMarkdown(`\n\n**Type**: \`${displayType}\``);
    hoverTexts.push(header);

    // --- BUILD CONTENT BODY ---
    for (const dict of dictionaries) {
      if (dict.location === 'remote') {
        const url = `${config.editor.cmsURL}/dictionary/${dictionaryKey}`;
        const md = new MarkdownString();
        md.isTrusted = true;
        md.appendMarkdown(
          `\n---\n### Remote Dictionary\n[Open Dashboard](${url})`
        );
        hoverTexts.push(md);
        continue;
      }

      const targetNode = getValueFromPath(
        dict.content,
        cleanPath,
        config.internationalization?.defaultLocale,
        false
      );

      if (targetNode) {
        const md = new MarkdownString();
        md.isTrusted = true;
        md.supportHtml = true;

        if (dict.filePath) {
          const fileUri = Uri.file(join(projectDir, dict.filePath));
          md.appendMarkdown(
            `**File Location:**\n[${dict.filePath}](${fileUri})`
          );
        } else {
          md.appendMarkdown(`### Local Content`);
        }
        md.appendMarkdown(`\n\n---\n\n`);

        if (
          typeof targetNode === 'object' &&
          targetNode.nodeType === 'translation' &&
          targetNode.translation
        ) {
          md.appendMarkdown(`| Locale | Translation |\n| :--- | :--- |\n`);
          for (const [locale, val] of Object.entries(targetNode.translation)) {
            // If the value is a React Node object, show "ReactNode" instead of [object Object]
            const valStr = isValidElement(val) ? '`<ReactNode />`' : val;
            md.appendMarkdown(`| **${locale}** | ${valStr} |\n`);
          }
        } else if (typeof targetNode === 'object') {
          if (isValidElement(targetNode)) {
            md.appendMarkdown('**Value**: `<ReactNode />`');
          } else {
            md.appendCodeblock(JSON.stringify(targetNode, null, 2), 'json');
          }
        } else {
          md.appendMarkdown(`**Value**: ${targetNode}`);
        }
        hoverTexts.push(md);
      }
    }

    return new Hover(hoverTexts);
  },
};
