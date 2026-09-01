/**
 * Form Security Utilities
 * Provides validation, sanitization, and rate limiting for contact form
 */

export interface ValidationErrors {
    from_name?: string;
    from_email?: string;
    message?: string;
}

export interface RateLimitState {
    count: number;
    resetTime: number;
}

/**
 * Санітизація вхідних даних - видалення потенційно небезпечних символів
 */
export const sanitizeInput = (input: string): string => {
    if (typeof input !== 'string') return '';

    return input
        .trim()
        .replace(/[<>]/g, '') // видалити < та >
        .replace(/javascript:/gi, '') // видалити javascript: префікс
        .replace(/on\w+\s*=/gi, '') // видалити event handlers (onclick=, onload= тощо)
        .slice(0, 5000); // обмежити довжину до 5000 символів
};

/**
 * Валідація email адреси
 */
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
};

/**
 * Валідація всіх полів форми
 */
export const validateFormData = (formData: {
    from_name: string;
    from_email: string;
    message: string;
}): ValidationErrors => {
    const errors: ValidationErrors = {};

    // Валідація імені
    if (!formData.from_name.trim()) {
        errors.from_name = 'Name is required';
    } else if (formData.from_name.length < 2) {
        errors.from_name = 'Name must be at least 2 characters';
    } else if (formData.from_name.length > 100) {
        errors.from_name = 'Name is too long (max 100 characters)';
    }

    // Валідація email
    if (!formData.from_email.trim()) {
        errors.from_email = 'Email is required';
    } else if (!validateEmail(formData.from_email)) {
        errors.from_email = 'Invalid email address';
    }

    // Валідація повідомлення
    if (!formData.message.trim()) {
        errors.message = 'Message is required';
    } else if (formData.message.length < 10) {
        errors.message = 'Message must be at least 10 characters';
    } else if (formData.message.length > 5000) {
        errors.message = 'Message is too long (max 5000 characters)';
    }

    return errors;
};

/**
 * Rate limiting - перевірка чи користувач не перевищив ліміт спроб
 * Максимум 3 спроби за 60 секунд
 */
export const checkRateLimit = (state: RateLimitState): { allowed: boolean; newState: RateLimitState } => {
    const now = Date.now();
    const RATE_LIMIT_WINDOW = 60000; // 1 хвилина
    const MAX_ATTEMPTS = 10;

    let newState = { ...state };

    // Скинути лічильник якщо минув час
    if (now > newState.resetTime) {
        newState = { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
    }

    // Перевірити чи не перевищено ліміт
    if (newState.count >= MAX_ATTEMPTS) {
        return { allowed: false, newState };
    }

    // Збільшити лічильник
    newState.count += 1;

    return { allowed: true, newState };
};

/**
 * Отримати час до скидання rate limit лічильника
 */
export const getRateLimitTimeRemaining = (state: RateLimitState): number => {
    const now = Date.now();
    if (now < state.resetTime) {
        return Math.ceil((state.resetTime - now) / 1000);
    }
    return 0;
};

/**
 * Перевірка наявності XSS векторів в рядку
 */
export const containsXSSVector = (input: string): boolean => {
    const xssPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /<iframe/i,
        /<object/i,
        /<embed/i,
        /<img[^>]*onerror/i
    ];

    return xssPatterns.some(pattern => pattern.test(input));
};
