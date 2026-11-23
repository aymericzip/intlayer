import {
  GitMerge,
  Globe,
  Layout,
  ToggleLeft,
  Users,
  Webhook,
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
  'git-merge': <GitMerge />,
  globe: <Globe />,
  webhook: <Webhook />,
  layout: <Layout />,
  toggle: <ToggleLeft />,
  users: <Users />,
};

export const FeaturesSection: FC = () => {
  const { featuresTitle, features } = useIntlayer('cms-landing-features');

  return (
    <ProductSection>
      <SectionHeading title={featuresTitle} />
      <Reveal>
        <FeatureList
          items={features.map((feature) => ({
            key: feature.id.value,
            icon: iconMap[feature.icon.value],
            title: feature.title,
            description: feature.description,
            badge: feature.badge,
          }))}
        />
      </Reveal>
    </ProductSection>
  );
};
