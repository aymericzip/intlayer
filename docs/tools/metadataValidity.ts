import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getMarkdownMetadata } from '@intlayer/core';
import fg from 'fast-glob';
import { EXCLUDED_GLOB_PATTEN } from './markdownFormatting';

// Required metadata fields for markdown files
const REQUIRED_FIELDS = ['title', 'description', 'slugs'] as const;
const RECOMMENDED_FIELDS = ['createdAt', 'updatedAt', 'keywords'] as const;

interface MetadataValidationError {
  filePath: string;
  missingRequiredFields: string[];
  missingRecommendedFields: string[];
  invalidFields: Array<{ field: string; reason: string }>;
}

interface MetadataValidityResult {
  totalFiles: number;
  validFiles: number;
  filesWithErrors: number;
  filesWithWarnings: number;
  errors: MetadataValidationError[];
}

const isValidDateFormat = (value: unknown): boolean => {
  if (typeof value !== 'string') return false;
  // Check for YYYY-MM-DD format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(value);
};

const isNonEmptyString = (value: unknown): boolean =>
  typeof value === 'string' && value.trim().length > 0;

const isNonEmptyArray = (value: unknown): boolean =>
  Array.isArray(value) && value.length > 0;

const validateMetadata = (
  filePath: string,
  content: string
): MetadataValidationError | null => {
  const metadata = getMarkdownMetadata<Record<string, unknown>>(content);

  const missingRequiredFields: string[] = [];
  const missingRecommendedFields: string[] = [];
  const invalidFields: Array<{ field: string; reason: string }> = [];

  // Check required fields
  for (const field of REQUIRED_FIELDS) {
    if (!(field in metadata)) {
      missingRequiredFields.push(field);
    } else if (field === 'slugs') {
      if (!isNonEmptyArray(metadata[field])) {
        invalidFields.push({
          field,
          reason: 'slugs must be a non-empty array',
        });
      }
    } else if (!isNonEmptyString(metadata[field])) {
      invalidFields.push({
        field,
        reason: `${field} must be a non-empty string`,
      });
    }
  }

  // Check recommended fields
  for (const field of RECOMMENDED_FIELDS) {
    if (!(field in metadata)) {
      missingRecommendedFields.push(field);
    } else if (field === 'keywords') {
      if (metadata[field] !== undefined && !Array.isArray(metadata[field])) {
        invalidFields.push({
          field,
          reason: 'keywords must be an array',
        });
      }
    } else if (field === 'createdAt' || field === 'updatedAt') {
      if (!isValidDateFormat(metadata[field])) {
        invalidFields.push({
          field,
          reason: `${field} must be a valid date in YYYY-MM-DD format`,
        });
      }
    }
  }

  // Additional validation for optional fields if present
  if (metadata.history !== undefined) {
    if (!Array.isArray(metadata.history)) {
      invalidFields.push({
        field: 'history',
        reason: 'history must be an array',
      });
    } else {
      metadata.history.forEach((entry: unknown, index: number) => {
        if (typeof entry !== 'object' || entry === null) {
          invalidFields.push({
            field: `history[${index}]`,
            reason: 'history entry must be an object',
          });
        } else {
          const historyEntry = entry as Record<string, unknown>;
          if (!isNonEmptyString(historyEntry.version)) {
            invalidFields.push({
              field: `history[${index}].version`,
              reason: 'version must be a non-empty string',
            });
          }
          if (!isValidDateFormat(historyEntry.date)) {
            invalidFields.push({
              field: `history[${index}].date`,
              reason: 'date must be in YYYY-MM-DD format',
            });
          }
          if (!isNonEmptyString(historyEntry.changes)) {
            invalidFields.push({
              field: `history[${index}].changes`,
              reason: 'changes must be a non-empty string',
            });
          }
        }
      });
    }
  }

  // Return error object if any issues found
  if (
    missingRequiredFields.length > 0 ||
    missingRecommendedFields.length > 0 ||
    invalidFields.length > 0
  ) {
    return {
      filePath,
      missingRequiredFields,
      missingRecommendedFields,
      invalidFields,
    };
  }

  return null;
};

export const runMetadataValidityTest = (): MetadataValidityResult => {
  console.info('Running Metadata Validity Test...\n');
  console.info('Current working directory:', process.cwd());

  const DOC_PATTERN = [
    'docs/**/*.md',
    'blog/**/*.md',
    'frequent_questions/**/*.md',
    'legal/**/*.md',
  ];

  const markdownFiles = fg.sync(DOC_PATTERN, {
    ignore: EXCLUDED_GLOB_PATTEN,
  });

  console.info(`Found ${markdownFiles.length} markdown files to validate\n`);

  const errors: MetadataValidationError[] = [];
  let validFiles = 0;
  let filesWithWarnings = 0;
  let filesWithErrors = 0;

  markdownFiles.forEach((filePath: string) => {
    try {
      const content = readFileSync(join(process.cwd(), filePath), 'utf-8');
      const validationError = validateMetadata(filePath, content);

      if (validationError) {
        errors.push(validationError);

        const hasRequiredErrors =
          validationError.missingRequiredFields.length > 0 ||
          validationError.invalidFields.length > 0;

        if (hasRequiredErrors) {
          filesWithErrors++;
          console.log(`❌ ${filePath}`);

          if (validationError.missingRequiredFields.length > 0) {
            console.log(
              `   Missing required fields: ${validationError.missingRequiredFields.join(', ')}`
            );
          }

          validationError.invalidFields.forEach(({ field, reason }) => {
            console.log(`   Invalid field [${field}]: ${reason}`);
          });
        } else {
          filesWithWarnings++;
          console.log(`⚠️  ${filePath}`);
        }

        if (validationError.missingRecommendedFields.length > 0) {
          console.log(
            `   Missing recommended fields: ${validationError.missingRecommendedFields.join(', ')}`
          );
        }

        console.log('');
      } else {
        validFiles++;
      }
    } catch (error) {
      filesWithErrors++;
      errors.push({
        filePath,
        missingRequiredFields: [],
        missingRecommendedFields: [],
        invalidFields: [{ field: 'file', reason: `Failed to read: ${error}` }],
      });
      console.log(`❌ ${filePath}`);
      console.log(`   Error reading file: ${error}\n`);
    }
  });

  // Summary
  console.log('📊 Metadata Validity Test Summary:');
  console.log(`   Total files checked: ${markdownFiles.length}`);
  console.log(`   Valid files: ${validFiles}`);
  console.log(`   Files with warnings: ${filesWithWarnings}`);
  console.log(`   Files with errors: ${filesWithErrors}`);

  if (filesWithErrors > 0) {
    console.log('\n❌ Metadata validity test failed due to errors.');
  } else if (filesWithWarnings > 0) {
    console.log('\n⚠️  Metadata validity test completed with warnings.');
  } else {
    console.log('\n✅ All metadata is valid!');
  }

  return {
    totalFiles: markdownFiles.length,
    validFiles,
    filesWithErrors,
    filesWithWarnings,
    errors,
  };
};
