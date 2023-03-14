import React from 'react'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticleBackGround() {
    const particlesInit = async (main: any) => {
        // console.log(main);
    
        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main);
      };
    
      const particlesLoaded = (container: any) => {
        console.log(container);
      };


  return (
    <div>
        <Particles
            id="tsparticles"
            init={particlesInit}
            // loaded={particlesLoaded}
            options={{
                // background: {
                // color: {
                //     value: "#000000",
                // },
                // },
                fpsLimit: 120,
                interactivity: {
                events: {
                    onClick: {
                    // enable: true,
                    enable: false,
                    mode: "push",
                    },
                    onHover: {
                    // enable: true,
                    enable: false,
                    mode: "repulse",
                    },
                    resize: true,
                },
                modes: {
                    push: {
                    quantity: 4,
                    },
                    repulse: {
                    distance: 200,
                    duration: 0.4,
                    },
                },
                },
                particles: {
                color: {
                    value: "#ffffff",
                },
                links: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    // opacity: 0.5,
                    opacity: 0.4,
                    width: 1,
                },
                collisions: {
                    // enable: true,
                    enable: false,
                },
                move: {
                    direction: "none",
                    enable: true,
                    // outModes: {
                    //   default: "bounce",
                    // },
                    random: false,
                    // speed: 4,
                    speed: 2,
                    straight: false,
                },
                number: {
                    density: {
                    enable: true,
                    area: 500,
                    },
                    // value: 80,
                    value: 40,
                },
                opacity: {
                    value: 0.25,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    // value: { min: 1, max: 5 },
                    value: { min: 1, max: 3 },
                },
                },
                detectRetina: true,
            }}
        />
    </div>
  )
}
