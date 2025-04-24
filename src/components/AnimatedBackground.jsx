import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/animated-background.scss';

const AnimatedBackground = () => {
    const backgroundRef = useRef(null);
    
    useEffect(() => {
        // Generate floating elements
        const createFloatingElements = () => {
            if (!backgroundRef.current) return;
            
            const container = backgroundRef.current;
            const shapes = ['circle', 'square', 'triangle', 'dot', 'ring'];
            const colors = ['primary', 'secondary', 'accent', 'light', 'dark'];
            
            // Clear existing elements
            const existingElements = container.querySelectorAll('.floating-element');
            existingElements.forEach(el => el.remove());
            
            // Create new elements
            for (let i = 0; i < 25; i++) {
                const element = document.createElement('div');
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                const color = colors[Math.floor(Math.random() * colors.length)];
                const size = Math.random() * 40 + 10; // Between 10-50px
                
                element.classList.add('floating-element', shape, color);
                element.style.width = `${size}px`;
                element.style.height = `${size}px`;
                element.style.left = `${Math.random() * 100}%`;
                element.style.top = `${Math.random() * 100}%`;
                element.style.opacity = Math.random() * 0.15 + 0.05; // Low opacity
                
                container.appendChild(element);
                
                // Animate each element
                gsap.to(element, {
                    x: `random(-100, 100)`,
                    y: `random(-100, 100)`,
                    rotation: `random(-180, 180)`,
                    duration: `random(30, 80)`,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }
        };
        
        createFloatingElements();
        
        // Simple animation for the gradient background
        gsap.to(backgroundRef.current, {
            backgroundPosition: '100% 100%',
            duration: 25,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
        
        // Recreate elements on resize to maintain proper distribution
        const handleResize = () => {
            createFloatingElements();
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return (
        <div className="animated-background" ref={backgroundRef}>
            <div className="gradient-overlay"></div>
        </div>
    );
};

export default AnimatedBackground;