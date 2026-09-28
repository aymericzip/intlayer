/** @module buildDatasetJsonLd */

import { normalizeJsonLdUrl, normalizeJsonLdUrls } from './normalizeJsonLdUrl';

/** One measured variable of a dataset, e.g. the commit count of a repository. */
export type DatasetVariable = {
  name: string;
  /** Measured value, omitted while it is unknown. */
  value?: number | null;
  /** Unit of `value`, e.g. `KB`, `ms` or `downloads`. */
  unitText?: string;
  description?: string;
};

/** A downloadable copy of the dataset, e.g. a JSON report. */
export type DatasetDistribution = {
  /** Absolute URL of the file. */
  contentUrl: string;
  /** MIME type of the file, e.g. `application/json`. */
  encodingFormat: string;
  name?: string;
};

export type BuildDatasetJsonLdParams = {
  name: string;
  /** Google Dataset Search expects at least 50 characters. */
  description: string;
  /** Page the dataset is presented on. */
  url?: string;
  keywords?: string[];
  /** Organization that compiled the dataset. */
  creatorName?: string;
  creatorUrl?: string;
  /** Pages the data is collected from, e.g. an API or a repository. */
  isBasedOn?: string[];
  distribution?: DatasetDistribution[];
  variableMeasured?: DatasetVariable[];
  measurementTechnique?: string;
  /** ISO 8601 interval, e.g. `2026-03-01/2026-09-27`. */
  temporalCoverage?: string;
  /** ISO 8601 date of the last update. */
  dateModified?: string;
  inLanguage?: string;
};

/**
 * Builds a Schema.org Dataset JSON-LD object.
 *
 * Search engines render no rich result for charts, but a `Dataset` makes the
 * data behind one eligible for Google Dataset Search. Variables with a known
 * value are emitted as `PropertyValue` nodes, the others by name only.
 *
 * @param params - Metadata, sources and measured variables of the dataset.
 * @returns A JSON-LD Dataset object ready for serialization.
 */
export const buildDatasetJsonLd = ({
  name,
  description,
  url,
  keywords,
  creatorName = 'Intlayer',
  creatorUrl,
  isBasedOn,
  distribution,
  variableMeasured,
  measurementTechnique,
  temporalCoverage,
  dateModified,
  inLanguage,
}: BuildDatasetJsonLdParams) => ({
  '@context': 'https://schema.org' as const,
  '@type': 'Dataset' as const,
  name,
  description,
  ...(url ? { url: normalizeJsonLdUrl(url) } : {}),
  ...(keywords?.length ? { keywords } : {}),
  creator: {
    '@type': 'Organization' as const,
    name: creatorName,
    ...(creatorUrl ? { url: normalizeJsonLdUrl(creatorUrl) } : {}),
  },
  isAccessibleForFree: true,
  ...(isBasedOn?.length ? { isBasedOn: normalizeJsonLdUrls(isBasedOn) } : {}),
  ...(distribution?.length
    ? {
        distribution: distribution.map((download) => ({
          '@type': 'DataDownload' as const,
          contentUrl: normalizeJsonLdUrl(download.contentUrl),
          encodingFormat: download.encodingFormat,
          ...(download.name ? { name: download.name } : {}),
        })),
      }
    : {}),
  ...(variableMeasured?.length
    ? {
        variableMeasured: variableMeasured.map((variable) => ({
          '@type': 'PropertyValue' as const,
          name: variable.name,
          ...(typeof variable.value === 'number'
            ? { value: variable.value }
            : {}),
          ...(variable.unitText ? { unitText: variable.unitText } : {}),
          ...(variable.description
            ? { description: variable.description }
            : {}),
        })),
      }
    : {}),
  ...(measurementTechnique ? { measurementTechnique } : {}),
  ...(temporalCoverage ? { temporalCoverage } : {}),
  ...(dateModified ? { dateModified } : {}),
  ...(inLanguage ? { inLanguage } : {}),
});
