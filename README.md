# 🚀 SENSAI - AI-Powered Career Assistant

<div align="center">
  <img src="./public/logo.png" alt="SENSAI Logo" width="200" height="200">
  
  **Supercharge your career with AI-driven resume optimization, interview preparation, and ATS analysis**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Latest-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io/)
  [![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
</div>

---

## 📖 Table of Contents

- [🎯 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Environment Setup](#️-environment-setup)
- [📱 Usage](#-usage)
- [🤖 AI Features](#-ai-features)
- [📁 Project Structure](#-project-structure)
- [🔧 API Endpoints](#-api-endpoints)
- [🚢 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 Features

### 🎨 **Smart Resume Builder**
- 📝 AI-powered resume generation and optimization
- 🎯 Industry-specific templates and suggestions
- 📊 Real-time ATS compatibility scoring
- 💾 Multiple format exports (PDF, Word, etc.)

### 🔍 **ATS Analysis Engine**
- 🤖 Advanced keyword matching algorithms
- 📈 Comprehensive scoring system (Format, Content, Keywords)
- 🎯 Job-specific optimization recommendations
- 📊 Industry benchmarking and insights

### 💼 **AI Interview Preparation**
- 🎤 Mock interview simulations
- 🧠 AI-generated questions based on job descriptions
- 📝 Personalized feedback and improvement tips
- 🎯 Role-specific interview scenarios

### ✍️ **AI Cover Letter Generator**
- 📄 Personalized cover letters for specific job applications
- 🎯 Industry and role-specific customization
- 🔄 Multiple tone and style options
- 📊 Effectiveness scoring and suggestions

### 📊 **Career Dashboard**
- 📈 Application tracking and analytics
- 🎯 Industry insights and trends
- 📊 Skill gap analysis
- 🔔 Job market updates and recommendations

---

## 🛠️ Tech Stack

### **Frontend**
- ⚛️ **React 19** - Latest React with concurrent features
- 🚀 **Next.js 15** - App Router, Server Actions, and Turbopack
- 🎨 **Tailwind CSS** - Utility-first styling
- 🎯 **Radix UI** - Accessible component primitives
- 🌙 **Next Themes** - Dark/Light mode support
- 📱 **Lucide React** - Beautiful icons

### **Backend & Database**
- 🗄️ **PostgreSQL** - Primary database (Neon)
- 🔧 **Prisma ORM** - Type-safe database operations
- 🔐 **Clerk** - Authentication and user management
- 🤖 **Google Gemini AI** - Advanced AI capabilities
- ⚡ **Inngest** - Background job processing

### **AI & Processing**
- 🧠 **Google Gemini 2.5 Flash** - Text generation and analysis
- 📄 **PDF Processing** - Text extraction and analysis
- 🔍 **Natural Language Processing** - Resume and job matching

### **Development & Deployment**
- 📦 **npm/pnpm** - Package management
- 🔧 **ESLint** - Code linting
- 🚀 **Vercel** - Deployment and hosting
- 🐳 **Docker Ready** - Containerization support

---

## 🏗️ Architecture

```mermaid
graph TB
    A[Next.js Frontend] --> B[Server Actions]
    B --> C[Prisma ORM]
    B --> D[Google Gemini AI]
    B --> E[Clerk Auth]
    C --> F[PostgreSQL]
    B --> G[Inngest Jobs]
    G --> H[Background Processing]
    
    I[File Upload] --> J[PDF Parser]
    J --> K[Text Extraction]
    K --> D
    
    L[User Management] --> E
    E --> M[Authentication]
```

---

## 🚀 Getting Started

### **Prerequisites**
- 📦 Node.js 18+ 
- 🔧 npm, yarn, or pnpm
- 🗄️ PostgreSQL database
- 🔑 API keys (Clerk, Google Gemini, Neon)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhay9999Sh/sensai.git
   cd sensai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Database setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/sensai"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/onboarding"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/onboarding"

# Google Gemini AI
GEMINI_API_KEY="your_gemini_api_key"

# Inngest
INNGEST_EVENT_KEY="your_inngest_event_key"
INNGEST_SIGNING_KEY="your_inngest_signing_key"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### **Getting API Keys**

1. **🔐 Clerk** - [Dashboard](https://dashboard.clerk.com/)
2. **🤖 Google Gemini** - [AI Studio](https://aistudio.google.com/)
3. **🗄️ Neon Database** - [Console](https://console.neon.tech/)
4. **⚡ Inngest** - [Dashboard](https://www.inngest.com/)

---

## 📱 Usage

### **🏠 Dashboard**
- View career insights and analytics
- Track application progress
- Get AI-powered recommendations

### **📝 Resume Builder**
1. Navigate to `/resume`
2. Upload existing resume or start from scratch
3. Use AI suggestions for optimization
4. Export in multiple formats

### **🔍 ATS Analysis**
1. Go to `/resume/ats-checker`
2. Upload your resume (PDF)
3. Paste job description
4. Get detailed analysis and suggestions

### **🎤 Interview Prep**
1. Visit `/interview`
2. Select job role and industry
3. Practice with AI-generated questions
4. Receive personalized feedback

### **✍️ Cover Letters**
1. Access `/ai-cover-letter`
2. Input job details and requirements
3. Generate personalized cover letter
4. Customize and download

---

## 🤖 AI Features

### **Resume Optimization**
- 🎯 Keyword optimization for ATS systems
- 📊 Content analysis and scoring
- 🔄 Industry-specific improvements
- 📈 Performance tracking

### **Interview Intelligence**
- 🎤 Role-specific question generation
- 🧠 Answer evaluation and scoring
- 💡 Improvement suggestions
- 📊 Performance analytics

### **Career Insights**
- 📈 Industry trend analysis
- 🎯 Skill gap identification
- 💼 Job market recommendations
- 🔍 Salary insights

---

## 📁 Project Structure

```
sensai/
├── 📁 app/                    # Next.js App Router
│   ├── 📁 (auth)/            # Authentication routes
│   ├── 📁 (main)/            # Main application routes
│   ├── 📁 api/               # API routes
│   └── 📄 layout.js          # Root layout
├── 📁 actions/               # Server Actions
│   ├── 📄 ats-analysis.js    # ATS analysis logic
│   ├── 📄 resume.js          # Resume operations
│   └── 📄 interview.js       # Interview features
├── 📁 components/            # React components
│   ├── 📁 ui/                # UI components
│   └── 📄 Header.jsx         # Navigation
├── 📁 lib/                   # Utilities and configs
│   ├── 📄 prisma.js          # Database client
│   ├── 📄 utils.js           # Helper functions
│   └── 📁 inngest/           # Background jobs
├── 📁 prisma/                # Database schema
├── 📁 public/                # Static assets
└── 📁 hooks/                 # Custom React hooks
```

---

## 🔧 API Endpoints

### **Authentication**
- `POST /api/auth/sign-in` - User sign in
- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-out` - User logout

### **Resume Management**
- `POST /api/resume/create` - Create new resume
- `GET /api/resume/[id]` - Get resume by ID
- `PUT /api/resume/[id]` - Update resume
- `DELETE /api/resume/[id]` - Delete resume

### **ATS Analysis**
- `POST /api/resume/ats-analysis` - Analyze resume against job description
- `GET /api/resume/ats-analysis/[id]` - Get analysis results

### **AI Features**
- `POST /api/ai/interview` - Generate interview questions
- `POST /api/ai/cover-letter` - Generate cover letter
- `POST /api/ai/optimize` - Optimize resume content

---

## 🚢 Deployment

### **Vercel (Recommended)**

1. **Connect your repository**
   ```bash
   npx vercel
   ```

2. **Set environment variables**
   - Add all environment variables in Vercel dashboard
   - Ensure database connection is configured

3. **Deploy**
   ```bash
   git push origin main
   ```

### **Docker Deployment**

1. **Build image**
   ```bash
   docker build -t sensai .
   ```

2. **Run container**
   ```bash
   docker run -p 3000:3000 sensai
   ```

### **Database Migration**
```bash
npx prisma migrate deploy
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### **Development Guidelines**
- 📝 Follow ESLint configuration
- 🧪 Write tests for new features
- 📚 Update documentation
- 🎨 Use Tailwind CSS for styling
- ⚡ Optimize for performance

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

- 📧 **Email**: abhay999939@gmail.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/Abhay9999Sh/sensai/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/Abhay9999Sh/sensai/discussions)

---

<div align="center">
  <p><strong>Built with ❤️ by the Abhay</strong></p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
