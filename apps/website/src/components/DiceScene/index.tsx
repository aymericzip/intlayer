'use client';

import { Loader } from '@intlayer/design-system';
import { Html, useProgress } from '@react-three/drei';
import React, { Suspense } from 'react';
import { Canvas } from './Canvas';
import { Scene } from './Scene';

export const DiceScene = () => (
  <Suspense fallback={<Loader />}>
    <Canvas>
      <Suspense fallback={<DreiLoader />}>
        <Scene />
      </Suspense>
    </Canvas>
  </Suspense>
);

const DreiLoader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <Loader>{progress} % loaded</Loader>
    </Html>
  );
};
