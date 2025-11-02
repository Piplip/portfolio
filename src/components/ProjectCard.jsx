import React from 'react';
import { motion } from 'framer-motion';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const ProjectCard = ({ project, onClick }) => {
    return (
        <motion.div
            className="project-card"
            onClick={() => onClick(project)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
        >
            <div className="project-image">
                <img src={project.images[0]} alt={project.title} />
                <div className="project-overlay">
                    <OpenInNewIcon />
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
                    {project.techStack.slice(0, 4).map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                    ))}
                    {project.techStack.length > 4 && (
                        <span className="tech-tag more">+{project.techStack.length - 4}</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
