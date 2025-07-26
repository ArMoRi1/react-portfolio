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
            technologies: ["React", "JavaScript", "CSS"]
        },
        {
            id: 2,
            title: "Employees",
            description: "Company employee accounting app for everyone`s usage",
            githubLink: "https://github.com/ArMoRi1/react-employees",
            webLink : "https://armori1.github.io/react-employees/",
            image: "./project-images/react-employees.jpg",
            technologies: ["Next.js", "Node.js", "MongoDB"]
        },
        {
            id: 3,
            title: "Currency Conversion",
            description: "It is a simple conversion app for self-usage",
            githubLink: "https://github.com/ArMoRi1/react-currency-conversion",
            webLink : "https://armori1.github.io/react-currency-conversion/",
            image: "./project-images/currency-conversion.jpg",
            technologies: ["React", "Express", "MySQL"]
        },
        {
            id: 4,
            title: "Restraunt",
            description: "Restaurant advertising website",
            githubLink: "https://github.com/ArMoRi1/Restraunt",
            webLink : "https://armori1.github.io/Restraunt/",
            image: "./project-images/Restraunt.jpg",
            technologies: ["JavaScript", "API", "CSS"]
        },
        {
            id: 5,
            title: "Restraunt",
            description: "Restaurant advertising website",
            githubLink: "https://github.com/ArMoRi1/Restraunt",
            webLink : "",
            image: "./project-images/2.jpg",
            technologies: ["JavaScript", "API", "CSS"]
        },
        {
            id: 6,
            title: "Restraunt",
            description: "Restaurant advertising website",
            githubLink: "https://github.com/ArMoRi1/Restraunt",
            webLink : "",
            image: "./project-images/1.jpg",
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