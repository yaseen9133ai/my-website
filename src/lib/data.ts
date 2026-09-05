export const profile = {
  name: "Ahmed Yaseen",
  initials: "AY",
  roles: ["AI Engineer", "AI Researcher", "Financial AI Specialist"],
  headline: "Neuro-symbolic AI for financial integrity.",
  location: "Kuala Lumpur, Malaysia",
  email: "yaseen913@gmail.com",
  phone: "+60 19-512 9447",
  linkedin: "https://www.linkedin.com/in/ahmed-yaseen-ba95b117/",
  github: "https://github.com/yaseen9133ai",
  resume: "/Ahmed_Yaseen_Resume.pdf",
  status: "PhD Candidate at INCEIF — open to AI engineering & research collaborations",
  summary:
    "AI Engineer and Data Scientist with 20+ years in enterprise software and 5+ years in applied machine learning. Experienced in NLP, LLM-powered systems, and production AI deployment. Previously delivered machine learning solutions at SAP including NER-based anonymization and predictive analytics. Current PhD research focuses on neuro-symbolic AI and Graph Neural Networks for automated verification of Islamic financial instruments.",
  positioning:
    "Operating at the intersection of AI engineering, financial compliance, and quantitative research.",
};

export type Stat = { value: string; label: string; detail: string };

export const stats: Stat[] = [
  {
    value: "20+",
    label: "Years enterprise",
    detail: "Enterprise software across SAP, IBM and large-scale ERP",
  },
  {
    value: "5+",
    label: "Years applied ML",
    detail: "Applied machine learning, NLP and production AI deployment",
  },
  {
    value: "89%",
    label: "NER accuracy",
    detail: "NER model deployed into SAP's production content pipeline",
  },
  {
    value: "5",
    label: "MENA markets",
    detail: "Localization for KSA, Egypt, Kuwait, Qatar and Oman",
  },
];

export type Impact = { title: string; body: string; tags: string[] };

export const impact: Impact[] = [
  {
    title: "NLP anonymization in production at SAP",
    body:
      "Built and deployed an NER-based anonymization system processing millions of enterprise knowledge entries at 89% accuracy, integrated directly into the production content pipeline.",
    tags: ["NER", "CRF", "Privacy", "Production"],
  },
  {
    title: "Predictive analytics for enterprise infrastructure",
    body:
      "Developed machine learning models for system outage prediction and time-series metric forecasting, enabling proactive monitoring of enterprise SAP infrastructure.",
    tags: ["Forecasting", "HANA PAL/APL", "AIOps"],
  },
  {
    title: "Neuro-symbolic verification of financial instruments",
    body:
      "Architecting a neuro-symbolic AI system using Graph Neural Networks and LLM pipelines for automated verification of Islamic financial instruments — ongoing PhD research at INCEIF.",
    tags: ["GNN", "LLM pipelines", "Symbolic reasoning"],
  },
];

export type Role = {
  company: string;
  title: string;
  period: string;
  start: string;
  location: string;
  kind: "research" | "industry";
  points: string[];
  tags: string[];
};

