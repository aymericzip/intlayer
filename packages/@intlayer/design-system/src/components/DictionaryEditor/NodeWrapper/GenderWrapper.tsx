import type { GenderContent } from '@intlayer/core/transpiler';
import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import * as NodeTypes from '@intlayer/types/nodeType';
import { type FC, Fragment } from 'react';
import { NodeWrapper, type NodeWrapperProps } from './index';

type GenderWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: GenderContent<ContentNode>;
};

export const GenderWrapper: FC<GenderWrapperProps> = (props) => {
  const { keyPath, section } = props;

  const genders = section[NodeTypes.GENDER] as Record<string, ContentNode>;

  return (
    <div className="ms-2 grid grid-cols-[auto,1fr] gap-2">
      {Object.keys(genders).map((gender) => {
        const newKeyPathEl: KeyPath = {
          type: NodeTypes.GENDER,
          key: gender,
        };
        const newKeyPath: KeyPath[] = [...keyPath, newKeyPathEl];

        return (
          <Fragment key={gender}>
            <span className="flex items-center font-bold">{gender}</span>
            <NodeWrapper
              {...props}
              keyPath={newKeyPath}
              section={genders[gender]}
            />
          </Fragment>
        );
      })}
    </div>
  );
};
