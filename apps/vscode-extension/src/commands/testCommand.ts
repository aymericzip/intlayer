import { listMissingTranslationsWithConfig } from '@intlayer/cli';
import { getConfiguration } from '@intlayer/config/node';
import { prepareIntlayer } from '@intlayer/engine/cli';
import { window, workspace } from 'vscode';
import {
  type CommandSource,
  resolveProjectDirOrPick,
} from '../utils/findProjectRoot';
import { getConfigurationOptions } from '../utils/getConfiguration';
import { prefix } from '../utils/logFunctions';

// Helper to pretty-print details into a temporary editor document
const writeMissingReport = async (
  result: Awaited<ReturnType<typeof listMissingTranslationsWithConfig>>
) => {
  const lines: string[] = [];
  lines.push('## Intlayer — Missing Translations Report');
  lines.push('');
  lines.push(
    `- Missing locales (any): ${
      result.missingLocales.length ? result.missingLocales.join(', ') : '—'
    }`
  );
  lines.push(
    `- Missing required locales: ${
      result.missingRequiredLocales.length
        ? result.missingRequiredLocales.join(', ')
        : '—'
    }`
  );
  lines.push('');

  if (!result.missingTranslations.length) {
    lines.push('✔ No missing translation keys found.');
  } else {
    lines.push(
      `⚠ ${result.missingTranslations.length} missing translation key(s):`
    );
    lines.push('');
    for (const item of result.missingTranslations) {
      const filePath = item.filePath ?? '(unknown file)';
      lines.push(`### Key: ${String(item.key)}`);
      lines.push(`- File: ${filePath}`);
      lines.push(`- Missing locales: ${item.locales.join(', ')}`);
      lines.push('');
    }
  }

  const doc = await workspace.openTextDocument({
    language: 'markdown',
    content: lines.join('\n'),
  });
  await window.showTextDocument(doc, { preview: false });
};

export const testCommand = async (source?: CommandSource) => {
  const projectDir = await resolveProjectDirOrPick(
    'Select the Intlayer project to test',
    source
  );

  if (!projectDir) return;

  try {
    const configuration = getConfiguration(
      await getConfigurationOptions(projectDir)
    );

    // Like `intlayer test`: refresh the dictionaries, reusing the build cache
    await prepareIntlayer(configuration);

    const result = listMissingTranslationsWithConfig(configuration);

    const hasIssues =
      result.missingTranslations.length > 0 || result.missingLocales.length > 0;

    if (hasIssues) {
      await writeMissingReport(result);
    } else {
      await window.showInformationMessage(
        `${prefix}No missing translations found.`
      );
    }
  } catch (error) {
    await window.showErrorMessage(
      `${prefix}Test failed: ${(error as Error).message}`
    );
  }
};
