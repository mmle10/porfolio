export const myProjects = [
  {
    id: 3,
    title: "Codium",
    description:
      "The home of Codium, the custom software studio I founded in Santo Domingo. I build digital products that move businesses forward web applications for billing, hospitality, QR-based security, and jewelry retail.",
    subDescription: [
      "Designed and built end to end: clear design, solid code, and delivery on what was agreed. Web development, applications, and technical consulting for clients who need a product, not just a page.",
      "Stack: Next.js, React, TypeScript, NestJS, Node.js, MongoDB, PostgreSQL, Docker, and Vercel.",
    ],
    category: "Software Studio · Santo Domingo",
    href: "https://codiumservices.com/",
    logo: "",
    image: "/assets/projects/codium-main.png",
    images: ["/assets/projects/codium-main.png"],
    tags: [
      {
        id: 1,
        name: "Next.js",
        path: "/assets/logos/next.png",
      },
      {
        id: 2,
        name: "React",
        path: "/assets/logos/react.svg",
      },
      {
        id: 3,
        name: "TypeScript",
        path: "/assets/logos/typescript.png",
      },
      {
        id: 4,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  },
  {
    id: 4,
    title: "KiduRD",
    description:
      "A platform for running daycare and early-education centers in the Dominican Republic. The center's wall, chat, classrooms, HR, and billing in one place plus a family app with calendar, QR access, and live updates.",
    subDescription: [
      "Classrooms with bulletin, plans, coverage, and materials. Reports with portfolio, development tracking, and medical history. A public directory where families find and rate centers, and QR check-in at the door.",
      "Stack: Next.js, React, TypeScript, NestJS, Node.js, MongoDB, REST APIs, Docker, Vercel, and Capacitor.",
    ],
    category: "SaaS · Education",
    href: "https://kidurd.com/",
    logo: "",
    image: "/assets/projects/kidu_1.jpeg",
    images: [
      "/assets/projects/kidu_1.jpeg",
      "/assets/projects/kidu_2.jpeg",
      "/assets/projects/kidu_3.jpeg",
    ],
    tags: [
      {
        id: 1,
        name: "Next.js",
        path: "/assets/logos/next.png",
      },
      {
        id: 2,
        name: "React",
        path: "/assets/logos/react.svg",
      },
      {
        id: 3,
        name: "NestJS",
        path: "/assets/logos/nestjs.svg",
      },
      {
        id: 4,
        name: "MongoDB",
        path: "/assets/logos/mongo.svg",
      },
      {
        id: 5,
        name: "TypeScript",
        path: "/assets/logos/typescript.png",
      },
      {
        id: 6,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  },
  {
    id: 5,
    title: "Magna Motors",
    description:
      "Payment platform for Magna Motors' authorized service centers (Hyundai, BMW, and MINI). I built the complete frontend and the integrations with SAP and Azul Pagos, so customers pay their service orders at a self-service kiosk or through a link sent by their advisor, with real-time payment confirmation.",
    subDescription: [
      "My contribution: the entire frontend and the integration layer SAP (SOAP/XML) for customers, vehicles, service orders, and pre-invoices; Azul Pagos for secure card payments; WhatsApp payment links; and Mailgun receipts.",
      "Two flows: a self-service kiosk where customers identify with their ID and vehicle chassis to look up and pay pending orders or download invoices, and an advisor panel to generate pre-invoices, send payment links, and track every charge live with status pending, sent, paid, or declined. On payment, the system issues a receipt with its authorization code, shows the invoice as PDF, and emails the confirmation. Stack: React, TypeScript, Vite, Node.js, SAP (SOAP/XML), Azul Pagos API, Mailgun, and PDF-Lib/PDF.js.",
    ],
    category: "Payments · Automotive",
    href: "https://www.magna.com.do/",
    logo: "",
    image: "/assets/projects/magna_1.png",
    images: [
      "/assets/projects/magna_1.png",
      "/assets/projects/magna_2.png",
      "/assets/projects/magna_3.png",
      "/assets/projects/magna_4.png",
    ],
    tags: [
      {
        id: 1,
        name: "React",
        path: "/assets/logos/react.svg",
      },
      {
        id: 2,
        name: "TypeScript",
        path: "/assets/logos/typescript.png",
      },
      {
        id: 3,
        name: "Vite",
        path: "/assets/logos/vitejs.svg",
      },
      {
        id: 4,
        name: "Node.js",
        path: "/assets/logos/node.svg",
      },
    ],
  },
  {
    id: 6,
    title: "Capital Motor Cars",
    description:
      "Freelance project on Upwork for Capital Motor Cars, an auto broker in New York and New Jersey that makes car leasing stress-free. The site showcases monthly lease deals by brand and guides visitors from picking a car to applying for credit.",
    subDescription: [
      "A deals catalog with the monthly price, down payment, and term up front; brand hubs for BMW, Mercedes, Audi, Hyundai, and more; vehicle pages with technical specs; a lease calculator; and a credit application flow so no dealership haggling.",
      "My work: frontend development of the marketing site, with responsive pages, deal cards, and brand/spec layouts in a dark showroom style that keeps the monthly payment front and center. Stack: Next.js, React, TypeScript, Tailwind CSS, and PostgreSQL.",
    ],
    category: "Freelance · Upwork",
    href: "https://www.capitalmotorcars.com/",
    logo: "",
    image: "/assets/projects/capital_1.png",
    images: [
      "/assets/projects/capital_1.png",
      "/assets/projects/capital_2.png",
      "/assets/projects/capital_3.png",
    ],
    tags: [
      {
        id: 1,
        name: "Next.js",
        path: "/assets/logos/next.png",
      },
      {
        id: 2,
        name: "React",
        path: "/assets/logos/react.svg",
      },
      {
        id: 3,
        name: "TypeScript",
        path: "/assets/logos/typescript.png",
      },
      {
        id: 4,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
      {
        id: 5,
        name: "PostgreSQL",
        path: "/assets/logos/postgresql.svg",
      },
    ],
  },
  {
    id: 1,
    title: "AutoAgenda.net",
    description:
      "Personal SaaS connecting vehicle owners with repair shops through maps, appointment booking, service tracking, and spare parts. Role-based workflows for customers and workshop staff, on web, Android, and iOS.",
    subDescription: [
      "CardNET payments and Lemon Squeezy subscriptions with webhooks. Real-time messaging via Socket.IO, push notifications with Firebase Cloud Messaging, Google OAuth, Mapbox, and Cloudinary.",
      "Stack: Next.js, React, TypeScript, NestJS, Node.js, MongoDB, REST APIs, WebSockets, Docker, Vercel, Render, and Capacitor.",
    ],
    category: "SaaS · Automotive",
    href: "https://autoagenda.net/",
    logo: "",
    image: "/assets/projects/autoagenda_1.png",
    images: [
      "/assets/projects/autoagenda_1.png",
      "/assets/projects/autoagenda_5.jpg",
      "/assets/projects/autoagenda_6.jpg",
    ],
    mobileImages: [
      "/assets/projects/autoagenda_m1.png",
      "/assets/projects/autoagenda_m2.png",
      "/assets/projects/autoagenda_m3.png",
      "/assets/projects/autoagenda_m4.png",
      "/assets/projects/autoagenda_m5.png",
      "/assets/projects/autoagenda_m6.png",
    ],
    tags: [
      {
        id: 1,
        name: "Next.js",
        path: "/assets/logos/next.png",
      },
      {
        id: 2,
        name: "React",
        path: "/assets/logos/react.svg",
      },
      {
        id: 3,
        name: "NestJS",
        path: "/assets/logos/nestjs.svg",
      },
      {
        id: 4,
        name: "MongoDB",
        path: "/assets/logos/mongo.svg",
      },
      {
        id: 5,
        name: "TypeScript",
        path: "/assets/logos/typescript.png",
      },
      {
        id: 6,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  },
  {
    id: 2,
    title: "Vacloud - Cloud Storage",
    description:
      "A modern cloud storage application built with Next.js and Appwrite, featuring real-time file management, user authentication, and advanced caching. Users can upload, manage, and organize files with categorization and a clean dashboard experience.",
    subDescription: [
      "Built with Next.js 15 and Appwrite for a seamless cloud storage experience.",
    ],
    category: "Cloud Storage",
    href: "https://vacloud.vercel.app/",
    logo: "",
    image: "/assets/projects/vacloud-dasboard.png",
    tags: [
      {
        id: 1,
        name: "Next.js",
        path: "/assets/logos/next.png",
      },
      {
        id: 2,
        name: "React",
        path: "/assets/logos/react.svg",
      },
      {
        id: 3,
        name: "Appwrite",
        path: "/assets/logos/appwrite.svg",
      },
      {
        id: 4,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
      {
        id: 5,
        name: "TypeScript",
        path: "/assets/logos/typescript.png",
      },
    ],
  },
  {
    id: 7,
    title: "Pokémon: La Senda",
    description:
      "A fan-made 2D side-scrolling Pokémon platformer for the browser that I'm developing with Phaser 3 and TypeScript. You play as the Pokémon itself: run, jump, and glide through data-built routes, battle wild species in real time, catch them, and train them.",
    subDescription: [
      "Pick Fuecoco, Quaxly, or Sprigatito, then explore routes with checkpoints, ribbons, Oran berries, destructible obstacles, and trainer battles. Dual-purpose moves work in combat and on the map: melting ice, dousing flames, breaking rocks, opening gates, and crossing ravines.",
      "Systems: XP and levels 5-100 with evolutions, a party of 6 plus a 240-slot PC box and Pokédex, 194 teachable moves filtered by real per-species compatibility, missions, and a camp hub. Node.js scripts generate the species-by-move data files, the chiptune audio is synthesized with Web Audio, and three versioned save slots persist in localStorage. Unofficial fan project, built with Phaser 3.90, TypeScript in strict mode, and Vite 8.",
    ],
    category: "Fan Game · In Development",
    href: "https://github.com/mmle10",
    logo: "",
    image: "/assets/projects/senda_1.png",
    images: [
      "/assets/projects/senda_1.png",
      "/assets/projects/senda_2.png",
    ],
    tags: [
      {
        id: 1,
        name: "TypeScript",
        path: "/assets/logos/typescript.png",
      },
      {
        id: 2,
        name: "Vite",
        path: "/assets/logos/vitejs.svg",
      },
      {
        id: 3,
        name: "Node.js",
        path: "/assets/logos/node.svg",
      },
    ],
  },
];

export const orbitSlides = [
  {
    id: "cd-1",
    projectId: 3,
    src: "/assets/projects/codium-main.png",
  },
  {
    id: "kd-1",
    projectId: 4,
    src: "/assets/projects/kidu_1.jpeg",
  },
  {
    id: "mg-1",
    projectId: 5,
    src: "/assets/projects/magna_1.png",
  },
  {
    id: "cm-1",
    projectId: 6,
    src: "/assets/projects/capital_1.png",
  },
  {
    id: "aa-1",
    projectId: 1,
    src: "/assets/projects/autoagenda_1.png",
  },
  {
    id: "vc-1",
    projectId: 2,
    src: "/assets/projects/vacloud-dasboard.png",
  },
  {
    id: "sd-1",
    projectId: 7,
    src: "/assets/projects/senda_1.png",
  },
];

export const mySocials = [
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/luis-eduardo-melo-marcial-8a21b6156/",
    icon: "/assets/socials/linkedIn.svg",
  },
  {
    name: "GitHub",
    href: "https://github.com/mmle10",
    icon: "/assets/logos/github.svg",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/mmle10/reels/",
    icon: "/assets/socials/instagram.svg",
  },
];

export const experiences = [
  {
    title: "Founder & Full-Stack Developer",
    job: "Codium",
    at: "Codium · Custom software · Santo Domingo",
    date: "03/2026 — Present",
    contents: [
      "Founder of Codium (codiumservices.com). Building custom web applications from scratch for billing, hospitality, QR-based security, and jewelry retail.",
      "Shipping frontend, backend, databases, and API integrations, and turning client requirements into complete software solutions.",
    ],
  },
  {
    title: "Software Developer",
    job: "Grupo Read",
    at: "Grupo Read · Full-time · Santo Domingo",
    date: "06/2024 — 11/2025",
    contents: [
      "Developed and maintained a healthcare appointment platform with React.js, Next.js, TypeScript, and Tailwind CSS.",
      "Implemented scheduling, cancellations, multi-location availability, interactive maps, and automated notifications.",
      "Built Node.js and MongoDB APIs with business logic, authentication, and role-based access control (RBAC).",
      "Troubleshot production issues and collaborated with development and QA on reviews, deployments, and CI/CD in Agile Scrum.",
    ],
  },
  {
    title: "Software Developer",
    job: "Codika, SRL",
    at: "Codika, SRL · Full-time · Santo Domingo",
    date: "01/2021 — 06/2023",
    contents: [
      "Developed web applications for automotive and security clients with React, TypeScript, Tailwind CSS, Node.js, and MongoDB.",
      "Built automotive booking: customer dashboards, scheduling, vehicle management, RBAC, and provider notifications.",
      "Developed security operations features for personnel, locations, vehicle fleets, and role-based permissions.",
      "Integrated REST APIs and collaborated through versioning, sprint planning, and stand-ups in Agile Scrum.",
    ],
  },
  {
    title: "Systems Engineering",
    job: "Universidad Dominicana O&M",
    at: "Universidad Dominicana O&M",
    date: "2012 — 2020",
    contents: [
      "Bachelor's degree in Systems Engineering.",
    ],
  },
  {
    title: "School Diploma in Accounting",
    job: "Gustavo Adolfo Bécquer",
    at: "Gustavo Adolfo Bécquer",
    date: "2002 — 2011",
    contents: [
      "School diploma in Accounting.",
    ],
  },
];

export const languages = [
  {
    name: "Spanish",
    level: "Native",
  },
  {
    name: "English",
    level: "Fluent / Professional Working Proficiency",
  },
];

export const skills = [
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "SQL",
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "Redux",
  "TanStack Query",
  "Responsive Design",
  "Three.js",
  "Node.js",
  "NestJS",
  "RESTful APIs",
  "WebSockets",
  "Socket.IO",
  "RBAC",
  "PostgreSQL",
  "MongoDB",
  "Supabase",
  "Appwrite",
  "LLM APIs",
  "Firebase",
  "Google OAuth",
  "Jira",
  "Agile",
  "Scrum",
  "CI/CD",
  "Docker",
  "Vercel",
  "Render",
  "Azure DevOps",
  "Git",
  "GitLab",
  "GitKraken",
  "VS Code",
  "Postman",
  "Capacitor",
];

export const skillLogos = {
  TypeScript: "/assets/logos/typescript.png",
  JavaScript: "/assets/logos/javascript.svg",
  HTML: "/assets/logos/html5.svg",
  CSS: "/assets/logos/css3.svg",
  SQL: "/assets/logos/microsoftsqlserver.svg",
  "React.js": "/assets/logos/react.svg",
  "Next.js": "/assets/logos/next.png",
  "Tailwind CSS": "/assets/logos/tailwindcss.svg",
  "Node.js": "/assets/logos/node.svg",
  NestJS: "/assets/logos/nestjs.svg",
  MongoDB: "/assets/logos/mongo.svg",
  Appwrite: "/assets/logos/appwrite.svg",
  "Azure DevOps": "/assets/logos/azure.svg",
  Git: "/assets/logos/git.svg",
};

export const stats = [
  { value: "6+", label: "Years building products" },
  { value: "7+", label: "Shipped products" },
  { value: "1.5K+", label: "End users served" },
  { value: "40%", label: "Avg. productivity lift" },
];

export const services = [
  {
    id: "01",
    title: "Web Applications",
    description:
      "Production React and Next.js apps your customers use every day: fast pages, clean dashboards, and interfaces that stay easy to change as the product grows.",
    items: [
      "Landing pages and marketing sites",
      "Dashboards and SaaS platforms",
      "Booking, catalogs, and role-based UIs",
      "Performance, SEO, and accessibility passes",
    ],
    art: "web",
    logos: [
      { src: "/assets/logos/react.svg", alt: "React" },
      { src: "/assets/logos/next.png", alt: "Next.js" },
      { src: "/assets/logos/typescript.png", alt: "TypeScript" },
      { src: "/assets/logos/tailwindcss.svg", alt: "Tailwind CSS" },
    ],
  },
  {
    id: "02",
    title: "APIs & Backends",
    description:
      "The NestJS and Node.js services behind the interface: clean REST APIs, auth and data models, plus the critical pieces billing, webhooks, and background jobs done properly.",
    items: [
      "REST API design and third-party integrations",
      "MongoDB and PostgreSQL data models",
      "Auth, roles, and permissions",
      "Webhooks, billing, and background jobs",
    ],
    art: "api",
    logos: [
      { src: "/assets/logos/nestjs.svg", alt: "NestJS" },
      { src: "/assets/logos/node.svg", alt: "Node.js" },
      { src: "/assets/logos/mongo.svg", alt: "MongoDB" },
      { src: "/assets/logos/microsoftsqlserver.svg", alt: "SQL Server" },
    ],
  },
  {
    id: "03",
    title: "Mobile with Capacitor",
    description:
      "Your web product in the app stores. Capacitor wraps the same Next.js build for iOS and Android, so you ship mobile without paying for a second codebase.",
    items: [
      "iOS and Android from one codebase",
      "Push notifications and deep links",
      "Offline-friendly flows",
      "App-store ready builds",
    ],
    art: "mobile",
    logos: [
      { src: "/assets/logos/react.svg", alt: "React" },
      { src: "/assets/logos/typescript.png", alt: "TypeScript" },
      { src: "/assets/logos/vitejs.svg", alt: "Vite" },
      { src: "/assets/logos/node.svg", alt: "Node.js" },
    ],
  },
  {
    id: "04",
    title: "Integrations",
    description:
      "The services your product needs to actually run a business payments, login, maps, and real-time features wired into one system instead of five disconnected tools.",
    items: [
      "Stripe checkout, webhooks, and plan limits",
      "OAuth, JWT, and role-based access",
      "Mapbox, Socket.IO, and real-time chat",
      "Email, storage, and third-party APIs",
    ],
    art: "admin",
    logos: [
      { src: "/assets/logos/stripe.svg", alt: "Stripe" },
      { src: "/assets/logos/auth0.svg", alt: "Auth0" },
      { src: "/assets/logos/node.svg", alt: "Node.js" },
      { src: "/assets/logos/mongo.svg", alt: "MongoDB" },
    ],
  },
];

export const faqs = [
  {
    question: "How soon will you reply?",
    answer:
      "Usually within 24 hours. Send a brief and I'll come back with a realistic plan, timeline, and price.",
  },
  {
    question: "Where are you based, and do you work remotely?",
    answer:
      "Santo Domingo, Dominican Republic. I work remotely with teams in the US, Latin America, and Europe, in English and Spanish. Budgets and invoices in USD.",
  },
  {
    question: "Can we meet during my business hours?",
    answer:
      "Yes. I'm on AST (UTC-4), which overlaps the US East Coast almost entirely and works well with Latin America. For Europe we set morning or late-afternoon calls, with written updates in between so work keeps moving.",
  },
  {
    question: "What can you build end to end?",
    answer:
      "Full-stack web apps with React, Next.js, NestJS, and Node.js: SaaS platforms, admin tools, APIs, auth, payments, maps, and Capacitor mobile apps. One stack, from the interface to the database.",
  },
  {
    question: "What budgets do you take on?",
    answer:
      "Projects under $1k, $1k–$5k, $5k–$15k, and $15k+, or hourly. Pick a range in the form and I'll scope to it.",
  },
  {
    question: "Are you available now?",
    answer:
      "Yes: available for new projects, freelance and contract.",
  },
  {
    question: "How does a project usually run?",
    answer:
      "You send a brief. I reply with a plan, timeline, and price. We lock the scope, I build in weekly checkpoints, then we ship and I hand over the repo, docs, and deploy.",
  },
  {
    question: "Can you join an existing product?",
    answer:
      "Yes. I step into live codebases, unblock what is stuck, and ship the next slice. No rewrite unless we both agree it is the right call.",
  },
  {
    question: "Do you stay on after launch?",
    answer:
      "Yes. After handoff I can stay for fixes, iterations, and new features on a retainer or hourly.",
  },
];

export const reviews = [
  {
    name: "John Smith",
    username: "@johnsmith",
    body: "I was blown away by the quality of the work. The attention to detail is top notch.",
    img: "https://avatars.githubusercontent.com/u/33754615?v=4",
  },
  {
    name: "Jane Doe",
    username: "@janedoe",
    body: "I was hesitant at first, but the results are amazing. The team is very responsive and professional.",
    img: "https://avatars.githubusercontent.com/u/33754616?v=4",
  },
  {
    name: "Bob Johnson",
    username: "@bobjohnson",
    body: "I've been working with this team for a while now and I have to say, they are one of the best.",
    img: "https://avatars.githubusercontent.com/u/33754617?v=4",
  },
  {
    name: "Alice Brown",
    username: "@alicebrown",
    body: "I was impressed by the speed and quality of the work. The team is very skilled and knowledgeable.",
    img: "https://avatars.githubusercontent.com/u/33754618?v=4",
  },
  {
    name: "Mike Davis",
    username: "@mikedavis",
    body: "I've worked with many teams before, but this one is definitely one of the best. The communication is great and the results are amazing.",
    img: "https://avatars.githubusercontent.com/u/33754619?v=4",
  },
  {
    name: "Sarah Lee",
    username: "@sarahlee",
    body: "I was hesitant at first, but the team delivered exactly what I was looking for. The quality of the work is top notch.",
    img: "https://avatars.githubusercontent.com/u/33754620?v=4",
  },
  {
    name: "Emily Chen",
    username: "@emilychen",
    body: "I was impressed by the speed and quality of the work. The team is very skilled and knowledgeable.",
    img: "https://avatars.githubusercontent.com/u/33754621?v=4",
  },
  {
    name: "David Kim",
    username: "@davidkim",
    body: "I've worked with many teams before, but this one is definitely one of the best. The communication is great and the results are amazing.",
    img: "https://avatars.githubusercontent.com/u/33754622?v=4",
  },
];
