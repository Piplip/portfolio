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
    const sectionIds = ['hero-section', 'projects-section', 'about-section', 'skills-section', 'contact-section'];

    const scrollToSection = (index) => {
        const sections = document.querySelectorAll('.section');
        const sectionId = sectionIds[index];

        if (sections[index]) {
            const st = ScrollTrigger.getById('horizontalScroll');
            if (st) {
                const totalWidth = Array.from(sections)
                    .reduce((width, section) => width + section.offsetWidth, 0);

                let targetPosition = 0;
                for (let i = 0; i < index; i++) {
                    targetPosition += sections[i].offsetWidth;
                }

                const viewportWidth = window.innerWidth;
                const sectionWidth = sections[index].offsetWidth;
                const offset = (viewportWidth - sectionWidth - 500) / 3;

                const targetProgress = (targetPosition + offset) / (totalWidth - viewportWidth);

                const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
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
                    }
                });
            }
        }
    };

    useEffect(() => {
        const sections = document.querySelector('.horizontal-sections');
        const sectionElements = document.querySelectorAll('.section');

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

                    let activeIndex = 0;
                    let accumulatedWidth = 0;
                    const sectionWidth = window.innerWidth;

                    for (let i = 0; i < totalSections; i++) {
                        accumulatedWidth += sectionWidth;
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
                const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
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
            <Footer scrollToSection={scrollToSection} sectionIds={sectionIds}/>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
