# FlowPilot — Intelligent Workflow & Team Productivity Platform

**Sankar Group Front-End Development Internship Assignment | 48-Hour Submission Package**

FlowPilot is a responsive B2B SaaS landing page and interactive product showcase built with **React 19**, **TypeScript**, **HTML5**, and **Tailwind CSS v4**. Every section, navigation link, interactive preview, pricing calculator, and form validation rule required by the Sankar Group Front-End Development Internship Assignment is implemented and verified.

---

## 1. Assignment Checklist & Section Mapping

| Assignment Requirement | Implementation in FlowPilot | Source File |
| :--- | :--- | :--- |
| **Navigation Bar** (Logo, Links, Sign Up / Get Started CTA, Mobile Menu) | Sticky 3-zone header with **FlowPilot** wordmark, `Home`, `Features`, `How It Works`, `Pricing`, `Contact`, `Get Started` CTA, scroll-spy active state, and mobile drawer toggle | `src/components/Navbar.tsx` |
| **Hero Section** (Headline, Description, CTAs, Relevant Visual/Illustration) | Value proposition headline, `Request a Demo` & `Explore Capabilities` buttons, 4-column quantified KPI strip, and interactive **FlowPilot Live Workspace Preview** | `src/components/Hero.tsx` |
| **Features** (At least 3–4 key features using cards, icons, content blocks) | Asymmetric Bento Grid showcasing **01. Workflow Automation**, **02. Team Collaboration**, **03. Project Analytics**, and **04. Smart Task Management** + live **Mechanism-to-Outcome Inspector** | `src/components/Features.tsx` |
| **About / How It Works** (Explain what the product does and how customers use it) | 3-step onboarding walkthrough (`Connect Your Stack`, `Configure Automated Rules`, `Monitor Cycle Time`), interactive Event Trigger $\rightarrow$ Action $\rightarrow$ Outcome pipeline, and customer case studies | `src/components/HowItWorks.tsx` |
| **Pricing** (At least two plans with clear features & pricing) | **Starter** (`$15/mo` annual, `$19/mo` monthly), **Professional** (`$39/mo` annual, `$49/mo` monthly), and **Enterprise** plans with a `Monthly / Annual (Save 20%)` toggle and live **Team Size Slider** | `src/components/Pricing.tsx` |
| **Contact / Demo Request & Footer** (Validated form, success message, footer) | Validated demo request form (`Name`, `Email`, `Company`, `Plan Interest`, `Message`) with inline error messages, confirmation receipt (`REF FP-...`), and full footer | `src/components/ContactSection.tsx` & `src/components/Footer.tsx` |

---

## 2. Desktop & Mobile Layout Screenshots

The three required submission screenshots are saved directly in the [`screenshots/`](./screenshots) folder of this repository:

1. **Desktop Hero & Live Workspace Layout (`1440x900`)**: [`screenshots/desktop-hero.png`](./screenshots/desktop-hero.png)
2. **Desktop Pricing & Validated Demo Confirmation (`1440x900`)**: [`screenshots/desktop-contact-confirmed.png`](./screenshots/desktop-contact-confirmed.png)
3. **Mobile Responsive Layout (`390x844`)**: [`screenshots/mobile-layout.png`](./screenshots/mobile-layout.png)

---

## 3. Short Explanation of Design Choices & Challenges Solved (5–8 Lines)

> FlowPilot was designed with a high-contrast architectural palette (`#F8FAFC` alabaster canvas, `#0F172A` slate surfaces, and `#1D4ED8` cobalt accents) to project enterprise reliability, strong readability, and a clear visual hierarchy. We paired **Plus Jakarta Sans** display headings with **DM Sans** body prose and **JetBrains Mono** (`tabular-nums`) for all pricing figures and sprint telemetry so dynamic numbers never jitter during interaction. To make the frontend experience genuinely interactive without a backend, we built a live Sprint Workspace simulator in the Hero section, an asymmetric Bento grid with a Mechanism-to-Outcome inspector, and a real-time Team Size ROI calculator in the Pricing section. A key engineering challenge was ensuring seamless state handoffs and strict validation across sections; we solved this by decoupling all form validation, pricing math, and task state transitions into pure TypeScript utilities (`src/utils/flowpilotLogic.ts`) backed by automated unit tests, ensuring zero dead buttons across both desktop (`1440px`) and mobile (`390px`) screens.

---

## 4. Technologies Used

- **React 19** & **TypeScript** (Functional components, React Hooks: `useState`, `useEffect`, `useCallback`)
- **HTML5 & Semantic Accessibility** (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<form>`, `aria-invalid`, `role="alert"`, `role="status"`)
- **CSS3 & Tailwind CSS v4** (`@tailwindcss/vite`, CSS custom properties, responsive CSS Grid & Flexbox, `prefers-reduced-motion` support)
- **Lucide React** (Crisp vector iconography)
- **Vite 8** (Fast development server and optimized production bundler)
- **Node.js Test Runner (`node:test`)** (Unit tests for validation, pricing calculations, and task metrics)

---

## 5. Setup & Local Run Instructions

### Prerequisites
- **Node.js** `v18.18+` or `v20+`
- **npm** `v9+`

### Step-by-Step Commands

```bash
# 1. Install project dependencies
npm install

# 2. Start the development server at http://localhost:3000
npm run dev

# 3. Run unit tests for form validation, pricing math, and task telemetry
npx --yes tsx --test src/utils/flowpilotLogic.test.ts

# 4. Run TypeScript typechecking
npm run lint

# 5. Build for production (outputs optimized bundle to dist/)
npm run build

# 6. Preview the production build locally
npm run preview
```

---

## 6. Code Structure & Walkthrough Guide (For Interview Demonstration)

```text
├── public/assets/aistudio/          # Attached Sankar Group Assignment Brief PDF
├── screenshots/                     # Desktop (1440x900) & Mobile (390x844) screenshots
│   ├── desktop-hero.png
│   ├── desktop-contact-confirmed.png
│   └── mobile-layout.png
├── src/
│   ├── assets/images/               # High-resolution studio & executive portrait assets
│   ├── components/
│   │   ├── Navbar.tsx               # Sticky header, scroll-spy links, mobile drawer
│   │   ├── Hero.tsx                 # Headline, CTAs, interactive Sprint Workspace preview
│   │   ├── Features.tsx             # 4-card Bento grid + Mechanism-to-Outcome inspector
│   │   ├── HowItWorks.tsx           # 3-step guide, live rule walkthrough, case studies
│   │   ├── Pricing.tsx              # Monthly/Annual toggle, team size slider, 3 plan tiers
│   │   ├── ContactSection.tsx       # Validated demo form + booking confirmation receipt
│   │   └── Footer.tsx               # Company info, quick links, click-to-copy email
│   ├── data/
│   │   └── flowpilotData.ts         # Structured content for features, steps, and plans
│   ├── utils/
│   │   ├── flowpilotLogic.ts        # Pure validation, pricing math, and task state helpers
│   │   └── flowpilotLogic.test.ts   # Automated unit tests (node:test)
│   ├── App.tsx                      # Root layout, smooth scroll routing, shared plan state
│   ├── index.css                    # Tailwind v4 config, typography, tabular-nums utilities
│   └── main.tsx                     # React 19 DOM entry point
├── index.html                       # SEO meta tags & Google Fonts (Plus Jakarta Sans, DM Sans)
└── package.json                     # Scripts and dependencies
```
