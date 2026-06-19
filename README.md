# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# ✨ Signetly

A modern full-stack e-signature platform that enables users to upload PDF documents, place signatures, invite signers, share secure signing links, and track document signing progress in real time.

---

## 🚀 Features

### 🔐 Authentication

* User registration and login
* JWT-based authentication
* Protected routes

### 📄 Document Management

* Upload PDF documents
* View uploaded documents
* Dashboard with document status tracking
* Delete documents

### ✍️ Signature System

* Typed signatures
* Drawn signatures using canvas
* Drag-and-drop signature positioning
* Delete signatures
* Download signed PDFs

### 👥 Collaborative Signing

* Invite signers via email
* Generate secure signing links
* External signing workflow
* Track signer status

### 📊 Status Tracking

Document lifecycle:

* Pending
* Partially Signed
* Signed

Signer lifecycle:

* Pending
* Signed

### 🔔 User Experience

* Toast notifications
* Modern responsive UI
* Real-time updates
* Clean dashboard experience

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* Tailwind CSS
* Axios
* React Hot Toast

### Backend

* Node.js
* Express.js
* JWT Authentication
* Multer

### Database

* MongoDB
* Mongoose

### PDF Handling

* PDF Upload & Storage
* Signature Placement
* Signed PDF Download

---

## 📂 Project Structure

document-signature-app/

├── client/

│ ├── src/

│ ├── pages/

│ ├── services/

│ └── components/

│

└── server/

├── controllers/

├── models/

├── routes/

├── middleware/

└── uploads/

---

## ⚙️ Local Setup

### Clone Repository

```bash
git clone <your-repository-url>
cd document-signature-app
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### MongoDB

Run MongoDB locally or using Docker:

```bash
docker run -d \
  --name signetly-mongo \
  -p 27017:27017 \
  mongo:7
```

---

## 🔄 Workflow

### Document Owner

1. Register/Login
2. Upload PDF
3. Add signatures
4. Invite signers
5. Share signing link
6. Track signing progress
7. Download signed PDF

### Signer

1. Open signing link
2. Enter invited email
3. Place signature
4. Submit signature

---

## 📸 Screenshots

Add screenshots of:

* Landing Page
* Dashboard
* Upload Page
* Document Viewer
* Signature Placement
* Shared Signing Page

---

## 🎯 Future Improvements

* Email delivery integration
* OTP verification
* Multi-page PDF signing
* Digital certificate support
* Signature history timeline
* Real-time collaboration
* Cloud storage integration
* Role-based permissions

---

## 👩‍💻 Author

Keerti Gupta

Built as a full-stack collaborative document signing platform using React, TypeScript, Express, MongoDB, and modern web technologies.
