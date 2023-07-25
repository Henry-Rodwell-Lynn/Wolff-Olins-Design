import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Scene } from "./Scene";
import { Color } from "three";
import { useControls, folder } from "leva";

export function FiberContainer() {
  const { High, High_Mid, Low_Mid, Low, Background } = useControls("Color", {
    Model: folder({
      High: "#ff0000",
      High_Mid: "#ffc900",
      Low_Mid: "#23ce6e",
      Low: "#00c9f7",
    }),
    Background: folder({
      Background: "#fff",
    }),
  });

  const { Highlights, Midtones, Shadows } = useControls("Shader", {
    Highlights: {
      value: 0.88,
      min: 0,
      max: 1,
      step: 0.01,
    },
    Midtones: {
      value: 0.35,
      min: 0,
      max: 1,
      step: 0.01,
    },
    Shadows: {
      value: 0.0,
      min: 0,
      max: 1,
      step: 0.01,
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
    <div
      style={{ background: Background }}
      className=" justify-self-center absolute h-full w-full overflow-hidden"
    >
      <div className="absolute text-white text-2xl m-2 w-full grid grid-cols-12 mix-blend-difference">
        <a className="col-span-6">
          In the rapidly evolving world we inhabit, the significance of design
          cannot be overstated. Design serves as the catalyst for transformative
          change and innovation, shaping the trajectory of the future. As
          technology continues to advance and intertwine with our daily lives,
          design has emerged as the bridge that connects human aspirations with
          the vast potential of modern tools.<br></br><br></br>
          At its core, design is about problem-solving and enhancing user
          experiences. In the future, as complex challenges arise, from
          sustainability concerns to healthcare advancements and beyond, design
          will be the driving force behind creating elegant solutions that cater
          to diverse needs. By embracing user-centric design principles, we can
          craft products and services that seamlessly integrate into people's
          lives, ultimately elevating their overall well-being and satisfaction.
          
        </a>
        <div className="col-span-2"></div>

        <div className="col-span-2">
          <ul>
            <li>Henry Rodwell-Lynn</li>
            <br></br>
            <li>Graphic / Motion / Digital</li>
            <li>Designer</li>
          </ul>
        </div>
      </div>
      <a className="absolute text-white text-2xl m-2 w-1/5 bottom-0 mix-blend-difference">Rendered in real time using a custom shader. <br></br>Feel free to zoom and play around with various colour combinations.</a>
      <Canvas camera={{ position: [30, 4, 0], fov: 15 }} shadows>
        <Scene colors={colors} brightnessThresholds={brightnessThresholds} />
        <OrbitControls
          minDistance={10}
          maxDistance={30}
          enablePan={false}
          enableRotate={true}
        />
      </Canvas>
    </div>
  );
}
