// src/components/ParticlesBackground.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/particles-background.scss';

const ParticlesBackground = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const particleCount = 30;

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random size
            const size = Math.random() * 5 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;

            // Random opacity
            particle.style.opacity = Math.random() * 0.3 + 0.1;

            container.appendChild(particle);

            // Animate each particle
            gsap.to(particle, {
                x: `random(-150, 150)`,
                y: `random(-150, 150)`,
                duration: Math.random() * 50 + 30,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }

        // Add a subtle gradient animation to the background
        gsap.to(container, {
            backgroundPositionX: '100%',
            backgroundPositionY: '100%',
            duration: 40,
            repeat: -1,
            yoyo: true,
            ease: 'none'
        });

        return () => {
            // Clean up animations and particles
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        };
    }, []);

    return <div className="particles-background" ref={containerRef}></div>;
};

export default ParticlesBackground;