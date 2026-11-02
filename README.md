# 🚀 RankMetric

### AI-Powered SEO Intelligence & Rank Tracking Platform

RankMetric is a full-stack, end-to-end SEO intelligence platform designed to help website owners, developers, marketers, and businesses analyze website performance, identify SEO issues, monitor search rankings, compare competitors, and receive AI-powered optimization recommendations.

It combines website SEO analysis, Google Lighthouse performance insights, AI-powered recommendations, keyword rank tracking, competitor analysis, historical reporting, and subscription management in one platform.

---

## ✨ Key Features

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
Provides actionable SEO recommendations based on detected website issues and analysis results.

### ⚡ Performance Analysis
Integrated Google Lighthouse analysis covering:
- Performance
- Core Web Vitals
- Accessibility
- Best Practices
- Performance Metrics

### 📈 Rank Tracking
- Keyword ranking monitoring
- Ranking history
- Ranking improvements and drops
- Historical performance visualization

### 🏆 Competitor Analysis
Analyze competitor websites and compare SEO performance to identify optimization opportunities.

### 📊 Historical Tracking
Store and visualize historical ranking data to understand SEO growth and performance trends.

### 📄 PDF SEO Reports
Generate downloadable reports containing:
- Website analysis
- SEO scores
- Detected issues
- Performance metrics
- SEO recommendations

### 💳 Pro Subscription
Integrated Razorpay payment system featuring:
- Free scan limits
- Monthly Pro subscription
- Razorpay checkout
- Payment verification
- Pro feature access
- Subscription expiry management

---

## 🔄 End-to-End Workflow

RankMetric connects the complete SEO analysis and optimization process:

```text
User
  |
  v
Email OTP Authentication
  |
  v
JWT Authorization
  |
  v
RankMetric Dashboard
  |
  v
Enter Website URL
  |
  v
Website SEO Analysis
  |
  +--> Meta Tags
  +--> Headings
  +--> Content
  +--> Images
  +--> Links
  +--> Keywords
  +--> Technical SEO
  |
  v
Google Lighthouse Analysis
  |
  +--> Performance
  +--> Accessibility
  +--> Best Practices
  +--> Core Web Vitals
  |
  v
SEO Score and Issues
  |
  v
AI SEO Recommendations
  |
  +--> Rank Tracking
  +--> Competitor Analysis
  +--> Historical Tracking
  |
  v
SEO Insights and PDF Reports
  |
  v
Pro Subscription
  |
  v
Razorpay Payment Verification
  |
  v
Pro Feature Access
```

---

## 🏗️ System Architecture

```text
                  +---------------------+
                  |        User         |
                  +----------+----------+
                             |
                             v
                  +---------------------+
                  |   React Frontend    |
                  | TypeScript + Vite   |
                  |    Tailwind CSS     |
                  +----------+----------+
                             |
                       REST API / JWT
                             |
                             v
                  +---------------------+
                  |   Node.js + Express |
                  |       Backend       |
                  +----------+----------+
                             |
          +------------------+------------------+
          |                  |                  |
          v                  v                  v
     +----------+      +-------------+     +------------+
     | MongoDB  |      |  SEO Engine |     | AI Advisor |
     +----------+      +------+------+     +------------+
                             |
                     +-------+-------+
                     |               |
                     v               v
                +----------+    +-------------+
                |Lighthouse|    | Rank Tracker|
                +----------+    +-------------+
                     |               |
                     +-------+-------+
                             |
                             v
                    +----------------+
                    |  SEO Insights  |
                    +----------------+
                             |
             +---------------+---------------+
             |               |               |
             v               v               v
        PDF Reports     Competitor      AI Recommendations
                       Analysis
```

---

## 🛠️ Technology Stack

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

### AI and SEO
- AI-powered SEO recommendations
- Google Lighthouse
- Core Web Vitals
- SEO analysis engine

### Payment Integration
- Razorpay

### Report Generation
- PDFKit

### Development Tools
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

### 2. Install Root Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `backend` directory.

Example configuration:

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

**Security:** Never commit your `.env` file or expose API keys, passwords, or private credentials publicly.

### 5. Start the Backend

From the `backend` directory:

```bash
node server.js
```

### 6. Start the Frontend

Open a separate terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your browser.

---

## 🔑 Authentication Flow

```text
Enter Email
    |
    v
Send OTP
    |
    v
Verify OTP
    |
    v
Generate JWT
    |
    v
Authenticated User
    |
    v
Access Protected APIs
```

---

## 💳 Subscription Flow

```text
Free User
    |
    v
Free Scan Limit
    |
    v
Upgrade to Pro
    |
    v
Razorpay Checkout
    |
    v
Payment Verification
    |
    v
Pro Account
    |
    v
Access Pro Features
```

---

## 🔌 API Modules

### Authentication

| Method | Endpoint |
|---|---|
| POST | `/api/auth/send-otp` |
| POST | `/api/auth/verify-otp` |

### SEO Analysis

| Method | Endpoint |
|---|---|
| POST | `/api/analyze` |

### Competitor Analysis

| Method | Endpoint |
|---|---|
| POST | `/api/competitors` |

### Historical Ranking

| Method | Endpoint |
|---|---|
| GET | `/api/rank-history/:keyword` |

### Payments

| Method | Endpoint |
|---|---|
| POST | `/api/payment/create-order` |
| POST | `/api/payment/verify` |

---

## 🔒 Security

RankMetric incorporates:
- JWT authentication and authorization
- Protected API routes
- Email OTP verification
- Environment-based secret management
- User-specific data access
- Razorpay payment verification

---

## 📈 Future Enhancements

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

Information Science & Engineering

GitHub: [AjayKumarKR07](https://github.com/AjayKumarKR07)

**Repository:** [RankMetric](https://github.com/AjayKumarKR07/RankMetric)

---

## 📜 License

This project is licensed under the MIT License.

---

⭐ If you find RankMetric useful, consider giving the repository a star!
