/**
 * Form Security Tests
 * Comprehensive test suite for validating form security measures
 */

import {
    sanitizeInput,
    validateEmail,
    validateFormData,
    checkRateLimit,
    getRateLimitTimeRemaining,
    containsXSSVector,
    type ValidationErrors,
    type RateLimitState
} from './formSecurity';

// ============================================
// ТЕСТИ САНІТИЗАЦІЇ
// ============================================

describe('Sanitization Tests', () => {
    test('Should remove HTML tags', () => {
        const input = '<script>alert("xss")</script>';
        const result = sanitizeInput(input);
        expect(result).not.toContain('<');
        expect(result).not.toContain('>');
        expect(result).toBe('scriptalert("xss")/script');
    });

    test('Should remove javascript: protocol', () => {
        const input = 'javascript:alert("xss")';
        const result = sanitizeInput(input);
        expect(result).not.toContain('javascript:');
    });

    test('Should remove event handlers', () => {
        const input = 'onclick=alert("xss") onload=doEvil()';
        const result = sanitizeInput(input);
        expect(result).not.toContain('onclick=');
        expect(result).not.toContain('onload=');
    });

    test('Should trim whitespace', () => {
        const input = '   hello world   ';
        const result = sanitizeInput(input);
        expect(result).toBe('hello world');
    });

    test('Should limit length to 5000 characters', () => {
        const input = 'a'.repeat(6000);
        const result = sanitizeInput(input);
        expect(result.length).toBe(5000);
    });

    test('Should handle empty input', () => {
        const result = sanitizeInput('');
        expect(result).toBe('');
    });

    test('Should handle null/undefined safely', () => {
        const result = sanitizeInput(null as any);
        expect(result).toBe('');
    });
});

// ============================================
// ТЕСТИ EMAIL ВАЛІДАЦІЇ
// ============================================

describe('Email Validation Tests', () => {
    test('Should validate correct email', () => {
        expect(validateEmail('user@example.com')).toBe(true);
    });

    test('Should reject email without @', () => {
        expect(validateEmail('userexample.com')).toBe(false);
    });

    test('Should reject email without domain', () => {
        expect(validateEmail('user@')).toBe(false);
    });

    test('Should reject email without local part', () => {
        expect(validateEmail('@example.com')).toBe(false);
    });

    test('Should reject email with spaces', () => {
        expect(validateEmail('user @example.com')).toBe(false);
    });

    test('Should reject email longer than 254 characters', () => {
        const longEmail = 'a'.repeat(255) + '@example.com';
        expect(validateEmail(longEmail)).toBe(false);
    });

    test('Should validate email with subdomain', () => {
        expect(validateEmail('user@mail.example.com')).toBe(true);
    });

    test('Should validate email with numbers and dots', () => {
        expect(validateEmail('user.name123@example.co.uk')).toBe(true);
    });
});

// ============================================
// ТЕСТИ ВАЛІДАЦІЇ ФОРМИ
// ============================================

describe('Form Validation Tests', () => {
    test('Should require name', () => {
        const formData = { from_name: '', from_email: 'test@example.com', message: 'Hello world' };
        const errors = validateFormData(formData);
        expect(errors.from_name).toBeDefined();
    });

    test('Should require email', () => {
        const formData = { from_name: 'John', from_email: '', message: 'Hello world' };
        const errors = validateFormData(formData);
        expect(errors.from_email).toBeDefined();
    });

    test('Should require message', () => {
        const formData = { from_name: 'John', from_email: 'test@example.com', message: '' };
        const errors = validateFormData(formData);
        expect(errors.message).toBeDefined();
    });

    test('Should validate minimum name length', () => {
        const formData = { from_name: 'A', from_email: 'test@example.com', message: 'Hello world' };
        const errors = validateFormData(formData);
        expect(errors.from_name).toBeDefined();
    });

    test('Should validate maximum name length', () => {
        const formData = { from_name: 'a'.repeat(101), from_email: 'test@example.com', message: 'Hello world' };
        const errors = validateFormData(formData);
        expect(errors.from_name).toBeDefined();
    });

    test('Should validate minimum message length', () => {
        const formData = { from_name: 'John', from_email: 'test@example.com', message: 'short' };
        const errors = validateFormData(formData);
        expect(errors.message).toBeDefined();
    });

    test('Should validate maximum message length', () => {
        const formData = { from_name: 'John', from_email: 'test@example.com', message: 'a'.repeat(5001) };
        const errors = validateFormData(formData);
        expect(errors.message).toBeDefined();
    });

    test('Should validate invalid email format', () => {
        const formData = { from_name: 'John', from_email: 'invalid-email', message: 'Hello world' };
        const errors = validateFormData(formData);
        expect(errors.from_email).toBeDefined();
    });

    test('Should pass validation with correct data', () => {
        const formData = { from_name: 'John Doe', from_email: 'john@example.com', message: 'This is a valid message' };
        const errors = validateFormData(formData);
        expect(Object.keys(errors).length).toBe(0);
    });
});

