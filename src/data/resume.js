export const LINKS = {
  github: "https://github.com/Gkoushikgalla",
  linkedin: "",   // TODO: Fill in your LinkedIn URL (e.g., https://www.linkedin.com/in/gnana-sri-koushik-galla)
  portfolio: "",  // TODO: Fill in your live portfolio link
  email: "koushikgalla22@gmail.com",
  phone: "9515902088",
};

export const summary =
  "AI-focused software engineer with hands-on experience in full-stack development, machine learning systems and AI-powered automation. Skilled in Python, Flask and MongoDB, with practical exposure to LLM orchestration, workflow development and AI tool integration. Strong interest in computer vision, process optimisation and real-time intelligent systems.";

export const experience = [
  {
    dates: "Oct – Dec 2026",
    title: "AI Automation Engineer Intern",
    org: "Kreyabranding · Remote",
    bullets: [
      "Building AI-powered automation to streamline business processes and improve operational efficiency",
      "Developing automated workflows and integrating AI tools for intelligent process execution",
      "Applying AI-driven approaches to process optimisation and workflow development",
      "Collaborating with the reporting manager to meet project deadlines and organisational objectives"
    ]
  },
  {
    dates: "Jun – Sep 2026",
    title: "Tech Strategy Intern",
    org: "Sentiantal Private Limited · Hyderabad, Telangana, India",
    bullets: [
      "Researched emerging AI frameworks, LLMs, market trends and competitor products to inform product decisions",
      "Evaluated AI use cases and feasibility, turning technical architecture into business strategy recommendations",
      "Worked with product, engineering and leadership teams to align tech roadmaps with market needs",
      "Supported customer discovery and stakeholder engagement for early-stage product strategy and growth planning",
      "Produced technical documentation, competitor benchmarks and presentation decks"
    ]
  },
  {
    dates: "Mar – Aug 2025",
    title: "Software Development Intern",
    org: "Pragament Tech Solutions Private Limited · Hyderabad, Telangana, India",
    bullets: [
      "Built and maintained scalable full-stack educational web apps with Python (Flask) and MongoDB in a fast-moving startup",
      "Engineered secure REST APIs linking frontend components and database services",
      "Optimised MongoDB queries and indexing, improving retrieval speed and response times across core user modules",
      "Worked with cross-functional teams to design, implement and deploy end-to-end features",
      "Joined daily agile stand-ups, code reviews and sprint planning"
    ]
  },
];

export const education = [
  {
    dates: "Graduated 2026",
    title: "B.Tech, Computer Science Engineering",
    org: "BV Raju Institute of Technology (BVRIT) · Hyderabad, India"
  },
  {
    dates: "2022",
    title: "Intermediate (MPC)",
    org: "VINJEE Junior College · Hyderabad, India"
  },
  {
    dates: "2020",
    title: "Secondary education",
    org: "Wisewoods International School · Gudivada, Vijayawada"
  },
];

export const projects = [
  {
    title: "BookGenius",
    badge: "Published project",
    stack: "Python · Flask · MongoDB · REST APIs",
    links: { "IEEE paper": "" /* TODO */ },
    points: [[6, 70], [28, 40], [50, 52], [74, 14], [94, 30]],
    bullets: [
      "Full-stack platform for book discovery and reading management",
      "User authentication, catalogue management and personalised recommendations",
      "MongoDB schema designed to scale with user and book data",
      "Responsive frontend integrated with backend APIs"
    ]
  },
  {
    title: "Data Management of Inclusivity in Generative AI",
    badge: "Mini project",
    stack: "Python · Flask · MongoDB · TensorFlow · CNN",
    links: { "Live demo": "" /* TODO */ },
    points: [[8, 24], [30, 62], [52, 34], [70, 70], [92, 44]],
    bullets: [
      "Framework that detects and mitigates bias in generative AI training data",
      "Bias detection, synthetic data generation and inclusivity scoring metrics",
      "Web platform for dataset upload, bias analysis and fairness visualisation",
      "CNN-based detection with feedback loops for continuous improvement"
    ]
  },
  {
    title: "Crimson Care: AI-Enabled Smart Blood Donation",
    badge: "Major project",
    stack: "Python · Java Servlet · MySQL · ML · AWS/Azure",
    links: {},
    points: [[10, 60], [26, 20], [48, 46], [66, 12], [84, 56], [96, 24]],
    bullets: [
      "Connects donors, patients, hospitals and blood banks with real-time geo-based matching and SOS alerts",
      "ML models for donor eligibility, health risk detection and blood shortage forecasting",
      "Cloud microservices architecture with secure REST APIs and a MySQL database",
      "Grew from a 24-hour hackathon prototype (AI For Good by NIAT) into a full academic major project"
    ]
  },
  {
    title: "College Helpdesk AI Chatbot",
    badge: "Personal project",
    stack: "Python · FastAPI · LangGraph · Streamlit · RAG",
    links: { "GitLab repo": "" /* TODO */ },
    points: [[6, 46], [24, 18], [46, 64], [68, 30], [90, 60]],
    bullets: [
      "Hybrid rule-based and LLM intent detection that routes requests to the right tool, orchestrated as a LangGraph state machine",
      "OpenRouter as primary LLM with Gemini fallback, plus a RAG FAQ using local sentence-transformers",
      "FastAPI backend and Streamlit chat frontend",
      "Managed on GitLab, evaluating CI/CD for automated testing and deployment"
    ]
  },
];

export const orbit = [
  { radius: 0.22, seconds: 90,  items: ["Python", "Flask", "FastAPI", "MongoDB"] },
  { radius: 0.36, seconds: 140, items: ["LangGraph", "RAG", "TensorFlow", "OpenCV", "LLMs"] },
  { radius: 0.47, seconds: 210, items: ["AWS", "Java", "JavaScript", "MySQL", "Git", "Linux"] },
];

export const skillSheet = [
  ["Languages", "Python, SQL, Java, JavaScript"],
  ["AI and ML", "Machine Learning, CNN, Generative AI, LLM Orchestration, RAG"],
  ["Computer vision", "OpenCV, Image Processing, Video Processing"],
  ["Web", "Flask, FastAPI, REST APIs, HTML, CSS"],
  ["Databases", "MongoDB, MySQL"],
  ["Cloud and tools", "AWS (EC2, S3), Linux, Git, GitLab, Ubuntu Terminal, Microsoft Excel"],
  ["Concepts", "OOP, API Development, Agile, AI Automation, Workflow Optimisation"],
];

export const certifications = [
  { name: "Salesforce Certified Agentforce Specialist", issuer: "Salesforce", year: "2025" },
  { name: "Basics of Python, Deep Learning", issuer: "Infosys Springboard", year: "2025" },
  { name: "Introducing Generative AI with AWS", issuer: "AWS AI/ML Services", year: "2024" },
  { name: "Data Classification and Summarization Using IBM Granite", issuer: "IBM", year: "2024" },
  { name: "AICTE Cloud Virtual Internship", issuer: "Cloud Computing Deployment", year: "2024" },
  { name: "AWS Academy Cloud Foundations", issuer: "Amazon Web Services", year: "2024" },
  { name: "Oracle Academy", issuer: "Database Programming with SQL, Java Programming", year: "2024" },
];
