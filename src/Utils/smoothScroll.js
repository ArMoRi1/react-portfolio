// src/Utils/smoothScroll.js

export const scrollToSection = (sectionId, callback = null) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    // Враховуємо висоту навігації
    const navHeight = 60;
    const targetPosition = element.offsetTop - navHeight;

    // Плавний скрол
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });

    // Викликаємо callback після завершення скролу (якщо передано)
    if (callback) {
        // Чекаємо завершення анімації (приблизно)
        const duration = Math.abs(window.scrollY - targetPosition) / 2; // Приблизний час анімації
        const timeout = Math.min(Math.max(duration, 300), 1000); // Мінімум 300мс, максимум 1000мс

        setTimeout(() => {
            callback(sectionId);
        }, timeout);
    }
};