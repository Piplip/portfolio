import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLinkedinIn,
    faGithub,
    faTwitter,
    faDribbble,
    faInstagram, faFacebook
} from '@fortawesome/free-brands-svg-icons';
import {
    faEnvelope,
    faArrowUp,
    faCode,
    faLaptopCode,
    faCopyright
} from '@fortawesome/free-solid-svg-icons';
import '../styles/footer.scss';

const Footer = ({ scrollToSection, sectionIds = ['hero-section', 'projects-section', 'about-section', 'skills-section', 'contact-section'] }) => {
    const currentYear = new Date().getFullYear();
    const footerRef = useRef(null);

    const handleNavClick = (e, sectionId) => {
        e.preventDefault();
        const index = sectionIds.indexOf(sectionId);
        if (index !== -1 && scrollToSection) {
            scrollToSection(index);
            window.location.hash = sectionId;
        }
    };

    // Scroll to top function
    const scrollToTop = (e) => {
        e.preventDefault();
        if (scrollToSection) {
            scrollToSection(0); // Scroll to first section
            window.location.hash = sectionIds[0];
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Add button animation
        gsap.to(e.currentTarget, {
            rotate: '360deg',
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => {
                gsap.set(e.currentTarget, { rotation: 0 });
            }
        });
    };

    return (
        <footer className="footer" ref={footerRef}>
            {/* Back to Top Button */}
            <div className="back-to-top">
                <button onClick={scrollToTop} aria-label="Back to top">
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
            </div>

            <div className="footer-container">
                <div className="footer-content">
                    {/* Logo/Brand Column */}
                    <div className="footer-column">
                        <div className="footer-logo">
                            <a
                                href="#hero-section"
                                onClick={(e) => handleNavClick(e, 'hero-section')}
                            >
                                Du's <span>Portfolio</span>
                            </a>
                        </div>
                        <p className="footer-description">
                            Building end-to-end solutions to complex digital challenges, employing a comprehensive understanding of front-end and back-end development.
                        </p>

                        {/* Social Media Icons */}
                        <div className="footer-social">
                            <a href="https://github.com/Piplip" className="social-icon" aria-label="GitHub" target={'_blank'}>
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                            <a href="https://www.linkedin.com/in/khanh-du-nguyen-1b1106282/" className="social-icon" aria-label="LinkedIn" target={'_blank'}>
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </a>
                            <a href="https://x.com/NishaYua64898" className="social-icon" aria-label="Twitter" target={'_blank'}>
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href="https://www.facebook.com/thihongluyen.pham.1" className="social-icon" aria-label="Dribbble" target={'_blank'}>
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div className="footer-column">
                        <h3>Quick Links</h3>
                        <ul className="footer-links">
                            <li>
                                <a
                                    href="#hero-section"
                                    onClick={(e) => handleNavClick(e, 'hero-section')}
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#projects-section"
                                    onClick={(e) => handleNavClick(e, 'projects-section')}
                                >
                                    Projects
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#about-section"
                                    onClick={(e) => handleNavClick(e, 'about-section')}
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#skills-section"
                                    onClick={(e) => handleNavClick(e, 'skills-section')}
                                >
                                    Skills
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contact-section"
                                    onClick={(e) => handleNavClick(e, 'contact-section')}
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>Get In Touch</h3>
                        <p className="contact-info">Have a project in mind? Let's work together to create something amazing.</p>
                        <div className="contact-buttons">
                            <button
                                className="contact-button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (scrollToSection) {
                                        scrollToSection(sectionIds.indexOf('contact-section'));
                                        window.location.hash = 'contact-section';
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span>Contact Me</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div className="copyright">
                    <FontAwesomeIcon icon={faCopyright} />
                    <p>{currentYear} Nguyen Khanh Du. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
