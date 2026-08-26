import React from 'react';
import './About.css';

const About = () => {
    const technologies = [
        { name: 'HTML', color: '#E34F26' },
        { name: 'JS', color: '#F7DF1E' },
        { name: 'CSS', color: '#1572B6' },
        { name: 'TAILWIND', color: '#06B6D4' },
        { name: 'REACT', color: '#61DAFB' },
        { name: 'TYPESCRIPT', color: '#3178C6' },
        { name: 'GIT', color: '#F05032' },
        { name: 'THREEJS', color: '#000000' },
        { name: 'MYSQL', color: '#4479A1' },
        { name: 'POSTGRES', color: '#336791' },
        { name: 'PYTHON', color: '#3776AB' },
        { name: 'DJANGO', color: '#092E20' },
        { name: 'DRF', color: '#A30000' },
        { name: 'NGINX', color: '#009639' },
        { name: 'GITHUBACTIONS', color: '#2088FF' }
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
                            {/* Перша колонка - 4 елементи */}
                            <div className="tech-column col-4">
                                {technologies.slice(0, 5).map((tech, index) => (
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

                            {/* Друга колонка - 4 елементи */}
                            <div className="tech-column col-4">
                                {technologies.slice(5, 10).map((tech, index) => (
                                    <div
                                        key={tech.name}
                                        className="tech-item"
                                        style={{ animationDelay: `${(index + 3) * 0.1}s` }}
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

                            {/* Третя колонка - 4 елементи */}
                            <div className="tech-column col-4">
                                {technologies.slice(10, 15).map((tech, index) => (
                                    <div
                                        key={tech.name}
                                        className="tech-item"
                                        style={{ animationDelay: `${(index + 7) * 0.1}s` }}
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
            </div>
        </section>
    );
};

export default About;