# ✨ Signetly

A full-stack collaborative e-signature platform inspired by DocuSign and Adobe Sign.

Signetly enables users to upload PDF documents, place digital signatures, invite external signers, share secure signing links, track document progress, maintain audit trails, and generate signed PDFs.

🌐 **Live Frontend Demo:** https://signetly.vercel.app

---

# 🚀 Features

## 🔐 Authentication & Security

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Secure Password Hashing
* Document Ownership Validation

---

## 📄 Document Management

* Upload PDF Documents
* View Uploaded Documents
* Dashboard-Based Document Tracking
* Delete Documents
* Document Status Management

---

## ✍️ Signature Workflows

* Typed Signatures
* Drawn Signatures
* Drag-and-Drop Signature Placement
* Signature Position Persistence
* Signature Editing
* Signature Deletion

---

## 👥 Collaborative Signing

* Invite External Signers
* Generate Tokenized Signing Links
* Public Signing Workflow
* Signer Status Tracking
* Rejection Workflow
* Rejection Reason Tracking

---

## 📜 Audit Logging

Every important action is recorded:

* Document Uploads
* Signer Invitations
* Signature Placement
* Signature Updates
* Signature Deletion
* Document Signing
* Document Rejection
* Timestamp Tracking
* IP Address Tracking

---

## 📊 Status Lifecycle

### Document Status

* Pending
* Partially Signed
* Signed
* Rejected

### Signer Status

* Pending
* Signed

---

## 📥 PDF Generation

The application uses PDF-Lib to:

* Embed Signatures
* Generate Signed PDFs
* Preserve Original Documents
* Export Downloadable Signed Versions

---

# 🏗️ System Architecture

Frontend (React + TypeScript)

↓

REST API (Node.js + Express)

↓

MongoDB Database

↓

PDF Processing Layer (PDF-Lib)

↓

Signed PDF Generation

---

# 🛠️ Tech Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Axios
* React Hot Toast

## Backend

* Node.js
* Express.js
* JWT Authentication
* Multer
* PDF-Lib

## Database

* MongoDB
* Mongoose

## Deployment

* Frontend: Vercel
* Backend: Node.js API
* Database: MongoDB

---

# 📂 Project Structure

```text
document-signature-app

├── client
│   ├── src
│   ├── pages
│   ├── components
│   ├── services
│   └── assets

└── server
    ├── controllers
    ├── routes
    ├── models
    ├── middleware
    └── uploads
```

---

# 🔄 Complete Workflow

## Document Owner

1. Register/Login
2. Upload PDF
3. Add Signature
4. Invite Signers
5. Share Signing Link
6. Track Signing Progress
7. Download Signed PDF

## Signer

1. Open Signing Link
2. Verify Email
3. Sign Document
4. Submit Signature

---

# 📸 Screenshots

## Landing Page

![Landing Page](assets/landing-page.png)

---

## Dashboard

![Dashboard](assets/dashboard.png)

---

## Upload Workflow

![Upload Workflow](assets/upload-workflow.png)

---

## Invite Signers

![Invite Signers](assets/invite-signers.png)

---

## Signing Page

![Signing Page](assets/signing-page.png)

---

## Signed PDF Download

![Signed PDF](assets/signed-pdf.png)

---

# 🎥 Demo Video

Add your demo video link here:

```text
https://your-demo-video-link
```

---

# 🎯 Skills Demonstrated

* Full-Stack Development
* SaaS Product Design
* REST API Development
* JWT Authentication
* MongoDB Data Modeling
* PDF Processing
* Audit Logging
* Secure File Handling
* Document Lifecycle Management
* Responsive UI Design

---

# 🚀 Future Enhancements

* Email Delivery Integration
* Cloud Storage (AWS S3)
* OTP Verification
* Multi-Page Signing
* Real-Time Notifications
* Role-Based Permissions

---

# 👩‍💻 Author

**Keerti Gupta**

Built as a portfolio-grade SaaS application demonstrating secure document lifecycle management, digital signatures, audit logging, collaborative workflows, and PDF generation.
