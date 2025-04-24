
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import '../styles/contact.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {
    faEnvelope,
    faPhone,
    faMapMarkerAlt,
    faPaperPlane,
    faCheck,
    faExclamationCircle,
    faSpinner
} from '@fortawesome/free-solid-svg-icons';
import {
    faGithub,
    faLinkedinIn,
    faTwitter,
    faDribbble
} from '@fortawesome/free-brands-svg-icons';

const ContactSection = () => {
    // Form state
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // Form submission state
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
    const [errors, setErrors] = useState({});

    // Refs for animations
    const formRef = useRef(null);
    const infoRef = useRef(null);
    const sectionRef = useRef(null);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });

        // Clear error when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    // Validate form fields
    const validateForm = () => {
        const newErrors = {};

        if (!formState.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formState.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formState.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formState.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            // Shake form on error
            gsap.to(formRef.current, {
                x: [-10, 10, -10, 10, 0],
                duration: 0.4,
                ease: "power2.inOut"
            });
            return;
        }

        setSubmitting(true);

        try {
            // Simulate form submission with a delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Successful submission
            setSubmitStatus('success');

            // Reset form after success
            setTimeout(() => {
                setFormState({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
                setSubmitStatus(null);
            }, 3000);

        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');

            // Clear error state after a delay
            setTimeout(() => {
                setSubmitStatus(null);
            }, 3000);
        } finally {
            setSubmitting(false);
        }
    };

    // Animation settings
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    // Set up animations
    useEffect(() => {
        // Initialize animations only if the section is in viewport
        if (infoRef.current && sectionRef.current) {
            gsap.set(".contact-info-item", { y: 20, opacity: 0 });

            // Creating a context for scoping animations
            const ctx = gsap.context(() => {
                gsap.to(".contact-info-item", {
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: infoRef.current,
                        start: "left 80%", // Changed from "top 80%" to work with horizontal scrolling
                        containerAnimation: ScrollTrigger.getById("horizontalScroll"),
                        toggleActions: "play none none none"
                    }
                });

                // Animate social icons
                gsap.to(".social-icon", {
                    scale: 1,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.5,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: ".contact-social",
                        start: "left 85%", // Changed for horizontal scroll
                        containerAnimation: ScrollTrigger.getById("horizontalScroll"),
                        toggleActions: "play none none none"
                    }
                });
            });

            // Cleanup animation context
            return () => ctx.revert();
        }
    }, []);

    return (
        <div className="contact-container" ref={sectionRef}>
            <div className="contact-header">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Get In Touch
                </motion.h2>

                <motion.p
                    className="section-description"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Have a project in mind or want to collaborate? Feel free to reach out through any of these channels or use the contact form below.
                </motion.p>
            </div>

            <div className="contact-content horizontal">
                {/* Contact Info Section */}
                <motion.div
                    className="contact-info"
                    ref={infoRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className="contact-info-item" variants={itemVariants}>
                        <div className="icon-wrapper">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                        <div className="info-content">
                            <h3>Email</h3>
                            <p><a href="mailto:hello@yourportfolio.com">hello@yourportfolio.com</a></p>
                        </div>
                    </motion.div>

                    <motion.div className="contact-info-item" variants={itemVariants}>
                        <div className="icon-wrapper">
                            <FontAwesomeIcon icon={faPhone} />
                        </div>
                        <div className="info-content">
                            <h3>Phone</h3>
                            <p><a href="tel:+1234567890">+1 (234) 567-890</a></p>
                        </div>
                    </motion.div>

                    <motion.div className="contact-info-item" variants={itemVariants}>
                        <div className="icon-wrapper">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                        </div>
                        <div className="info-content">
                            <h3>Location</h3>
                            <p>San Francisco, CA</p>
                        </div>
                    </motion.div>

                    <motion.div className="contact-social" variants={itemVariants}>
                        <h3>Connect</h3>
                        <div className="social-icons">
                            <a href="#" className="social-icon" aria-label="GitHub">
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                            <a href="#" className="social-icon" aria-label="LinkedIn">
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </a>
                            <a href="#" className="social-icon" aria-label="Twitter">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href="#" className="social-icon" aria-label="Dribbble">
                                <FontAwesomeIcon icon={faDribbble} />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Contact Form Section */}
                <motion.div
                    className="contact-form-container"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.form
                        className="contact-form"
                        ref={formRef}
                        onSubmit={handleSubmit}
                        variants={itemVariants}
                    >
                        <h3>Send a Message</h3>

                        <div className="form-group-container">
                            <div className="form-group">
                                <div className={`form-control ${errors.name ? 'error' : ''}`}>
                                    <label htmlFor="name">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formState.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        disabled={submitting}
                                    />
                                    {errors.name && <span className="error-message">{errors.name}</span>}
                                </div>
                            </div>

                            <div className="form-group">
                                <div className={`form-control ${errors.email ? 'error' : ''}`}>
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        disabled={submitting}
                                    />
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </div>
                            </div>

                            <div className="form-group">
                                <div className={`form-control ${errors.subject ? 'error' : ''}`}>
                                    <label htmlFor="subject">Subject (Optional)</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formState.subject}
                                        onChange={handleChange}
                                        placeholder="Project Inquiry"
                                        disabled={submitting}
                                    />
                                    {errors.subject && <span className="error-message">{errors.subject}</span>}
                                </div>
                            </div>

                            <div className="form-group">
                                <div className={`form-control ${errors.message ? 'error' : ''}`}>
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        placeholder="I'd like to discuss a potential project..."
                                        rows="3"
                                        disabled={submitting}
                                    ></textarea>
                                    {errors.message && <span className="error-message">{errors.message}</span>}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`submit-button ${submitStatus ? submitStatus : ''}`}
                            disabled={submitting}
                        >
                            {submitting ? (
                                <>
                                    <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
                                    <span>Sending...</span>
                                </>
                            ) : submitStatus === 'success' ? (
                                <>
                                    <FontAwesomeIcon icon={faCheck} />
                                    <span>Message Sent!</span>
                                </>
                            ) : submitStatus === 'error' ? (
                                <>
                                    <FontAwesomeIcon icon={faExclamationCircle} />
                                    <span>Error. Try Again</span>
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                    <span>Send Message</span>
                                </>
                            )}
                        </button>

                        {/* Success/Error Message */}
                        {submitStatus && (
                            <motion.div
                                className={`form-status ${submitStatus}`}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {submitStatus === 'success' ? (
                                    <p>Thank you for your message! I'll get back to you shortly.</p>
                                ) : (
                                    <p>There was an error sending your message. Please try again later.</p>
                                )}
                            </motion.div>
                        )}
                    </motion.form>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactSection;