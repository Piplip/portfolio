import React, {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {gsap} from 'gsap';
import '../styles/projects.scss';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Stack} from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const ProjectsSection = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const projectsRef = useRef(null);
    const projectsGridRef = useRef(null);

    const projects = [
        {
            id: 1,
            title: 'Event Management System',
            year: '2025',
            description: 'An event management platform with AI-powered features, real-time analytics, and secure payment processing.',
            images: [
                "https://i.ibb.co/4nqtzstV/tixery-9.png",
                "https://i.ibb.co/k6rkcf4m/tixery-1.png",
                "https://i.ibb.co/cKKvLM8y/tixery-2.png",
                "https://i.ibb.co/pjPh8PK7/tixery-3.png",
                "https://i.ibb.co/PGbYXhLz/tixery-4.png",
                "https://i.ibb.co/YFQ5cPD4/tixery-5.png",
                "https://i.ibb.co/5X6rhxH9/tixery-6.png",
                "https://i.ibb.co/8g3Wytcd/tixery-7.png",
                "https://i.ibb.co/xqtQ0Rzj/tixery-8.png",
                "https://i.ibb.co/c98SPkz/tixery-10.png",
                "https://i.ibb.co/84tfZr74/tixery-11.png",
                "https://i.ibb.co/vChWKgKZ/tixery-12.png",
                "https://i.ibb.co/PGvdNjbJ/tixery-13.png",
                "https://i.ibb.co/JRSK9rwV/tixery-14.png",
                "https://i.ibb.co/YFfdrf83/tixery-15.png",
                "https://i.ibb.co/ksmMB1FK/tixery-16.png",
                "https://i.ibb.co/pr3XGCWR/tixery-17.png",
                "https://i.ibb.co/2JHSqVH/tixery-18.png",
                "https://i.ibb.co/4Rhb4pF8/tixery-19.png",
                "https://i.ibb.co/SD1gH268/tixery-20.png",
                "https://i.ibb.co/bgv8QQtq/tixery-21.png",
                "https://i.ibb.co/svShdR1s/tixery-22.png",
                "https://i.ibb.co/Cpn8YG8q/tixery-23.png",
                "https://i.ibb.co/YBxhZKjk/tixery-24.png",
                "https://i.ibb.co/NnG4fF9L/tixery-25.png",
                "https://i.ibb.co/fG4zG3N0/tixery-26.png",
                "https://i.ibb.co/VpjK8pNK/tixery-27.png",
                "https://i.ibb.co/RT3Zpr7c/tixery-28.png",
                "https://i.ibb.co/Gf81n7Fw/tixery-29.png",
                "https://i.ibb.co/Rkt3SZ47/tixery-30.png",
                "https://i.ibb.co/v4xwPtBw/tixery-32.png",
                "https://i.ibb.co/N6rQh5Ty/tixery-33.png"
            ],
            techStack: ['React', 'Spring Boot', 'MySQL', 'PostgreSQL', 'Redis', 'Spring Cloud', 'Google Cloud', 'i18n', 'jOOQ', 'Spring Security', 'Prometheus', 'ELK-stack', 'Grafana', 'Stripe', 'Google Pay', 'Google Analytics', 'Firebase', 'JWT', 'Leaflet', 'Gemini', 'Python', 'Flask', 'Material UI'],
            features: [
                'User authentication and authorization (Oauth2)',
                'Monitored and managed server infrastructure',
                'AI integration in various features in the system',
                'Microservices architecture with Spring Cloud for scalability',
                'AI-powered event recommendations using Neural Collaborative Filtering',
                'Secure payment processing with Stripe and Google Pay integration',
                'Multi-language support with i18n integration',
            ],
            longDescription: 'An event management platform built with a microservices architecture, it ensures availability and scalability. The system incorporates AI for personalized recommendations, real-time analytics for event insights, and secure payment processing. Features include event management tools, attendee tracking, etc.',
            liveUrl: '#',
            codeUrl: '#'
        },
        {
            id: 2,
            title: 'Healthcare Appointment System',
            year: '2024',
            description: 'A healthcare management platform with AI integration and  real-time scheduling.',
            images: [
                "https://i.ibb.co/1JGV4CJT/medicare-8.jpg",
                "https://i.ibb.co/w327nLz/medicare-1.jpg",
                "https://i.ibb.co/S4gnfHWB/medicare-2.jpg",
                "https://i.ibb.co/LDbzGNZS/medicare-3.jpg",
                "https://i.ibb.co/qLwf5gps/medicare-4.jpg",
                "https://i.ibb.co/GQvhmpLL/medicare-5.jpg",
                "https://i.ibb.co/zVYR5tWz/medicare-6.jpg",
                "https://i.ibb.co/1YGn6MCf/medicare-7.jpg",
                "https://i.ibb.co/tpYPnFbV/medicare-9.jpg",
                "https://i.ibb.co/yFJjsQDH/medicare-10.jpg",
                "https://i.ibb.co/wrstry8f/medicare-11.jpg"
            ],
            techStack: ['React', 'Spring Boot', 'MySQL', 'Redis', 'jOOQ', 'Spring Security', 'Firebase', 'JWT', 'OCR', 'VNPay', 'OpenAI', 'Material UI'],
            features: [
                'Real-time appointment scheduling',
                'AI-powered chatbot for patient queries using OpenAI',
                'Secure appointment with OCR integration',
                'Real-time payment processing with VNPay integration',
                'Multi-language support with medical terminology',
            ],
            longDescription: 'A healthcare management system designed to streamline medical appointments and patient care. The platform features an intelligent scheduling system and AI-powered patient support.',
            liveUrl: '#',
            codeUrl: '#'
        },
        {
            id: 3,
            title: 'Weather Intelligence Platform',
            year: '2024',
            description: 'A weather forecasting system with personalized activity recommendations.',
            images: [
                "https://i.ibb.co/VcPH1cxw/yeon-1.jpg",
                "https://i.ibb.co/G4cdsxDt/yeon-2.jpg",
                "https://i.ibb.co/zVJRSkt5/yeon-3.jpg"
            ],
            techStack: ['Spring Boot', 'MySQL', 'React', 'React Bootstrap', 'OpenWeather API', 'Redis'],
            features: [
                'Real-time weather forecasting',
                'Personalized activity recommendations based on weather conditions',
                'Severe weather alerts and notifications',
                'Interactive weather maps and visualizations',
                'Multi-language support',
            ],
            longDescription: 'A weather platform that provides accurate forecasts and personalized recommendations. The system offering users tailored activity suggestions. It features real-time alerts and interactive visualizations, making it a comprehensive solution for weather information and planning.',
            liveUrl: '#',
            codeUrl: '#'
        },
        {
            id: 4,
            title: "PromptSmith",
            year: '2025',
            description: 'A Prompt Enhancer Website support various type from casual text prompt to image, video or audio prompt to various model',
            images: [
                "https://i.ibb.co/xSsNk4Rc/promptsmith1.png",
                "https://i.ibb.co/q3vSQmcY/promptsmith2.png"
            ],
            techStack: ['JavaScript', 'Gemini API', 'React', 'Material UI', 'i18n'],
            features: [
                'Advanced Prompt Enhancement: Utilizes AI to refine and optimize prompts for various modalities, including text, image, video, and audio.',
                'Model-Specific Optimization: Tailors and adapts prompts to maximize performance and output quality across a wide range of AI models.',
                'Multilingual Support'
            ],
            longDescription: 'PromptSmith is an AI-powered web application engineered to enhance the quality and efficacy of prompts for a diverse array of artificial intelligence models. The platform leverages the Gemini API to perform deep linguistic and contextual analysis to improve the output of generative models.',
            liveUrl: 'https://promptsmith-lake.vercel.app',
            codeUrl: '#'
        },
        {
            id: 5,
            title: "EngType",
            year: '2025',
            description: 'A typing practice website that combines typing exercises with learning English.',
            images: [
                "https://i.ibb.co/Nn9vfXWd/engtype1.png",
                "https://i.ibb.co/1G2F4jW4/engtype2.png",
                "https://i.ibb.co/fz6TdsFC/engtype3.png",
                "https://i.ibb.co/PsJT71pz/engtype4.png"
            ],
            techStack: ['JavaScript', 'Gemini API', 'React', 'Material UI'],
            features: [
                'Real-time Performance Metrics: Get instant feedback on your typing speed (WPM) and accuracy.',
                'Adaptive Difficulty: The system adjusts the text complexity based on your performance, providing a personalized learning experience.',
                'Customizable Practice Sessions: Choose specific topics or grammar points to focus on while you type.',
                'User-friendly Interface: A clean and simple design built with Material UI for a seamless experience.'
            ],
            longDescription: 'EngType is an web application designed to make typing practice more meaningful and effective. It combines traditional typing exercises with English language learning, using the Gemini API to generate context-aware content. The platform provides a dynamic learning environment where users can simultaneously improve their typing speed and accuracy while also expanding their English vocabulary and grammar skills.',
            liveUrl: 'https://engtype.vercel.app',
            codeUrl: '#'
        }
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setCurrentImageIndex(0);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    const handleNextImage = () => {
        if (selectedProject) {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedProject.images.length);
        }
    };

    const handlePrevImage = () => {
        if (selectedProject) {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedProject.images.length) % selectedProject.images.length);
        }
    };

    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index);
    };

    const imageVariants = {
        hidden: {opacity: 0, scale: 1.05},
        visible: {opacity: 1, scale: 1, transition: {duration: 0.3, ease: 'easeIn'}},
        exit: {opacity: 0, scale: 0.95, transition: {duration: 0.2, ease: 'easeOut'}}
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (projectsGridRef.current) {
                const projectCards = projectsGridRef.current.querySelectorAll('.project-card');
                gsap.fromTo(
                    projectCards,
                    {opacity: 0, y: 30},
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'power2.out',
                        delay: 0.3
                    }
                );
            }
        }, projectsRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        return () => {
            document.body.style.overflow = 'auto';
            const horizontalContainer = document.querySelector('.horizontal-scroll-container');
            if (horizontalContainer) {
                horizontalContainer.style.pointerEvents = 'auto';
            }
        };
    }, []);

    const titleVariants = {
        hidden: {opacity: 0, y: 30},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.6, ease: "easeOut"}
        }
    };

    return (
        <div className="projects-container horizontal-projects" ref={projectsRef}>
            <div className="projects-header">
                <motion.h2 variants={titleVariants}>My Projects</motion.h2>
            </div>

            <div className="projects-carousel" ref={projectsGridRef}>
                {filteredProjects.map((project) => (
                    <motion.div
                        key={project.id}
                        className="project-card"
                        onClick={() => handleProjectClick(project)}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.3}}
                        layout
                    >
                        <div className="project-image">
                            <img src={project.images[0]} alt={project.title}/>
                            <div className="project-overlay">
                                <span>View Details</span>
                            </div>
                        </div>
                        <div className="project-info">
                            <div className="project-header">
                                <h3>{project.title}</h3>
                                <span className="project-year">{project.year}</span>
                            </div>
                            <p>{project.description}</p>
                            <div className="tech-stack">
                                {project.techStack.slice(0, 3).map((tech, index) => (
                                    <span key={index} className="tech-tag">{tech}</span>
                                ))}
                                {project.techStack.length > 3 && (
                                    <span className="tech-tag more">+{project.techStack.length - 3} more</span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <Dialog
                open={selectedProject !== null}
                onClose={handleCloseModal}
                maxWidth="lg"
                PaperProps={{
                    className: 'project-modal-paper'
                }}
            >
                {selectedProject && (
                    <div className="modal-content-wrapper">
                        <DialogTitle sx={{m: 0, p: 2, pr: 8, fontSize: 18}}>
                            <Stack direction={'row'} columnGap={1} alignItems={'center'}>
                                <b>{selectedProject.title}</b>
                                {selectedProject.liveUrl !== '#' &&
                                    <a href={selectedProject.liveUrl}>
                                        <OpenInNewIcon sx={{color: 'blue'}}/>
                                    </a>
                                }
                            </Stack>
                            <IconButton
                                aria-label="close"
                                onClick={handleCloseModal}
                                className="modal-close"
                                sx={{
                                    position: 'absolute',
                                    right: 12,
                                    top: 12,
                                    color: (theme) => theme.palette.grey[600],
                                }}
                            >
                                <CloseIcon/>
                            </IconButton>
                        </DialogTitle>
                        <DialogContent dividers className="modal-scroll-container">
                            <div className="modal-body">
                                <div className="modal-image">
                                    <div className="image-gallery">
                                        <div className="gallery-main-image">
                                            <AnimatePresence mode="wait">
                                                <motion.img
                                                    key={currentImageIndex}
                                                    src={selectedProject.images[currentImageIndex]}
                                                    alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                                                    variants={imageVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                />
                                            </AnimatePresence>
                                            <div className="gallery-nav prev">
                                                <IconButton onClick={handlePrevImage} size="small">
                                                    <ChevronLeftIcon fontSize="large"/>
                                                </IconButton>
                                            </div>
                                            <div className="gallery-nav next">
                                                <IconButton onClick={handleNextImage} size="small">
                                                    <ChevronRightIcon fontSize="large"/>
                                                </IconButton>
                                            </div>
                                        </div>
                                        {selectedProject.images.length > 1 && (
                                            <div className="gallery-thumbnails">
                                                {selectedProject.images.map((imgSrc, index) => (
                                                    <div
                                                        key={index}
                                                        className={`thumbnail-item ${index === currentImageIndex ? 'active' : ''}`}
                                                        onClick={() => handleThumbnailClick(index)}
                                                    >
                                                        <img src={imgSrc} alt={`Thumbnail ${index + 1}`}/>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h4 style={{
                                        fontSize: '1.8rem',
                                        marginTop: 0,
                                        marginBottom: '1.5rem',
                                        color: '#444'
                                    }}>Overview</h4>
                                    <p style={{
                                        fontSize: '1.5rem',
                                        lineHeight: 1.6,
                                        color: '#666',
                                        marginBottom: '2.5rem'
                                    }}>{selectedProject.longDescription}</p>

                                    <h4 style={{
                                        fontSize: '1.8rem',
                                        marginBottom: '1.5rem',
                                        color: '#444'
                                    }}>Key Features</h4>
                                    <ul style={{
                                        listStyle: 'none',
                                        padding: 0,
                                        margin: '0 0 2.5rem 0'
                                    }}>
                                        {selectedProject.features.map((feature, index) => (
                                            <li key={index} style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                marginBottom: '1rem',
                                                fontSize: '1.4rem',
                                                color: '#555'
                                            }}>
                                                <span style={{
                                                    display: 'inline-block',
                                                    marginRight: '1rem',
                                                    color: '#e63946',
                                                    fontWeight: 'bold'
                                                }}>→</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <h4 style={{
                                        fontSize: '1.8rem',
                                        marginBottom: '1.5rem',
                                        color: '#444'
                                    }}>Technology Stack</h4>
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '1rem'
                                    }}>
                                        {selectedProject.techStack.map((tech, index) => (
                                            <span key={index} style={{
                                                fontSize: '1.2rem',
                                                padding: '0.4rem 1.2rem',
                                                backgroundColor: '#f5f5f5',
                                                color: '#555',
                                                borderRadius: '30px',
                                                fontWeight: 500,
                                                display: 'inline-block',
                                                margin: '0.3rem'
                                            }}>{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </div>
                )}
            </Dialog>
        </div>
    );
};

export default ProjectsSection;
