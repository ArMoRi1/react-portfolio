import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
    sanitizeInput,
    validateFormData,
    checkRateLimit,
    getRateLimitTimeRemaining,
    type ValidationErrors,
    type RateLimitState
} from '../../Utils/formSecurity';
import './Contact.css';

const Contact = () => {
    const form = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
        from_name: '',
        from_email: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [rateLimitState, setRateLimitState] = useState<RateLimitState>(() => {
        const stored = localStorage.getItem('formRateLimit');
        return stored ? JSON.parse(stored) : { count: 0, resetTime: 0 };
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const sanitized = sanitizeInput(value);

        setFormData(prevState => ({
            ...prevState,
            [name]: sanitized
        }));

        // Видалити помилку поля при редагуванні
        if (errors[name as keyof ValidationErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setStatus('');

        // Перевірка rate limit
        const { allowed, newState } = checkRateLimit(rateLimitState);
        if (!allowed) {
            setRateLimitState(newState);
            localStorage.setItem('formRateLimit', JSON.stringify(newState));
            setStatus('rate-limit');
            setTimeout(() => setStatus(''), 5000);
            return;
        }

        setRateLimitState(newState);
        localStorage.setItem('formRateLimit', JSON.stringify(newState));

        // Валідація
        const newErrors = validateFormData(formData);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        try {
            // Перевірка наявності необхідних змінних середовища
            if (!import.meta.env.VITE_EMAILJS_SERVICE_ID ||
                !import.meta.env.VITE_EMAILJS_TEMPLATE_ID ||
                !import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
                throw new Error('Email service not configured');
            }

            const result = await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form.current!,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            console.log('Email sent successfully:', result.text);
            setStatus('success');

            // Очистити форму
            setFormData({
                from_name: '',
                from_email: '',
                message: ''
            });

            setTimeout(() => {
                setStatus('');
            }, 5000);

        } catch (error) {
            console.error('Failed to send email:', error);
            setStatus('error');

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

                <form className="contact-form" ref={form} onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <input
                            type="text"
                            name="from_name"
                            placeholder="Name"
                            value={formData.from_name}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            className={`form-input ${errors.from_name ? 'error' : ''}`}
                            maxLength={100}
                        />
                        {errors.from_name && (
                            <span className="error-message">{errors.from_name}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            name="from_email"
                            placeholder="Email"
                            value={formData.from_email}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            className={`form-input ${errors.from_email ? 'error' : ''}`}
                            maxLength={254}
                        />
                        {errors.from_email && (
                            <span className="error-message">{errors.from_email}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <textarea
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            rows={6}
                            className={`form-textarea ${errors.message ? 'error' : ''}`}
                            maxLength={5000}
                        />
                        <span className="char-count">{formData.message.length}/5000</span>
                        {errors.message && (
                            <span className="error-message">{errors.message}</span>
                        )}
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

                    {status === 'rate-limit' && (
                        <div className="status-message error">
                            ⏱️ Too many attempts. Please wait {getRateLimitTimeRemaining(rateLimitState)}s before trying again.
                        </div>
                    )}

                    <button
                        type="submit"
                        className={`submit-btn ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading || rateLimitState.count >= 10}
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
                        type="button"
                        aria-label="Scroll to top"
                    >
                        ↑
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Contact;
