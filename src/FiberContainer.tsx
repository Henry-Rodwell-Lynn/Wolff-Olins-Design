import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Scene } from "./Scene";
import { Color } from "three";
import { useControls, folder } from "leva";

export function FiberContainer() {
  const { High, High_Mid, Low_Mid, Low, Background } = useControls("Color", {
    Model: folder({
      High: "#ff97f1",
      High_Mid: "#ff5ce9",
      Low_Mid: "#b03fa5",
      Low: "#1f003e",
    }),
    Background: folder({
      Background: '#ffffff',
    }),
  });

  const { Highlights, Midtones, Shadows } = useControls("Shader", {
    Highlights: {
      value: 0.98,
      min: 0,
      max: 1,
      step: 0.01
    },
    Midtones: {
      value: 0.35,
      min: 0,
      max: 1,
      step: 0.01
    },
    Shadows: {
      value: 0.0,
      min: 0,
      max: 1,
      step: 0.01
    },
  });

  const colors = useMemo(
    () => [
      new Color(High).convertLinearToSRGB(),
      new Color(High_Mid).convertLinearToSRGB(),
      new Color(Low_Mid).convertLinearToSRGB(),
      new Color(Low).convertLinearToSRGB(),
    ],
    [High, High_Mid, Low_Mid, Low]
  );
  
  const brightnessThresholds = useMemo(
    () => [Highlights, Midtones, Shadows],
    [Highlights, Midtones, Shadows]
  );

  return (
    <div style={{background: Background}} className=" justify-self-center absolute h-full w-full">
      <Canvas camera={{ position: [50, 4, 0], fov: 30 }} shadows>
        <Scene colors={colors} brightnessThresholds={brightnessThresholds} />
        <OrbitControls 
          minDistance={10} 
          maxDistance={100}
          enablePan={false}
          enableRotate={true} />
      </Canvas>
    </div>
  );
}
