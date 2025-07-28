import React from 'react';
import './Projects.css';

const Projects = () => {
    const projects = [
        {
            id: 1,
            title: "Solar System",
            description: "It is Solar system model",
            githubLink: "https://github.com/ArMoRi1/react-solar-system",
            webLink : "https://armori1.github.io/react-solar-system/",
            image: "./project-images/solar-system.jpg",
            technologies: ["ReactJS", "JavaScript", "ThreeJS", "API"]
        },
        {
            id: 2,
            title: "Employees",
            description: "Company employee accounting app for everyone`s usage",
            githubLink: "https://github.com/ArMoRi1/react-employees",
            webLink : "https://armori1.github.io/react-employees/",
            image: "./project-images/react-employees.jpg",
            technologies: ["ReactJS", "JavaScript", "SASS"]
        },
        {
            id: 3,
            title: "Currency Conversion",
            description: "It is a simple conversion app for self-usage",
            githubLink: "https://github.com/ArMoRi1/react-currency-conversion",
            webLink : "https://armori1.github.io/react-currency-conversion/",
            image: "./project-images/currency-conversion.jpg",
            technologies: ["ReactJS", "JavaScript", "API"]
        },
        {
            id: 4,
            title: "Restraunt",
            description: "Restaurant advertising website",
            githubLink: "https://github.com/ArMoRi1/Restraunt",
            webLink : "https://armori1.github.io/Restraunt/",
            image: "./project-images/Restraunt.jpg",
            technologies: ["JavaScript", "HTML", "CSS"]
        },
        {
            id: 5,
            title: "Furniture Store",
            description: "It is my first store app for my first job as a programmer",
            githubLink: "https://github.com/ArMoRi1/furniture.local",
            webLink : "https://furniture-comfort.is-great.net/",
            image: "./project-images/Furniture-Store.jpg",
            technologies: ["JavaScript", "PHP", "phpMyAdmin", "SQL"]
        },
        {
            id: 6,
            title: "Smart Garbage",
            description: "It was an idea of a start-up what was presented on a All-Ukrainian competition",
            githubLink: "https://github.com/ArMoRi1/Smart_garbage",
            webLink : "https://smart-trash.great-site.net/",
            image: "./project-images/Smart_garbage.jpg",
            technologies: ["JavaScript", "API", "PHP", "SQL"]
        },
        {
            id: 7,
            title: "TravelIn",
            description: "The simplest site about travel tours",
            githubLink: "https://github.com/ArMoRi1/travel.local",
            webLink : "https://travelin.great-site.net/",
            image: "./project-images/Smart_garbage.jpg",
            technologies: ["JavaScript", "PHP", "SQL", "phpMyAdmin"]
        },
        {
            id: 8,
            title: "ThreeJS Earth Model",
            description: "Basic ThreeJS project that represents planet Earth",
            githubLink: "https://github.com/ArMoRi1/real-earth/",
            webLink : "https://armori1.github.io/real-earth/",
            image: "./project-images/real-earth.jpg",
            technologies: ["JavaScript", "ThreeJS", "CSS"]
        },
        {
            id: 9,
            title: "Translator",
            description: "Simple translator app",
            githubLink: "https://github.com/ArMoRi1/TranslateRT",
            webLink : "https://armori1.github.io/TranslateRT/",
            image: "./project-images/real-earth.jpg",
            technologies: ["JavaScript", "API", "CSS"]
        }
    ];

    return (
        <section className="projects-section" id="projects">
            <div className="projects-title">
                <h2>PROJECTS</h2>
            </div>

            <div className="projects-container">
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className="project-card"
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <div className="project-image">
                                <img src={project.image} alt={project.title} />
                                <div className="project-overlay">
                                    <div className="project-links">
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                        >
                                            GitHub
                                        </a>
                                        <a
                                            href={project.webLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                        >
                                            Live Demo
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>
                                <div className="project-technologies">
                                    {project.technologies.map((tech, techIndex) => (
                                        <span key={techIndex} className="tech-tag">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;