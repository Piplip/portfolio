import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Stack } from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const ProjectModal = ({ project, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!project) return null;

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + project.images.length) % project.images.length);
    };

    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index);
    };

    const imageVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
    };

    return (
        <Dialog
            open={true}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{ className: 'project-modal-paper' }}
        >
            <DialogTitle sx={{ m: 0, p: 2, pr: 8, fontSize: 18 }}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <b>{project.title}</b>
                    {project.liveUrl !== '#' &&
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                        >
                            <OpenInNewIcon />
                            Live Demo
                        </a>
                    }
                </Stack>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    className="modal-close"
                    sx={{ position: 'absolute', right: 12, top: 12 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers className="modal-scroll-container">
                <div className="modal-body">
                    <div className="modal-image-section">
                        <div className="image-gallery">
                            <div className="gallery-main-image">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentImageIndex}
                                        src={project.images[currentImageIndex]}
                                        alt={`${project.title} - Image ${currentImageIndex + 1}`}
                                        variants={imageVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    />
                                </AnimatePresence>
                                <div className="gallery-nav prev" onClick={handlePrevImage}>
                                    <IconButton size="small">
                                        <ChevronLeftIcon fontSize="large" />
                                    </IconButton>
                                </div>
                                <div className="gallery-nav next" onClick={handleNextImage}>
                                    <IconButton size="small">
                                        <ChevronRightIcon fontSize="large" />
                                    </IconButton>
                                </div>
                            </div>
                            {project.images.length > 1 && (
                                <div className="gallery-thumbnails">
                                    {project.images.map((imgSrc, index) => (
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

                    <div className="modal-details-section">
                        <h4>Overview</h4>
                        <p>{project.longDescription}</p>

                        <h4>Key Features</h4>
                        <ul>
                            {project.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>

                        <h4>Technology Stack</h4>
                        <div className="tech-stack-full">
                            {project.techStack.map((tech, index) => (
                                <span key={index} className="tech-tag">{tech}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
            <div className="modal-footer">
                <div className="modal-actions">
                    {project.frontendUrl && (
                        <a
                            href={project.frontendUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                        >
                            <OpenInNewIcon />
                            Frontend Code
                        </a>
                    )}
                    {project.backendUrl && (
                        <a
                            href={project.backendUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-backend"
                        >
                            <OpenInNewIcon />
                            Backend Code
                        </a>
                    )}
                    {project.codeUrl && project.codeUrl !== '#' && (
                        <a
                            href={project.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                        >
                            <OpenInNewIcon />
                            View Code
                        </a>
                    )}
                </div>
            </div>
        </Dialog>
    );
};

export default ProjectModal;
