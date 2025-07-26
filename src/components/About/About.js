import React from 'react';
import './About.css';

const About = () => {
    const technologies = [
        { name: 'HTML', color: '#E34F26' },
        { name: 'JAVASCRIPT', color: '#F7DF1E' },
        { name: 'SASS', color: '#CC6699' },
        { name: 'NEXT.JS', color: '#000000' },
        { name: 'NODE.JS', color: '#339933' },
        { name: 'CSS', color: '#1572B6' },
        { name: 'REACT', color: '#61DAFB' },
        { name: 'MONGODB', color: '#47A248' },
        { name: 'EXPRESS.JS', color: '#666666' },
        { name: 'GIT', color: '#F05032' }
    ];

    return (
        <section className="about-section" id="about">
            <div className="about-title"><h2>About</h2></div>
            <div className="about-container">
                <div className="about-content">
                    {/* Ліва частина - профіль і технології */}
                    <div className="about-left">
                        <div className="profile-avatar">
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

                    {/* Права частина - заголовок і текст */}
                    <div className="about-right">
                        <div className="tech-grid">
                            {technologies.map((tech, index) => (
                                <div
                                    key={tech.name}
                                    className="tech-item"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <img
                                        src={`./icons/${tech.name.toLowerCase().replace('.', '')}.png`}
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