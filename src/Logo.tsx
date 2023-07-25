import { forwardRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Color } from "three";
import { ToonShader } from "./shaders/ToonShader";

interface LogoProps {
  colors: string[];
  brightnessThresholds: number[];
  [key: string]: any;
}

export const Logo = forwardRef<any, LogoProps>((props, ref) => {
  const { nodes, animations } = useGLTF("./WO3.glb") as any;
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    ToonShader.uniforms.colorMap.value = props.colors.map(
      (color) => new Color(color)
    );
    ToonShader.uniforms.brightnessThresholds.value = props.brightnessThresholds;
  }, [props.colors, props.brightnessThresholds]);

  useEffect(() => {
    actions.OlinsAction.play();
    actions.WolffAction.play();
  });

  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene" rotation={[0, 1.6, 0]}>
        <mesh
          name="Olins"
          castShadow
          receiveShadow
          geometry={nodes.Olins.geometry}
          position={[0.008, -0.538, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={31.241}
        >
          <shaderMaterial attach="material" {...ToonShader} />
        </mesh>
        <mesh
          name="Wolff"
          castShadow
          receiveShadow
          geometry={nodes.Wolff.geometry}
          position={[-0.335, 0.507, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={31.241}
        >
          <shaderMaterial attach="material" {...ToonShader} />
        </mesh>
      </group>
    </group>
  );
});

useGLTF.preload("./WO3.glb");
