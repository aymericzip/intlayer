import type { FC } from 'react';
import type {
  DetectedTechnology,
  TechnologyCategory,
} from '../../detector/types';

const categoryLabels: Record<TechnologyCategory, string> = {
  framework: 'Framework',
  'i18n-library': 'i18n',
  cms: 'CMS',
};

/** Wappalyzer-style list of detected technologies, with version + evidence. */
export const TechnologyList: FC<{ technologies: DetectedTechnology[] }> = ({
  technologies,
}) => {
  if (technologies.length === 0) {
    return (
      <p className="empty-hint">
        No framework or i18n library detected on this page.
      </p>
    );
  }

  return (
    <ul className="technology-list">
      {technologies.map((technology) => (
        <li key={technology.id} className="technology-row">
          <div className="technology-main">
            <span className="technology-name">{technology.name}</span>
            {technology.version && (
              <span className="technology-version">{technology.version}</span>
            )}
            <span className={`category-badge category-${technology.category}`}>
              {categoryLabels[technology.category]}
            </span>
          </div>
          <div className="technology-evidence">{technology.evidence}</div>
        </li>
      ))}
    </ul>
  );
};