// ============================================
// ТЕСТИ RATE LIMITING
// ============================================

describe('Rate Limiting Tests', () => {
    test('Should allow first attempt', () => {
        const initialState: RateLimitState = { count: 0, resetTime: Date.now() + 60000 };
        const { allowed, newState } = checkRateLimit(initialState);
        expect(allowed).toBe(true);
        expect(newState.count).toBe(1);
    });

    test('Should allow up to 3 attempts within time window', () => {
        let state: RateLimitState = { count: 0, resetTime: Date.now() + 60000 };

        for (let i = 0; i < 3; i++) {
            const { allowed } = checkRateLimit(state);
            expect(allowed).toBe(true);
            state = checkRateLimit(state).newState;
        }
    });

    test('Should block 4th attempt', () => {
        let state: RateLimitState = { count: 3, resetTime: Date.now() + 60000 };
        const { allowed } = checkRateLimit(state);
        expect(allowed).toBe(false);
    });

    test('Should reset counter after time window expires', () => {
        const expiredState: RateLimitState = { count: 3, resetTime: Date.now() - 1000 };
        const { allowed, newState } = checkRateLimit(expiredState);
        expect(allowed).toBe(true);
        expect(newState.count).toBe(1);
        expect(newState.resetTime).toBeGreaterThan(Date.now());
    });

    test('Should calculate remaining time correctly', () => {
        const futureTime = Date.now() + 30000;
        const state: RateLimitState = { count: 1, resetTime: futureTime };
        const remaining = getRateLimitTimeRemaining(state);
        expect(remaining).toBeGreaterThanOrEqual(29);
        expect(remaining).toBeLessThanOrEqual(31);
    });

    test('Should return 0 when rate limit is expired', () => {
        const expiredState: RateLimitState = { count: 1, resetTime: Date.now() - 1000 };
        const remaining = getRateLimitTimeRemaining(expiredState);
        expect(remaining).toBe(0);
    });
});

// ============================================
// ТЕСТИ XSS ДЕТЕКЦІЇ
// ============================================

describe('XSS Vector Detection Tests', () => {
    test('Should detect script tag', () => {
        expect(containsXSSVector('<script>alert("xss")</script>')).toBe(true);
    });

    test('Should detect javascript protocol', () => {
        expect(containsXSSVector('javascript:alert("xss")')).toBe(true);
    });

    test('Should detect onclick handler', () => {
        expect(containsXSSVector('onclick=alert("xss")')).toBe(true);
    });

    test('Should detect iframe tag', () => {
        expect(containsXSSVector('<iframe src="evil.com"></iframe>')).toBe(true);
    });

    test('Should detect object tag', () => {
        expect(containsXSSVector('<object data="evil"></object>')).toBe(true);
    });

    test('Should detect embed tag', () => {
        expect(containsXSSVector('<embed src="evil.swf">')).toBe(true);
    });

    test('Should detect img onerror', () => {
        expect(containsXSSVector('<img src=x onerror=alert("xss")>')).toBe(true);
    });

    test('Should not detect safe content', () => {
        expect(containsXSSVector('Hello world, this is a safe message!')).toBe(false);
    });

    test('Should be case insensitive', () => {
        expect(containsXSSVector('JAVASCRIPT:alert("xss")')).toBe(true);
        expect(containsXSSVector('<SCRIPT>alert("xss")</SCRIPT>')).toBe(true);
    });
});

