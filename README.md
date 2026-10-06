\# 🚀 RankMetric



\### AI-Powered SEO Intelligence \& Rank Tracking Platform



RankMetric is a full-stack SEO intelligence platform designed to help website owners, developers, marketers, and businesses analyze website performance, identify SEO issues, monitor search rankings, compare competitors, and receive AI-powered optimization recommendations.



\---



\## ✨ Features



\### 🔍 Website SEO Analyzer

Analyze a website and identify important SEO factors including:



\- SEO Score

\- Meta Tags

\- Headings

\- Content

\- Images

\- Links

\- Keywords

\- Technical SEO

\- SEO Issues



\### 🤖 AI SEO Advisor

Provides intelligent, actionable recommendations based on the detected SEO issues.



\### ⚡ Performance Analysis



Integrated performance analysis with:



\- Google Lighthouse

\- Core Web Vitals

\- Performance Metrics

\- Accessibility insights

\- Best Practices



\### 📈 Rank Tracking



Track keyword search rankings over time and monitor ranking improvements or drops.



\### 🏆 Competitor Analysis



Compare SEO and ranking performance against competitors to identify opportunities for improvement.



\### 📊 Historical Tracking



Store and visualize historical ranking data to understand SEO growth over time.



\### 📄 PDF SEO Reports



Generate downloadable SEO reports containing website analysis, SEO scores, issues, and recommendations.



\### 🔐 Secure Authentication



\- Email OTP authentication

\- JWT-based authorization

\- Protected API endpoints



\### 💳 Pro Subscription



Integrated Razorpay payment system with:



\- Free scan limits

\- Pro subscription

\- Monthly Pro plan

\- Payment verification

\- Pro feature access



\---



\## 🏗️ System Architecture



```text

&#x20;                   ┌─────────────────────┐

&#x20;                   │       User          │

&#x20;                   └──────────┬──────────┘

&#x20;                              │

&#x20;                              ▼

&#x20;                   ┌─────────────────────┐

&#x20;                   │   React Frontend   │

&#x20;                   │ TypeScript + Vite  │

&#x20;                   │    Tailwind CSS    │

&#x20;                   └──────────┬──────────┘

&#x20;                              │

&#x20;                        REST API / JWT

&#x20;                              │

&#x20;                              ▼

&#x20;                   ┌─────────────────────┐

&#x20;                   │  Node.js + Express │

&#x20;                   │      Backend       │

&#x20;                   └──────────┬──────────┘

&#x20;                              │

&#x20;         ┌────────────────────┼────────────────────┐

&#x20;         ▼                    ▼                    ▼

&#x20;    ┌──────────┐       ┌─────────────┐      ┌────────────┐

&#x20;    │ MongoDB  │       │ SEO Engine  │      │ AI Advisor │

&#x20;    └──────────┘       └──────┬──────┘      └────────────┘

&#x20;                              │

&#x20;                   ┌──────────┴──────────┐

&#x20;                   ▼                     ▼

&#x20;              Lighthouse          Rank Tracking

&#x20;                   │                     │

&#x20;                   └──────────┬──────────┘

&#x20;                              ▼

&#x20;                      SEO Insights

