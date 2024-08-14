'use client';

import { useDevice } from '@intlayer/design-system/hooks';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { RapierRigidBody } from '@react-three/rapier';
import { useRef, useState } from 'react';
import type { Mesh } from 'three';
import { Dice } from './Dice';
import { Floor } from './Floor';

export const Scene = () => {
  const diceRef = useRef<RapierRigidBody>(null);
  const floorRef = useRef<RapierRigidBody>(null);
  const groupRef = useRef<Mesh>(null);
  const { isMobile } = useDevice();

  const [text, setText] = useState('Click the dice to roll');

  const groupRotationSpeed = 0.005;

  useFrame(() => {
    if (diceRef.current) {
      groupRef.current?.rotateY(groupRotationSpeed);
    }
  });

  return (
    <>
      <mesh
        ref={groupRef}
        onPointerMove={() => {
          if (!isMobile) document.body.style.cursor = 'grab';
        }}
        onPointerLeave={() => {
          if (!isMobile) document.body.style.cursor = 'default';
        }}
      >
        <Floor floorRef={floorRef} />
        <Dice diceRef={diceRef} floorRef={floorRef} setText={setText} />
      </mesh>
      <Text
        color="white"
        anchorX="center"
        anchorY="middle"
        rotation={[-Math.PI / 2, 0, Math.PI / 4]}
        position={[1, -1.9, 1]}
        fontSize={text.length < 4 ? 4 : 0.7}
      >
        {text}
      </Text>
    </>
  );
};
