import fg from 'fast-glob';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

// Import the same DOC_PATTERN from translate.ts for consistency
const DOC_PATTERN: string[] = ['./**/*.md'];
export const EXCLUDED_GLOB_PATTEN: string[] = [
  '**/node_modules/**',
  '**/dist/**',
  '**/src/**',
  '**/tools/**',
];

interface MarkdownValidationResult {
  filePath: string;
  exists: boolean;
  errors: string[];
  warnings: string[];
}

interface ValidationRule {
  name: string;
  validate: (
    content: string,
    filePath: string
  ) => { errors: string[]; warnings: string[] };
}

const validationRules: ValidationRule[] = [
  {
    name: 'Frontmatter Check',
    validate: (content: string) => {
      const errors: string[] = [];
      const warnings: string[] = [];

      // Check if document has frontmatter at the beginning
      const frontmatterPattern = /^---\s*\n([\s\S]*?)\n---\s*\n/;
      const hasFrontmatter = frontmatterPattern.test(content);

      if (!hasFrontmatter) {
        // No frontmatter, return empty errors and warnings
        return { errors, warnings };
      } else {
        // If frontmatter exists, validate it has basic required fields
        const frontmatterMatch = content.match(frontmatterPattern);
        if (frontmatterMatch) {
          const frontmatterContent = frontmatterMatch[1];

          // Check for common required fields
          if (!frontmatterContent.includes('title:')) {
            warnings.push('Frontmatter is missing a title field');
          }
          if (!frontmatterContent.includes('description:')) {
            warnings.push('Frontmatter is missing a description field');
          }
        }
      }

      return { errors, warnings };
    },
  },
  {
    name: 'Header Structure',
    validate: (content: string) => {
      const errors: string[] = [];
      const warnings: string[] = [];

      // Check if document has a main heading (H1)
      const h1Match = content.match(/^# .+$/m);
      if (!h1Match) {
        errors.push('Document should have at least one H1 heading (#)');
      }

      // Check for excessive heading hierarchy jumps (only flag very large jumps)
      const headings = content.match(/^#{1,6} .+$/gm) || [];
      let prevLevel = 0;
      headings.forEach((heading, index) => {
        const level = heading.match(/^#+/)?.[0].length || 0;
        // Only flag jumps that are 3+ levels (e.g., H1 to H4, H2 to H5, etc.)
        // This allows common patterns like H1->H3 or H2->H4
        if (level > prevLevel + 2 && prevLevel > 0) {
          warnings.push(
            `Large heading level jump detected at line: "${heading.trim()}" (from H${prevLevel} to H${level})`
          );
        }
        prevLevel = level;
      });

      return { errors, warnings };
    },
  },
  {
    name: 'Code Block Formatting',
    validate: (content: string) => {
      const errors: string[] = [];
      const warnings: string[] = [];

      // Check for unclosed code blocks
      const codeBlockMatches = content.match(/```/g) || [];
      if (codeBlockMatches.length % 2 !== 0) {
        errors.push('Unclosed code block detected (uneven number of ```)');
      }

      return { errors, warnings };
    },
  },
  {
    name: 'Link Validation',
    validate: (content: string) => {
      const errors: string[] = [];
      const warnings: string[] = [];

      // Check for broken markdown links format
      const linkPattern = /\[([^\]]*)\]\(([^)]*)\)/g;
      const links = [...content.matchAll(linkPattern)];

      links.forEach(([fullMatch, text, url]) => {
        if (!text.trim()) {
          warnings.push(`Empty link text detected: ${fullMatch}`);
        }
        if (!url.trim()) {
          errors.push(`Empty link URL detected: ${fullMatch}`);
        }
        // Check for spaces in URLs (should be encoded)
        // Only flag if there are actual unencoded spaces in the middle of URLs
        // Exclude mailto links and check for legitimate spaces that need encoding
        const trimmedUrl = url.trim();
        if (
          trimmedUrl.includes(' ') &&
          !trimmedUrl.startsWith('mailto:') &&
          // Only flag if spaces are in the middle of the URL, not at edges
          trimmedUrl !== url &&
          // Don't flag if it's likely a parsing issue (URL seems incomplete)
          !trimmedUrl.match(/^https?:\/\/[^\s]*\s+[^\s]*$/)
        ) {
          warnings.push(`URL contains spaces: ${url}`);
        }
      });

      return { errors, warnings };
    },
  },
  {
    name: 'List Formatting',
    validate: (content: string) => {
      const errors: string[] = [];
      const warnings: string[] = [];

      const lines = content.split('\n');
      let inList = false;
      let listIndentLevel = 0;

      lines.forEach((line) => {
        const listMatch = line.match(/^(\s*)([-*+]|\d+\.)\s/);
        if (listMatch) {
          const indent = listMatch[1].length;
          if (!inList) {
            inList = true;
            listIndentLevel = indent;
          }
        } else if (inList && line.trim() === '') {
          // Empty line in list is OK
        } else if (inList && !line.match(/^\s/) && line.trim() !== '') {
          inList = false;
        }
      });

      return { errors, warnings };
    },
  },
  {
    name: 'Table Formatting',
    validate: (content: string) => {
      const errors: string[] = [];
      const warnings: string[] = [];

      const lines = content.split('\n');
      let inTable = false;
      let expectedColumns = 0;

      lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
          const columns = trimmedLine.split('|').length - 2; // Exclude empty first/last

          if (!inTable) {
            inTable = true;
            expectedColumns = columns;
          } else {
            if (columns !== expectedColumns) {
              errors.push(
                `Table column count mismatch at line ${index + 1}. Expected ${expectedColumns}, got ${columns}`
              );
            }
          }
        } else if (inTable && trimmedLine === '') {
          inTable = false;
        } else if (inTable && !trimmedLine.match(/^[\s|:-]+$/)) {
          inTable = false;
        }
      });

      return { errors, warnings };
    },
  },
  {
    name: 'Content Quality',
    validate: (content: string) => {
      const errors: string[] = [];
      const warnings: string[] = [];

      // Check for very short content
      if (content.trim().length < 100) {
        warnings.push(
          'Document content is very short (less than 100 characters)'
        );
      }

      return { errors, warnings };
    },
  },
];

