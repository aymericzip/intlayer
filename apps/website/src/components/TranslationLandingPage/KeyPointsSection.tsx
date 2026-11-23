import {
  BookOpenCheck,
  Coins,
  FileCode,
  GitBranch,
  Layers,
  ListChecks,
} from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  FeatureList,
  ProductSection,
  SectionHeading,
} from '~/components/ProductLanding/layout';
import { Reveal } from '~/components/ProductLanding/motion';

const iconMap: Record<string, ReactNode> = {
  free: <Coins />,
  'json-markdown': <FileCode />,
  chunking: <Layers />,
  'context-aware': <BookOpenCheck />,
  audits: <ListChecks />,
  'git-integrated': <GitBranch />,
};

export const KeyPointsSection: FC = () => {
  const { title, description, keyPoints } = useIntlayer('key-points-section');

  return (
    <ProductSection>
      <SectionHeading title={title} description={description} />
      <Reveal>
        <FeatureList
          className="lg:grid-cols-3"
          items={keyPoints.map((keyPoint) => ({
            key: keyPoint.id.value,
            icon: iconMap[keyPoint.id.value] ?? <Coins />,
            title: keyPoint.title,
            description: keyPoint.description,
          }))}
        />
      </Reveal>
    </ProductSection>
  );
};
