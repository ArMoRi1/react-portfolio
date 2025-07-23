import React, { useState, useEffect } from 'react';
import { scrollToSection } from '../../Utils/smoothScroll';
import './Navigation.css';

const Navigation = () => {
    const [activeSection, setActiveSection] = useState('home');

    // Handle navigation click
    const handleNavClick = (sectionId) => {
        scrollToSection(sectionId, setActiveSection);
    };

    // Track active section on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'projects', 'contact'];
            const scrollPosition = window.scrollY + 100;

            for (let i = sections.length - 1; i >= 0; i--) {
                const element = document.getElementById(sections[i]);
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' }
    ];

    return (
        <nav className="navigation">
            <div className="nav-container">
                <ul className="nav-menu">
                    {menuItems.map((item) => (
                        <li key={item.id} className="nav-item">
                            <button
                                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                                onClick={() => handleNavClick(item.id)}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;