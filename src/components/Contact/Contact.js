import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Тут можна додати логіку відправки форми
        console.log('Form submitted:', formData);
        // Очистити форму після відправки
        setFormData({
            name: '',
            email: '',
            message: ''
        });
        alert('Message sent successfully!');
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

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
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

                    <button type="submit" className="submit-btn">
                        SUBMIT
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