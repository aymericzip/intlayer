/* eslint-disable react/no-unknown-property */
'use client';

import { useDevice } from '@intlayer/design-system/hooks';
import { OrbitControls } from '@react-three/drei';
import { Canvas as FiberCanvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { type HTMLAttributes, type ReactNode, useRef } from 'react';

interface CanvasProps extends HTMLAttributes<HTMLDivElement> {
  initPos?: [number, number, number];
  children: ReactNode;
}

export const Canvas = ({ children, ...props }: Readonly<CanvasProps>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDevice();

  return (
    <div className="absolute m-0 size-full p-0" ref={containerRef} {...props}>
      <FiberCanvas
        shadows
        camera={{
          position: [8, 8, 8],

          fov: 45,
        }}
        className="absolute inset-0 z-10 m-0 p-0"
      >
        <spotLight
          position={[-25, 25, 25]}
          // angle={0.3}
          penumbra={1}
          castShadow
          intensity={1}
          shadow-bias={-0.0001}
        />
        <ambientLight intensity={0.5} />
        {!isMobile && (
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 4}
            minPolarAngle={Math.PI / 4}
          />
        )}

        <Physics>
          <group>{children}</group>
        </Physics>
      </FiberCanvas>
    </div>
  );
};
