import { useRef, ReactNode } from "react";
import { Logo } from "./Logo";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { Color } from "three";

interface SceneProps {
  colors: Color[];
  brightnessThresholds: number[];
  children?: ReactNode;
}


export const Scene = ({ colors, brightnessThresholds }: SceneProps) => {

  const refLogo = useRef<Group>(null);

  useFrame(() => {
    const { current: group } = refLogo;
    if (group) {
      group.rotation.x = group.rotation.y += 0.005;
    }
  });

  return (
    <>
      <Logo ref={refLogo} colors={colors} brightnessThresholds={brightnessThresholds} />
    </>
  );
};
