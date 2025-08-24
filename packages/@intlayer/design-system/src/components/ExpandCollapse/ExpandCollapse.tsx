import { FC, ReactNode, useState } from 'react';
import { IntlayerNode } from 'react-intlayer';
import { cn } from '../../utils/cn';
import { MaxHeightSmoother } from '../MaxHeightSmoother';

type ExpandCollapseCompProps = {
  minHeight: number;
  content: (isExpanded: boolean) => IntlayerNode<string>;
  children: ReactNode;
};

export const ExpandCollapse: FC<ExpandCollapseCompProps> = ({
  minHeight,
  content,
  children,
}) => {
  const [isDeployed, setIsDeployed] = useState(false);

  return (
    <MaxHeightSmoother
      isHidden={!isDeployed}
      minHeight={minHeight}
      className="w-full overflow-x-scroll overflow-y-hidden"
    >
      {children}
      <button
        className={cn(
          'absolute bottom-0 right-0 flex justify-center cursor-pointer w-full px-2 py-0.5 hover:py-1 transition-all duration-300 text-md text-neutral-700 dark:text-neutral-400 items-center shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur rounded-t-2xl bg-gradient-to-t from-card/80 to-transparent',
          isDeployed && 'w-auto'
        )}
        onClick={() => setIsDeployed((prev) => !prev)}
      >
        {content(!isDeployed)}
      </button>
    </MaxHeightSmoother>
  );
};
