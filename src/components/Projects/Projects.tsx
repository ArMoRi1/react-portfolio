import React from 'react';
import './Projects.css';

const Projects = () => {
    const projects = [
        {
            id: 1,
            title: "KVK Realty Group",
            description: "Professional real estate platform for KVK Realty Group. Full-stack web application providing property listings, client management, and real estate services. Built with modern technologies to deliver a seamless user experience for real estate professionals and clients.",
            githubLink: null,
            webLink : "https://www.kvkrealtygroup.com/",
            image: `${import.meta.env.BASE_URL}project-images/KVK_Logo.png`,
            technologies: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Tailwind", "Git", "NodeJS", "Python", "Django", "PostgreSQL", "Claude"]
        },
        {
            id: 2,
            title: "Syllabus Calendar",
            description: "Intelligent calendar application for managing academic syllabi and schedules. Developed during the internship selection process for LawBandit. Features comprehensive scheduling, task management, and integration capabilities designed for legal professionals and students.",
            githubLink: "https://github.com/ArMoRi1/syllabus-calendar",
            webLink : "https://syllabus-calendar-six.vercel.app/",
            image: `${import.meta.env.BASE_URL}project-images/Syllabus Calendar.jpg`,
            technologies: ["TypeScript", "Next.js", "HTML", "Tailwind"]
        },
        {
            id: 3,
            title: "Solar System",
            description: "Interactive 3D solar system visualization built with React and Three.js. Demonstrates advanced rendering techniques and real-time 3D graphics manipulation in a web environment.",
            githubLink: "https://github.com/ArMoRi1/react-solar-system",
            webLink : "https://armori1.github.io/react-solar-system/",
            image: `${import.meta.env.BASE_URL}project-images/solar-system.jpg`,
            technologies: ["ReactJS", "JavaScript", "ThreeJS", "API"]
        },
        {
            id: 4,
            title: "Employees",
            description: "Full-featured employee management system enabling HR teams to track, organize, and manage company workforce data. Built with React for responsive, dynamic UI.",
            githubLink: "https://github.com/ArMoRi1/react-employees",
            webLink : "https://armori1.github.io/react-employees/",
            image: `${import.meta.env.BASE_URL}project-images/react-employees.jpg`,
            technologies: ["ReactJS", "JavaScript", "CSS"]
        },
        {
            id: 5,
            title: "Furniture Store",
            description: "E-commerce platform for furniture retail. My first professional project as a developer—full-stack implementation with product catalog, shopping cart, and order management.",
            githubLink: "https://github.com/ArMoRi1/furniture.local",
            webLink : "https://github.com/ArMoRi1/furniture.local",
            image: `${import.meta.env.BASE_URL}project-images/Furniture-Store.jpg`,
            technologies: ["JavaScript", "PHP", "MySQL", "SQL"]
        },
        {
            id: 6,
            title: "Smart Garbage",
            description: "IoT-based waste management system concept. Presented at an All-Ukrainian startup competition—demonstrates full-stack development combining hardware concepts with web technologies.",
            githubLink: "https://github.com/ArMoRi1/Smart_garbage",
            webLink : "https://github.com/ArMoRi1/Smart_garbage",
            image: `${import.meta.env.BASE_URL}project-images/Smart_garbage.jpg`,
            technologies: ["JavaScript", "API", "PHP", "MySQL"]
        },
        {
            id: 7,
            title: "ThreeJS Earth Model",
            description: "Advanced 3D Earth visualization using Three.js with realistic rendering. Showcases proficiency in WebGL, 3D transformations, and complex graphics programming.",
            githubLink: "https://github.com/ArMoRi1/real-earth/",
            webLink : "https://armori1.github.io/real-earth/",
            image: `${import.meta.env.BASE_URL}project-images/real-earth.jpg`,
            technologies: ["JavaScript", "ThreeJS", "CSS"]
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
                                        {project.githubLink && (
                                            <a
                                                href={project.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link"
                                            >
                                                GitHub
                                            </a>
                                        )}
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