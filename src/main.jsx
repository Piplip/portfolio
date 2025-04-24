import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './style.scss';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

// Import components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AnimatedBackground from "./components/AnimatedBackground.jsx";
import ParticlesBackground from "./components/ParticlesBackground.jsx";

gsap.registerPlugin(ScrollTrigger);

// Main App component
function App() {
    // Add a ref for the scroll indicator
    const scrollIndicatorRef = React.useRef(null);

    // Set up GSAP horizontal scrolling after component mount
    useEffect(() => {
        const sections = document.querySelector('.horizontal-sections');
        const sectionElements = document.querySelectorAll('.section');

        // Calculate the total width of all sections
        const totalWidth = Array.from(sectionElements)
            .reduce((width, section) => width + section.offsetWidth, 0);

        // Set the width of the container
        sections.style.width = `${totalWidth}px`;

        // Create the horizontal scrolling animation
        gsap.to('.horizontal-sections', {
            x: () => -(totalWidth - window.innerWidth),
            ease: 'none',
            scrollTrigger: {
                trigger: '.horizontal-scroll-container',
                pin: true,
                scrub: 1,
                end: () => `+=${totalWidth}`,
                invalidateOnRefresh: true,
                id: 'horizontalScroll'
            }
        });

        // Create scroll indicator functionality
        if (scrollIndicatorRef.current) {
            const updateScrollIndicator = () => {
                const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
                const scrolled = window.scrollY;
                const scrollPercent = (scrolled / scrollTotal) * 100;
                scrollIndicatorRef.current.style.height = `${scrollPercent}vh`;
            };

            window.addEventListener('scroll', updateScrollIndicator);

            // Initial update
            updateScrollIndicator();

            // Cleanup scroll indicator event listener
            return () => {
                window.removeEventListener('scroll', updateScrollIndicator);
                ScrollTrigger.getAll().forEach(t => t.kill());
            };
        } else {
            // Original cleanup function if no scroll indicator
            return () => {
                ScrollTrigger.getAll().forEach(t => t.kill());
            };
        }
    }, []);

    // Add animations to headings when they come into view
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray('h1, h2').forEach(heading => {
                gsap.from(heading, {
                    duration: 0.8,
                    opacity: 0,
                    y: 50,
                    scrollTrigger: {
                        trigger: heading,
                        start: "top 80%",
                        toggleActions: "play none none none",
                        once: true
                    }
                });
            });
        });

        return () => ctx.revert();
    }, []);

    // Add animations to project cards when they come into view
    useEffect(() => {
        // This effect now just targets project cards without using the horizontalScroll instance
        // which might be causing issues
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.project-card').forEach((card, i) => {
                gsap.from(card, {
                    x: 50,
                    opacity: 0,
                    duration: 0.7,
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                        once: true
                    }
                });
            });
        });
        
        return () => ctx.revert();
    }, []);

    return (
        <div className="portfolio-container">
            <ParticlesBackground />
            <AnimatedBackground />

            <div ref={scrollIndicatorRef} className="scroll-indicator"></div>

            <Navbar/>
            <div className="horizontal-scroll-container">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="horizontal-sections">
                        <section id="hero-section" className="section">
                            <HeroSection/>
                        </section>
                        <section id="projects-section" className="section">
                            <ProjectsSection/>
                        </section>
                        <section id="about-section" className="section">
                            <AboutSection/>
                        </section>
                        <section id="skills-section" className="section">
                            <SkillsSection/>
                        </section>
                        <section id="contact-section" className="section">
                            <ContactSection/>
                        </section>
                    </div>
                </motion.div>
            </div>
            <Footer/>
        </div>
    );
}

// Render the App
ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);