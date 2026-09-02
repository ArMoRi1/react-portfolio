import React from 'react';
import './About.css';

const About = () => {
    const technologies = [
        { name: 'HTML' },
        { name: 'CSS' },
        { name: 'JS' },
        { name: 'REACT' },
        { name: 'TYPESCRIPT' },
        { name: 'TAILWIND' },
        { name: 'GIT' },
        { name: 'NODEJS' },
        { name: 'PYTHON' },
        { name: 'DJANGO' },
        { name: 'POSTGRES' },
        { name: 'CLAUDE' }
    ];

    return (
        <section className="about-section" id="about">
            <div className="about-title"><h2>About</h2></div>
            <div className="about-container">
                <div className="about-content">
                    {/* Ліва частина - профіль і опис */}
                    <div className="about-left">
                        <div className="profile-avatar">
                            <div className="avatar-body">
                                <img src={`${import.meta.env.BASE_URL}photos/Art.jpg`} alt="the pic of an author"/>
                            </div>
                        </div>

                        <div className="about-description">
                            <p>
                                Fresh full-stack developer with solid knowledge
                                in JavaScript, React, and modern web technologies,
                                ready to turn theory into real-world impact.
                                I'm hungry for experience and determined to prove
                                myself in every project I touch. My passion for
                                learning never stops - I constantly dive into new
                                frameworks and push my skills to the next level.
                                When I'm not coding, I'm wrestling, crushing
                                workouts, learning new languages, or exploring
                                the wilderness. I may be new to the industry,
                                but my drive and dedication speak louder than
                                years of experience.
                            </p>
                        </div>
                    </div>

                    {/* Права частина - технології */}
                    <div className="about-right">
                        <div className="tech-grid">
                            {technologies.map((tech, index) => (
                                <div
                                    key={tech.name}
                                    className="tech-item"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <img
                                        src={`${import.meta.env.BASE_URL}tech-icons/${tech.name.toLowerCase()}.png`}
                                        alt={tech.name}
                                        className="tech-icon"
                                    />
                                    <span className="tech-label">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;