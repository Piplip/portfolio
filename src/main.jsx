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

if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
}

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
    const scrollIndicatorRef = useRef(null);
    const sectionIds = ['hero-section', 'about-section', 'skills-section', 'projects-section', 'contact-section'];
    const lastActiveIndexRef = useRef(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const scrollToSection = (index) => {
        const sectionId = sectionIds[index];
        const sectionElements = document.querySelectorAll('.section');
        const viewportWidth = window.innerWidth;

        // Validate index bounds
        if (index < 0 || index >= sectionElements.length) {
            console.warn(`Invalid section index: ${index}`);
            return;
        }

        // Get the ScrollTrigger instance
        const st = ScrollTrigger.getById('horizontalScroll');
        if (!st) {
            console.warn('ScrollTrigger with id "horizontalScroll" not found');
            return;
        }

        // Calculate the target horizontal offset for this section
        const targetHorizontalOffset = index * viewportWidth;

        // Calculate total scrollable horizontal distance
        const totalHorizontalWidth = sectionElements.length * viewportWidth;
        const maxHorizontalOffset = totalHorizontalWidth - viewportWidth;

        // Clamp the horizontal offset to prevent overshooting
        const clampedHorizontalOffset = Math.min(Math.max(targetHorizontalOffset, 0), maxHorizontalOffset);

        // Calculate the progress (0 to 1) based on horizontal position
        const horizontalProgress = maxHorizontalOffset > 0 ? clampedHorizontalOffset / maxHorizontalOffset : 0;

        // Map this progress to the vertical scroll range of the ScrollTrigger
        const scrollTriggerRange = st.end - st.start;
        const targetVerticalScrollPosition = st.start + (horizontalProgress * scrollTriggerRange);

        // Temporarily disable ScrollTrigger updates to prevent conflicts during animation
        const originalOnUpdate = st.onUpdate;
        st.onUpdate = null;

        // Animate the vertical scroll position
        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: targetVerticalScrollPosition,
                autoKill: false
            },
            ease: "power2.out",
            onComplete: () => {
                // Re-enable ScrollTrigger updates
                st.onUpdate = originalOnUpdate;

                st.refresh();

                history.replaceState(null, null, `#${sectionId}`);
                const hashChangeEvent = new CustomEvent('hashchange:manual', {
                    detail: { sectionIndex: index }
                });
                window.dispatchEvent(hashChangeEvent);
            }
        });
    };

    useEffect(() => {
        const sections = document.querySelector('.horizontal-sections');
        const sectionElements = document.querySelectorAll('.section');

        const viewportWidth = window.innerWidth;
        sectionElements.forEach(section => {
            section.style.width = `${viewportWidth}px`;
            section.style.minWidth = `${viewportWidth}px`;
            section.style.maxWidth = `${viewportWidth}px`;
            section.style.padding = '0';
        });

        const totalWidth = sectionElements.length * viewportWidth;
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
                    const sectionElements = document.querySelectorAll('.section');
                    const viewportWidth = window.innerWidth;
                    const lastActive = lastActiveIndexRef.current;
                    const activateThreshold = 0.85;
                    const keepThreshold = 0.5;

                    // Use getBoundingClientRect for robust detection
                    const visibleSections = Array.from(sectionElements).map((section, i) => {
                        const rect = section.getBoundingClientRect();
                        const visibleStart = Math.max(rect.left, 0);
                        const visibleEnd = Math.min(rect.right, viewportWidth);
                        const visibleWidth = Math.max(0, visibleEnd - visibleStart);
                        const visibleRatio = visibleWidth / viewportWidth;
                        return { i, visibleWidth, visibleRatio };
                    });

                    // 1. If any section (other than current) is >= 85% visible and actually visible, activate it
                    let activeIndex = lastActive;
                    visibleSections.forEach(({ i, visibleWidth, visibleRatio }) => {
                        if (visibleWidth > 0 && i !== lastActive && visibleRatio >= activateThreshold) {
                            activeIndex = i;
                        }
                    });
                    // 2. Otherwise, if current section is still >= 50% visible and actually visible, keep it
                    const lastSection = visibleSections[lastActive];
                    if (lastSection && lastSection.visibleWidth > 0 && lastSection.visibleRatio >= keepThreshold) {
                        activeIndex = lastActive;
                    } else {
                        // 3. If neither, fall back to the section with the largest visible area above 50% and actually visible
                        let fallbackIndex = lastActive;
                        let fallbackMax = 0;
                        visibleSections.forEach(({ i, visibleWidth, visibleRatio }) => {
                            if (visibleWidth > 0 && visibleRatio > fallbackMax && visibleRatio >= keepThreshold) {
                                fallbackMax = visibleRatio;
                                fallbackIndex = i;
                            }
                        });
                        activeIndex = fallbackIndex;
                    }
                    activeIndex = Math.max(0, Math.min(activeIndex, sectionElements.length - 1));
                    lastActiveIndexRef.current = activeIndex;

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
