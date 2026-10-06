
# 🚀 RankMetric

### AI-Powered SEO Intelligence & Rank Tracking Platform

RankMetric is a **full-stack, end-to-end SEO intelligence platform** designed to help website owners, developers, marketers, and businesses analyze website performance, identify SEO issues, monitor search rankings, compare competitors, and receive AI-powered optimization recommendations.

The platform provides a complete workflow from **user authentication and website analysis to AI recommendations, rank tracking, competitor analysis, PDF reporting, and Pro subscription payments**.

---

## ✨ Features

### 🔐 Secure Authentication

- Email OTP authentication
- JWT-based authorization
- Protected API endpoints
- User-specific data access

### 🔍 Website SEO Analyzer

Analyze websites across multiple SEO factors:

- SEO Score
- Meta Tags
- Headings
- Content
- Images
- Links
- Keywords
- Technical SEO
- SEO Issues
- On-page SEO analysis

### 🤖 AI SEO Advisor

Provides intelligent and actionable SEO recommendations based on the detected issues and website analysis results.

### ⚡ Performance Analysis

Integrated performance analysis using:

- Google Lighthouse
- Core Web Vitals
- Performance Metrics
- Accessibility
- Best Practices

### 📈 Rank Tracking

Track keyword rankings and monitor SEO performance over time.

- Keyword tracking
- Ranking history
- Ranking improvements
- Ranking drops
- Historical performance visualization

### 🏆 Competitor Analysis

Analyze competitor websites and compare SEO performance to identify opportunities for improvement.

### 📊 Historical Tracking

Store and visualize historical ranking data to understand SEO growth and performance trends.

### 📄 PDF SEO Reports

Generate downloadable SEO reports containing:

- Website analysis
- SEO score
- Detected issues
- Performance metrics
- SEO recommendations

### 💳 Pro Subscription

Integrated Razorpay payment system with:

- Free scan limits
- Monthly Pro subscription
- Razorpay checkout
- Payment verification
- Pro feature access
- Subscription expiry management

---

## 🔄 End-to-End Workflow

RankMetric implements a complete end-to-end SEO workflow:

```text
User
 │
 ▼
Email OTP Authentication
 │
 ▼
JWT Authentication
 │
 ▼
RankMetric Dashboard
 │
 ▼
Enter Website URL
 │
 ▼
SEO Analysis
 │
 ├── Meta Tags
 ├── Headings
 ├── Content
 ├── Images
 ├── Links
 ├── Keywords
 └── Technical SEO
 │
 ▼
Google Lighthouse
 │
 ├── Performance
 ├── Accessibility
 ├── Best Practices
 └── Core Web Vitals
 │
 ▼
SEO Score & Issues
 │
 ▼
AI SEO Advisor
 │
 ▼
Actionable Recommendations
 │
 ├───────────────┬─────────────────┐
 ▼               ▼                 ▼
Rank Tracking   Competitor       Historical
                Analysis          Tracking
 │               │                 │
 └───────────────┴─────────────────┘
 │
 ▼
PDF SEO Report
 │
 ▼
Pro Subscription
 │
 ▼
Razorpay Payment
 │
 ▼
Pro Features
```

---

## 🏗️ System Architecture

```text
                         ┌─────────────────────┐
                         │        User         │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │ TypeScript + Vite   │
                         │    Tailwind CSS     │
                         └──────────┬──────────┘
                                    │
                              REST API / JWT
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Node.js + Express │
                         │       Backend       │
                         └──────────┬──────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          │                         │                         │
          ▼                         ▼                         ▼
   ┌────────────┐           ┌──────────────┐          ┌─────────────┐
   │  MongoDB   │           │  SEO Engine  │          │ AI Advisor  │
   └────────────┘           └───────┬──────┘          └─────────────┘
                                    │
                         ┌──────────┴──────────┐
                         │                     │
                         ▼                     ▼
                  ┌─────────────┐       ┌──────────────┐
                  │  Lighthouse │       │ Rank Tracker │
                  └─────────────┘       └──────────────┘
                         │                     │
                         └──────────┬──────────┘
                                    ▼
                           ┌─────────────────┐
                           │  SEO Insights   │
                           └─────────────────┘
                                    │
                    ┌───────────────┼────────────────┐
                    ▼               ▼                ▼
              PDF Reports     Competitor       AI Recommendations
                              Analysis
```

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- Recharts

### Backend

- Node.js
- Express.js
- REST APIs
- JWT
- Nodemailer

### Database

- MongoDB
- Mongoose

### AI & SEO

- AI-powered SEO recommendations
- Google Lighthouse
- Core Web Vitals
- SEO analysis engine

### Payments

- Razorpay

### Reporting

- PDFKit

### Development

- Git
- GitHub
- Postman

---

## 📁 Project Structure

```text
RankMetric/
│
├── backend/
│   ├── ai/
│   ├── controllers/
│   ├── lighthouse/
│   ├── mail/
│   ├── models/
│   ├── pdf/
│   ├── routes/
│   ├── scheduler/
│   ├── services/
│   └── server.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── utils/
│       ├── App.tsx
│       └── main.tsx
│
├── postman/
├── seo-rank-tracker/
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AjayKumarKR07/RankMetric.git
cd RankMetric
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create:

```text
backend/.env
```

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

GROQ_API_KEY=your_groq_api_key
```

> ⚠️ Never commit your `.env` file or expose API keys and secrets publicly.

### 5. Start Backend

```bash
cd backend
node server.js
```

### 6. Start Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will then connect to the backend API.

---

## 🔑 Authentication Flow

```text
Enter Email
     │
     ▼
Send OTP
     │
     ▼
Verify OTP
     │
     ▼
Generate JWT
     │
     ▼
Authenticated User
     │
     ▼
Access Protected APIs
```

---

## 💳 Subscription Flow

```text
Free User
    │
    ▼
Free Scan Limit
    │
    ▼
Upgrade to Pro
    │
    ▼
Razorpay Checkout
    │
    ▼
Payment Verification
    │
    ▼
Pro Account
    │
    ▼
Advanced Features
```

---

## 🔌 API Modules

### Authentication

```text
POST /api/auth/send-otp
POST /api/auth/verify-otp
```

### SEO Analysis

```text
POST /api/analyze
```

### Competitor Analysis

```text
POST /api/competitors
```

### Historical Ranking

```text
GET /api/rank-history/:keyword
```

### Payments

```text
POST /api/payment/create-order
POST /api/payment/verify
```

---

## 🔒 Security

RankMetric implements multiple security mechanisms:

- JWT authentication
- Protected API routes
- Email OTP verification
- Environment-based secret management
- User-specific data access
- Razorpay payment verification
- Secure API authorization

---

## 📈 Future Enhancements

Planned improvements include:

- Google Search Console integration
- Google Analytics integration
- Automated SEO monitoring
- Advanced keyword research
- AI content generation
- Backlink monitoring
- Automated email SEO reports
- Multi-project SEO management
- Advanced competitor intelligence

---

## 👨‍💻 Developer

**Ajay Kumar K R**

GitHub:  
https://github.com/AjayKumarKR07

---

## 📜 License

This project is licensed under the **MIT License**.

---

⭐ If you find RankMetric useful, consider giving the repository a star!
