# Email Templates - TypeScript Types

## 📝 Overview

Email templates now have full TypeScript type definitions for better developer experience and type safety.

## 🎯 Type Definitions

### `EmailTemplate` Interface

Defines the structure of an email template return value:

```typescript
interface EmailTemplate {
  subject: string;  // Email subject line
  html: string;     // HTML version of email
  text: string;     // Plain text fallback
}
```

### `EmailTemplates` Interface

Defines all available email template functions:

```typescript
interface EmailTemplates {
  subscriptionCancelled: (userName: string, planName: string) => EmailTemplate;
  paymentFailed: (userName: string) => EmailTemplate;
  welcome: (userName: string) => EmailTemplate;
  subscriptionSuccess: (userName: string, planName: string, amount: string) => EmailTemplate;
  renewalReminder: (userName: string, planName: string, renewalDate: string, amount: string) => EmailTemplate;
}
```

## ✅ Benefits

### 1. **Autocomplete**

When you type `emailTemplates.`, your IDE shows all available templates:

```typescript
emailTemplates.
  ├─ subscriptionCancelled()
  ├─ paymentFailed()
  ├─ welcome()
  ├─ subscriptionSuccess()
  └─ renewalReminder()
```

### 2. **Parameter Validation**

TypeScript catches incorrect function calls:

```typescript
// ✅ Correct
emailTemplates.welcome("John Doe");

// ❌ Error: Expected 1 argument, but got 0
emailTemplates.welcome();

// ❌ Error: Expected string, but got number
emailTemplates.welcome(123);

// ❌ Error: Expected 2 arguments, but got 1
emailTemplates.subscriptionCancelled("John");
```

### 3. **Return Type Validation**

TypeScript ensures templates return the correct structure:

```typescript
// ✅ Correct - has subject, html, and text
const email: EmailTemplate = emailTemplates.welcome("John");

// ❌ Error: Missing 'text' property
const badEmail: EmailTemplate = {
  subject: "Test",
  html: "<p>Test</p>"
};
```

### 4. **Intellisense Hints**

Hover over a template to see:
- Function signature
- Parameter types
- Return type
- JSDoc comments (if added)

### 5. **Refactoring Safety**

If you rename a template or change parameters:
- TypeScript shows errors everywhere it's used
- No need to manually search for usages
- Prevents runtime errors

## 📖 Usage Examples

### Basic Usage

```typescript
import { emailTemplates } from "~/server/utils/sendEmail";

// Welcome email
const welcome = emailTemplates.welcome("John Doe");

// Subscription success
const success = emailTemplates.subscriptionSuccess(
  "John Doe",
  "Premium",
  "$19.99"
);

// Payment failed
const failed = emailTemplates.paymentFailed("John Doe");
```

### With sendEmail Function

```typescript
import { sendEmail, emailTemplates } from "~/server/utils/sendEmail";

const userName = "John Doe";
const userEmail = "john@example.com";

// Get template
const emailContent = emailTemplates.welcome(userName);

// Send email
await sendEmail({
  to: userEmail,
  subject: emailContent.subject,
  html: emailContent.html,
  text: emailContent.text,
});
```

### In API Endpoints

```typescript
// server/api/auth/welcome-email.post.ts
import { sendEmail, emailTemplates } from "~/server/utils/sendEmail";

export default defineEventHandler(async (event) => {
  const { userName, userEmail } = await readBody(event);
  
  // TypeScript validates parameters and return type
  const emailContent = emailTemplates.welcome(userName);
  
  await sendEmail({
    to: userEmail,
    ...emailContent,  // Spreads subject, html, text
  });
  
  return { success: true };
});
```

### Custom Template with Same Type

```typescript
import type { EmailTemplate } from "~/server/utils/sendEmail";

// Create a custom template that matches the interface
const customTemplate = (userName: string): EmailTemplate => ({
  subject: `Custom Email for ${userName}`,
  html: `<p>Hello ${userName}!</p>`,
  text: `Hello ${userName}!`,
});

// TypeScript ensures it has the correct structure
const email = customTemplate("Jane");
```

## 🔍 Type Checking

### During Development

TypeScript checks types as you write code:
- Red squiggles for errors
- Yellow warnings for potential issues
- Hover tooltips for type information

### During Build

If you have type errors, the build will fail:

```bash
yarn build

# Output:
# ERROR in server/utils/emailTemplates.ts
# Type 'string' is not assignable to type 'EmailTemplate'
```

## 🛠️ Adding New Templates

When adding a new template:

1. **Update the `EmailTemplates` interface:**

```typescript
export interface EmailTemplates {
  // ... existing templates
  newTemplate: (param1: string, param2: number) => EmailTemplate;
}
```

2. **Implement the template:**

```typescript
export const emailTemplates: EmailTemplates = {
  // ... existing templates
  newTemplate: (param1: string, param2: number) => ({
    subject: `Subject with ${param1}`,
    html: `<p>HTML with ${param2}</p>`,
    text: `Text with ${param1} and ${param2}`,
  }),
};
```

3. **TypeScript validates automatically:**
   - Missing implementation → Error
   - Wrong parameters → Error
   - Missing properties → Error

## 📚 Type Exports

All types are exported from `sendEmail.ts`:

```typescript
// Import templates
import { emailTemplates } from "~/server/utils/sendEmail";

// Import types
import type { EmailTemplate, EmailTemplates } from "~/server/utils/sendEmail";
```

## 🎓 Best Practices

1. **Always type your custom templates:**
   ```typescript
   const myTemplate = (name: string): EmailTemplate => ({
     subject: "...",
     html: "...",
     text: "...",
   });
   ```

2. **Use type imports for better tree-shaking:**
   ```typescript
   import type { EmailTemplate } from "~/server/utils/sendEmail";
   ```

3. **Leverage autocomplete:**
   - Type `emailTemplates.` and let IDE suggest
   - Hover over templates to see signatures

4. **Let TypeScript guide you:**
   - If you see red squiggles, read the error
   - Don't use `@ts-ignore` to suppress errors
   - Fix the type issue properly

## 🔗 Related Files

- `server/utils/emailTemplates.ts` - Template definitions with types
- `server/utils/sendEmail.ts` - Email sending logic and type exports
- `server/utils/emailTemplates.example.ts` - Usage examples

## 💡 Tips

- Use **Cmd/Ctrl + Click** on `emailTemplates` to jump to definition
- Use **F12** to go to type definition
- Use **Shift + F12** to find all usages
- Use **F2** to rename (renames everywhere safely)

---

**Result:** Fully type-safe email templates with excellent developer experience! 🎉
