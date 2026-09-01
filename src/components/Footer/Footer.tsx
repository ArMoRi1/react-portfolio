import React from 'react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: 'GitHub',
            url: 'https://github.com/ArMoRi1',
            symbol: '→'
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/artem-mochalovv/',
            symbol: '→'
        },
        {
            name: 'Email',
            url: 'mailto:artemmochalov445@gmail.com',
            symbol: '→'
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
                    {/* Ліва частина - Інформація */}
                    <div className="footer-left">
                        <h3 className="footer-name">Artem Mochalov</h3>
                        <p className="footer-title">Full Stack Developer</p>
                        <p className="footer-description">
                            Crafting digital solutions with modern technologies.
                        </p>
                    </div>

                    {/* Центр - Навігація */}
                    <div className="footer-center">
                        <h4>Navigation</h4>
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

                    {/* Права частина - Контакти */}
                    <div className="footer-right">
                        <h4>Get in Touch</h4>
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
                                    <span className="social-name">{social.name}</span>
                                    <span className="social-arrow">{social.symbol}</span>
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
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;