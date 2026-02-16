# Address Book – Nuxt 4 CRUD Application

A structured CRUD application built with **Nuxt 4**, demonstrating scalable frontend architecture, SSR-safe authentication, optimistic UI updates, and centralized API abstraction.

This repository is maintained as a reference implementation for clean Nuxt 4 application structure within the organization.

---

## Overview

This project demonstrates:

- Clean separation of concerns
- Centralized API layer
- SSR-safe authentication using cookies
- Optimistic state management
- Typed server-client integration
- Scalable folder architecture

The goal is to provide a maintainable and extensible base for internal or production applications.

---

## Tech Stack

- Nuxt 4
- TypeScript (strict mode)
- Pinia
- Nuxt Server Routes (`/server/api`)
- vee-validate v4 + yup
- Tailwind CSS
- Cookie-based authentication

---

## Project Structure

```
.
├── components/
│   ├── AppLogo.vue
│   └── ConfirmModal.vue
├── composables/
│   ├── useApi.ts
│   ├── useAuth.ts
│   └── useContacts.ts
├── middleware/
│   ├── auth.ts
│   └── redirect-root.global.ts
├── pages/
│   ├── login.vue
│   └── addressbook.vue
├── server/
│   ├── api/
│   │   ├── auth/login.post.ts
│   │   └── contacts/
│   └── utils/auth.ts
├── stores/
│   └── auth.ts
├── types/
│   ├── auth.ts
│   └── contact.ts
├── utils/
│   └── contactSchema.ts
└── README.md

```

---

## Authentication

**Demo Credentials**

```
Email: admin@admin.com
Password: 123456
```

### Features

- Server-side credential validation
- Cookie-based token storage (SSR-safe)
- Pinia store synchronized with cookies
- Protected route middleware
- Automatic redirect on unauthorized access

---

## Features

### Authentication
- Login page with schema validation
- Persistent authentication via cookies
- SSR-aware route protection

### Contacts CRUD
- List contacts
- Create contact (validated)
- Inline edit with validation
- Delete with confirmation modal
- Optimistic UI updates
- Rollback on failed deletion

### UX
- Centralized API abstraction
- Inline validation errors
- Loading states
- Accessible form labels
- Responsive layout
- Styled bordered table

---

## Architecture Highlights

### Centralized API Layer

`useApi.ts` abstracts:

- Authorization header injection
- Error normalization
- Typed responses

Ensures consistent API handling across composables.

---

### Optimistic UI Strategy

- Create → immediate push
- Update → row replacement
- Delete → immediate removal with rollback

Avoids unnecessary refetching and improves responsiveness.

---

### Shared Validation Schema

Validation rules are defined once in:

```
utils/contactSchema.ts
```

Used for:

- Create form (vee-validate)
- Inline edit validation

Prevents rule duplication.

---

### Requirements

- Node.js >= 18
- npm >= 9

## Installation

```bash
git clone https://github.com/differenz-system/Addressbook.NuxtJs
cd Addressbook.NuxtJs
npm install
npm run dev
```

Application runs at:

```
http://localhost:3000
```

---

## License

MIT
