import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import '../styles/contact.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
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
    faFacebook
} from '@fortawesome/free-brands-svg-icons';

const ContactSection = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [errors, setErrors] = useState({});

    const formRef = useRef(null);
    const infoRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        emailjs.init("2Gqr5J7TlBwYh7c12");
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            gsap.to(formRef.current, {
                x: [-10, 10, -10, 10, 0],
                duration: 0.4,
                ease: "power2.inOut"
            });
            return;
        }

        setSubmitting(true);

        try {
            const subject = formState.subject || 'New Contact Form Submission';
            const body = `Name: ${formState.name}%0D%0AEmail: ${formState.email}%0D%0A%0D%0AMessage:%0D%0A${formState.message}`;
            const mailtoLink = `mailto:dnguyenkhan457@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.open(mailtoLink, '_blank');

            setFormState({
                name: '',
                email: '',
                subject: '',
                message: ''
            });

        } catch (error) {
            console.error('Error:', error);
            setSubmitStatus('error');
        } finally {
            setSubmitting(false);
        }
    };

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

    useEffect(() => {
        if (infoRef.current && sectionRef.current) {
            gsap.set(".contact-info-item", { y: 20, opacity: 0 });

            const ctx = gsap.context(() => {
                gsap.to(".contact-info-item", {
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: infoRef.current,
                        start: "left 80%",
                        containerAnimation: ScrollTrigger.getById("horizontalScroll"),
                        toggleActions: "play none none none"
                    }
                });

                gsap.to(".social-icon", {
                    scale: 1,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.5,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: ".contact-social",
                        start: "left 85%",
                        containerAnimation: ScrollTrigger.getById("horizontalScroll"),
                        toggleActions: "play none none none"
                    }
                });
            });

            return () => ctx.revert();
        }
    }, []);

    return (
        <div className={'contact-wrapper'}>
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
                        Have a project in mind or want to collaborate? Feel free to reach out through any of these channels.
                    </motion.p>
                </div>

                <div className="contact-content horizontal">
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
                                <p><a href="mailto:hello@yourportfolio.com">dnguyenkhanh457@gmail.com</a></p>
                            </div>
                        </motion.div>

                        <motion.div className="contact-info-item" variants={itemVariants}>
                            <div className="icon-wrapper">
                                <FontAwesomeIcon icon={faPhone} />
                            </div>
                            <div className="info-content">
                                <h3>Phone</h3>
                                <p><a href="tel:+84852560070">+84 85 256 0070</a></p>
                            </div>
                        </motion.div>

                        <motion.div className="contact-info-item" variants={itemVariants}>
                            <div className="icon-wrapper">
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                            </div>
                            <div className="info-content">
                                <h3>Location</h3>
                                <p>Vinh Loi, Bac Lieu</p>
                            </div>
                        </motion.div>
                    </motion.div>
                    <motion.div className="contact-social" variants={itemVariants}>
                        <h3>Connect</h3>
                        <div className="social-icons">
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
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
