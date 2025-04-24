import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

const useHorizontalScroll = () => {
    const containerRef = useRef(null);
    const sectionsRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || !sectionsRef.current) return;

        const container = containerRef.current;
        const sections = sectionsRef.current;
        const sectionElements = sections.children;

        // Calculate the total width of all sections
        const totalWidth = Array.from(sectionElements)
            .reduce((width, section) => width + section.offsetWidth, 0);

        // Set the width of the sections container
        sections.style.width = `${totalWidth}px`;

        // Create the horizontal scrolling animation
        const scrollTween = gsap.to(sections, {
            x: () => -(totalWidth - window.innerWidth),
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                pin: true,
                scrub: 1,
                end: () => `+=${totalWidth}`,
                invalidateOnRefresh: true
            }
        });

        // Update on window resize
        const updateScrollTrigger = () => {
            ScrollTrigger.update();
        };

        window.addEventListener('resize', updateScrollTrigger);

        // Cleanup function
        return () => {
            scrollTween.scrollTrigger.kill();
            window.removeEventListener('resize', updateScrollTrigger);
        };
    }, []);

    return { containerRef, sectionsRef };
};

export default useHorizontalScroll;