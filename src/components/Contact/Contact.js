import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
    const form = useRef();
    const [formData, setFormData] = useState({
        from_name: '',
        from_email: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus('');

        try {
            const result = await emailjs.sendForm(
                'service_ArtPortfolio',     // ✅ ЗАМІНІТЬ НА ВАШ SERVICE ID
                'template_ArtPortfolio',    // ✅ ЗАМІНІТЬ НА ВАШ TEMPLATE ID
                form.current,
                '4oz-FDBfb7C1j37cy'         // ✅ ЗАМІНІТЬ НА ВАШ PUBLIC KEY
            );

            console.log('Email sent successfully:', result.text);
            setStatus('success');

            // Очищуємо форму після успішної відправки
            setFormData({
                from_name: '',
                from_email: '',
                message: ''
            });

            // Сховати повідомлення через 5 секунд
            setTimeout(() => {
                setStatus('');
            }, 5000);

        } catch (error) {
            console.error('Failed to send email:', error.text);
            setStatus('error');

            // Сховати повідомлення про помилку через 5 секунд
            setTimeout(() => {
                setStatus('');
            }, 5000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="contact-section" id="contact">
            <div className="contact-container">
                <div className="contact-title">
                    <h2>Contact</h2>
                </div>

                <div className="contact-subtitle">
                    <p>Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.</p>
                </div>

                <form className="contact-form" ref={form} onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="from_name"
                            placeholder="Name"
                            value={formData.from_name}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            name="from_email"
                            placeholder="Email"
                            value={formData.from_email}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <textarea
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            rows="6"
                            className="form-textarea"
                        />
                    </div>

                    {status === 'success' && (
                        <div className="status-message success">
                            ✅ Message sent successfully! I'll get back to you soon.
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="status-message error">
                            ❌ Failed to send message. Please try again or contact me directly.
                        </div>
                    )}

                    <button
                        type="submit"
                        className={`submit-btn ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="loading-spinner"></span>
                                SENDING...
                            </>
                        ) : (
                            'SUBMIT'
                        )}
                    </button>
                </form>

                <div className="scroll-up">
                    <button
                        className="scroll-up-btn"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        ↑
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Contact;