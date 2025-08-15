import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import '../styles/projects.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faCode } from '@fortawesome/free-solid-svg-icons';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
            description: 'A comprehensive event management platform with AI-powered features, real-time analytics, and secure payment processing.',
            images: [
                "https://i.ibb.co/k6rkcf4m/tixery-1.png",
                "https://i.ibb.co/cKKvLM8y/tixery-2.png",
                "https://i.ibb.co/pjPh8PK7/tixery-3.png",
                "https://i.ibb.co/PGbYXhLz/tixery-4.png",
                "https://i.ibb.co/YFQ5cPD4/tixery-5.png",
                "https://i.ibb.co/5X6rhxH9/tixery-6.png",
                "https://i.ibb.co/8g3Wytcd/tixery-7.png",
                "https://i.ibb.co/xqtQ0Rzj/tixery-8.png",
                "https://i.ibb.co/4nqtzstV/tixery-9.png",
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
            techStack: ['React', 'Spring Boot', 'MySQL', 'PostgreSQL', 'Redis', 'Spring Cloud', 'Google Cloud', 'jOOQ', 'Spring Security', 'Prometheus', 'ELK-stack', 'Grafana', 'Stripe', 'Google Pay', 'Google Analytics', 'Firebase', 'JWT', 'Leaflet', 'Gemini', 'Stability AI', 'Python', 'Flask', 'Material UI'],
            features: [
                'User authentication and authorization (Oauth2)',
                'Monitored and managed server infrastructure',
                'AI integration in various features in the system',
                'Microservices architecture with Spring Cloud for high scalability',
                'AI-powered event recommendations using Neural Collaborative Filtering',
                'Secure payment processing with Stripe and Google Pay integration',
                'Multi-language support with i18n integration',
            ],
            longDescription: 'A sophisticated event management platform that revolutionizes how events are organized and attended. Built with a microservices architecture, it ensures high availability and scalability. The system incorporates AI for personalized recommendations, real-time analytics for event insights, and secure payment processing. Features include comprehensive event management tools, attendee tracking, and a robust notification system.',
            liveUrl: '#',
            codeUrl: '#'
        },
        {
            id: 2,
            title: 'Healthcare Appointment System',
            year: '2024',
            description: 'An intelligent healthcare management platform with AI integration, real-time scheduling, and secure patient data handling.',
            images: [
                "https://i.ibb.co/w327nLz/medicare-1.jpg",
                "https://i.ibb.co/S4gnfHWB/medicare-2.jpg",
                "https://i.ibb.co/LDbzGNZS/medicare-3.jpg",
                "https://i.ibb.co/qLwf5gps/medicare-4.jpg",
                "https://i.ibb.co/GQvhmpLL/medicare-5.jpg",
                "https://i.ibb.co/zVYR5tWz/medicare-6.jpg",
                "https://i.ibb.co/1YGn6MCf/medicare-7.jpg",
                "https://i.ibb.co/1JGV4CJT/medicare-8.jpg",
                "https://i.ibb.co/tpYPnFbV/medicare-9.jpg",
                "https://i.ibb.co/yFJjsQDH/medicare-10.jpg",
                "https://i.ibb.co/wrstry8f/medicare-11.jpg"
            ],
            techStack: ['React', 'Spring Boot', 'MySQL', 'Redis', 'jOOQ', 'Spring Security', 'Firebase', 'JWT', 'OCR', 'VNPay', 'OpenAI', 'Material UI'],
            features: [
                'Smart appointment scheduling with conflict detection',
                'AI-powered chatbot for patient queries using OpenAI',
                'Secure appointment with OCR integration',
                'Real-time payment processing with VNPay integration',
                'Automated appointment reminders and follow-ups',
                'Multi-language support with medical terminology',
            ],
            longDescription: 'A comprehensive healthcare management system designed to streamline medical appointments and patient care. The platform features an intelligent scheduling system, AI-powered patient support, and secure handling of medical records. It includes OCR technology for prescription management, real-time payment processing, and a robust notification system for appointment management.',
            liveUrl: '#',
            codeUrl: '#'
        },
        {
            id: 3,
            title: 'Weather Intelligence Platform',
            year: '2024',
            description: 'A sophisticated weather forecasting system with AI-powered predictions and personalized activity recommendations.',
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
                'Historical weather data analysis and trends',
                'Interactive weather maps and visualizations',
                'Multi-language support with weather terminology',
                'API integration with major weather data providers'
            ],
            longDescription: 'An advanced weather intelligence platform that provides accurate forecasts and personalized recommendations. The system uses AI to analyze weather patterns and predict conditions, offering users tailored activity suggestions. It features real-time alerts, historical data analysis, and interactive visualizations, making it a comprehensive solution for weather information and planning.',
            liveUrl: '#',
            codeUrl: '#'
        }
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setCurrentImageIndex(0); // Reset index when opening a new project
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
        hidden: { opacity: 0, scale: 1.05 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeIn' } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: 'easeOut' } }
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

    // Cleanup on unmount
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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <div className="projects-container horizontal-projects" ref={projectsRef}>
            <div className="projects-header">
                <motion.h2 variants={titleVariants}>My Projects</motion.h2>
                <p className="section-description">
                    Browse through my recent work. Projects automatically reveal as you scroll horizontally through the
                    portfolio.
                </p>
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
                        <DialogTitle sx={{ m: 0, p: 2, pr: 8, fontSize: 18}}>
                            {selectedProject.title}
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
                                <CloseIcon />
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
                                                    <ChevronLeftIcon fontSize="large" />
                                                </IconButton>
                                            </div>
                                            <div className="gallery-nav next">
                                                <IconButton onClick={handleNextImage} size="small">
                                                    <ChevronRightIcon fontSize="large" />
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
                                                        <img src={imgSrc} alt={`Thumbnail ${index + 1}`} />
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
                                        marginBottom: '1.5rem', // Increased margin
                                        color: '#444'
                                    }}>Overview</h4>
                                    <p style={{
                                        fontSize: '1.5rem',
                                        lineHeight: 1.6,
                                        color: '#666',
                                        marginBottom: '2.5rem' // Increased margin
                                    }}>{selectedProject.longDescription}</p>

                                    <h4 style={{
                                        fontSize: '1.8rem',
                                        marginBottom: '1.5rem', // Increased margin
                                        color: '#444'
                                    }}>Key Features</h4>
                                    <ul style={{
                                        listStyle: 'none',
                                        padding: 0,
                                        margin: '0 0 2.5rem 0' // Increased margin
                                    }}>
                                        {selectedProject.features.map((feature, index) => (
                                            <li key={index} style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                marginBottom: '1rem', // Increased margin
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
                                        marginBottom: '1.5rem', // Increased margin
                                        color: '#444'
                                    }}>Technology Stack</h4>
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '1rem' // Increased gap
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
                                                margin: '0.3rem' // Increased margin
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
