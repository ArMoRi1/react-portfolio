import React from 'react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: 'GitHub',
            url: 'https://github.com/your-username',
            icon: '⚫', // GitHub icon
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com/in/your-profile',
            icon: '💼', // LinkedIn icon
        },
        {
            name: 'Instagram',
            url: 'https://instagram.com/your-username',
            icon: '📷', // Instagram icon
        },
        {
            name: 'Email',
            url: 'mailto:your.email@example.com',
            icon: '✉️', // Email icon
        }
    ];

    const quickLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <footer className="footer-section">
            <div className="footer-container">
                <div className="footer-content">

                    {/* Центр - Швидкі посилання */}
                    <div className="footer-center">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="footer-link">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Ліва частина - Інформація */}
                    {/* Ліва частина - Інформація */}
                    <div className="footer-left">
                        <h4>I am</h4>
                        <h3 className="footer-name">Artem Mochalov</h3>
                        <p className="footer-title">Full Stack Developer</p>
                        <p className="footer-description">
                            Building digital experiences with passion and precision.
                        </p>
                    </div>



                    {/* Права частина - Соцмережі */}
                    <div className="footer-right">
                        <h4>Connect</h4>
                        <div className="social-links">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    title={social.name}
                                >
                                    <span className="social-icon">{social.icon}</span>
                                    <span className="social-name">{social.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Нижня частина - Копірайт */}
                <div className="footer-bottom">
                    <div className="footer-divider"></div>
                    <div className="footer-copyright">
                        <p>&copy; {currentYear} Artem Mochalov. All rights reserved.</p>
                        <p className="footer-note">
                            Made with ❤️ and lots of ☕
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;