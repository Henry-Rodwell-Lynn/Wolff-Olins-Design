import { forwardRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { Color } from "three"; 
import { ToonShader } from "./shaders/ToonShader";

interface LogoProps {
  colors: string[];
  brightnessThresholds: number[];
  [key: string]: any; 
}

export const Logo = forwardRef<any, LogoProps>((props, ref) => {
  const { nodes } = useGLTF("./WO.glb") as any;

  useEffect(() => {
    ToonShader.uniforms.colorMap.value = props.colors.map((color) => new Color(color));
    ToonShader.uniforms.brightnessThresholds.value = props.brightnessThresholds;
  }, [props.colors, props.brightnessThresholds]);

  

  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene" rotation={[0, 20, 0]}>
        <mesh
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

useGLTF.preload("./WO.glb");

