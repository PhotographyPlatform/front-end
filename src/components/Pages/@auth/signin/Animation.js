import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import './style.css'
import Signin from "./Signin";
import { Box } from "@chakra-ui/react";
export default function Animation() {
    const options = {
        particles: {
            number: {
                value: 90,
                density: {
                    enable: true,
                    area: 800
                }
            },
            color: {
                value: ["#112D4E", "#DBE2EF", "#3F72AF", "#112D4E"]
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 1
            },
            size: {
                value: { min: 1, max: 8 }
            },
            links: {
                enable: false,
                distance: 150,
                color: "#808080",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 0.5,
                direction: "none",
                random: false,
                straight: false,
                outModes: "out"
            }
        },
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "bubble"
                },
                onClick: {
                    enable: true,
                }
            },
            modes: {
                grab: {
                    distance: 140,
                    links: {
                        opacity: 1
                    }
                },
                push: {
                    quantity: 4
                }
            }
        }
    };

    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    return (
        <div className="animation">
            <Particles options={options} init={particlesInit} />
        </div>
    );
};


