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
          title: "Finance Management Application",
          category: "Full-Stack Mobile App & AI",
          description: "Intelligent cross-platform personal finance ecosystem with React Native (Expo) and a high-performance FastAPI/PostgreSQL backend. Features an integrated OpenAI assistant that analyzes spending patterns in real-time, interactive budget trackers, and automated limit alerts.",
          tags: ["React Native", "Expo", "FastAPI", "OpenAI API", "PostgreSQL"],
          image: "/assets/Finance.png",
          liveUrl: "https://github.com/Daelijek/FinanceManagementApp",
          githubUrl: "https://github.com/Daelijek/FinanceManagementApp",
          status: "ACTIVE_REPOSITORY"
        },
        {
          num: "02",
          id: "OPENGOV_KZ_PORTAL",
          title: "OpenGov.kz Platform",
          category: "GovTech Web Platform",
          description: "Engineered the official OpenGov.kz platform frontend from scratch with Next.js and React. Deployed full multi-language localization (i18n), news catalogs, civic participation portals, and blazing-fast server-rendered performance for citizen-government transparency.",
          tags: ["Next.js", "React", "i18n", "Responsive UI", "REST APIs"],
          image: "/assets/openGov.png",
          liveUrl: "https://qbs-solutions.vercel.app/",
          githubUrl: "https://github.com/Daelijek/www-opengov-kz",
          status: "PRODUCTION_DEPLOYED"
        },
        {
          num: "03",
          id: "BERIK_ZHUNUSBEK_WEB",
          title: "Berik Zhunusbek Digital Gallery",
          category: "Creative Showcase",
          description: "A digital portfolio and multimedia showcase created for sculptor, actor, CG artist, and specialist Berik Zhunusbek. Built with high-fidelity visual aesthetics, interactive gallery components, and multi-language support.",
          tags: ["HTML5", "CSS3", "JavaScript", "Portfolio", "Multilanguage"],
          image: "/assets/berikWeb.png",
          liveUrl: "https://berikzhunusbek.kz/",
          githubUrl: "https://github.com/Daelijek/BerikWeb",
          status: "LIVE_PRODUCTION"
        }
      ],
      otherTitle: "SYSTEM ARCHIVE & EXPERIMENTS",
      otherProjects: [
        { id: "EVENTLY", title: "Evently", desc: "Modern event planning platform with QR code invitation generation, time voting, and automated RSVP flows.", tags: ["QR System", "MongoDB", "Node.js"], url: "https://github.com/Daelijek/Evently" },
        { id: "KAZ_DATA", title: "Kaz-Data Solutions", desc: "Comprehensive event aggregation and ticket booking engine across Kazakhstan.", tags: ["Event Engine", "HTML/JS", "MongoDB"], url: "https://github.com/Daelijek/Kaz-Data_Solutions" },
        { id: "QUEUEMS", title: "QueueMS Microservices", desc: "High-throughput microservices queue system built with Go for distributed notifications and client task queues.", tags: ["Golang", "Microservices", "Backend"], url: "https://github.com/Daelijek/QueueMS" },
        { id: "AITU_CALC", title: "AITU Grade Calculator", desc: "Desktop application with CustomTkinter GUI for university GPA calculation and scholarship tracking.", tags: ["Python", "CustomTkinter", "Education"], url: "https://github.com/Daelijek/AITU_grade_calculator" },
        { id: "VOICE_ASSISTANT", title: "Voice Assistant AI", desc: "Speech-activated Python automation assistant with NLP command parsing and system controls.", tags: ["Python", "Speech Recognition", "Automation"], url: "https://github.com/Daelijek/Voice_Assistant" },
        { id: "SYS_RETRIEVAL", title: "Parameters Retrieval", desc: "Hardware diagnostic and telemetry GUI for OS resource and parameter monitoring.", tags: ["Python", "GUI", "Diagnostics"], url: "https://github.com/Daelijek/ParametersRetrieval" }
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
          title: "Finance Management Application",
          category: "Full-Stack Мобильное приложение & AI",
          description: "Интеллектуальная кроссплатформенная экосистема для учета финансов на React Native (Expo) с бэкендом на FastAPI/PostgreSQL. Включает интегрированного AI-ассистента на базе OpenAI для анализа трат, интерактивные лимиты и графики бюджета.",
          tags: ["React Native", "Expo", "FastAPI", "OpenAI API", "PostgreSQL"],
          image: "/assets/Finance.png",
          liveUrl: "https://github.com/Daelijek/FinanceManagementApp",
          githubUrl: "https://github.com/Daelijek/FinanceManagementApp",
          status: "ACTIVE_REPOSITORY"
        },
        {
          num: "02",
          id: "OPENGOV_KZ_PORTAL",
          title: "Платформа OpenGov.kz",
          category: "GovTech Web-платформа",
          description: "Разработка с нуля фронтенда официальной платформы OpenGov.kz на Next.js и React. Реализована мультиязычность (i18n), каталоги новостей, проекты для граждан и высокая производительность SSR.",
          tags: ["Next.js", "React", "i18n", "Responsive UI", "REST APIs"],
          image: "/assets/openGov.png",
          liveUrl: "https://qbs-solutions.vercel.app/",
          githubUrl: "https://github.com/Daelijek/www-opengov-kz",
          status: "PRODUCTION_DEPLOYED"
        },
        {
          num: "03",
          id: "BERIK_ZHUNUSBEK_WEB",
          title: "Галерея Берика Жунусбека",
          category: "Creative Showcase",
          description: "Цифровое портфолио для скульптора, актера и CG-художника Берика Жунусбека. Сайт передает творческую атмосферу с интерактивной галереей и мультиязычной поддержкой.",
          tags: ["HTML5", "CSS3", "JavaScript", "Portfolio", "Multilanguage"],
          image: "/assets/berikWeb.png",
          liveUrl: "https://berikzhunusbek.kz/",
          githubUrl: "https://github.com/Daelijek/BerikWeb",
          status: "LIVE_PRODUCTION"
        }
      ],
      otherTitle: "АРХИВ СИСТЕМ И ЭКСПЕРИМЕНТОВ",
      otherProjects: [
        { id: "EVENTLY", title: "Evently", desc: "Платформа планирования мероприятий с генерацией QR-приглашений, голосованием за слоты и RSVP.", tags: ["QR System", "MongoDB", "Node.js"], url: "https://github.com/Daelijek/Evently" },
        { id: "KAZ_DATA", title: "Kaz-Data Solutions", desc: "Сервис поиска и бронирования билетов на события по всему Казахстану.", tags: ["Event Engine", "HTML/JS", "MongoDB"], url: "https://github.com/Daelijek/Kaz-Data_Solutions" },
        { id: "QUEUEMS", title: "QueueMS Microservices", desc: "Микросервисная система управления очередями на Go для параллельной обработки задач и уведомлений.", tags: ["Golang", "Microservices", "Backend"], url: "https://github.com/Daelijek/QueueMS" },
        { id: "AITU_CALC", title: "AITU Grade Calculator", desc: "Десктопное приложение на Python (CustomTkinter) для расчета академического рейтинга и стипендий.", tags: ["Python", "CustomTkinter", "Education"], url: "https://github.com/Daelijek/AITU_grade_calculator" },
        { id: "VOICE_ASSISTANT", title: "Voice Assistant AI", desc: "Голосовой помощник на Python с распознаванием речи и выполнением системных команд.", tags: ["Python", "Speech Recognition", "Automation"], url: "https://github.com/Daelijek/Voice_Assistant" },
        { id: "SYS_RETRIEVAL", title: "Parameters Retrieval", desc: "Утилита с графическим интерфейсом для мониторинга параметров и диагностики системы.", tags: ["Python", "GUI", "Diagnostics"], url: "https://github.com/Daelijek/ParametersRetrieval" }
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
