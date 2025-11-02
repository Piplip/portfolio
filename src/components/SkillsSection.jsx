import React from 'react';
import { motion } from 'framer-motion';
import {
    Box,
} from '@mui/material';
import Particles from './shared/Particles';
import './shared/Particles.css';
import {
    FaBrain,
    FaCss3Alt,
    FaGit,
    FaHtml5,
    FaJava,
    FaJs,
    FaProjectDiagram,
    FaReact,
    FaServer,
    FaShieldAlt
} from 'react-icons/fa';
import {
    SiFirebase,
    SiGooglecloud,
    SiGrafana,
    SiMui ,
    SiMysql,
    SiPrometheus,
    SiSpring,
    SiVite
} from 'react-icons/si';
import '../styles/skills.scss';
import SkillCard from './SkillCard';

const SkillsSection = () => {
    const skills = [
        {
            category: 'Frontend',
            items: [
                { name: 'HTML', icon: <FaHtml5 /> },
                { name: 'CSS', icon: <FaCss3Alt /> },
                { name: 'JavaScript', icon: <FaJs /> },
                { name: 'React', icon: <FaReact /> },
                { name: 'Material UI', icon: <SiMui  /> },
                { name: 'Vite', icon: <SiVite /> },
                { name: 'Responsive Design' },
                { name: 'SEO' },
            ]
        },
        {
            category: 'Backend',
            items: [
                { name: 'Spring Boot', icon: <SiSpring /> },
                { name: 'Java', icon: <FaJava /> },
                { name: 'MySQL', icon: <SiMysql /> },
                { name: 'Firebase', icon: <SiFirebase /> },
                { name: 'jOOQ' },
                { name: 'Maven' },
            ]
        },
        {
            category: 'Tools',
            items: [
                { name: 'Git', icon: <FaGit /> },
                { name: 'Google Cloud', icon: <SiGooglecloud /> },
                { name: 'Prometheus', icon: <SiPrometheus /> },
                { name: 'Grafana', icon: <SiGrafana /> },
            ]
        },
        {
            category: 'Other',
            items: [
                { name: 'Project Management', icon: <FaProjectDiagram /> },
                { name: 'Microservices', icon: <FaServer /> },
                { name: 'Web Security', icon: <FaShieldAlt /> },
                { name: 'LLM Utilization', icon: <FaBrain /> },
            ]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <Box
            component={motion.div}
            className="skills-container"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <Particles
                className="skills-particles"
                particleCount={100}
                particleColors={['#e63946', '#f1faee', '#a8dadc', '#457b9d', '#1d3557']}
                speed={0.1}
                particleBaseSize={2}
            />
            <h2 className="section-title">
                Skills
            </h2>

            <Box className="skills-content">
                {skills.map((skillGroup, index) => (
                    <SkillCard
                        key={index}
                        skillGroup={skillGroup}
                        variants={itemVariants}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default SkillsSection;
