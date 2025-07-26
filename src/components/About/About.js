import React from 'react';
import './About.css';

const About = () => {
    const technologies = [
        { name: 'HTML', color: '#E34F26' },
        { name: 'JS', color: '#F7DF1E' },
        { name: 'CSS', color: '#1572B6' },
        { name: 'SASS', color: '#CC6699' },
        { name: 'REACT', color: '#61DAFB' },
        { name: 'PHP', color: '#777BB4' },
        { name: 'PHPMYADMIN', color: '#6C78AF' },
        { name: 'GIT', color: '#F05032' },
        { name: 'THREEJS', color: '#000000' },
        { name: 'MYSQL', color: '#4479A1' }
    ];

    return (
        <section className="about-section" id="about">
            <div className="about-title"><h2>About</h2></div>
            <div className="about-container">
                <div className="about-content">
                    {/* Ліва частина - профіль і опис */}
                    <div className="about-left">
                        <div className="profile-avatar">
                            <div className="avatar-head"></div>
                            <div className="avatar-body"></div>
                        </div>

                        <div className="about-description">
                            <p>
                                Fully committed to the philosophy of life-long
                                learning, I'm a full stack developer with a deep passion
                                for JavaScript, React and all things web development.
                                The unique combination of creativity, logic,
                                technology and never running out of new things to
                                discover, drives my excitement and passion for web
                                development. When I'm not at my computer I like to
                                spend my time reading, keeping fit and playing guitar.
                            </p>
                        </div>
                    </div>

                    {/* Права частина - технології */}
                    <div className="about-right">
                        <div className="tech-grid">
                            {/* Перша колонка - 3 елементи */}
                            <div className="tech-column col-3">
                                {technologies.slice(0, 3).map((tech, index) => (
                                    <div
                                        key={tech.name}
                                        className="tech-item"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <img
                                            src={`./tech-icons/${tech.name.toLowerCase()}.png`}
                                            alt={tech.name}
                                            className="tech-icon"
                                        />
                                        <span className="tech-label">{tech.name}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Друга колонка - 4 елементи */}
                            <div className="tech-column col-4">
                                {technologies.slice(3, 7).map((tech, index) => (
                                    <div
                                        key={tech.name}
                                        className="tech-item"
                                        style={{ animationDelay: `${(index + 3) * 0.1}s` }}
                                    >
                                        <img
                                            src={`./tech-icons/${tech.name.toLowerCase()}.png`}
                                            alt={tech.name}
                                            className="tech-icon"
                                        />
                                        <span className="tech-label">{tech.name}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Третя колонка - 3 елементи */}
                            <div className="tech-column col-3">
                                {technologies.slice(7, 10).map((tech, index) => (
                                    <div
                                        key={tech.name}
                                        className="tech-item"
                                        style={{ animationDelay: `${(index + 7) * 0.1}s` }}
                                    >
                                        <img
                                            src={`./tech-icons/${tech.name.toLowerCase()}.png`}
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