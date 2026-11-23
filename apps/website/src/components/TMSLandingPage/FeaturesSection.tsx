import { GitBranch, Languages, Users, Webhook } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  FeatureList,
  ProductSection,
  SectionHeading,
} from '~/components/ProductLanding/layout';
import { Reveal } from '~/components/ProductLanding/motion';

const iconMap: Record<string, ReactNode> = {
  users: <Users />,
  sparkles: <Languages />,
  'git-branch': <GitBranch />,
  webhook: <Webhook />,
};

export const FeaturesSection: FC = () => {
  const { featuresTitle, features } = useIntlayer('tms-landing-features');

  return (
    <ProductSection>
      <SectionHeading title={featuresTitle} />
      <Reveal>
        <FeatureList
          items={features.map((feature) => ({
            key: feature.id.value,
            icon: iconMap[feature.icon.value] ?? <Languages />,
            title: feature.title,
            description: feature.description,
          }))}
        />
      </Reveal>
    </ProductSection>
  );
};
