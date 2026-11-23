import { Check, Laptop, Server } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { type IntlayerNode, useIntlayer } from 'react-intlayer';
import {
  ProductSection,
  SectionHeading,
} from '~/components/ProductLanding/layout';
import { Reveal } from '~/components/ProductLanding/motion';

type ExecutionOptionProps = {
  icon: ReactNode;
  title: IntlayerNode;
  description: IntlayerNode;
  features: IntlayerNode[];
};

const ExecutionOption: FC<ExecutionOptionProps> = ({
  icon,
  title,
  description,
  features,
}) => (
  <div className="flex flex-col gap-4 p-6 md:p-8">
    <span className="flex text-muted-foreground [&_svg]:size-[18px] [&_svg]:stroke-[1.5]">
      {icon}
    </span>
    <h3 className="text-lg font-medium text-foreground">{title}</h3>
    <p className="text-sm leading-relaxed text-muted-foreground">
      {description}
    </p>
    <ul className="mt-2 flex flex-col gap-2 text-sm text-foreground">
      {features.map((feature) => (
        <li key={feature.value} className="flex items-center gap-2">
          <Check className="size-4 shrink-0 text-muted-foreground" />
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

export const LocalVsServerSection: FC = () => {
  const { title, description, local, server } = useIntlayer(
    'local-vs-server-section'
  );

  return (
    <ProductSection>
      <SectionHeading title={title} description={description} />

      <Reveal className="grid grid-cols-1 divide-y divide-text/10 rounded-2xl border border-text/10 bg-card md:grid-cols-2 md:divide-x md:divide-y-0">
        <ExecutionOption
          icon={<Laptop />}
          title={local.title}
          description={local.description}
          features={local.features}
        />
        <ExecutionOption
          icon={<Server />}
          title={server.title}
          description={server.description}
          features={server.features}
        />
      </Reveal>
    </ProductSection>
  );
};