export const journey: Role[] = [
  {
    company: "INCEIF University",
    title: "PhD Candidate — Computational Finance & AI",
    period: "2025 — Present",
    start: "2025",
    location: "Kuala Lumpur, Malaysia",
    kind: "research",
    points: [
      "Designing a neuro-symbolic AI framework combining Graph Neural Networks with symbolic reasoning for computational verification of Shariah-compliant financial instruments.",
      "Engineering LLM-to-graph pipelines that transform unstructured prospectuses into heterogeneous financial knowledge graphs.",
      "Running adversarial stress testing across 200–350 real-world Malaysian sukuk documents.",
    ],
    tags: ["Neuro-Symbolic AI", "Graph Neural Networks", "Knowledge Graphs"],
  },
  {
    company: "SAP — Community Network Team",
    title: "Data Scientist",
    period: "May 2019 — Dec 2019",
    start: "2019",
    location: "Dubai, UAE",
    kind: "industry",
    points: [
      "Designed and deployed NLP-based anonymization pipelines integrating NER, POS tagging and dependency parsing, improving privacy compliance across SAP knowledge platforms.",
      "Generalized the framework across diverse IT-domain text corpora.",
      "Applied CRISP-DM methodology end-to-end, from data collection through production deployment.",
    ],
    tags: ["NLP", "NER", "CRISP-DM"],
  },
  {
    company: "SAP — Solution Manager Product Team",
    title: "Data Scientist",
    period: "May 2017 — Dec 2017",
    start: "2017",
    location: "Dubai, UAE",
    kind: "industry",
    points: [
      "Built ML models for system outage prediction and metric forecasting using SAP HANA PAL/APL, enabling proactive infrastructure monitoring for enterprise clients.",
      "Led team education on CRISP-DM best practices.",
      "Developed data transformation pipelines using HANA calculation views.",
    ],
    tags: ["Time Series", "HANA PAL/APL", "AIOps"],
  },
  {
    company: "SAP — Globalization Services",
    title: "Senior Developer & CDS/HANA Data Modeler",
    period: "Sep 2012 — Sep 2023",
    start: "2012",
    location: "Dubai, UAE",
    kind: "industry",
    points: [
      "Architected CDS views and HANA calculation views for Advanced Compliance Reporting on SAP S/4HANA and SAP Localization Hub.",
      "Led financial localization for the MENA region — Zakat declaration, VAT and withholding tax solutions across KSA, Egypt, Kuwait, Qatar and Oman.",
      "Eleven years of enterprise-scale SAP ABAP and HANA development across S/4HANA Cloud and On-Premise.",
    ],
    tags: ["S/4HANA", "CDS Views", "RegTech"],
  },
  {
    company: "IBM",
    title: "SAP Consultant — Senior ABAP Developer",
    period: "Mar 2010 — Sep 2012",
    start: "2010",
    location: "Egypt / Saudi Arabia",
    kind: "industry",
    points: [
      "Senior ABAP Developer on SAP ERP implementations for King Abdulaziz University and Saudi Arabian Airlines.",
    ],
    tags: ["SAP ERP", "ABAP"],
  },
  {
    company: "Al Jehat Company",
    title: "System Analyst",
    period: "2004 — 2011",
    start: "2004",
    location: "Dammam, Saudi Arabia",
    kind: "industry",
    points: [
      "System analyst for a 700+ employee professional services firm spanning surveying, IT, training and manpower supply.",
    ],
    tags: ["Systems Analysis"],
  },
];

export type Project = {
  name: string;
  org: string;
  status: string;
  summary: string;
  points: string[];
  tags: string[];
};

export const projects: Project[] = [
  {
    name: "Sukuk Integrity Verification Framework",
    org: "PhD Research · INCEIF University",
    status: "In progress",
    summary:
      "A neuro-symbolic system that reads sukuk prospectuses and reasons about whether their structures actually hold together.",
    points: [
      "Neuro-symbolic architecture pairing Graph Neural Networks with symbolic reasoning to verify structural compliance of sukuk financial instruments.",
      "LLM-to-graph pipelines transforming unstructured prospectuses into heterogeneous financial knowledge graphs with a 12-risk taxonomy across 6 categories.",
      "Dual GNN architecture (GNN-raw and GNN-augmented) with adversarial stress testing on 200–350 real-world Malaysian sukuk documents.",
    ],
    tags: ["PyTorch", "GNN", "LLM", "Knowledge Graphs", "Islamic Finance"],
  },
  {
    name: "NLP Anonymization System",
    org: "SAP · Production Deployment",
    status: "Shipped",
    summary:
      "Privacy-preserving text anonymization for SAP Community Network, running across millions of Q&A entries.",
    points: [
      "NER-based anonymization system deployed to production at 89% accuracy across millions of community Q&A entries.",
      "Evaluated 15+ ML/DL model configurations — CRF, BiLSTM, Word2Vec, GloVe — before deploying the CRF model into the SAP content pipeline.",
    ],
    tags: ["CRF", "BiLSTM", "Word2Vec", "GloVe", "spaCy"],
  },
  {
    name: "Predictive Analytics for IT Operations",
    org: "SAP Solution Manager",
    status: "Shipped",
    summary:
      "Outage prediction and metric forecasting that moved enterprise infrastructure monitoring from reactive to proactive.",
    points: [
      "System outage prediction and time-series metric forecasting models built with HANA PAL/APL.",
      "Deployed for proactive enterprise infrastructure management across SAP customer landscapes.",
    ],
    tags: ["Time Series", "HANA PAL/APL", "Anomaly Detection"],
  },
];

export const researchInterests = [
  "Neuro-Symbolic AI",
  "Graph Neural Networks",
  "Financial AI & Computational Finance",
  "AI for Regulatory Compliance",
  "LLM-based Knowledge Graphs",
  "Multi-Agent AI Systems",
];