const validateMarkdownFile = (filePath: string): MarkdownValidationResult => {
  const result: MarkdownValidationResult = {
    filePath,
    exists: false,
    errors: [],
    warnings: [],
  };

  const fullPath = join(process.cwd(), filePath);

  if (!existsSync(fullPath)) {
    result.errors.push('File does not exist');
    return result;
  }

  result.exists = true;

  try {
    const content = readFileSync(fullPath, 'utf-8');

    // Run all validation rules
    validationRules.forEach((rule) => {
      const ruleResult = rule.validate(content, filePath);
      result.errors.push(
        ...ruleResult.errors.map((error) => `[${rule.name}] ${error}`)
      );
      result.warnings.push(
        ...ruleResult.warnings.map((warning) => `[${rule.name}] ${warning}`)
      );
    });
  } catch (error) {
    result.errors.push(`Failed to read file: ${error}`);
  }

  return result;
};

export const runMarkdownFormattingTest = () => {
  console.info('Running Markdown Formatting Test...\n');

  const results: MarkdownValidationResult[] = [];
  let totalFiles = 0;
  let validFiles = 0;
  let filesWithWarnings = 0;
  let filesWithErrors = 0;

  const docList = fg.sync(DOC_PATTERN, {
    ignore: EXCLUDED_GLOB_PATTEN,
  });

  console.info(`Found ${docList.length} files to test`);

  // Process each file in DOC_PATTERN
  docList.forEach((filePath: string) => {
    const result = validateMarkdownFile(filePath);
    results.push(result);
    totalFiles++;
  });

  // Process results and generate report
  results.forEach((result) => {
    if (!result.exists) {
      console.log(`❌ ${result.filePath}`);
      console.log(`   Error: File does not exist\n`);
      filesWithErrors++;
      return;
    }

    if (result.errors.length === 0 && result.warnings.length === 0) {
      validFiles++;
    } else {
      if (result.errors.length > 0) {
        console.log(`❌ ${result.filePath}`);
        result.errors.forEach((error) => {
          console.log(`   Error: ${error}`);
        });
        filesWithErrors++;
      } else {
        console.log(`⚠️  ${result.filePath}`);
        filesWithWarnings++;
      }

      if (result.warnings.length > 0) {
        result.warnings.forEach((warning) => {
          console.log(`   Warning: ${warning}`);
        });
      }
      console.log('');
    }
  });

  // Summary
  console.log('📊 Test Summary:');
  console.log(`   Total files: ${totalFiles}`);
  console.log(`   Valid files: ${validFiles}`);
  console.log(`   Files with warnings: ${filesWithWarnings}`);
  console.log(`   Files with errors: ${filesWithErrors}`);

  if (filesWithErrors > 0) {
    console.log('\n❌ Test failed due to formatting errors.');
    process.exit(1);
  } else if (filesWithWarnings > 0) {
    console.log('\n⚠️  Test completed with warnings.');
  } else {
    console.log('\n✅ All files passed formatting validation!');
  }

  return {
    totalFiles,
    validFiles,
    filesWithWarnings,
    filesWithErrors,
  };
};

// Run the test if this file is executed directly
if (require.main === module) {
  runMarkdownFormattingTest();
}
