// Smooth scroll to section
export const scrollToSection = (sectionId, setActiveSection = null) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Оновлюємо активну секцію, якщо передали функцію
        if (setActiveSection && typeof setActiveSection === 'function') {
            setActiveSection(sectionId);
        }
    }
};