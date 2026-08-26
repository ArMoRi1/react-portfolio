import React from 'react';
import { scrollToSection } from '../../Utils/smoothScroll';
import CanvasDotsBg from './CanvasDotsBg';
import './Greetings.css';

const GreetingsSection = () => {
    const handleScrollToProjects = () => {
        scrollToSection('projects');
    };

    return (
        <section className="greetings-section" id="home">
            <CanvasDotsBg />

            <div className="greetings-content">
                <div className="greetings-text">
                    <h1 className="greetings-title">
                        Hello, I'm <span className="name-highlight">Artem Mochalov</span>
                    </h1>
                    <p className="greetings-subtitle">
                        I'm a full stack web developer.
                    </p>

                    <div className="greetings-actions">
                        <button
                            className="btn-outline"
                            onClick={handleScrollToProjects}
                        >
                            View my work ↓
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GreetingsSection;