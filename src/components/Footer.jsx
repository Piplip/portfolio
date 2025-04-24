import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLinkedinIn,
    faGithub,
    faTwitter,
    faDribbble,
    faInstagram
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

    // Handle navigation click with the scrollToSection function
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
                                Port<span>folio</span>
                            </a>
                        </div>
                        <p className="footer-description">
                            Creating innovative digital experiences with modern web technologies and creative design solutions.
                        </p>

                        {/* Social Media Icons */}
                        <div className="footer-social">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" aria-label="Dribbble">
                                <FontAwesomeIcon icon={faDribbble} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FontAwesomeIcon icon={faInstagram} />
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

                    {/* Services Column */}
                    <div className="footer-column">
                        <h3>Services</h3>
                        <ul className="footer-services">
                            <li>
                                <FontAwesomeIcon icon={faCode} />
                                <span>Web Development</span>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faLaptopCode} />
                                <span>UI/UX Design</span>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faDribbble} />
                                <span>Branding</span>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faGithub} />
                                <span>Code Review</span>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="footer-column">
                        <h3>Get In Touch</h3>
                        <p className="contact-info">Have a project in mind? Let's work together to create something amazing.</p>
                        <a
                            href="#contact-section"
                            className="contact-button"
                            onClick={(e) => handleNavClick(e, 'contact-section')}
                        >
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span>Contact Me</span>
                        </a>
                        <p className="contact-email">
                            <a href="mailto:hello@yourportfolio.com">hello@yourportfolio.com</a>
                        </p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="copyright">
                        <FontAwesomeIcon icon={faCopyright} />
                        <p>{currentYear} Your Name. All rights reserved.</p>
                    </div>
                    <div className="footer-legal">
                        <a href="#">Privacy Policy</a>
                        <span className="divider">|</span>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;