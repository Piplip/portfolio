import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/projects.scss';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);
    const projectsRef = useRef(null);
    const projectsGridRef = useRef(null);

    // Sample project data - unchanged for brevity...
    const projects = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            year: '2023',
            category: 'web',
            description: 'A modern e-commerce platform with advanced filtering, real-time inventory, and seamless checkout.',
            image: 'https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux'],
            features: [
                'User authentication and authorization',
                'Product search and filtering',
                'Shopping cart functionality',
                'Secure payment processing',
                'Order tracking and history'
            ],
            longDescription: 'This comprehensive e-commerce platform was designed to provide a seamless shopping experience for users while giving store owners powerful tools to manage their inventory and sales. The project includes a responsive front-end built with React and Redux, a robust Node.js/Express API, and MongoDB for data storage.',
            liveUrl: '#',
            codeUrl: '#'
        },
        {
            id: 2,
            title: 'Task Management App',
            year: '2023',
            category: 'mobile',
            description: 'A productivity tool for managing tasks, projects, and team collaboration with real-time updates.',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            techStack: ['React Native', 'Firebase', 'TypeScript', 'Redux'],
            features: [
                'Task creation and management',
                'Project organization',
                'Team collaboration features',
                'Due date tracking with reminders',
                'Progress reporting and analytics'
            ],
            longDescription: 'The Task Management App is designed to help individuals and teams stay organized and productive. With real-time updates and cross-platform compatibility, users can manage their tasks from anywhere. The app features a clean, intuitive interface that makes task management simple and effective.',
            liveUrl: '#',
            codeUrl: '#'
        },
        {
            id: 3,
            title: 'AI Content Generator',
            year: '2022',
            category: 'ai',
            description: 'An AI-powered tool that generates high-quality content for blogs, social media, and marketing materials.',
            image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
            techStack: ['Python', 'TensorFlow', 'Flask', 'React', 'AWS'],
            features: [
                'Natural language generation',
                'Topic-specific content creation',
                'Tone and style customization',
                'Content optimization for SEO',
                'Multi-format output (blog, social, email)'
            ],
            longDescription: 'The AI Content Generator leverages advanced natural language processing to create human-like content for various marketing needs. Users can specify topics, tone, and length to get customized content in seconds. The solution includes a user-friendly web interface and robust API for integration with existing tools and platforms.',
            liveUrl: '#',
            codeUrl: '#'
        },
        {
            id: 4,
            title: 'Financial Dashboard',
            year: '2022',
            category: 'web',
            description: 'A comprehensive financial dashboard providing real-time insights, analytics, and portfolio management.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
            techStack: ['Vue.js', 'D3.js', 'Node.js', 'PostgreSQL', 'WebSockets'],
            features: [
                'Real-time market data visualization',
                'Portfolio tracking and analysis',
                'Investment performance metrics',
                'Customizable dashboard widgets',
                'Alert system for price changes'
            ],
            longDescription: 'The Financial Dashboard is a powerful tool for investors and financial analysts, providing comprehensive market data visualization and portfolio management capabilities. The application features real-time data updates via WebSockets, interactive charts built with D3.js, and a clean, intuitive interface designed with Vue.js.',
            liveUrl: '#',
            codeUrl: '#'
        },
        {
            id: 5,
            title: 'Health & Fitness Tracker',
            year: '2021',
            category: 'mobile',
            description: 'A mobile app for tracking workouts, nutrition, and health metrics with personalized insights and recommendations.',
            image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1774&q=80',
            techStack: ['Flutter', 'Dart', 'Firebase', 'HealthKit', 'Google Fit API'],
            features: [
                'Workout tracking and planning',
                'Nutrition and meal logging',
                'Health metrics monitoring',
                'Goal setting and progress tracking',
                'Personalized recommendations'
            ],
            longDescription: 'The Health & Fitness Tracker is a comprehensive mobile application that helps users maintain healthy lifestyles by tracking various aspects of their fitness and nutrition. The app integrates with device health platforms like HealthKit and Google Fit to collect data seamlessly, while providing actionable insights and personalized recommendations.',
            liveUrl: '#',
            codeUrl: '#'
        },
        {
            id: 6,
            title: 'Smart Home Control System',
            year: '2021',
            category: 'iot',
            description: 'An IoT solution for controlling and automating home devices with voice commands, scheduling, and energy monitoring.',
            image: 'https://images.unsplash.com/photo-1558002038-bb0401b9e6b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
            techStack: ['Raspberry Pi', 'Node.js', 'MQTT', 'React', 'TensorFlow Lite'],
            features: [
                'Voice-controlled device management',
                'Automated routines and scheduling',
                'Energy usage monitoring and optimization',
                'Temperature and lighting control',
                'Security camera integration'
            ],
            longDescription: 'The Smart Home Control System is a comprehensive IoT solution that transforms ordinary homes into intelligent living spaces. Using a Raspberry Pi as the central hub, the system connects various smart devices and sensors, enabling seamless control and automation. The project includes a user-friendly mobile and web interface, voice control capabilities, and energy optimization features.',
            liveUrl: '#',
            codeUrl: '#'
        }
    ];

    // Filter projects based on active category
    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    // Handle filter change
    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
    };

    // Handle project click to open modal
    const handleProjectClick = (project) => {
        setSelectedProject(project);
        // Disable body scroll when modal is open
        document.body.style.overflow = 'hidden';
    };

    // Handle modal close
    const handleCloseModal = () => {
        setSelectedProject(null);
        // Enable body scroll when modal is closed
        document.body.style.overflow = 'auto';
    };

    // Set up animations for horizontal scrolling
    useEffect(() => {
        // Make sure cards are visible initially
        if (projectsGridRef.current) {
            const projectCards = projectsGridRef.current.querySelectorAll('.project-card');
            gsap.set(projectCards, { opacity: 1, x: 0 });
        }

        // Find the main horizontalScroll instance
        const horizontalScrollInstance = ScrollTrigger.getById("horizontalScroll");

        if (projectsGridRef.current && projectsRef.current && horizontalScrollInstance) {
            // Create a context for scoped animations
            const ctx = gsap.context(() => {
                // Configure animation for project cards during scroll
                gsap.utils.toArray('.project-card').forEach((card, i) => {
                    // Create animation for card reveal when scrolling into view
                    gsap.fromTo(card,
                        {
                            opacity: 0,
                            x: 80,
                            scale: 0.95
                        },
                        {
                            opacity: 1,
                            x: 0,
                            scale: 1,
                            duration: 0.8,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "left 85%",
                                end: "left 15%",
                                containerAnimation: horizontalScrollInstance,
                                toggleActions: "play none none none",
                                id: `project-card-${i}`,
                                once: true
                            }
                        }
                    );
                });

                // Animation for section header
                gsap.from('.projects-header', {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: '.projects-header',
                        start: "left 80%",
                        containerAnimation: horizontalScrollInstance,
                        once: true
                    }
                });

                // Animation for filter buttons
                gsap.from('.project-filters .filter-btn', {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: '.project-filters',
                        start: "left 80%",
                        containerAnimation: horizontalScrollInstance,
                        once: true
                    }
                });
            }, projectsRef);

            // Return cleanup function to kill animations
            return () => {
                ctx.revert();
            };
        }
    }, [filteredProjects, activeFilter]);

    // Add initial animation for first render
    useEffect(() => {
        // This will run once on component mount to show the initial projects
        const initialAnimation = gsap.context(() => {
            gsap.fromTo(
                '.project-card',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power2.out',
                    delay: 0.3
                }
            );
        }, projectsGridRef);

        return () => initialAnimation.revert();
    }, []);

    return (
        <div className="projects-container horizontal-projects" ref={projectsRef}>
            <div className="projects-header">
                <h2>My Projects</h2>
                <p className="section-description">
                    Browse through my recent work. Projects automatically reveal as you scroll horizontally through the portfolio.
                </p>
            </div>

            <div className="project-filters">
                <button
                    className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('all')}
                >
                    All Projects
                </button>
                <button
                    className={`filter-btn ${activeFilter === 'web' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('web')}
                >
                    Web
                </button>
                <button
                    className={`filter-btn ${activeFilter === 'mobile' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('mobile')}
                >
                    Mobile
                </button>
                <button
                    className={`filter-btn ${activeFilter === 'ai' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('ai')}
                >
                    AI/ML
                </button>
                <button
                    className={`filter-btn ${activeFilter === 'iot' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('iot')}
                >
                    IoT
                </button>
            </div>

            <div className="projects-grid" ref={projectsGridRef}>
                {filteredProjects.map((project) => (
                    <motion.div
                        key={project.id}
                        className="project-card"
                        layout
                        initial={{ opacity: 1 }}  // Start visible
                        onClick={() => handleProjectClick(project)}
                    >
                        <div className="project-image">
                            <img src={project.image} alt={project.title} />
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

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCloseModal}
                    >
                        <motion.div
                            className="project-modal"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button className="modal-close" onClick={handleCloseModal}>&times;</button>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3>{selectedProject.title}</h3>
                                    <span className="project-year">{selectedProject.year}</span>
                                </div>
                                <div className="modal-body">
                                    <div className="modal-image">
                                        <img src={selectedProject.image} alt={selectedProject.title} />
                                    </div>
                                    <div className="modal-description">
                                        <h4>Project Overview</h4>
                                        <p>{selectedProject.longDescription}</p>

                                        <h4>Key Features</h4>
                                        <ul className="feature-list">
                                            {selectedProject.features.map((feature, index) => (
                                                <li key={index}>
                                                    <span className="feature-icon">✓</span> {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        <h4>Technologies Used</h4>
                                        <div className="tech-stack-full">
                                            {selectedProject.techStack.map((tech, index) => (
                                                <span key={index} className="tech-tag">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <a href={selectedProject.liveUrl} className="btn primary" target="_blank" rel="noopener noreferrer">
                                        View Live
                                    </a>
                                    <a href={selectedProject.codeUrl} className="btn secondary" target="_blank" rel="noopener noreferrer">
                                        View Code
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectsSection;