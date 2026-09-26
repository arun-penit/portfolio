export const site = {
  name: "Arun Rawat",
  role: "Applied AI & Backend Engineer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://arunrawat.vercel.app",
  email: "arun.rawat.sde@gmail.com",
  location: "Noida, India",
  timezone: "Asia/Kolkata",
  linkedin: "https://www.linkedin.com/in/arun-rawat-sde/",
  github: "https://github.com/arunrawat14",
  resume: "/resume.pdf",
  description:
    "Applied AI & Backend Engineer building production-grade AI systems, scalable backends and full-stack products — AI voice agents, RAG architectures, multimodal LLM workflows and high-performance APIs with FastAPI, OpenAI, LangGraph, React, Laravel, Node.js and Docker.",
};

export const heroMetrics = [
  { value: 300, suffix: "+", label: "AI sales calls handled per day" },
  { value: 47, suffix: "+", label: "Production API endpoints shipped" },
  { value: 25, suffix: "+", label: "RAG routing intents in production" },
  { value: 1000, suffix: "+", label: "Products auto-ingested with vision AI" },
];

export const about = {
  lead: "I build AI that does real work in production — not demos.",
  paragraphs: [
    "I'm an Applied AI & Backend Engineer at PenIT Technology, working where three disciplines meet: AI engineering, backend systems and full-stack product delivery. I build LLM-powered products, autonomous AI agents, multimodal AI workflows, RAG architectures and AI voice systems — plus the high-performance APIs, integrations and React or Vue frontends that turn them into products people actually use.",
    "My work already runs in the real world: a voice agent handling 300+ sales calls a day, a RAG platform routing 25+ intents across multi-index vector search, a Whisper + GPT call-auditing microservice and a full LMS at PenIT — and, outside work, the 47+ endpoint multimodal backend of Ingrify, an open-source side project for Verinova Labs. I own the whole lifecycle: architecture, prompts, APIs, third-party integrations, Docker, CI/CD and production scaling.",
    "I'm drawn to hard problems in AI infrastructure, backend scalability, conversational AI and distributed systems. I'm looking for an international team building ambitious AI products — if you need an engineer who takes an idea from whiteboard to production and owns the outcome, let's talk.",
  ],
  pillars: [
    {
      layer: "Interface",
      title: "Full-stack",
      emphasis: "delivery",
      body: "I ship the interface too — clean, responsive React and Vue frontends on top of the systems I design, so products reach real users end to end.",
      tags: ["React", "Vue.js", "Tailwind CSS", "Laravel", "MySQL"],
      proof: { slug: "coteca-lms", text: "Coteca LMS — Vue + Laravel platform for 100+ monthly users" },
    },
    {
      layer: "APIs & integrations",
      title: "Backend &",
      emphasis: "integrations",
      body: "High-performance async APIs, webhooks and event-driven services, wired into payments, CRMs, telephony, messaging and push notifications.",
      tags: ["FastAPI", "Node.js", "Webhooks", "Klarna", "Twilio", "CRM APIs"],
      proof: { slug: "ai-voice-sales-agent", text: "Voice Sales Agent — 8+ live tool integrations incl. payments & VAT" },
    },
    {
      layer: "Intelligence",
      title: "AI",
      emphasis: "engineering",
      body: "LLM agents, RAG architectures, multimodal vision pipelines and voice AI — made dependable with function calling, typed schemas, guardrails and fallbacks.",
      tags: ["OpenAI", "LangGraph", "RAG", "Pinecone", "Retell AI", "Whisper"],
      proof: { slug: "expecting-ai", text: "Expecting.AI — RAG across 25+ intents and 3 vector indexes" },
    },
    {
      layer: "Infrastructure",
      title: "Production",
      emphasis: "ownership",
      body: "Containerized, observable and automated — Docker, CI/CD, Nginx, Prometheus and Loki. I own it from architecture design to deployment and scaling.",
      tags: ["Docker", "GitHub Actions", "Nginx", "Prometheus", "Loki", "DigitalOcean"],
      proof: { slug: "ingrify", text: "Ingrify — 47+ endpoints with CI/CD, metrics and logging" },
    },
  ],
};

