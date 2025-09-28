import "./App.css";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import Particles from "./Particles/Particles";
import Effects from "./Effects/Effects";
import Rig from "./Rig/Rig";
import { useRigMouseEvents } from "./Rig/useRigMouseEvents";
import { AppContainer } from "./AppStyle";
import { useParameters } from "./Parameters/useParameters";

export default function App() {
  // We keep just enough to render the scene, no UI.
  const [waiting, setWaiting] = useState(false);
  const [mouse, onMouseMove, onWheel] = useRigMouseEvents();

  // Lock to the Lorenz attractor (no menu to change it)
  const [parameters, , , , onError] = useParameters("lorenz");

  return (
    <AppContainer
      menuOpen={false}
      onPointerMove={onMouseMove}
      onWheel={onWheel}
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 40, far: 1000 }}>
        <Particles
          parameters={parameters}
          setWaiting={setWaiting}
          onError={onError}
        />
        <Stats className="stats" />
        <directionalLight intensity={5} position={[-1000, 0, 0]} color="hotpink" />
        <directionalLight intensity={5} position={[1000, 0, 0]} color="teal" />
        <directionalLight intensity={5} position={[0, -1000, 0]} color="green" />
        <Effects />
        <Rig mouse={mouse} />
      </Canvas>
    </AppContainer>
  );
}
