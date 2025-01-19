import {
  createContext,
  useContext,
  type FC,
  type PropsWithChildren,
} from 'react';

export type UseCrossPlatformStateProps = {
  targetWindow?: Window;
  targetOrigin?: string;
  allowedOrigins?: string[];
};

const CommunicatorContext = createContext<
  UseCrossPlatformStateProps | undefined
>(undefined);

export const CommunicatorProvider: FC<
  PropsWithChildren<UseCrossPlatformStateProps>
> = ({ children, ...props }) => (
  <CommunicatorContext.Provider value={props}>
    {children}
  </CommunicatorContext.Provider>
);

export const useCommunicator = () => {
  const context = useContext(CommunicatorContext);

  if (!context) {
    throw new Error(
      'useCommunicator must be used within a CommunicatorProvider'
    );
  }
  return context;
};
