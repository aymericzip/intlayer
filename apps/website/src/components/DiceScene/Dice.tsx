/* eslint-disable sonarjs/no-use-of-empty-return-value */
/* eslint-disable react/no-unknown-property */
'use client';

import { Clone, Sphere, useCursor, useFBX } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import { type RapierRigidBody, RigidBody } from '@react-three/rapier';
import {
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { Color } from 'three';

interface DiceProps {
  diceRef: RefObject<RapierRigidBody>;
  floorRef: RefObject<RapierRigidBody>;
  setText: Dispatch<SetStateAction<string>>;
}

// Generate a random number between -1 and 1
const generateRandomNumber = () => Math.random() * 2 - 1;

export const Dice = ({ diceRef, floorRef, setText }: DiceProps) => {
  const dice = useFBX('/objects/Dice/FullDice.fbx');
  const [hovered, setHovered] = useState(false);
  const [dragged, setDragged] = useState(false);
  const [randomNb, setRandomNb] = useState<number | null>(null);

  useCursor(hovered);

  const pos1 = { x: 0, y: -1, z: 0 };
  const pos2 = { x: 0, y: 0, z: -1 };
  const pos3 = { x: -1, y: 0, z: 0 };
  const pos4 = { x: 1, y: 0, z: 0 };
  const pos5 = { x: 0, y: 0, z: 1 };
  const pos6 = { x: 0, y: 1, z: 0 };
  const numberPositions = [pos1, pos2, pos3, pos4, pos5, pos6];

  const jumpStrength = 240;
  const posCorrecterStrength = 20;
  const jumpMaxTorque = 150;
  const massSelectedNb = 10;

  const jump = () => {
    const randomNb = Math.floor(Math.random() * 6 + 1); // 1 to 6
    setRandomNb(randomNb);

    if (diceRef.current && floorRef.current && randomNb) {
      const dicePos = diceRef.current.translation();
      const floorPos = floorRef.current.translation();

      diceRef.current.applyImpulse(
        {
          y: jumpStrength,
          x: -(dicePos.x - floorPos.x) * posCorrecterStrength,
          z: -(dicePos.z - floorPos.z) * posCorrecterStrength,
        },
        true
      );

      diceRef.current.applyTorqueImpulse(
        {
          x: generateRandomNumber() * jumpMaxTorque,
          y: generateRandomNumber() * jumpMaxTorque,
          z: generateRandomNumber() * jumpMaxTorque,
        },
        true
      );

      diceRef.current.setAdditionalMassProperties(
        massSelectedNb,
        numberPositions[randomNb - 1],
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          w: 0,
          x: 0,
          y: 0,
          z: 0,
        },
        true
      );
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (randomNb) {
      setText('•••');
      timer = setTimeout(() => setText(randomNb.toString()), 4500);

      return () => {
        if (timer) clearTimeout(timer);
      };
    }
  }, [randomNb, setText]);

  const dragTop = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation(); // Prevent orbit controls from taking over

    if (diceRef.current && dragged) {
      const yMove = e.movementY;

      if (yMove < -15) {
        jump();
        setDragged(false);
      }
    }
  };

  useLayoutEffect(() => {
    if (diceRef.current) {
      diceRef.current.setAdditionalMassProperties(
        massSelectedNb,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          w: 0,
          x: 0,
          y: 0,
          z: 0,
        },
        true
      );
    }
  }, [diceRef]);

  return (
    <RigidBody
      colliders="ball"
      ref={diceRef}
      restitution={1}
      angularDamping={2}
      linearDamping={1}
    >
      <group
        position={[0, 0, 0]}
        castShadow
        onClick={(e) => (jump(), e.stopPropagation())}
        onPointerOver={(e) => {
          e.stopPropagation(), setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onPointerDown={(e) => (setDragged(true), e.stopPropagation())}
        onPointerUp={(e) => (setDragged(false), e.stopPropagation())}
        onPointerMove={(e) => (e.stopPropagation(), dragTop(e))}
      >
        <Sphere args={[0.95]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={new Color(0x2e2e2e)}
            envMap={null}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </group>
    </RigidBody>
  );
};