export type Stage = { title: string; items: string[] };

export type CaseStudy = {
  slug: string;
  index: string;
  title: string;
  kicker: string;
  period: string;
  context: string;
  role: string;
  tagline: string;
  summary: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  problem: string;
  approach: string[];
  architecture: Stage[];
  features: { title: string; body: string }[];
  decisions: { title: string; body: string }[];
  outcomes: string[];
  link?: { label: string; href: string };
  hue: number;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-voice-sales-agent",
    index: "01",
    title: "AI Voice Sales Agent",
    kicker: "Voice AI · Autonomous agent",
    period: "Mar 2026 – Apr 2026",
    context: "PenIT Technology · Production",
    role: "Lead engineer — architecture, prompts, tool layer, webhooks, deployment",
    tagline: "An outbound phone agent that qualifies, recommends, and closes CSCS card sales end-to-end.",
    summary:
      "A production outbound voice agent built on Retell AI that calls leads, qualifies them, recommends the right CSCS card, creates the order and delivers a payment link — all inside a single natural phone conversation, at 300+ calls a day.",
    stack: ["Retell AI", "FastAPI", "OpenAI", "Function Calling", "Prompt Engineering", "Webhooks", "Pydantic", "AsyncIO", "Docker", "Python"],
    metrics: [
      { value: "300+", label: "calls / day" },
      { value: "8+", label: "LLM tool integrations" },
      { value: "100%", label: "sales flow automated" },
    ],
    problem:
      "CSCS card sales depended on human agents repeating the same qualification script hundreds of times a day: figure out which card a construction worker needs, answer objections, take order details, validate VAT information and chase payment. It was slow, inconsistent and expensive to scale — and pricing or compliance mistakes on a call are costly.",
    approach: [
      "I designed the agent as a conversation layer (Retell AI handling telephony, speech-to-text, text-to-speech and turn-taking) sitting on top of a strictly typed business layer I built in FastAPI. The LLM never invents facts: whenever it needs a price, a product, an order or a payment link, it must call one of my tools.",
      "The conversation itself is prompt-engineered as a staged sales flow — greeting, qualification, recommendation, objection handling, order capture, payment — with explicit guardrails: prices are fixed and come only from the product tool, disclosures are mandatory, and the agent knows exactly when to schedule a callback instead of pushing.",
      "Everything after the call is event-driven. Retell webhooks hit async FastAPI handlers that validate payloads with Pydantic, ingest the recording, generate an AI summary, tag a disposition and feed post-call analytics, so the business sees every conversation without anyone listening to it.",
    ],
    architecture: [
      { title: "Lead & dial", items: ["Lead queue", "Retell outbound call", "STT · TTS · turn-taking"] },
      { title: "Conversation brain", items: ["Staged sales prompt", "Qualification logic", "Objection handling", "Compliance guardrails"] },
      { title: "Tool layer · FastAPI", items: ["Product lookup", "Order creation", "VAT validation", "Callback scheduling", "Payment link", "Klarna fallback"] },
      { title: "Post-call pipeline", items: ["Webhook ingest", "Recording storage", "AI summary", "Disposition tags", "Analytics"] },
    ],
    features: [
      {
        title: "8+ function-calling integrations",
        body: "Real-time product lookup, order management, callback scheduling, VAT validation, payment-link delivery and a Klarna fallback path — each exposed to the LLM as a typed tool with a clear contract and predictable error responses the agent can talk its way through.",
      },
      {
        title: "Qualification & recommendation",
        body: "The agent asks the questions a trained salesperson would, maps the answers to the right CSCS card and recommends it with reasoning the caller understands — then confirms before creating anything.",
      },
      {
        title: "Multi-step objection handling",
        body: "Price, timing, trust and 'I'll think about it' objections each have a structured handling path, including offering an alternative payment option or booking a callback at a time the caller chooses.",
      },
      {
        title: "Webhook-driven call lifecycle",
        body: "Async FastAPI handlers process call events, ingest recordings, generate summaries, apply disposition tags and push post-call analytics — with Pydantic schemas guarding every payload.",
      },
    ],
    decisions: [
      {
        title: "Prices live in tools, never in the prompt",
        body: "LLMs are persuasive and occasionally creative. Fixed pricing enforcement means the model can only quote what the product tool returns, which removes a whole class of costly hallucinations.",
      },
      {
        title: "Fallbacks as first-class paths",
        body: "Payment is where calls die. A Klarna fallback and callback scheduling keep the conversation alive instead of ending in a lost sale.",
      },
      {
        title: "Everything observable after hang-up",
        body: "Summaries and disposition tags turn hundreds of daily calls into searchable, reviewable data — essential for tuning prompts with evidence rather than gut feel.",
      },
    ],
    outcomes: [
      "Deployed to production and handling 300+ outbound calls per day.",
      "Fully automated the CSCS card sales flow: qualification → recommendation → order → payment link.",
      "Consistent, compliant sales conversations with fixed pricing enforced by design.",
      "Every call summarized, tagged and available for analytics without manual review.",
    ],
    hue: 125,
  },
  {
    slug: "sales-call-analysis",
    index: "02",
    title: "AI Sales Call Analysis",
    kicker: "Speech AI · Async microservice",
    period: "Feb 2026",
    context: "PenIT Technology · Production microservice",
    role: "Sole engineer — service design, audio pipeline, LLM analysis, delivery",
    tagline: "Upload a sales call, get back a structured audit report — scored, checked and actionable.",
    summary:
      "An async FastAPI microservice that audits sales calls: it normalizes audio with FFmpeg, transcribes long recordings concurrently with OpenAI Whisper, and runs GPT analysis against a configurable schema to return scoring, checklist validation, issue detection and coaching feedback via webhook.",
    stack: ["FastAPI", "OpenAI Whisper", "OpenAI", "FFmpeg", "AsyncIO", "Background Tasks", "Webhooks", "Docker", "Python"],
    metrics: [
      { value: "Async", label: "chunked, concurrent Whisper STT" },
      { value: "16 kHz", label: "FFmpeg mono WAV normalization" },
      { value: "3", label: "runtime-selectable layers: STT, LLM, schema" },
    ],
    problem:
      "Sales managers can only listen to a tiny fraction of calls, so quality assurance was sampled, slow and subjective. Recordings arrive in different formats and lengths, and a single long call can exceed the size limits of speech-to-text APIs.",
    approach: [
      "I built the service around an upload → process → callback lifecycle. The upload endpoint returns immediately and the heavy work runs as a background task, so clients never hold a connection open while a long call is being processed.",
      "Audio is first normalized with FFmpeg into mono 16 kHz WAV — the format speech models are happiest with — then split into chunks. Chunks are transcribed concurrently with Whisper, bounded by an asyncio semaphore so throughput is high without tripping rate limits, and stitched back together in order.",
      "The transcript is then analyzed by a GPT model against a JSON report schema chosen at request time. That makes the same service reusable across teams: one client can ask for a compliance checklist, another for a coaching scorecard, just by switching the schema and model.",
    ],
    architecture: [
      { title: "Ingest", items: ["Audio upload API", "Job created", "Background task"] },
      { title: "Audio prep", items: ["FFmpeg → mono 16 kHz WAV", "Chunking"] },
      { title: "Transcription", items: ["Whisper per chunk", "Async semaphore", "Ordered merge"] },
      { title: "Analysis & delivery", items: ["GPT + JSON schema", "Score · checklist · issues", "Webhook callback"] },
    ],
    features: [
      {
        title: "Configurable analysis workflows",
        body: "STT model, LLM model and report schema are all selectable at runtime, turning one service into a platform for many audit types.",
      },
      {
        title: "Concurrent long-audio transcription",
        body: "Chunked, semaphore-bounded Whisper calls cut end-to-end processing time dramatically versus transcribing sequentially.",
      },
      {
        title: "Structured audit reports",
        body: "Scoring, checklist validation, issue detection and actionable feedback returned as validated JSON — ready for dashboards, not just humans.",
      },
      {
        title: "Fire-and-forget delivery",
        body: "Results are pushed to the caller via webhook callbacks, so upstream systems integrate with a single endpoint and no polling.",
      },
    ],
    decisions: [
      {
        title: "Normalize before you transcribe",
        body: "A single canonical audio format removes a whole category of format bugs and keeps transcription quality consistent across sources.",
      },
      {
        title: "Bounded concurrency over raw parallelism",
        body: "A semaphore gives most of the speed-up of full parallelism while staying friendly to API rate limits and memory.",
      },
      {
        title: "Schema as input, not code",
        body: "Making the report schema a request parameter meant new audit types need zero deployments.",
      },
    ],
    outcomes: [
      "Automated QA auditing of sales calls with structured, comparable reports.",
      "Reduced end-to-end processing time for long recordings via concurrent chunked transcription.",
      "One reusable service supporting multiple audit formats through runtime configuration.",
    ],
    hue: 210,
  },
  {
    slug: "expecting-ai",
    index: "03",
    title: "Expecting.AI — Fertility Matching Agent",
    kicker: "RAG · Multi-agent platform",
    period: "Aug 2025 – Sep 2025",
    context: "PenIT Technology · Client product",
    role: "AI engineer — platform architecture, RAG pipeline, ingestion, retrieval",
    tagline: "A conversational agent that helps intended parents find surrogates, donors, clinics and the right support.",
    summary:
      "A production RAG platform built with LangGraph that routes fertility-journey conversations across 25+ intents, extracts structured filters from natural language and searches multiple vector indexes — on a reusable microservice that hosts multiple chatbot agents from one backend.",
    stack: ["LangGraph", "LangChain", "RAG", "OpenAI", "Gemini", "OpenAI Embeddings", "Pinecone", "FAISS", "FastAPI", "PyMuPDF", "Docker", "Python"],
    metrics: [
      { value: "25+", label: "routing intents" },
      { value: "10+", label: "structured filter attributes" },
      { value: "3", label: "specialized vector indexes" },
    ],
    problem:
      "People navigating fertility options face a fragmented world of surrogates, egg and sperm donors, clinics, agencies, insurance, escrow and therapists. They describe what they need in natural language — 'a donor under 28 near California with O+ blood type' — but the data lives in profiles, provider directories and long documents.",
    approach: [
      "I started by building a reusable AI microservice platform with dynamic project-based routing, so multiple chatbot agents for different domains can run on a single shared backend. Expecting.AI became the flagship tenant.",
      "The agent is a LangGraph graph: an intent router classifies each message across 25+ intents (surrogate, egg donor, sperm donor, clinic, agency, insurance, escrow, therapist, provider discovery and more), then hands off to the right retrieval path. An NLP filter extractor turns free text into 10+ structured attributes — age, BMI, location, ethnicity, blood group, insurance and more — used as metadata filters on vector search.",
      "Retrieval is split across separate indexes for profiles, providers and the knowledge base, which keeps results precise and latency low. Conversation memory and follow-up query chaining let users refine ('only ones with insurance experience') without repeating themselves.",
    ],
    architecture: [
      { title: "Platform", items: ["Project-based routing", "Shared FastAPI backend", "Per-agent config"] },
      { title: "Understanding", items: ["LangGraph intent router", "25+ intents", "Filter extraction (10+ attrs)", "Conversation memory"] },
      { title: "Retrieval", items: ["Profile index", "Provider index", "Knowledge-base index", "Pinecone + FAISS"] },
      { title: "Ingestion", items: ["PDF · DOCX · JSON", "PyMuPDF · python-docx", "Text splitters", "Batch upserts"] },
    ],
    features: [
      {
        title: "Multi-tenant agent platform",
        body: "Dynamic project-based routing means a new chatbot for a new domain is a configuration, not a new service.",
      },
      {
        title: "Intent routing with LangGraph",
        body: "Each message is classified and routed through a graph of specialized nodes rather than one monolithic prompt, making behavior predictable and debuggable.",
      },
      {
        title: "Natural language → structured filters",
        body: "Extraction of 10+ attributes lets semantic search be combined with hard metadata constraints for accurate matching.",
      },
      {
        title: "Document ingestion pipelines",
        body: "PDF, DOCX and JSON sources are parsed, chunked with LangChain text splitters and batch-upserted into Pinecone with embeddings.",
      },
    ],
    decisions: [
      {
        title: "Multiple indexes over one big index",
        body: "Profiles, providers and knowledge have different shapes and query patterns. Separate indexes improved precision and kept retrieval latency low.",
      },
      {
        title: "Hybrid: semantic + metadata filters",
        body: "Pure similarity search can't guarantee 'under 28' or 'O+'. Extracted filters enforce hard constraints while embeddings handle nuance.",
      },
      {
        title: "Model-agnostic by design",
        body: "Supporting both OpenAI and Gemini kept options open for cost, latency and quality trade-offs per task.",
      },
    ],
    outcomes: [
      "Production RAG pipeline supporting 25+ intents across the fertility journey.",
      "Accurate, low-latency matching via multi-index vector search with structured filters.",
      "A reusable platform that lets multiple domain chatbots share one backend.",
    ],
    hue: 320,
  },
  {
    slug: "ingrify",
    index: "04",
    title: "Ingrify — AI Food Intelligence",
    kicker: "Multimodal AI · Backend platform",
    period: "Dec 2025 – Apr 2026",
    context: "Verinova Labs · Open-source side project",
    role: "Backend lead — API design, AI pipelines, data, infra, CI/CD",
    tagline: "Point your camera at a food label, get the truth about what you're eating.",
    summary:
      "The complete backend for an AI food-intelligence app: 47+ FastAPI endpoints on MongoDB with multimodal GPT-4o / GPT-5 pipelines for ingredient OCR, barcode extraction, allergen detection and NOVA classification — plus rewards, quizzes, leaderboards and a vision-powered catalog ingestion system.",
    stack: ["FastAPI", "MongoDB", "OpenAI", "GPT-4o", "GPT-5", "Python", "Playwright", "aiohttp", "Firebase", "Twilio", "Brevo", "Nginx", "Prometheus", "Loki", "GitHub Actions", "Docker", "DigitalOcean"],
    metrics: [
      { value: "47+", label: "API endpoints" },
      { value: "1,000+", label: "products auto-ingested" },
      { value: "0", label: "manual data entry left" },
    ],
    problem:
      "Food labels are dense, inconsistent and often misleading. Users want to know if something contains their allergens, how processed it is and whether it fits their diet — instantly, from a photo. The business also needed engagement loops and a large, accurate product catalog without an army of data-entry staff.",
    approach: [
      "I designed the backend as a modular FastAPI service on MongoDB with clear domains: auth, AI scanning, product catalog, rewards, quizzes, notifications and personalized dashboards — 47+ endpoints in total.",
      "The scanning pipeline is multimodal: GPT-4o and GPT-5 read ingredient lists (OCR), extract barcodes, validate that multiple images belong to the same product, detect allergens, classify NOVA processing level and generate health insights personalized to the user's dietary profile.",
      "For scale I leaned on MongoDB aggregation pipelines ($lookup, $facet, $sample), careful indexing and TTL-based namespace caching for hot queries. The catalog was bootstrapped by an ingestion tool combining Playwright and aiohttp scraping with OpenAI Vision validation and enrichment for 1,000+ products.",
    ],
    architecture: [
      { title: "Clients", items: ["Mobile app", "Firebase push", "Twilio OTP", "Brevo email"] },
      { title: "API · FastAPI", items: ["Auth & profiles", "AI scanning", "Catalog", "Rewards · quizzes", "Dashboards"] },
      { title: "AI pipelines", items: ["Ingredient OCR", "Barcode extraction", "Multi-image validation", "Allergens · NOVA", "Health insights"] },
      { title: "Data & ops", items: ["MongoDB + aggregations", "TTL caching", "Nginx · Docker", "Prometheus · Loki", "GitHub Actions"] },
    ],
    features: [
      {
        title: "Multimodal food scanning",
        body: "From raw label photos to structured nutrition, ingredient, allergen and NOVA data with AI-generated, profile-aware health insights.",
      },
      {
        title: "Engagement systems",
        body: "OTP auth, referral rewards, wallet and point-ledger management, leaderboards, badge unlocking and personalized product recommendations driven by dietary profiles.",
      },
      {
        title: "Performance engineering",
        body: "Aggregation pipelines with $lookup, $facet and $sample, targeted indexes and TTL namespace caching keep high-traffic endpoints fast.",
      },
      {
        title: "Automated catalog ingestion",
        body: "Playwright + aiohttp scrape, OpenAI Vision validates and enriches — eliminating manual data entry across 1,000+ products.",
      },
    ],
    decisions: [
      {
        title: "Point ledger, not a balance field",
        body: "Wallets and rewards are managed through a point ledger so every reward, referral and redemption is traceable.",
      },
      {
        title: "Observability from day one",
        body: "Prometheus metrics and Loki logs behind Nginx made it possible to see latency and errors per endpoint in production.",
      },
      {
        title: "Validate AI output against images",
        body: "Multi-image product validation catches mismatched photos before bad data reaches the catalog.",
      },
    ],
    outcomes: [
      "Shipped a 47+ endpoint production backend deployed on DigitalOcean with CI/CD via GitHub Actions.",
      "Multimodal GPT-4o / GPT-5 pipelines powering the app's core scanning experience.",
      "1,000+ products ingested and enriched automatically — manual data entry eliminated.",
    ],
    hue: 65,
  },
  {
    slug: "coteca-lms",
    index: "05",
    title: "Coteca LMS",
    kicker: "EdTech · Full-stack platform",
    period: "Apr 2025 – May 2025",
    context: "PenIT Technology · Client project",
    role: "Technical lead — planning, architecture, delivery, mentoring",
    tagline: "Course delivery and CITB certification prep for the UK construction industry.",
    summary:
      "A Vue.js + Laravel learning platform serving 100+ monthly users, with a timed CITB mock exam engine, a modular content system across 5 layout types, feature-based access control and CRM integration that turns learner activity into sales leads.",
    stack: ["Vue.js", "Laravel", "MySQL", "CRM APIs", "Docker", "ClickUp"],
    metrics: [
      { value: "100+", label: "monthly users" },
      { value: "2", label: "core modules shipped" },
      { value: "5", label: "content layout types" },
    ],
    problem:
      "The client trains construction workers for UK CITB certification. They needed one platform for online courses and realistic timed exam practice, with access tied to what each learner had purchased — and they wanted learner behavior to feed their sales CRM.",
    approach: [
      "I led technical planning end-to-end and split the product into two core modules: a CITB Mock Exam Engine for timed certification practice, and an LMS module for modular content delivery across 5 layout types supporting video, HTML, text and images.",
      "The Laravel + MySQL backend handles course creation, module structuring, user assignment, progress tracking and conditional test access — with feature-based access control mapped to purchased services.",
      "Integrating the client's CRM API closed the loop: learner activity syncs automatically, exam-eligible users are flagged, and interest in unpurchased areas triggers lead generation. I also mentored a junior developer through the full project lifecycle.",
    ],
    architecture: [
      { title: "Frontend · Vue.js", items: ["Course player", "5 layout types", "Timed exam UI"] },
      { title: "Backend · Laravel", items: ["Courses & modules", "Progress tracking", "Conditional test access", "Feature-based ACL"] },
      { title: "Data", items: ["MySQL", "Question banks", "Attempts & scores"] },
      { title: "Integrations", items: ["Client CRM API", "Activity sync", "Eligibility flags", "Lead triggers"] },
    ],
    features: [
      { title: "CITB Mock Exam Engine", body: "Timed, realistic UK certification practice with scoring and attempt history." },
      { title: "Modular content delivery", body: "5 layout types mixing video, HTML, text and images so course authors aren't boxed into one template." },
      { title: "Purchase-aware access control", body: "Feature-based permissions tied to purchased services, including conditional unlocking of tests." },
      { title: "CRM-driven growth", body: "Learner activity sync, automatic exam-eligibility flags and lead generation for unpurchased areas." },
    ],
    decisions: [
      { title: "Features, not roles", body: "Access mapped to purchased features rather than static roles let the business sell new bundles without code changes." },
      { title: "Plan before building", body: "Leading the planning phase in ClickUp with clear module boundaries kept delivery predictable and made it easy to mentor a junior developer through the work." },
    ],
    outcomes: [
      "Delivered to 100+ monthly users with 2 core modules in production.",
      "CRM integration turned learning activity into a lead-generation channel.",
      "Mentored 1 junior developer across the full lifecycle.",
    ],
    hue: 25,
  },
  {
    slug: "edtech-platform",
    index: "06",
    title: "StudyNotion — EdTech Marketplace",
    kicker: "MERN · College project",
    period: "Jan 2024",
    context: "Personal project · Built in college",
    role: "Full-stack developer",
    tagline: "A marketplace where students enroll and instructors publish, price and manage courses.",
    summary:
      "A full-stack education marketplace built with React, Tailwind CSS, Node.js, Express and MongoDB, integrated end-to-end with Razorpay for payments, with instructor dashboards and personalized profiles for learners and educators.",
    stack: ["React", "Tailwind CSS", "JavaScript", "Node.js", "Express.js", "MongoDB", "Razorpay"],
    metrics: [
      { value: "2", label: "user personas" },
      { value: "E2E", label: "Razorpay payments" },
      { value: "MERN", label: "full stack" },
    ],
    problem:
      "Independent instructors need a simple way to publish and sell courses, and students need a clean place to discover, buy and follow them.",
    approach: [
      "I built a MERN application with separate experiences for students and instructors. Instructors create courses, set pricing and manage content from dynamic dashboards; students browse, enroll and learn.",
      "Payments are integrated end-to-end with Razorpay — order creation, checkout and verification — so enrollment is unlocked only after a confirmed payment.",
    ],
    architecture: [
      { title: "Frontend", items: ["React", "Tailwind CSS", "Responsive UI"] },
      { title: "API", items: ["Node.js · Express", "Auth", "Courses · enrollments"] },
      { title: "Data & payments", items: ["MongoDB", "Razorpay checkout", "Payment verification"] },
    ],
    features: [
      { title: "Instructor dashboards", body: "Course content management, pricing control and student engagement tracking." },
      { title: "Razorpay integration", body: "End-to-end payment processing gating enrollment." },
      { title: "Personalized profiles", body: "Distinct, responsive profiles for learners and educators." },
    ],
    decisions: [
      { title: "Payment gates enrollment", body: "Enrollment is only unlocked after the payment is confirmed on the backend, never trusted from the client alone." },
    ],
    outcomes: ["Complete marketplace flow from course creation to paid enrollment.", "Foundation for the full-stack skills I now use in production."],
    link: { label: "View on GitHub", href: "https://github.com/arunrawat14/studyNotion" },
    hue: 270,
  },
];

