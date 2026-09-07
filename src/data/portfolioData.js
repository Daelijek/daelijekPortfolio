export const portfolioContent = {
  en: {
    system: {
      brandTitle: "DIAS YERMEK",
      brandSub: "SYSTEM PORTFOLIO // 2026",
      location: "ASTANA, KZ",
      timezone: "UTC+5",
      availability: "OPEN FOR CONTRACT & FULL-TIME",
      status: "STABLE",
      role: "MIDDLE FRONTEND & MOBILE DEVELOPER",
      heroHeadline: "MOBILE & WEB ENGINEER",
      heroInfoLog: "[ INFO_LOG ] CRAFTING HIGH-PERFORMANCE WEB & MOBILE ECOSYSTEMS WITH AI, EDTECH & DECENTRALIZED ARCHITECTURE.",
      ctaPrimary: "EXPLORE PROJECTS",
      ctaSecondary: "INITIALIZE CONTACT",
      stats: {
        projectsTitle: "PROJECTS_COMPLETED",
        projectsCount: "15+",
        projectsProgress: "92%",
        experienceTitle: "EXPERIENCE_YEARS",
        experienceCount: "3+",
        experienceProgress: "88%",
        terminalLog: [
          "> ACTIVE_STACK: NEXT15_FLUTTER_REACT_NATIVE",
          "> AVAILABILITY_TYPE: REMOTE / HYBRID / RELOCATE",
          "> CORE_DOMAINS: EDTECH · FINTECH · GOVTECH · BLOCKCHAIN",
          "> SYSTEM_PERF: [HIGH] 60 FPS @ 1.0 DPR"
        ]
      }
    },
    nav: {
      items: [
        { id: "overview", index: "01", label: "Overview" },
        { id: "about", index: "02", label: "About & Sectors" },
        { id: "projects", index: "03", label: "Projects" },
        { id: "experience", index: "04", label: "Experience Logs" },
        { id: "contact", index: "05", label: "Contact Stream" }
      ]
    },
    about: {
      tag: "SECTOR_00 // BIOGRAPHY",
      title: "ENGINEERING PHILOSOPHY",
      lead: "I'm Dias Yermek, a software engineer based in Astana, Kazakhstan. I transform ambitious concepts into rock-solid, visually striking, and performant web & mobile experiences.",
      story: "With a Bachelor's in Software Engineering from Astana IT University, I've engineered products across EdTech, GovTech, FinTech, and Blockchain SaaS. From leading full mobile app recovery and App Store releases at BeyimTech (EdTech startup in Astana Hub) to building smart contract workflows at TrustMe for 1.5M+ users, I obsess over UI fluidity, clean architecture, and technical resilience.",
      sectorsTitle: "COMPETENCY MATRIX",
      sectorsSubtitle: "Categorized technical capabilities & tooling",
      sectors: [
        {
          id: "sector-1",
          code: "SECTOR_01",
          title: "Web & Frontend Architecture",
          skills: [
            { hex: "0x00", name: "TypeScript" },
            { hex: "0x01", name: "React 19 / Next.js 15" },
            { hex: "0x02", name: "Tailwind CSS" },
            { hex: "0x03", name: "RTK Query / Redux" },
            { hex: "0x04", name: "Vue.js / Nuxt" },
            { hex: "0x05", name: "Framer Motion" }
          ]
        },
        {
          id: "sector-2",
          code: "SECTOR_02",
          title: "Mobile & Cross-Platform",
          skills: [
            { hex: "0x06", name: "Flutter & Dart" },
            { hex: "0x07", name: "React Native & Expo" },
            { hex: "0x08", name: "Riverpod State Mgmt" },
            { hex: "0x09", name: "App Store & Google Play CI/CD" },
            { hex: "0x0A", name: "Firebase Remote Config" }
          ]
        },
        {
          id: "sector-3",
          code: "SECTOR_03",
          title: "Backend, Data & Cloud",
          skills: [
            { hex: "0x0B", name: "FastAPI (Python)" },
            { hex: "0x0C", name: "PostgreSQL & Supabase" },
            { hex: "0x0D", name: "Node.js & Express" },
            { hex: "0x0E", name: "Docker & Containerization" },
            { hex: "0x0F", name: "REST & GraphQL APIs" }
          ]
        },
        {
          id: "sector-4",
          code: "SECTOR_04",
          title: "AI, Telemetry & Systems",
          skills: [
            { hex: "0x10", name: "OpenAI API Integration" },
            { hex: "0x11", name: "Lexical Rich Text Editors" },
            { hex: "0x12", name: "Real-time Telemetry Systems" },
            { hex: "0x13", name: "Blockchain UI / Auth" }
          ]
        }
      ]
    },
    projects: {
      tag: "SECTOR_02 // PORTFOLIO SHOWCASE",
      title: "FEATURED PRODUCTION BUILDS",
      subtitle: "Engineered with precision for web, mobile, and AI",
      featured: [
        {
          num: "01",
          id: "FINANCE_MANAGEMENT_AI",
          slug: "finance-management-app",
          title: "Finance Management Application",
          tagline: "Autonomous personal finance ecosystem with real-time AI spending analytics",
          category: "Full-Stack Mobile App & AI",
          isPrivate: false,
          description: "Intelligent cross-platform personal finance ecosystem built with React Native (Expo) and a high-performance FastAPI/PostgreSQL backend. Features an integrated OpenAI assistant that analyzes spending patterns in real-time, interactive budget trackers, and automated limit alerts.",
          tags: ["React Native", "Expo", "FastAPI", "OpenAI API", "PostgreSQL"],
          image: "/assets/Finance.png",
          liveUrl: "https://github.com/Daelijek/FinanceManagementApp",
          githubUrl: "https://github.com/Daelijek/FinanceManagementApp",
          status: "ACTIVE_REPOSITORY",
          dossier: {
            projectType: "AI-Powered FinTech Mobile Ecosystem",
            entryYear: "2024 - 2025",
            targetPlatform: "Cross-Platform Mobile (iOS & Android) + Cloud API",
            primaryRole: "Lead Mobile & Backend Software Engineer",
            technologies: {
              core: ["React Native", "Expo SDK", "TypeScript", "FastAPI (Python)"],
              backend: ["Python 3.11", "PostgreSQL", "SQLAlchemy", "AsyncIO"],
              aiCloud: ["OpenAI GPT API", "Vector Prompting", "Docker Containers"],
              tools: ["NativeWind (Tailwind)", "Axios", "Zustand State Engine"]
            },
            colorPalette: [
              { name: "Emerald Cyber", hex: "#00FF9F" },
              { name: "Midnight Onyx", hex: "#090E11" },
              { name: "Terminal Slate", hex: "#1A262C" },
              { name: "Alert Crimson", hex: "#FF0055" }
            ],
            status: "ACTIVE_PRODUCTION_BUILD"
          },
          overview: {
            lead: "An intelligent personal wealth and budgeting ecosystem engineered to help modern users automate expenditure monitoring, categorize cash flow in real-time, and make data-driven financial decisions via an integrated OpenAI assistant.",
            targetAudience: "Designed for tech-savvy individuals, freelance contractors, and young professionals requiring real-time visibility into complex multi-currency finances without manual spreadsheet overhead.",
            challenge: "Personal budgeting apps frequently suffer from tedious manual entry hurdles, vague categorization rules, and delayed bank sync latency that discourages consistent habit formation.",
            solution: "Architected an end-to-end mobile client powered by React Native and Expo with instantaneous local caching, backed by an ultra-low latency FastAPI microservice. Built a conversational OpenAI financial advisor capable of scanning transaction history, answering budget questions in plain language, and forecasting upcoming monthly deficits.",
            myRole: "Engineered the cross-platform UI/UX in React Native, authored the FastAPI REST APIs with PostgreSQL persistence, implemented OpenAI token-optimized prompts, and created real-time financial telemetry widgets."
          },
          walkthrough: {
            concept: {
              title: "The Vision & Core Architecture",
              desc: "The mission was to deliver zero-friction financial telemetry. Every tap reflects instant state updates with sub-50ms render latency and military-grade SSL data security.",
              highlights: [
                "Real-time financial telemetry dashboard with interactive meters",
                "Zero-latency optimistic UI updates backed by local storage",
                "Contextual OpenAI financial analysis engine for plain-language queries"
              ]
            },
            architecture: {
              title: "Dual-Engine Mobile & Backend Synergy",
              desc: "Leveraging Expo SDK with React Native for native 60fps gesture handling, backed by Python FastAPI's asynchronous event loop and PostgreSQL relational queries.",
              highlights: [
                "AsyncIO connection pooling for maximum API throughput",
                "Encrypted credential storage via Expo SecureStore",
                "Prompt engineering with dynamic spending context injection"
              ]
            },
            features: [
              { num: "01", title: "Autonomous AI Financial Advisor", desc: "Interactive conversational agent that provides actionable breakdowns of spending velocity and anomalous charges.", metric: "<1.2s AI Response" },
              { num: "02", title: "Dynamic Budget Limit Enforcer", desc: "Interactive threshold meters that pulse and alert users before category limits are breached.", metric: "100% Client-Side Sync" },
              { num: "03", title: "Multi-Category Telemetry Charts", desc: "High-density data visualization charts tracking daily burn rates and investment savings ratios.", metric: "60 FPS Render" }
            ],
            impact: {
              metrics: [
                { label: "API_LATENCY", value: "38MS" },
                { label: "AI_ACCURACY", value: "97.4%" },
                { label: "TEST_COVERAGE", value: "91%" },
                { label: "SYSTEM_UPTIME", value: "99.9%" }
              ]
            }
          }
        },
        {
          num: "02",
          id: "OPENGOV_KZ_PORTAL",
          slug: "opengov-kz",
          title: "OpenGov.kz Platform",
          tagline: "National civic engagement & open governance portal for public transparency",
          category: "GovTech Web Platform",
          isPrivate: false,
          description: "Engineered the official OpenGov.kz platform frontend from scratch with Next.js and React. Deployed full multi-language localization (i18n), news catalogs, civic participation portals, and blazing-fast server-rendered performance for citizen-government transparency.",
          tags: ["Next.js", "React", "i18n", "Responsive UI", "REST APIs"],
          image: "/assets/openGov.png",
          liveUrl: "https://qbs-solutions.vercel.app/",
          githubUrl: "https://github.com/Daelijek/www-opengov-kz",
          status: "PRODUCTION_DEPLOYED",
          dossier: {
            projectType: "Public GovTech Transparency Portal",
            entryYear: "2024",
            targetPlatform: "Web Platform (Next.js SSR & SSG)",
            primaryRole: "Frontend Lead Engineer",
            technologies: {
              core: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS"],
              i18n: ["next-intl (Kazakh, Russian, English)"],
              api: ["REST APIs", "Government Open Data JSON"],
              perf: ["Vercel Edge Network", "Static Site Generation", "Lighthouse 98+"]
            },
            colorPalette: [
              { name: "GovTech Azure", hex: "#0070F3" },
              { name: "Cyan Horizon", hex: "#00DFD8" },
              { name: "Slate Deep", hex: "#0B1017" },
              { name: "Neutral Cloud", hex: "#F3F6F9" }
            ],
            status: "PRODUCTION_DEPLOYED"
          },
          overview: {
            lead: "A high-performance civic transparency portal designed to bridge citizen engagement and public governmental initiatives through accessible public catalogs and multi-language information distribution.",
            targetAudience: "Citizens, civic researchers, and public organizations seeking transparent information on government projects, open budgeting, and civic initiatives across Kazakhstan.",
            challenge: "Government portals often suffer from cumbersome navigation, poor mobile responsiveness, slow load speeds, and fragmented multilingual content.",
            solution: "Engineered the modern web frontend with Next.js and Tailwind CSS from the ground up, delivering flawless trilingual support (Kazakh, Russian, English), server-side rendering for instant page transitions, and strict accessibility compliance (WCAG 2.1 AA).",
            myRole: "Developed the responsive frontend architecture, designed the design system and reusable UI component library, integrated REST endpoints for public datasets, and optimized SEO & Core Web Vitals."
          },
          walkthrough: {
            concept: {
              title: "Democratic Access & Civic Clarity",
              desc: "Eliminating digital barriers between government initiatives and the public through a clean, blazing-fast, and trustworthy web architecture.",
              highlights: [
                "Trilingual national localization (Kazakh, Russian, English)",
                "Sub-second SSR load times on mobile devices",
                "Accessible mobile-first design with strict WCAG compliance"
              ]
            },
            architecture: {
              title: "Server-Rendered Multi-Lingual Architecture",
              desc: "Next.js routing with server-side generation ensuring instant indexing by search engines, localized routing paths, and resilient caching on the Vercel Edge network.",
              highlights: [
                "Modular component tokens for government portals",
                "Lightweight SVG iconography and zero-CLS typography",
                "Strict semantic HTML5 markup for screen readers"
              ]
            },
            features: [
              { num: "01", title: "Trilingual Dynamic Localization", desc: "Instant language switching across Kazakh, Russian, and English without layout shift or page refresh.", metric: "3 Languages" },
              { num: "02", title: "Civic Initiative Catalog", desc: "Interactive filtering and faceted search across dozens of public programs and civic reports.", metric: "<15ms Filter" },
              { num: "03", title: "Core Web Vitals Optimization", desc: "Engineered for maximum accessibility on low-bandwidth and mobile connections across regions.", metric: "99/100 Perf" }
            ],
            impact: {
              metrics: [
                { label: "LIGHTHOUSE", value: "99" },
                { label: "SEO_SCORE", value: "100" },
                { label: "LOCALES", value: "3" },
                { label: "FIRST_PAINT", value: "0.4S" }
              ]
            }
          }
        },
        {
          num: "03",
          id: "BERIK_ZHUNUSBEK_WEB",
          slug: "berik-zhunusbek",
          title: "Berik Zhunusbek Digital Gallery",
          tagline: "Atmospheric portfolio & kinetic multimedia showcase for an acclaimed sculptor and CG artist",
          category: "Creative Showcase & Gallery",
          isPrivate: false,
          description: "A digital portfolio and multimedia showcase created for sculptor, actor, CG artist, and specialist Berik Zhunusbek. Built with high-fidelity visual aesthetics, interactive gallery components, and multi-language support.",
          tags: ["HTML5", "CSS3", "JavaScript", "Portfolio", "Multilanguage"],
          image: "/assets/berikWeb.png",
          liveUrl: "https://berikzhunusbek.kz/",
          githubUrl: "https://github.com/Daelijek/BerikWeb",
          status: "LIVE_PRODUCTION",
          dossier: {
            projectType: "Fine Arts & Digital Portfolio",
            entryYear: "2024",
            targetPlatform: "Universal Web & High-DPI Displays",
            primaryRole: "Creative Frontend Engineer & Visual Designer",
            technologies: {
              core: ["HTML5", "CSS3 / Modern Layouts", "Vanilla JavaScript"],
              multimedia: ["Custom Responsive Lightbox", "High-Resolution Image Compression"],
              features: ["Multilanguage Switching", "Smooth Kinetic Scroll", "Minimalist Aesthetics"]
            },
            colorPalette: [
              { name: "Warm Bronze", hex: "#C69255" },
              { name: "Gallery Noir", hex: "#0D0D0D" },
              { name: "Parchment", hex: "#EAE6DF" },
              { name: "Charcoal", hex: "#1F1F1F" }
            ],
            status: "LIVE_PRODUCTION"
          },
          overview: {
            lead: "A digital showcase crafted for sculptor, actor, and CG artist Berik Zhunusbek. The portfolio curates monumental sculptures, behind-the-scenes film stills, and digital artifacts in an atmosphere of refined minimalism.",
            targetAudience: "Art collectors, curators, gallery directors, and film industry producers reviewing portfolio credentials and commissions.",
            challenge: "Showcasing high-resolution artwork and photography without degrading loading times or compromising artistic visual purity.",
            solution: "Designed a minimalist dark gallery layout with kinetic typography, progressive image decoding, custom lightbox modals, and multi-language support.",
            myRole: "Executed visual concept design, responsive markup, performance optimization, and international domain deployment."
          },
          walkthrough: {
            concept: {
              title: "Sculptural Minimalism & Curated Flow",
              desc: "The interface acts as a silent gallery wall, letting the texture of bronze, marble, and cinematography take center stage.",
              highlights: [
                "Curated fine arts gallery with tactile zoom",
                "Kinetic micro-interactions and smooth scroll easing",
                "Bilingual presentation in Kazakh and Russian"
              ]
            },
            architecture: {
              title: "High-DPI Optimized Media Engine",
              desc: "Zero-dependency vanilla JavaScript and optimized CSS architecture ensuring instant rendering and smooth tactile scrolling.",
              highlights: [
                "Lightweight responsive image sets with progressive loading",
                "Zero runtime dependencies for maximum longevity",
                "Fluid typography scaling dynamically across screen widths"
              ]
            },
            features: [
              { num: "01", title: "High-Resolution Sculptural Gallery", desc: "Interactive media grid with smooth zooming and artwork details.", metric: "Instant Open" },
              { num: "02", title: "Dual Language Experience", desc: "Seamless switching between Kazakh and Russian narratives.", metric: "Zero Reload" },
              { num: "03", title: "Tactile Mobile Gallery", desc: "Pinch, swipe, and inspect monumental works on mobile screens with retina clarity.", metric: "Retina Ready" }
            ],
            impact: {
              metrics: [
                { label: "ASSET_LOAD", value: "-45%" },
                { label: "IMAGE_CLARITY", value: "4K" },
                { label: "UPTIME", value: "100%" },
                { label: "BOUNCE_RATE", value: "22%" }
              ]
            }
          }
        }
      ],
      otherTitle: "SYSTEM ARCHIVE & EXPERIMENTS",
      otherProjects: [
        { id: "EVENTLY", slug: "evently", title: "Evently", desc: "Modern event planning platform with QR code invitation generation, time voting, and automated RSVP flows.", tags: ["QR System", "MongoDB", "Node.js"], url: "https://github.com/Daelijek/Evently" },
        { id: "KAZ_DATA", slug: "kaz-data", title: "Kaz-Data Solutions", desc: "Comprehensive event aggregation and ticket booking engine across Kazakhstan.", tags: ["Event Engine", "HTML/JS", "MongoDB"], url: "https://github.com/Daelijek/Kaz-Data_Solutions" },
        { id: "QUEUEMS", slug: "queuems", title: "QueueMS Microservices", desc: "High-throughput microservices queue system built with Go for distributed notifications and client task queues.", tags: ["Golang", "Microservices", "Backend"], url: "https://github.com/Daelijek/QueueMS" },
        { id: "AITU_CALC", slug: "aitu-calc", title: "AITU Grade Calculator", desc: "Desktop application with CustomTkinter GUI for university GPA calculation and scholarship tracking.", tags: ["Python", "CustomTkinter", "Education"], url: "https://github.com/Daelijek/AITU_grade_calculator" },
        { id: "VOICE_ASSISTANT", slug: "voice-assistant", title: "Voice Assistant AI", desc: "Speech-activated Python automation assistant with NLP command parsing and system controls.", tags: ["Python", "Speech Recognition", "Automation"], url: "https://github.com/Daelijek/Voice_Assistant" },
        { id: "SYS_RETRIEVAL", slug: "sys-retrieval", title: "Parameters Retrieval", desc: "Hardware diagnostic and telemetry GUI for OS resource and parameter monitoring.", tags: ["Python", "GUI", "Diagnostics"], url: "https://github.com/Daelijek/ParametersRetrieval" }
      ]
    },
    experience: {
      tag: "SECTOR_03 // CAREER TELEMETRY",
      title: "EXPERIENCE LOGS",
      subtitle: "Production engineering & startup track record",
      logs: [
        {
          code: "LOG_01",
          period: "OCT 2025 – APR 2026",
          company: "BEYIMTECH",
          badge: "EdTech Startup · Astana Hub",
          role: "MIDDLE FRONTEND & MOBILE DEVELOPER",
          points: [
            "Architected AI-powered educational web products with Next.js 14, React 18, and TypeScript — including rich Lexical markdown editors and next-intl multi-language.",
            "Spearheaded complete mobile application recovery: full Flutter & Riverpod architecture refactoring, Active Directory authentication, and production AI chatbot integration.",
            "Built real-time school analytics dashboards for 20+ institutions with RTK Query and created a custom client telemetry system tracking student learning behavior.",
            "Owned end-to-end iOS & Android deployment pipelines (Apple App Store & Google Play) with Firebase Remote Config in-app updates."
          ]
        },
        {
          code: "LOG_02",
          period: "NOV 2023 – JAN 2026",
          company: "TRUSTME",
          badge: "Blockchain SaaS · 1.5M+ Users",
          role: "MARKUP DEVELOPER (CONTRACT)",
          points: [
            "Developed and optimized smart-contract UI templates for a national digital trust platform serving over 1,500,000 users and 3,000+ enterprises.",
            "Engineered REST API integrations for legally binding digital signatures, SMS validation flows, and blockchain credential authentication.",
            "Authored modular, reusable component systems for the TrustContract web ecosystem."
          ]
        },
        {
          code: "LOG_03",
          period: "FEB 2025 – APR 2025",
          company: "QB SOLUTIONS",
          badge: "GovTech / Enterprise",
          role: "FRONTEND DEVELOPER (INTERNSHIP)",
          points: [
            "Engineered the full frontend for the OpenGov.kz platform from scratch with Next.js and React.",
            "Implemented responsive layouts, news catalogues, civic project listings, and multi-language routing for public access."
          ]
        },
        {
          code: "LOG_04",
          period: "SEP 2023 – NOV 2023",
          company: "STOLOVKA",
          badge: "FoodTech Startup",
          role: "MOBILE DEVELOPER (INTERNSHIP)",
          points: [
            "Built production-ready Flutter e-commerce application: digital menus, live order cart, and user authentication from Figma specs.",
            "Configured Firebase App Distribution for continuous QA builds and automated deployment."
          ]
        },
        {
          code: "LOG_05",
          period: "SEP 2022 – JUN 2025",
          company: "ASTANA IT UNIVERSITY",
          badge: "Astana, Kazakhstan",
          role: "BACHELOR OF SOFTWARE ENGINEERING",
          points: [
            "Graduated with a Bachelor's Degree in Software Engineering. Focused on distributed systems, modern web architectures, and algorithms."
          ]
        }
      ]
    },
    contact: {
      tag: "SECTOR_04 // COMMUNICATION PORT",
      title: "INITIALIZE CONTACT",
      lead: "Have an ambitious project, startup venture, or full-time / contract opportunity? My channels are open. Fastest response via Telegram.",
      email: "dias1605ermek@gmail.com",
      telegram: "https://t.me/daelijek_og",
      github: "https://github.com/Daelijek",
      linkedin: "https://www.linkedin.com/in/dias-yermek/",
      copied: "EMAIL_COPIED_TO_CLIPBOARD",
      copyEmail: "COPY EMAIL",
      sendTelegram: "OPEN TELEGRAM STREAM",
      localTimeLabel: "ASTANA LOCAL TIME"
    },
    footer: {
      rights: "DIAS YERMEK // ALL SYSTEMS OPERATIONAL",
      engine: "ENGINEERED WITH NEXT.JS 15, TAILWIND & WEB AUDIO API",
      year: "2026"
    }
  },
  ru: {
    system: {
      brandTitle: "ДИАС ЕРМЕК",
      brandSub: "СИСТЕМНОЕ ПОРТФОЛИО // 2026",
      location: "АСТАНА, КАЗАХСТАН",
      timezone: "UTC+5",
      availability: "ОТКРЫТ К ПРЕДЛОЖЕНИЯМ (FULL-TIME & CONTRACT)",
      status: "СТАБИЛЬНО",
      role: "MIDDLE FRONTEND & MOBILE РАЗРАБОТЧИК",
      heroHeadline: "MOBILE & WEB ИНЖЕНЕР",
      heroInfoLog: "[ INFO_LOG ] СОЗДАНИЕ ВЫСОКОПРОИЗВОДИТЕЛЬНЫХ WEB И MOBILE ПРОДУКТОВ С AI, EDTECH И ДЕЦЕНТРАЛИЗОВАННЫМИ СИСТЕМАМИ.",
      ctaPrimary: "СМОТРЕТЬ ПРОЕКТЫ",
      ctaSecondary: "СВЯЗАТЬСЯ",
      stats: {
        projectsTitle: "ЗАВЕРШЕННЫХ_ПРОЕКТОВ",
        projectsCount: "15+",
        projectsProgress: "92%",
        experienceTitle: "ОПЫТ_РАЗРАБОТКИ",
        experienceCount: "3+ года",
        experienceProgress: "88%",
        terminalLog: [
          "> ACTIVE_STACK: NEXT15_FLUTTER_REACT_NATIVE",
          "> AVAILABILITY_TYPE: REMOTE / HYBRID / RELOCATE",
          "> CORE_DOMAINS: EDTECH · FINTECH · GOVTECH · BLOCKCHAIN",
          "> SYSTEM_PERF: [HIGH] 60 FPS @ 1.0 DPR"
        ]
      }
    },
    nav: {
      items: [
        { id: "overview", index: "01", label: "Главная" },
        { id: "about", index: "02", label: "Обо мне и Стек" },
        { id: "projects", index: "03", label: "Проекты" },
        { id: "experience", index: "04", label: "Системные логи" },
        { id: "contact", index: "05", label: "Контакты" }
      ]
    },
    about: {
      tag: "СЕКТОР_00 // БИОГРАФИЯ",
      title: "ИНЖЕНЕРНАЯ ФИЛОСОФИЯ",
      lead: "Я Диас Ермек — программный инженер из Астаны. Превращаю смелые идеи в надежные, быстрые и визуально безупречные web и mobile решения.",
      story: "Окончил Astana IT University по специальности Software Engineering. Разрабатывал продукты в сферах EdTech, GovTech, FinTech и Blockchain SaaS. От полного восстановления и релиза мобильного приложения в BeyimTech (EdTech в Astana Hub) до смарт-контрактных систем в TrustMe с 1.5M+ пользователей — для меня важна плавность UI, чистота архитектуры и надежность кода.",
      sectorsTitle: "МАТРИЦА КОМПЕТЕНЦИЙ",
      sectorsSubtitle: "Технологические секторы и рабочий стек",
      sectors: [
        {
          id: "sector-1",
          code: "СЕКТОР_01",
          title: "Web & Frontend Архитектура",
          skills: [
            { hex: "0x00", name: "TypeScript" },
            { hex: "0x01", name: "React 19 / Next.js 15" },
            { hex: "0x02", name: "Tailwind CSS" },
            { hex: "0x03", name: "RTK Query / Redux" },
            { hex: "0x04", name: "Vue.js / Nuxt" },
            { hex: "0x05", name: "Framer Motion" }
          ]
        },
        {
          id: "sector-2",
          code: "СЕКТОР_02",
          title: "Mobile & Кроссплатформа",
          skills: [
            { hex: "0x06", name: "Flutter & Dart" },
            { hex: "0x07", name: "React Native & Expo" },
            { hex: "0x08", name: "Riverpod State Mgmt" },
            { hex: "0x09", name: "App Store & Google Play CI/CD" },
            { hex: "0x0A", name: "Firebase Remote Config" }
          ]
        },
        {
          id: "sector-3",
          code: "СЕКТОР_03",
          title: "Backend, Базы данных & Cloud",
          skills: [
            { hex: "0x0B", name: "FastAPI (Python)" },
            { hex: "0x0C", name: "PostgreSQL & Supabase" },
            { hex: "0x0D", name: "Node.js & Express" },
            { hex: "0x0E", name: "Docker & Контейнеры" },
            { hex: "0x0F", name: "REST & GraphQL APIs" }
          ]
        },
        {
          id: "sector-4",
          code: "СЕКТОР_04",
          title: "AI, Телеметрия & Системы",
          skills: [
            { hex: "0x10", name: "Интеграция OpenAI API" },
            { hex: "0x11", name: "Lexical Markdown Редакторы" },
            { hex: "0x12", name: "Системы real-time телеметрии" },
            { hex: "0x13", name: "Blockchain UI / Авторизация" }
          ]
        }
      ]
    },
    projects: {
      tag: "СЕКТОР_02 // ВИТРИНА ПРОЕКТОВ",
      title: "ИЗБРАННЫЕ PRODUCTION ПРОЕКТЫ",
      subtitle: "Спроектированы с упором на скорость, эстетику и функционал",
      featured: [
        {
          num: "01",
          id: "FINANCE_MANAGEMENT_AI",
          slug: "finance-management-app",
          title: "Finance Management Application",
          tagline: "Автономная кроссплатформенная экосистема учета личных финансов с AI-аналитикой трат",
          category: "Full-Stack Мобильное приложение & AI",
          isPrivate: false,
          description: "Интеллектуальная кроссплатформенная экосистема для учета финансов на React Native (Expo) с бэкендом на FastAPI/PostgreSQL. Включает интегрированного AI-ассистента на базе OpenAI для анализа трат, интерактивные лимиты и графики бюджета.",
          tags: ["React Native", "Expo", "FastAPI", "OpenAI API", "PostgreSQL"],
          image: "/assets/Finance.png",
          liveUrl: "https://github.com/Daelijek/FinanceManagementApp",
          githubUrl: "https://github.com/Daelijek/FinanceManagementApp",
          status: "ACTIVE_REPOSITORY",
          dossier: {
            projectType: "FinTech мобильная экосистема с искусственным интеллектом",
            entryYear: "2024 - 2025",
            targetPlatform: "Кроссплатформа (iOS & Android) + Cloud REST API",
            primaryRole: "Lead Mobile & Backend Инженер",
            technologies: {
              core: ["React Native", "Expo SDK", "TypeScript", "FastAPI (Python)"],
              backend: ["Python 3.11", "PostgreSQL", "SQLAlchemy", "AsyncIO"],
              aiCloud: ["OpenAI GPT API", "Векторный промптинг", "Docker"],
              tools: ["NativeWind (Tailwind)", "Axios", "Zustand"]
            },
            colorPalette: [
              { name: "Изумрудный Cyber", hex: "#00FF9F" },
              { name: "Глубокий Оникс", hex: "#090E11" },
              { name: "Терминальный Слейт", hex: "#1A262C" },
              { name: "Сигнальный Кримсон", hex: "#FF0055" }
            ],
            status: "АКТИВНЫЙ_PRODUCTION_БИЛД"
          },
          overview: {
            lead: "Интеллектуальная персональная финансовая экосистема, созданная для полной автоматизации трекинга расходов, мгновенной категоризации денежных потоков и принятия финансовых решений с поддержкой встроенного OpenAI-ассистента.",
            targetAudience: "Разработано для IT-специалистов, фрилансеров и молодых профессионалов, которым нужен наглядный контроль над мультивалютными бюджетами без ручной рутины в таблицах.",
            challenge: "Большинство приложений для учета финансов отталкивают сложным ручным вводом, невнятной категоризацией и задержками синхронизации, из-за чего пользователи быстро забрасывают учет.",
            solution: "Спроектировал мобильный клиент на React Native и Expo с мгновенным локальным кэшированием и асинхронный микросервис на FastAPI. Внедрил диалогового финансового советника на базе OpenAI, который анализирует структуру трат, отвечает на естественном языке и прогнозирует кассовые разрывы.",
            myRole: "Спроектировал UI/UX на React Native, разработал REST API на FastAPI с персистентностью в PostgreSQL, оптимизировал промпты OpenAI и создал компоненты финансовой телеметрии в реальном времени."
          },
          walkthrough: {
            concept: {
              title: "Концепция и архитектурное ядро",
              desc: "Главная цель — нулевое трение при фиксации финансовых операций. Каждый тап обновляет состояние с задержкой рендера менее 50 мс и сквозным SSL-шифрованием.",
              highlights: [
                "Дашборд финансовой телеметрии с интерактивными шкалами",
                "Оптимистичные UI-апдейты без задержки сети",
                "Контекстный анализ трат языковой моделью OpenAI"
              ]
            },
            architecture: {
              title: "Синергия мобильного клиента и FastAPI",
              desc: "Expo SDK и React Native обеспечивают нативную скорость 60 FPS для жестов и анимаций, а асинхронный event loop FastAPI мгновенно обрабатывает реляционные запросы PostgreSQL.",
              highlights: [
                "Пул соединений AsyncIO для максимальной пропускной способности",
                "Защищенное хранилище токенов через Expo SecureStore",
                "Промпт-инжиниринг с динамическим внедрением финансовых срезов"
              ]
            },
            features: [
              { num: "01", title: "Автономный AI-советник", desc: "Диалоговый агент, формирующий детальные срезы динамики трат и предупреждающий об аномалиях.", metric: "<1.2с Ответ AI" },
              { num: "02", title: "Контроль бюджетных лимитов", desc: "Пульсирующие индикаторы категорий, предупреждающие о перерасходе до совершения транзакции.", metric: "100% Клиентский Синхрон" },
              { num: "03", title: "Графики финансовой телеметрии", desc: "Информативные визуализации burn rate и динамики накоплений.", metric: "60 FPS Рендер" }
            ],
            impact: {
              metrics: [
                { label: "API_LATENCY", value: "38MS" },
                { label: "AI_ACCURACY", value: "97.4%" },
                { label: "TEST_COVERAGE", value: "91%" },
                { label: "SYSTEM_UPTIME", value: "99.9%" }
              ]
            }
          }
        },
        {
          num: "02",
          id: "OPENGOV_KZ_PORTAL",
          slug: "opengov-kz",
          title: "Платформа OpenGov.kz",
          tagline: "Национальный портал гражданского участия и открытого государственного управления",
          category: "GovTech Web-платформа",
          isPrivate: false,
          description: "Разработка с нуля фронтенда официальной платформы OpenGov.kz на Next.js и React. Реализована мультиязычность (i18n), каталоги новостей, проекты для граждан и высокая производительность SSR.",
          tags: ["Next.js", "React", "i18n", "Responsive UI", "REST APIs"],
          image: "/assets/openGov.png",
          liveUrl: "https://qbs-solutions.vercel.app/",
          githubUrl: "https://github.com/Daelijek/www-opengov-kz",
          status: "PRODUCTION_DEPLOYED",
          dossier: {
            projectType: "Государственный портал открытых данных и прозрачности",
            entryYear: "2024",
            targetPlatform: "Веб-платформа (Next.js SSR & SSG)",
            primaryRole: "Frontend Lead Инженер",
            technologies: {
              core: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS"],
              i18n: ["next-intl (Казахский, Русский, Английский)"],
              api: ["REST APIs", "Государственные открытые датасеты JSON"],
              perf: ["Vercel Edge Network", "Static Site Generation", "Lighthouse 98+"]
            },
            colorPalette: [
              { name: "GovTech Лазурный", hex: "#0070F3" },
              { name: "Циан Горизонт", hex: "#00DFD8" },
              { name: "Темный Слейт", hex: "#0B1017" },
              { name: "Облачный Белый", hex: "#F3F6F9" }
            ],
            status: "PRODUCTION_РАЗВЕРНУТ"
          },
          overview: {
            lead: "Высокопроизводительный портал открытого правительства, призванный объединить гражданские инициативы и государственные проекты через открытые каталоги и мультиязычную подачу информации.",
            targetAudience: "Граждане, исследователи и общественные объединения Казахстана, отслеживающие реализацию государственных программ, открытый бюджет и общественные инициативы.",
            challenge: "Государственные ресурсы нередко страдают от громоздкой навигации, плохой мобильной адаптации, долгой загрузки и неполной локализации контента.",
            solution: "С нуля спроектировал современный фронтенд на Next.js и Tailwind CSS с безупречной трехъязычной локализацией (казахский, русский, английский), мгновенным SSR-рендерингом и соответствием стандартам доступности WCAG 2.1 AA.",
            myRole: "Разработал архитектуру фронтенда, создал дизайн-систему и UI-компоненты, интегрировал REST API открытых данных и вывел показатели Core Web Vitals в зеленую зону."
          },
          walkthrough: {
            concept: {
              title: "Доступность и открытость для каждого",
              desc: "Устранение цифровых барьеров между государственными данными и жителями страны через чистый, быстрый и доступный интерфейс.",
              highlights: [
                "Полная государственная трехъязычная локализация",
                "Мгновенный SSR-отклик даже на бюджетных смартфонах",
                "Mobile-first дизайн со строгим соблюдением доступности WCAG"
              ]
            },
            architecture: {
              title: "Мультиязычная серверная архитектура",
              desc: "Маршрутизация Next.js со статической генерацией обеспечивает быструю индексацию поисковыми роботами и надежное кэширование на edge-серверах.",
              highlights: [
                "Модульная система дизайн-токенов для госпорталов",
                "Легкая векторная графика и нулевой сдвиг макета (CLS)",
                "Семантическая верстка HTML5 для скринридеров"
              ]
            },
            features: [
              { num: "01", title: "Трехъязычная динамическая локализация", desc: "Мгновенное переключение между казахским, русским и английским языками без сброса состояния.", metric: "3 Языка" },
              { num: "02", title: "Каталог гражданских инициатив", desc: "Интерактивная фильтрация и быстрый поиск по десяткам проектов и отчетов.", metric: "<15мс Поиск" },
              { num: "03", title: "Оптимизация Core Web Vitals", desc: "Максимальная скорость работы даже при нестабильном мобильном интернете в регионах.", metric: "99/100 Perf" }
            ],
            impact: {
              metrics: [
                { label: "LIGHTHOUSE", value: "99" },
                { label: "SEO_SCORE", value: "100" },
                { label: "ЯЗЫКОВ", value: "3" },
                { label: "FIRST_PAINT", value: "0.4С" }
              ]
            }
          }
        },
        {
          num: "03",
          id: "BERIK_ZHUNUSBEK_WEB",
          slug: "berik-zhunusbek",
          title: "Галерея Берика Жунусбека",
          tagline: "Атмосферное кинетическое портфолио и цифровая витрина работ признанного скульптора и CG-художника",
          category: "Creative Showcase & Галерея",
          isPrivate: false,
          description: "Цифровое портфолио для скульптора, актера и CG-художника Берика Жунусбека. Сайт передает творческую атмосферу с интерактивной галереей и мультиязычной поддержкой.",
          tags: ["HTML5", "CSS3", "JavaScript", "Portfolio", "Multilanguage"],
          image: "/assets/berikWeb.png",
          liveUrl: "https://berikzhunusbek.kz/",
          githubUrl: "https://github.com/Daelijek/BerikWeb",
          status: "LIVE_PRODUCTION",
          dossier: {
            projectType: "Арт-галерея и персональное портфолио",
            entryYear: "2024",
            targetPlatform: "Универсальный веб и дисплеи высокого разрешения",
            primaryRole: "Creative Frontend Инженер & Visual Дизайнер",
            technologies: {
              core: ["HTML5", "CSS3 / Modern Grid", "Vanilla JavaScript"],
              multimedia: ["Кастомный лайтбокс", "Оптимизация 4K изображений"],
              features: ["Мультиязычность", "Кинетический плавный скролл", "Минималистичный дизайн"]
            },
            colorPalette: [
              { name: "Теплая Бронза", hex: "#C69255" },
              { name: "Галерейный Нуар", hex: "#0D0D0D" },
              { name: "Пергамент", hex: "#EAE6DF" },
              { name: "Антрацит", hex: "#1F1F1F" }
            ],
            status: "LIVE_PRODUCTION"
          },
          overview: {
            lead: "Цифровое арт-пространство скульптора, актера и CG-художника Берика Жунусбека. Сайт объединяет монументальные скульптуры, кадры из кинофильмов и цифровые произведения в атмосфере выверенного минимализма.",
            targetAudience: "Коллекционеры, кураторы выставок, галеристы и продюсеры киноиндустрии, изучающие портфолио автора для новых заказов.",
            challenge: "Показ ультра-детализированных фотографий скульптур без снижения скорости загрузки страниц и без потери визуальной чистоты произведений.",
            solution: "Создал темную минималистичную галерею с кинетической типографикой, прогрессивной подгрузкой медиа, кастомным лайтбоксом и поддержкой двух языков.",
            myRole: "Разработал концепт визуального стиля, выполнил адаптивную верстку, провел оптимизацию производительности и настроил релиз на международном домене."
          },
          walkthrough: {
            concept: {
              title: "Скульптурный минимализм и акцент на деталях",
              desc: "Интерфейс служит нейтральным фоном галереи, позволяя текстуре бронзы, мрамора и света выйти на первый план.",
              highlights: [
                "Курируемая витрина скульптур с тактильным зумом",
                "Плавные кинетические микроанимации при прокрутке",
                "Двуязычная подача на казахском и русском языках"
              ]
            },
            architecture: {
              title: "Легкий медиа-движок для High-DPI экранов",
              desc: "Чистый Vanilla JavaScript без сторонних фреймворков и оптимизированный CSS гарантируют моментальный рендеринг и плавный скролл.",
              highlights: [
                "Оптимизированные адаптивные наборы изображений",
                "Нулевые внешние зависимости кодовой базы",
                "Плавная адаптивная масштабируемость типографики"
              ]
            },
            features: [
              { num: "01", title: "Галерея высокого разрешения", desc: "Интерактивная сетка работ с моментальным открытием полноразмерных фото.", metric: "Instant Open" },
              { num: "02", title: "Двуязычный интерфейс", desc: "Бесшовное переключение описаний между казахским и русским.", metric: "Zero Reload" },
              { num: "03", title: "Тактильная мобильная галерея", desc: "Удобный просмотр и масштабирование монументальных работ на мобильных экранах.", metric: "Retina Ready" }
            ],
            impact: {
              metrics: [
                { label: "ВЕС_СТРАНИЦЫ", value: "-45%" },
                { label: "ЧЕТКОСТЬ", value: "4K" },
                { label: "UPTIME", value: "100%" },
                { label: "ОТКАЗЫ", value: "22%" }
              ]
            }
          }
        }
      ],
      otherTitle: "АРХИВ СИСТЕМ И ЭКСПЕРИМЕНТОВ",
      otherProjects: [
        { id: "EVENTLY", slug: "evently", title: "Evently", desc: "Платформа планирования мероприятий с генерацией QR-приглашений, голосованием за слоты и RSVP.", tags: ["QR System", "MongoDB", "Node.js"], url: "https://github.com/Daelijek/Evently" },
        { id: "KAZ_DATA", slug: "kaz-data", title: "Kaz-Data Solutions", desc: "Сервис поиска и бронирования билетов на события по всему Казахстану.", tags: ["Event Engine", "HTML/JS", "MongoDB"], url: "https://github.com/Daelijek/Kaz-Data_Solutions" },
        { id: "QUEUEMS", slug: "queuems", title: "QueueMS Microservices", desc: "Микросервисная система управления очередями на Go для параллельной обработки задач и уведомлений.", tags: ["Golang", "Microservices", "Backend"], url: "https://github.com/Daelijek/QueueMS" },
        { id: "AITU_CALC", slug: "aitu-calc", title: "AITU Grade Calculator", desc: "Десктопное приложение на Python (CustomTkinter) для расчета академического рейтинга и стипендий.", tags: ["Python", "CustomTkinter", "Education"], url: "https://github.com/Daelijek/AITU_grade_calculator" },
        { id: "VOICE_ASSISTANT", slug: "voice-assistant", title: "Voice Assistant AI", desc: "Голосовой помощник на Python с распознаванием речи и выполнением системных команд.", tags: ["Python", "Speech Recognition", "Automation"], url: "https://github.com/Daelijek/Voice_Assistant" },
        { id: "SYS_RETRIEVAL", slug: "sys-retrieval", title: "Parameters Retrieval", desc: "Утилита с графическим интерфейсом для мониторинга параметров и диагностики системы.", tags: ["Python", "GUI", "Diagnostics"], url: "https://github.com/Daelijek/ParametersRetrieval" }
      ]
    },
    experience: {
      tag: "СЕКТОР_03 // ТЕЛЕМЕТРИЯ КАРЬЕРЫ",
      title: "СИСТЕМНЫЕ ЛОГИ ОПЫТА",
      subtitle: "История коммерческой и стартап-разработки",
      logs: [
        {
          code: "LOG_01",
          period: "ОКТ 2025 – АПР 2026",
          company: "BEYIMTECH",
          badge: "EdTech Стартап · Astana Hub",
          role: "MIDDLE FRONTEND & MOBILE РАЗРАБОТЧИК",
          points: [
            "Разработка AI-образовательных сервисов на Next.js 14, React 18 и TypeScript (интеграция редакторов Lexical и next-intl).",
            "Лидирование восстановления мобильного приложения: рефакторинг Flutter + Riverpod, AD-авторизация и внедрение AI-чатбота в production.",
            "Создание дашбордов аналитики для 20+ школ (RTK Query) и разработка системы телеметрии поведения учеников в реальном времени.",
            "Управление релизами в App Store и Google Play, внедрение in-app обновлений через Firebase Remote Config."
          ]
        },
        {
          code: "LOG_02",
          period: "НОЯ 2023 – ЯНВ 2026",
          company: "TRUSTME",
          badge: "Blockchain SaaS · 1.5M+ Пользователей",
          role: "MARKUP DEVELOPER (КОНТРАКТ)",
          points: [
            "Разработка и оптимизация шаблонов смарт-контрактов для платформы с 1.5M+ пользователей и 3000+ компаний.",
            "Интеграция REST API для юридически значимых цифровых подписей, SMS-верификации и блокчейн-авторизации документов.",
            "Создание переиспользуемых модульных UI-компонентов для экосистемы TrustContract."
          ]
        },
        {
          code: "LOG_03",
          period: "ФЕВ 2025 – АПР 2025",
          company: "QB SOLUTIONS",
          badge: "GovTech / Enterprise",
          role: "FRONTEND РАЗРАБОТЧИК (СТАЖИРОВКА)",
          points: [
            "Разработка фронтенда веб-платформы OpenGov.kz с нуля на Next.js и React.",
            "Реализация каталогов новостей, гражданских проектов, полной локализации и адаптивного дизайна."
          ]
        },
        {
          code: "LOG_04",
          period: "СЕН 2023 – НОЯ 2023",
          company: "STOLOVKA",
          badge: "FoodTech Стартап",
          role: "MOBILE РАЗРАБОТЧИК (СТАЖИРОВКА)",
          points: [
            "Создание Flutter приложения: каталог меню, корзина заказов, профиль и авторизация по Figma макетам.",
            "Настройка сборки и дистрибуции через Firebase App Distribution для непрерывного тестирования."
          ]
        },
        {
          code: "LOG_05",
          period: "СЕН 2022 – ИЮН 2025",
          company: "ASTANA IT UNIVERSITY",
          badge: "Астана, Казахстан",
          role: "БАКАЛАВР ПРОГРАММНОЙ ИНЖЕНЕРИИ",
          points: [
            "Окончил бакалавриат по специальности Software Engineering. Упор на распределенные системы, алгоритмы и современный веб."
          ]
        }
      ]
    },
    contact: {
      tag: "СЕКТОР_04 // ПОРТ СВЯЗИ",
      title: "ИНИЦИАЛИЗАЦИЯ СВЯЗИ",
      lead: "Ищете сильного разработчика для проекта, стартапа или в команду на full-time / contract? Напишите мне в Telegram для быстрого ответа.",
      email: "dias1605ermek@gmail.com",
      telegram: "https://t.me/daelijek_og",
      github: "https://github.com/Daelijek",
      linkedin: "https://www.linkedin.com/in/dias-yermek/",
      copied: "EMAIL_СКОПИРОВАН_В_БУФЕР",
      copyEmail: "СКОПИРОВАТЬ EMAIL",
      sendTelegram: "ОТКРЫТЬ TELEGRAM",
      localTimeLabel: "ВРЕМЯ В АСТАНЕ"
    },
    footer: {
      rights: "ДИАС ЕРМЕК // ВСЕ СИСТЕМЫ РАБОТАЮТ ШТАТНО",
      engine: "ПОСТРОЕНО НА NEXT.JS 15, TAILWIND & WEB AUDIO API",
      year: "2026"
    }
  }
};