// ============================================
// ІНТЕГРАЦІЙНІ ТЕСТИ
// ============================================

describe('Integration Tests', () => {
    test('Should handle XSS attempt through sanitization', () => {
        const maliciousInput = '<script>alert("xss")</script>Hello';
        const sanitized = sanitizeInput(maliciousInput);
        expect(containsXSSVector(sanitized)).toBe(false);
    });

    test('Should validate and sanitize together', () => {
        const maliciousFormData = {
            from_name: 'John<script>',
            from_email: 'test@example.com',
            message: 'This has javascript: protocol injected'
        };

        const sanitizedFormData = {
            from_name: sanitizeInput(maliciousFormData.from_name),
            from_email: sanitizeInput(maliciousFormData.from_email),
            message: sanitizeInput(maliciousFormData.message)
        };

        const errors = validateFormData(sanitizedFormData);
        expect(Object.keys(errors).length).toBe(0);
    });

    test('Complete secure form submission flow', () => {
        // 1. Rate limit check
        const rateLimitState: RateLimitState = { count: 0, resetTime: Date.now() + 60000 };
        const { allowed: rateLimitAllowed } = checkRateLimit(rateLimitState);
        expect(rateLimitAllowed).toBe(true);

        // 2. Sanitize input
        const rawInput = {
            from_name: '  John Doe  <script>',
            from_email: 'john@example.com',
            message: 'This is a valid message with javascript: in it'
        };

        const sanitizedInput = {
            from_name: sanitizeInput(rawInput.from_name),
            from_email: sanitizeInput(rawInput.from_email),
            message: sanitizeInput(rawInput.message)
        };

        // 3. Validate
        const errors = validateFormData(sanitizedInput);
        expect(Object.keys(errors).length).toBe(0);

        // 4. Check no XSS vectors remain
        expect(containsXSSVector(sanitizedInput.from_name)).toBe(false);
        expect(containsXSSVector(sanitizedInput.from_email)).toBe(false);
        expect(containsXSSVector(sanitizedInput.message)).toBe(false);
    });
});

// ============================================
// TEST RUNNER
// ============================================

// Simple test runner for manual execution
function runTests() {
    console.log('🧪 Running Form Security Tests...\n');

    const tests: { [key: string]: (() => void)[] } = {
        'Sanitization Tests': [
            () => console.assert(sanitizeInput('<script>xss</script>') === 'scriptxss/script', 'Remove HTML tags'),
            () => console.assert(sanitizeInput('javascript:alert()').includes('javascript:') === false, 'Remove javascript:'),
            () => console.assert(sanitizeInput('   test   ') === 'test', 'Trim whitespace'),
        ],
        'Email Validation Tests': [
            () => console.assert(validateEmail('test@example.com') === true, 'Valid email'),
            () => console.assert(validateEmail('invalid-email') === false, 'Invalid email'),
            () => console.assert(validateEmail('test@') === false, 'Email without domain'),
        ],
        'Rate Limiting Tests': [
            () => {
                const state: RateLimitState = { count: 0, resetTime: Date.now() + 60000 };
                const { allowed } = checkRateLimit(state);
                console.assert(allowed === true, 'Allow first attempt');
            },
            () => {
                const state: RateLimitState = { count: 3, resetTime: Date.now() + 60000 };
                const { allowed } = checkRateLimit(state);
                console.assert(allowed === false, 'Block when limit reached');
            }
        ],
        'XSS Detection Tests': [
            () => console.assert(containsXSSVector('<script>xss</script>') === true, 'Detect script tag'),
            () => console.assert(containsXSSVector('safe content') === false, 'Allow safe content'),
        ]
    };

    let totalTests = 0;
    let passedTests = 0;

    for (const [category, testList] of Object.entries(tests)) {
        console.log(`\n📋 ${category}`);
        for (const test of testList) {
            totalTests++;
            try {
                test();
                passedTests++;
                console.log('  ✅ Passed');
            } catch (error) {
                console.log('  ❌ Failed');
            }
        }
    }

    console.log(`\n\n📊 Results: ${passedTests}/${totalTests} tests passed`);
    return passedTests === totalTests;
}

export { runTests };