export const experience = {
  company: "PenIT Technology Pvt. Ltd.",
  title: "Software Engineer",
  period: "Aug 2024 – Present",
  location: "Noida, India",
  summary:
    "Building and shipping AI products and full-stack platforms for international clients — owning architecture, backend, AI integration and deployment.",
  highlights: [
    { period: "Mar – Apr 2026", title: "AI Voice Sales Agent", slug: "ai-voice-sales-agent", note: "Retell AI outbound agent, 300+ calls/day, 8+ tools" },
    { period: "Feb 2026", title: "AI Sales Call Analysis Microservice", slug: "sales-call-analysis", note: "Whisper + GPT auditing, async chunked transcription" },
    { period: "Aug – Sep 2025", title: "Expecting.AI Fertility Matching Agent", slug: "expecting-ai", note: "LangGraph RAG, 25+ intents, multi-index search" },
    { period: "Apr – May 2025", title: "Coteca LMS", slug: "coteca-lms", note: "Vue + Laravel, CITB exam engine, CRM integration" },
  ],
};

export const skills: { group: string; blurb: string; items: string[] }[] = [
  {
    group: "AI & LLM",
    blurb: "Agents, RAG, structured knowledge (OKF) and multimodal pipelines that hold up in production.",
    items: ["OpenAI (GPT-4o, GPT-5)", "Gemini", "LangChain", "LangGraph", "RAG", "Google OKF (Open Knowledge Format)", "Prompt Engineering", "Function Calling", "Vector Search", "OpenAI Embeddings", "Retell AI", "Whisper", "Agentic Workflows"],
  },
  {
    group: "Backend & APIs",
    blurb: "Typed, async services and event-driven integrations.",
    items: ["FastAPI", "Flask", "Laravel", "Node.js", "Express.js", "REST APIs", "Webhooks", "AsyncIO", "Pydantic", "Gunicorn", "Uvicorn"],
  },
  {
    group: "Data",
    blurb: "Relational, document and vector stores — modeled for the query.",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Pinecone", "FAISS"],
  },
  {
    group: "Frontend",
    blurb: "Clean, responsive interfaces for the products I build.",
    items: ["React.js", "Vue.js", "React Native", "Tailwind CSS"],
  },
  {
    group: "DevOps & Cloud",
    blurb: "Shipping, observing and scaling what I build.",
    items: ["Docker", "GitHub Actions", "AWS", "DigitalOcean", "Nginx", "Linux", "Prometheus", "Loki", "Firebase"],
  },
  {
    group: "Languages & Tools",
    blurb: "The everyday toolkit.",
    items: ["Python", "JavaScript", "SQL", "C++", "FFmpeg", "PyMuPDF", "Playwright", "aiohttp", "Twilio", "Brevo", "Postman", "Jira", "ClickUp"],
  },
];

export const education = {
  school: "Graphic Era Hill University",
  degree: "Bachelor of Science in Computer Science",
  period: "Oct 2021 – Jun 2025",
  location: "Dehradun, Uttarakhand, India",
};

export const leadership = [
  {
    title: "Team Lead — Blockchain Counterfeit Detection",
    event: "Hackathon",
    period: "Apr 2023",
    body: "Led a team to design and deliver a Web 3.0 counterfeit-product verification app — owning task allocation, architecture decisions and on-time delivery under hackathon constraints.",
  },
  {
    title: "AI Disease Prediction Web App",
    event: "Inter-College Hackathon",
    period: "Nov 2023",
    body: "Built a symptom-based ML disease prediction app with a responsive UI, collaborating across a team to ship predictive models on a competitive timeline.",
  },
];
