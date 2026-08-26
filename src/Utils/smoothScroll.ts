export const scrollToSection = (sectionId: string, callback: ((id: string) => void) | null = null) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const navHeight = 60;
    const targetPosition = element.offsetTop - navHeight;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });

    if (callback) {
        const duration = Math.abs(window.scrollY - targetPosition) / 2;
        const timeout = Math.min(Math.max(duration, 300), 1000);
        setTimeout(() => {
            callback(sectionId);
        }, timeout);
    }
};