export type SkillGroup = { group: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    group: "Languages",
    items: ["Python", "SQL", "R", "ABAP", "Java", "JavaScript", "HANA SQL Script"],
  },
  {
    group: "LLM Engineering",
    items: [
      "RAG",
      "Prompt Engineering",
      "QLoRA / PEFT Fine-Tuning",
      "Embeddings",
      "Hallucination Detection",
    ],
  },
  {
    group: "AI Orchestration",
    items: ["LangChain", "LangGraph", "CrewAI", "OpenAI Agents SDK", "MCP", "n8n"],
  },
  {
    group: "ML & NLP",
    items: [
      "Graph Neural Networks",
      "Neuro-Symbolic AI",
      "NER",
      "Text Classification",
      "Sequence Labeling",
      "CRF",
      "BiLSTM",
    ],
  },
  {
    group: "ML Frameworks",
    items: ["PyTorch", "TensorFlow", "HuggingFace Transformers", "spaCy", "NLTK", "scikit-learn"],
  },
  {
    group: "Vector DBs & Eval",
    items: ["FAISS", "Pinecone", "ChromaDB", "RAGAS", "DeepEval", "LangSmith", "LangFuse"],
  },
  {
    group: "AI Infrastructure",
    items: [
      "Docker",
      "Terraform",
      "FastAPI",
      "AWS Bedrock",
      "SageMaker",
      "Lambda",
      "GCP",
      "Azure",
      "GitHub Actions",
    ],
  },
  {
    group: "Data Pipelines",
    items: ["Airflow", "ETL design", "HANA calculation views", "CRISP-DM"],
  },
];

export const capabilities = [
  {
    index: "01",
    title: "LLM systems",
    body:
      "LLM system development across OpenAI, Anthropic and Gemini with RAG pipelines over FAISS, Pinecone and ChromaDB, Sentence Transformer embeddings, QLoRA fine-tuning, and evaluation with RAGAS and DeepEval.",
  },
  {
    index: "02",
    title: "Multi-agent architectures",
    body:
      "Multi-agent systems built on LangGraph and CrewAI with tool-calling architectures via the OpenAI Agents SDK and MCP, plus workflow automation with n8n and voice agents.",
  },
  {
    index: "03",
    title: "Production deployment",
    body:
      "Production AI on AWS, GCP and Azure using Docker, FastAPI, Terraform, CI/CD pipelines, Airflow orchestration, and LangFuse / LangSmith observability at enterprise scale.",
  },
];

export type Education = {
  degree: string;
  school: string;
  period: string;
  location: string;
  note?: string;
};

export const education: Education[] = [
  {
    degree: "PhD Candidate — Computational Finance & AI",
    school: "INCEIF University",
    period: "2025 — Present",
    location: "Kuala Lumpur, Malaysia",
    note: "Neuro-symbolic AI framework combining GNNs with symbolic reasoning for computational verification of Shariah-compliant financial instruments.",
  },
  {
    degree: "MSc Data Science",
    school: "Heriot-Watt University",
    period: "2020",
    location: "Dubai, UAE",
    note: "Thesis: Named Entity Recognition for IT-domain text anonymization. Deployed CRF model at 89% accuracy.",
  },
  {
    degree: "BSc Computer Science",
    school: "Cairo University — Faculty of Computers & Information",
    period: "2003",
    location: "Cairo, Egypt",
  },
];

export const certifications = [
  "Executive Programme in Algorithmic Trading (EPAT) — QuantInsti",
  "SAP Certified Application Associate — SAP HANA Modeling 1.0",
  "SAP Certified Development Specialist — ABAP for SAP HANA",
  "SAP Development Consultant — ABAP Web AS 6.20",
  "Sun Certified Programmer for Java 2 Platform (SCJP)",
  "Oracle Certified Associate (OCA)",
];

export const marquee = [
  "PyTorch",
  "Graph Neural Networks",
  "LangGraph",
  "RAG",
  "FastAPI",
  "Neuro-Symbolic AI",
  "HuggingFace",
  "Terraform",
  "AWS Bedrock",
  "MCP",
  "Knowledge Graphs",
  "spaCy",
  "QLoRA",
  "Airflow",
  "S/4HANA",
  "Pinecone",
  "CrewAI",
  "Docker",
];

export const sections = [
  { id: "about", label: "About" },
  { id: "impact", label: "Impact" },
  { id: "journey", label: "Journey" },
  { id: "research", label: "Research" },
  { id: "portfolio", label: "Portfolio" },
  { id: "capabilities", label: "Stack" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
];
