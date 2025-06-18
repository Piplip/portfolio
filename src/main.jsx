import React, {useEffect, useRef} from 'react';
import ReactDOM from 'react-dom/client';
import './style.scss';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';
import { motion } from 'framer-motion';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
    const scrollIndicatorRef = useRef(null);
    const sectionIds = ['hero-section', 'about-section', 'skills-section', 'projects-section', 'contact-section'];

    const scrollToSection = (index) => {
        const sections = document.querySelectorAll('.section');
        const sectionId = sectionIds[index];
        const container = document.querySelector('.horizontal-scroll-container');

        if (sections[index]) {
            const st = ScrollTrigger.getById('horizontalScroll');
            if (st) {
                const totalWidth = Array.from(sections)
                    .reduce((width, section) => width + section.offsetWidth, 0);

                // Get the target section's position and dimensions
                const targetSection = sections[index];
                const sectionRect = targetSection.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                // Calculate the base position (left edge of the section)
                let targetPosition = 0;
                for (let i = 0; i < index; i++) {
                    targetPosition += sections[i].offsetWidth;
                }

                const viewportWidth = window.innerWidth;
                const sectionWidth = sectionRect.width;

                // Calculate the offset needed to center the section in the viewport
                // First, calculate the base offset for section spacing
                const baseOffset = index === 0 ? 0 : (viewportWidth * 0.1 * Math.pow(1.1, index));

                // Calculate the exact position needed to center the section
                const sectionCenter = targetPosition + (sectionWidth / 2);
                const viewportCenter = viewportWidth / 2;
                const centeringOffset = sectionCenter - viewportCenter;

                // Combine the offsets, ensuring we don't overshoot
                const offset = Math.max(0, baseOffset + (centeringOffset * 0.8));

                const scrollMax = totalWidth - viewportWidth;
                const targetProgress = (targetPosition + offset) / totalWidth;
                const scrollPosition = targetProgress * scrollMax;

                const originalOnUpdate = st.onUpdate;
                st.onUpdate = null;

                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: scrollPosition,
                        autoKill: false
                    },
                    ease: "power2.inOut",
                    onComplete: () => {
                        st.onUpdate = originalOnUpdate;
                        history.replaceState(null, null, `#${sectionId}`);

                        // Dispatch custom event to update navbar state
                        const hashChangeEvent = new CustomEvent('hashchange:manual', {
                            detail: { sectionIndex: index }
                        });
                        window.dispatchEvent(hashChangeEvent);
                    }
                });
            }
        }
    };

    useEffect(() => {
        const sections = document.querySelector('.horizontal-sections');
        const sectionElements = document.querySelectorAll('.section');
        const container = document.querySelector('.horizontal-scroll-container');

        const totalWidth = Array.from(sectionElements)
            .reduce((width, section) => width + section.offsetWidth, 0);

        sections.style.width = `${totalWidth}px`;

        gsap.to('.horizontal-sections', {
            x: () => -(totalWidth - window.innerWidth),
            ease: 'none',
            scrollTrigger: {
                trigger: '.horizontal-scroll-container',
                pin: true,
                scrub: 1,
                end: () => `+=${totalWidth}`,
                invalidateOnRefresh: true,
                id: 'horizontalScroll',
                onUpdate: (self) => {
                    const progress = self.progress;
                    const totalSections = sectionElements.length;
                    const viewportWidth = window.innerWidth;

                    let activeIndex = 0;
                    let accumulatedWidth = 0;

                    for (let i = 0; i < totalSections; i++) {
                        const section = sectionElements[i];
                        const sectionRect = section.getBoundingClientRect();
                        const sectionWidth = sectionRect.width;

                        // Use the same offset calculation as scrollToSection
                        const baseOffset = i === 0 ? 0 : (viewportWidth * 0.1 * Math.pow(1.1, i));
                        const sectionCenter = accumulatedWidth + (sectionWidth / 2);
                        const viewportCenter = viewportWidth / 2;
                        const centeringOffset = sectionCenter - viewportCenter;
                        const offset = Math.max(0, baseOffset + (centeringOffset * 0.8));

                        accumulatedWidth += sectionWidth + offset;
                        if (progress * totalWidth <= accumulatedWidth) {
                            activeIndex = i;
                            break;
                        }
                    }

                    if (window.location.hash !== `#${sectionIds[activeIndex]}` && self.onUpdate !== null) {
                        history.replaceState(null, null, `#${sectionIds[activeIndex]}`);

                        const hashChangeEvent = new CustomEvent('hashchange:manual', {
                            detail: { sectionIndex: activeIndex }
                        });
                        window.dispatchEvent(hashChangeEvent);
                    }
                }
            }
        });

        if (scrollIndicatorRef.current) {
            const updateScrollIndicator = () => {
                const scrollTotal = totalWidth - window.innerWidth;
                const scrolled = window.scrollY;
                const scrollPercent = (scrolled / scrollTotal) * 100;
                scrollIndicatorRef.current.style.height = `${scrollPercent}vh`;
            };

            window.addEventListener('scroll', updateScrollIndicator);
            updateScrollIndicator();

            return () => {
                window.removeEventListener('scroll', updateScrollIndicator);
                ScrollTrigger.getAll().forEach(t => t.kill());
            };
        } else {
            return () => {
                ScrollTrigger.getAll().forEach(t => t.kill());
            };
        }
    }, []);

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

    useEffect(() => {
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
            <div ref={scrollIndicatorRef} className="scroll-indicator"></div>

            <Navbar scrollToSection={scrollToSection} sectionIds={sectionIds}/>
            <div className="horizontal-scroll-container">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="horizontal-sections">
                        <section id="hero-section" className="section">
                            <HeroSection scrollToSection={scrollToSection}/>
                        </section>
                        <section id="about-section" className="section">
                            <AboutSection/>
                        </section>
                        <section id="skills-section" className="section">
                            <SkillsSection/>
                        </section>
                        <section id="projects-section" className="section">
                            <ProjectsSection/>
                        </section>
                        <section id="contact-section" className="section">
                            <ContactSection/>
                        </section>
                    </div>
                </motion.div>
            </div>
            <Footer scrollToSection={scrollToSection} sectionIds={sectionIds}/>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
