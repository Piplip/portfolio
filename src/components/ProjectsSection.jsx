import React, {useState, useRef, useEffect} from 'react';
import {motion} from 'framer-motion';
import {gsap} from 'gsap';
import '../styles/projects.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExternalLinkAlt, faCode} from '@fortawesome/free-solid-svg-icons';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ProjectsSection = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);
    const projectsRef = useRef(null);
    const projectsGridRef = useRef(null);

    const projects = [
        {
            id: 1,
            title: 'Event Management System',
            year: '2025',
            description: 'A comprehensive event management platform with AI-powered features, real-time analytics, and secure payment processing.',
            image: 'https://res-console.cloudinary.com/dlajrlzzi/thumbnails/v1/image/upload/v1746015711/UGljdHVyZTFfcnk1aHp3/drilldown',
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
            image: 'https://res-console.cloudinary.com/dlajrlzzi/thumbnails/v1/image/upload/v1746018994/MjIyMl93Z3pkNTI=/drilldown',
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
            image: 'https://res-console.cloudinary.com/dlajrlzzi/thumbnails/v1/image/upload/v1746018805/UGljdHVyZTFfdWU3NHk4/drilldown',
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
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
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
                            <img src={project.image} alt={project.title}/>
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
                fullWidth
                PaperProps={{
                    style: {
                        borderRadius: '10px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                    }
                }}
            >
                {selectedProject && (
                    <>
                        <DialogTitle sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid #eee',
                            pb: 2,
                            mb: 2,
                            '& h3': {
                                fontSize: '2.2rem',
                                fontWeight: 700,
                                margin: 0
                            }
                        }}>
                            <h3>{selectedProject.title}</h3>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <span style={{
                                    fontSize: '1.4rem',
                                    color: '#777',
                                    background: '#f5f5f5',
                                    padding: '0.4rem 1rem',
                                    borderRadius: '30px',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {selectedProject.year}
                                </span>
                                <IconButton
                                    aria-label="close"
                                    onClick={handleCloseModal}
                                    edge="end"
                                    sx={{
                                        color: '#555',
                                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                        width: '40px',
                                        height: '40px',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.15)',
                                            transform: 'rotate(90deg)',
                                            transition: 'all 0.2s'
                                        }
                                    }}
                                >
                                    <CloseIcon/>
                                </IconButton>
                            </div>
                        </DialogTitle>
                        <DialogContent sx={{padding: '2rem 3rem 3rem'}}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '3.5rem',
                                marginBottom: '3rem',
                            }}>
                                <div style={{
                                    borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                                    overflow: 'hidden',
                                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                                }}>
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            maxHeight: '350px',
                                            objectFit: 'cover',
                                            display: 'block'
                                        }}
                                    />
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

                            <div style={{
                                display: 'flex',
                                gap: '2rem', // Increased gap
                                marginTop: '2rem', // Added top margin
                                paddingTop: '2rem', // Increased padding
                                borderTop: '1px solid #eee'
                            }}>
                                <a
                                    href={selectedProject.liveUrl}
                                    style={{
                                        backgroundColor: '#e63946',
                                        color: 'white',
                                        padding: '1.2rem 1.8rem', // Increased padding
                                        borderRadius: '8px',
                                        fontSize: '1.5rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        textDecoration: 'none',
                                        border: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '1rem', // Increased gap
                                        lineHeight: 1.2,
                                        flex: 1
                                    }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FontAwesomeIcon icon={faCode}/> View Front-end Code
                                </a>
                                <a
                                    href={selectedProject.codeUrl}
                                    style={{
                                        backgroundColor: '#f8f9fa',
                                        color: '#333',
                                        padding: '1.2rem 1.8rem', // Increased padding
                                        borderRadius: '8px',
                                        fontSize: '1.5rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        textDecoration: 'none',
                                        border: '1px solid #ddd',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '1rem', // Increased gap
                                        lineHeight: 1.2,
                                        flex: 1
                                    }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FontAwesomeIcon icon={faCode}/> View Back-end Code
                                </a>
                            </div>
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </div>
    );
};

export default ProjectsSection;