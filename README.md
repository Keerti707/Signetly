# ✨ Signetly

A full-stack collaborative e-signature platform inspired by DocuSign and Adobe Sign. Signetly enables users to upload PDF documents, place signatures, invite external signers, share secure signing links, track signing progress, and generate signed PDFs with audit trails.

🌐 Live Demo: https://signetly.vercel.app

---

## 🚀 Overview

Signetly digitizes document signing workflows by eliminating physical paperwork and providing a secure, traceable signing experience.

The platform supports:

* Secure user authentication
* PDF document uploads
* Signature placement and management
* External signer invitations
* Public signing links
* Audit logging
* Status tracking
* Signed PDF generation

---

## ✨ Key Features

### 🔐 Authentication & Security

* JWT-based authentication
* Secure password hashing
* Protected API routes
* Document ownership validation

### 📄 Document Management

* Upload PDF documents
* View uploaded documents
* Delete documents
* Dashboard-based document tracking

### ✍️ Signature Workflows

* Typed signatures
* Drawn signatures
* Drag-and-drop placement
* Signature repositioning
* Signature deletion
* Signature persistence

### 👥 Collaborative Signing

* Invite external signers
* Generate secure signing links
* Public signing workflow
* Signer status tracking

### 📊 Status Lifecycle

Document Status:

* Pending
* Partially Signed
* Signed

Signer Status:

* Pending
* Signed

### 📜 Audit Trails

Every important action is logged:

* Document uploads
* Signer invitations
* Signature placement
* Signature updates
* Signature deletion
* Document signing events

### 📥 PDF Generation

* Embed signatures into PDFs
* Generate downloadable signed documents
* Server-side PDF processing using PDF-Lib

---

## 🏗️ System Architecture

Frontend (React + TypeScript)

↓

REST API (Express.js)

↓

MongoDB Database

↓

PDF Processing Layer (PDF-Lib)

↓

Signed PDF Generation

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
* PDF-Lib

### Database

* MongoDB
* Mongoose

### Deployment

* Frontend: Vercel
* Backend: Node/Express
* Database: MongoDB

---

## 📂 Project Structure

document-signature-app

├── client

│ ├── src

│ ├── pages

│ ├── services

│ └── components

│

└── server

├── controllers

├── models

├── routes

├── middleware

└── uploads

---

## ⚙️ Local Setup

### Frontend

```bash
cd client
npm install
npm run dev
```

Runs on:

```text
http://localhost:5173
```

### Backend

```bash
cd server
npm install
npm run dev
```

Runs on:

```text
http://localhost:5000
```

### MongoDB (Docker)

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
6. Monitor signing progress
7. Download signed PDF

### Signer

1. Open signing link
2. Verify invited email
3. Place signature
4. Submit document

---

## 📸 Screenshots

Add screenshots for:

* Landing Page
* Dashboard
* Upload Workflow
* Document Viewer
* Signature Placement
* Shared Signing Page
* Signed PDF Download

---

## 🎯 Skills Demonstrated

* Full-Stack Development
* SaaS Product Design
* JWT Authentication
* REST API Design
* MongoDB Data Modeling
* File Upload Handling
* PDF Processing
* Audit Logging
* Secure Sharing Workflows
* Responsive UI Development

---

## 🚀 Future Enhancements

* Email delivery integration
* OTP-based signer verification
* Multi-page PDF signing
* Cloud storage support
* Real-time collaboration
* Role-based permissions
* Digital certificate support

---

## 👩‍💻 Author

Keerti Gupta

Built as a portfolio-grade SaaS application demonstrating document lifecycle management, secure signing workflows, audit logging, and PDF processing.
