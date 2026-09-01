# Form Security Tests Documentation

## 📋 Загальна Інформація

Комплексна кількість тестів для перевірки безпеки контактної форми портфоліо. Тести покривають всі аспекти безпеки:

- ✅ **Санітизація вхідних даних** - захист від XSS атак
- ✅ **Email валідація** - коректна перевірка email адрес
- ✅ **Валідація форми** - перевірка всіх обов'язкових полів
- ✅ **Rate Limiting** - захист від спама (3 спроби за 60 секунд)
- ✅ **XSS детекція** - виявлення потенційних XSS векторів

## 📁 Структура Файлів

```
src/
├── utils/
│   ├── formSecurity.ts          # Функції безпеки форми
│   └── formSecurity.test.ts     # Тести
└── components/
    └── Contact/
        └── Contact.tsx          # Компонент форми (використовує утиліти)
```

## 🧪 Як Запустити Тести

### Варіант 1: Browser Console (Без налаштування)

1. Відкрийте DevTools (F12)
2. Перейдіть на закладку **Console**
3. Вставте цей код:

```javascript
import { runTests } from './src/utils/formSecurity.test.ts';
runTests();
```

### Варіант 2: Встановлення Jest (Рекомендується)

1. Встановіть залежності:
```bash
npm install --save-dev jest @types/jest ts-jest
```

2. Створіть `jest.config.js`:
```javascript
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)']
};
```

3. Запустіть тести:
```bash
npm test
```

## 📊 Тестові Сценарії

### 1. Санітизація (Sanitization Tests)

**Мета**: Перевірити видалення потенційно небезпечних символів та кодів

| Тест | Вхідні Дані | Очікуваний Результат |
|------|-----------|-------------------|
| Remove HTML tags | `<script>xss</script>` | `scriptxss/script` |
| Remove javascript: | `javascript:alert()` | без `javascript:` |
| Remove event handlers | `onclick=alert()` | без `onclick=` |
| Trim whitespace | `   test   ` | `test` |
| Limit length | `'a' × 6000` | 5000 символів |

**Приклади атак, що блокуються:**
```javascript
// ❌ Блокується
<img src=x onerror="alert('xss')">
<svg onload="alert('xss')">
javascript:void(0)
<script>alert('xss')</script>
```

### 2. Email Валідація (Email Validation Tests)

**Мета**: Перевірити коректність email адрес

| Тест | Email | Результат |
|------|-------|----------|
| Valid email | `user@example.com` | ✅ Pass |
| Missing @ | `userexample.com` | ❌ Fail |
| Missing domain | `user@` | ❌ Fail |
| With spaces | `user @example.com` | ❌ Fail |
| Too long (>254) | `a×255@example.com` | ❌ Fail |

### 3. Валідація Форми (Form Validation Tests)

**Мета**: Перевірити коректність всіх полів форми

#### Name Field
- Обов'язкове поле
- Мінімум 2 символи
- Максимум 100 символів

#### Email Field
- Обов'язкове поле
- Коректний формат email
- Максимум 254 символи

#### Message Field
- Обов'язкове поле
- Мінімум 10 символів
- Максимум 5000 символів

**Приклади помилок:**
```javascript
validateFormData({
  from_name: '',  // ❌ Error: Name is required
  from_email: 'invalid',  // ❌ Error: Invalid email
  message: 'short'  // ❌ Error: Min 10 characters
})
```

### 4. Rate Limiting (Rate Limiting Tests)

**Мета**: Захист від спама - максимум 3 спроби за 60 секунд

| Спроба | Дозволено | Примітка |
|--------|----------|---------|
| 1-а | ✅ Так | Лічильник = 1 |
| 2-а | ✅ Так | Лічильник = 2 |
| 3-я | ✅ Так | Лічильник = 3 |
| 4-а | ❌ Ні | Лічильник = 3 (блокування) |
| Після 60s | ✅ Так | Лічильник скидується |

**Як це працює:**
```javascript
const state = { count: 0, resetTime: Date.now() + 60000 };
const { allowed, newState } = checkRateLimit(state);

// Перша спроба
allowed = true  // ✅

// Після 3 спроб
allowed = false  // ❌
newState.resetTime = Date.now() + 60000  // Час скидання
```

### 5. XSS Детекція (XSS Vector Detection Tests)

**Мета**: Виявлення потенційних XSS атак перед відправкою

**Виявляються атаки:**
- `<script>` теги
- `javascript:` протокол
- Event handlers (`onclick=`, `onload=` тощо)
- `<iframe>`, `<object>`, `<embed>` теги
- `<img onerror>` атаки

**Приклад:**
```javascript
containsXSSVector('<script>alert("xss")</script>')  // ✅ true
containsXSSVector('Hello world')  // ❌ false
```

## 🔒 Інтеграційний Тест

**Повний цикл безпеки форми:**

```javascript
// 1. Rate limit check ✅
const { allowed } = checkRateLimit(rateLimitState);

// 2. Sanitize input ✅
const sanitized = sanitizeInput(rawInput);

// 3. Validate ✅
const errors = validateFormData(sanitized);

// 4. Check no XSS vectors ✅
const hasXSS = containsXSSVector(sanitized.message);

// 5. Send if all passed ✅
if (allowed && !errors && !hasXSS) {
    await emailjs.sendForm(...);
}
```

## 📊 Очікувані Результати

При запуску всіх тестів ви повинні побачити:

```
🧪 Running Form Security Tests...

📋 Sanitization Tests
  ✅ Passed
  ✅ Passed
  ✅ Passed
  ...

📋 Email Validation Tests
  ✅ Passed
  ...

📋 Form Validation Tests
  ✅ Passed
  ...

📋 Rate Limiting Tests
  ✅ Passed
  ...

📋 XSS Detection Tests
  ✅ Passed
  ...

📊 Results: 28/28 tests passed
```

## 🛡️ Безпеки, що Покриваються

| Загроза | Захист | Реалізація |
|---------|--------|-----------|
| **XSS атаки** | Санітизація | `sanitizeInput()` видаляє `<>`, `javascript:`, event handlers |
| **Спам** | Rate Limiting | Максимум 3 спроби за 60 сек, зберігається в localStorage |
| **Невалідні дані** | Валідація | Email regex, довжина полів, обов'язкові поля |
| **Інєкція кодів** | Санітизація | Видалення потенційних XSS векторів |
| **Brute force** | Rate Limiting | Заблокування після 3 спроб |

## 🚀 Як Використовувати в Production

1. **Тести** чекаються перед кожним build
2. **Санітизація** виконується автоматично при введенні
3. **Rate Limiting** збережується в localStorage користувача
4. **Email** відправляється тільки після всіх перевірок

## 📝 Примітки

- Тести використовують сімполе console.assert для утиліт
- Для повноцінного тестування з Jest потрібна конфігурація
- Rate Limiting скидується після 60 секунд або після перезавантаження браузера
- Всі дані санітизуються перед відправкою на сервер

## 🔗 Файли

- `src/utils/formSecurity.ts` - Основні функції безпеки
- `src/utils/formSecurity.test.ts` - Всі тести
- `src/components/Contact/Contact.tsx` - Компонент форми (використовує утиліти)
