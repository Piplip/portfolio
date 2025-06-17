import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import '../styles/hero.scss';

const HeroSection = ({ scrollToSection }) => {
    const highlightRef = useRef(null);
    const container = useRef(null);

    const scrollToNextSection = () => {
        scrollToSection(1);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (highlightRef.current) {
                highlightRef.current.classList.add('animated');
            }
        }, 500);

        const codeElements = document.querySelectorAll('.code-element');
        codeElements.forEach(el => {
            gsap.to(el, {
                y: 'random(-20, 20)',
                x: 'random(-10, 10)',
                rotate: 'random(-5, 5)',
                duration: 'random(3, 6)',
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        });

        return () => clearTimeout(timer);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const buttonVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        },
        hover: {
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeInOut" }
        },
        tap: { scale: 0.95 }
    };

    return (
        <motion.div
            className="hero-container"
            ref={container}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="code-element">{"<h1>Hello World</h1>"}</div>
            <div className="code-element">{"const fullStack = { frontend: 'React', backend: 'Spring Boot' };"}</div>
            <div className="code-element">{"async function buildSolutions() {...}"}</div>

            <motion.h1 variants={itemVariants}>
                Hi, I'm <span className="highlight" ref={highlightRef}>Nguyen Khanh Du</span>
            </motion.h1>

            <motion.h2 variants={itemVariants}>
                Full-stack Developer
            </motion.h2>

            <motion.p variants={itemVariants}>
                Crafting scalable web applications with expertise in both frontend and backend development.
                Specializing in modern JavaScript frameworks, RESTful APIs, and cloud solutions.
            </motion.p>

            <motion.div className="hero-cta" variants={itemVariants}>
                <motion.button
                    className="btn primary"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => scrollToSection(3)}
                >
                    View My Work
                </motion.button>

                <motion.button
                    className="btn secondary"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => scrollToSection(4)}
                >
                    Contact Me
                </motion.button>
            </motion.div>

            <motion.div
                className="scroll-down"
                onClick={scrollToNextSection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
            >
                <div className="scroll-text">SCROLL DOWN</div>
                <div className="scroll-icon"></div>
            </motion.div>
        </motion.div>
    );
};

export default HeroSection;