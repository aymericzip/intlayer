import fg from 'fast-glob';
import { mkdir, writeFile } from 'fs/promises';
import { LocalesValues } from 'intlayer';
import { dirname } from 'path';
import { FileMetadata, formatMetadata } from '../src/common';
import { readFileContent } from '../src/readFileContent';

interface LocaleData {
  [locale: string]: FileMetadata;
}

interface TypeFileEntry {
  [filePath: string]: LocaleData;
}

const processFilesForCategory = async (
  pattern: string
): Promise<TypeFileEntry> => {
  const files = fg.sync(pattern);
  const result: TypeFileEntry = {};

  // Group files by their base filename (without locale)
  const fileGroups: Record<
    string,
    Array<{ file: string; locale: string; metadata: FileMetadata }>
  > = {};

  console.log(`\nProcessing ${files.length} files with pattern: ${pattern}`);

  for (const file of files) {
    try {
      const content = await readFileContent(file);

      // Extract locale and filename from path
      const pathParts = file.split('/');
      const locale = pathParts[2]; // e.g., 'en' from './docs/en/file.md'
      const metadata = formatMetadata(file, content, locale as LocalesValues);
      const baseFileName = pathParts[pathParts.length - 1];

      console.log(
        `  Processing: ${file} -> locale: ${locale}, filename: ${baseFileName}`
      );

      // Group by filename
      if (!fileGroups[baseFileName]) {
        fileGroups[baseFileName] = [];
      }

      fileGroups[baseFileName].push({
        file,
        locale,
        metadata,
      });
    } catch (error) {
      console.error(`Error processing file ${file}:`, error);
    }
  }

  // Debug: show file groups
  console.log('\nFile groups:');
  for (const [filename, group] of Object.entries(fileGroups)) {
    console.log(`  ${filename}: ${group.map((g) => g.locale).join(', ')}`);
  }

  // Convert groups to the final structure
  for (const [baseFileName, fileData] of Object.entries(fileGroups)) {
    // Use the English file path as the key, or the first available
    const englishFile = fileData.find((f) => f.locale === 'en');
    const primaryFile = englishFile || fileData[0];

    if (primaryFile) {
      const localeData: LocaleData = {};

      // Add all locales for this file
      for (const { locale, metadata } of fileData) {
        localeData[locale] = metadata;
      }

      console.log(
        `  Creating entry for ${primaryFile.file} with locales: ${Object.keys(localeData).join(', ')}`
      );

      result[primaryFile.file] = localeData;
    }
  }

  return result;
};

const generateTypeDefinition = (
  category: string,
  filesData: TypeFileEntry
): string => {
  const capitalizedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  let typeDefinition = `export type ${capitalizedCategory}Data = {\n`;

  for (const [filePath, localeData] of Object.entries(filesData)) {
    typeDefinition += `  '${filePath}': {\n`;

    // Generate type definition for each locale
    for (const [locale, metadata] of Object.entries(localeData)) {
      typeDefinition += `    '${locale}': {\n`;
      typeDefinition += `      githubUrl: '${metadata.githubUrl}';\n`;
      typeDefinition += `      url: '${metadata.url}';\n`;
      typeDefinition += `      relativeUrl: '${metadata.relativeUrl}';\n`;

      if (metadata.title) {
        typeDefinition += `      title: '${metadata.title.replace(/'/g, "\\'")}';
`;
      }

      if (metadata.description) {
        typeDefinition += `      description: '${metadata.description.replace(/'/g, "\\'")}';
`;
      }

      if (metadata.keywords && metadata.keywords.length > 0) {
        const keywordsStr = metadata.keywords
          .map((k) => `'${k.replace(/'/g, "\\'")}'`)
          .join(', ');
        typeDefinition += `      keywords: [${keywordsStr}];\n`;
      }

      if (metadata.updatedAt) {
        typeDefinition += `      updatedAt: '${metadata.updatedAt}';\n`;
      }

      if (metadata.createdAt) {
        typeDefinition += `      createdAt: '${metadata.createdAt}';\n`;
      }

      typeDefinition += `    },\n`;
    }

    typeDefinition += `  },\n`;
  }

  typeDefinition += `};\n`;

  return typeDefinition;
};

const generateTypes = async () => {
  console.log('Starting type generation...');

  // Define categories and their patterns
  const categories = [
    { name: 'blog', pattern: './blog/**/*.md' },
    { name: 'docs', pattern: './docs/**/*.md' },
    { name: 'frequentQuestions', pattern: './frequent_questions/**/*.md' },
    { name: 'legal', pattern: './legal/**/*.md' },
  ];

  for (const category of categories) {
    console.log(`\nProcessing ${category.name}...`);

    try {
      const filesData = await processFilesForCategory(category.pattern);
      const typeDefinition = generateTypeDefinition(category.name, filesData);

      const outputPath = `./src/${category.name}.types.ts`;

      // Ensure directory exists
      await mkdir(dirname(outputPath), { recursive: true });

      // Write type definition to file
      await writeFile(outputPath, typeDefinition, 'utf-8');

      console.log(`✅ Generated ${outputPath}`);
    } catch (error) {
      console.error(`❌ Error generating types for ${category.name}:`, error);
    }
  }

  console.log('\n🎉 Type generation completed!');
};

// Run the generation
generateTypes().catch(console.error);
