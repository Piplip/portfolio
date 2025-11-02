import React, {useEffect, useRef, useState} from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import '../styles/projects.scss';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

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
        backendUrl: "https://github.com/Piplip/tixery.git",
        frontendUrl: "https://github.com/Piplip/tixery-fe.git",
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
        backendUrl: "https://github.com/Piplip/medicare-be.git",
        frontendUrl: "https://github.com/Piplip/medicare-fe.git",
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
        year: '07/2025',
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
        year: '08/2025',
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
    },
    {
        id: 6,
        title: "TikTok LIVE Comments Display",
        year: "09/2025",
        description: "A real-time web application that visualizes TikTok LIVE comments and gifts during live streams.",
        images: [
            "https://i.ibb.co/MD7jGdsg/Screenshot-2025-10-25-184558.png",
            "https://i.ibb.co/Q3T4TbYh/Screenshot-2025-10-25-184544.png",
            "https://i.ibb.co/2TchT8N/Screenshot-2025-10-25-184528.png",
            "https://i.ibb.co/XZmBprmm/Screenshot-2025-10-25-184633.png"
        ],
        techStack: ["JavaScript", "React", "Material UI", "Reverse Engineering"],
        features: [
            "Real-time display of LIVE comments and gifts",
            "Interactive viewer profiles and message visualization",
        ],
        longDescription: "An experimental project exploring reverse engineering and real-time data streaming from TikTok LIVE. Focused on building an efficient client capable of processing and rendering high-throughput data streams with minimal latency. Developed to deepen understanding of network traffic analysis and live event synchronization.",
        liveUrl: "#",
        backendUrl: "https://github.com/Piplip/tiktok-live-be",
        frontendUrl: "https://github.com/Piplip/tiktok-live-fe.git",
    },
];

const ProjectsSection = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);
    const projectsRef = useRef(null);
    const projectsGridRef = useRef(null);

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
            }
        }, projectsRef);

        return () => ctx.revert();
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
                <motion.h2>
                    My Projects
                </motion.h2>
            </div>

            <div className="projects-carousel" ref={projectsGridRef}>
                {filteredProjects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={handleProjectClick}
                    />
                ))}
            </div>

            <ProjectModal
                project={selectedProject}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default ProjectsSection;
