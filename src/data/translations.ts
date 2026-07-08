export interface NavLink {
  home: string;
  capabilities: string;
  contact: string;
  links: string;
  books: string;
}

export interface Hero {
  role: string;
  name: string;
  tagline: string;
  emailPlaceholder: string;
  connect: string;
  sent: string;
}

export interface SearchSection {
  heading: string;
  headingSerifWord: string;
  description: string;
  bottomLine: string;
}

export interface MissionSection {
  paragraph1: string;
  paragraph2: string;
}

export interface FeatureItem {
  title: string;
  body: string;
}

export interface SolutionSection {
  tag: string;
  heading: string;
  headingSerifWord: string;
  features: FeatureItem[];
}

export interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

export interface AchievementItem {
  title: string;
  subtitle: string;
  desc: string;
}

export interface TimelineAchievements {
  tag: string;
  heading: string;
  headingSerifWord: string;
  timelineItems: TimelineItem[];
  tag2: string;
  heading2: string;
  heading2SerifWord: string;
  achievements: AchievementItem[];
}

export interface CtaSection {
  heading: string;
  headingSerifWord: string;
  text: string;
  button1: string;
  button2: string;
}

export interface Footer {
  copyright: string;
  linkedin: string;
  github: string;
  kaggle: string;
}

export interface ServiceCard {
  title: string;
  description: string;
}

export interface ShowcaseProject {
  name: string;
  desc: string;
}

export interface ShowcaseCategory {
  category: string;
  projects: ShowcaseProject[];
}

export interface PipelineStep {
  name: string;
  step: string;
}

export interface Capabilities {
  tag: string;
  heading: string;
  headingSerifWord: string;
  sub: string;
  serviceCards: ServiceCard[];
  showcaseHeading: string;
  showcaseHeadingSerifWord: string;
  categories: ShowcaseCategory[];
  codeLabel: string;
  copyCode: string;
  copied: string;
  mockupBadge: string;
  pipelineVisualizerTitle: string;
  pipelineVisualizerDesc: string;
  pipelineSteps: PipelineStep[];
  runInference: string;
  processing: string;
  resetCanvas: string;
  inferenceResult: string;
}

export interface Contact {
  tag: string;
  heading: string;
  headingSerifWord: string;
  activeNow: string;
  away: string;
  description: string;
  emailLabel: string;
  locationLabel: string;
  locationValue: string;
  inquiryTypeLabel: string;
  inquiryTypePlaceholder: string;
  inquiryOptions: {
    collaboration: string;
    jobOpportunity: string;
    technicalDiscussion: string;
  };
  fullNameLabel: string;
  fullNamePlaceholder: string;
  emailAddressLabel: string;
  emailAddressPlaceholder: string;
  organizationLabel: string;
  organizationPlaceholder: string;
  noneButton: string;
  yourRoleLabel: string;
  yourRolePlaceholder: string;
  subjectLabel: string;
  subjectPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  sendMessage: string;
  sending: string;
  success: string;
  errorFields: string;
  errorTooMany: string;
  errorGeneric: string;
  errorNetwork: string;
  validationInquiryType: string;
  validationFullName: string;
  validationEmailRequired: string;
  validationEmailInvalid: string;
  validationOrganization: string;
  validationRole: string;
  validationSubject: string;
  validationMessage: string;
}

export interface LinkItem {
  name: string;
  description: string;
}

export interface Links {
  tag: string;
  heading: string;
  headingSerifWord: string;
  sub: string;
  copyLink: string;
  copied: string;
  visit: string;
  modalText: string;
  linkItems: LinkItem[];
}

export interface Books {
  tag: string;
  heading: string;
  headingSerifWord: string;
  sub: string;
  searchPlaceholder: string;
  filters: {
    all: string;
    reading: string;
    planning: string;
    finished: string;
  };
  statusReading: string;
  statusPlanning: string;
  statusFinished: string;
  noMatch: string;
}

export interface Translation {
  nav: NavLink;
  hero: Hero;
  searchSection: SearchSection;
  missionSection: MissionSection;
  solutionSection: SolutionSection;
  timelineAchievements: TimelineAchievements;
  ctaSection: CtaSection;
  footer: Footer;
  capabilities: Capabilities;
  contact: Contact;
  links: Links;
  books: Books;
}

export interface Translations {
  en: Translation;
  ar: Translation;
}

export const translations: Translations = {
  en: {
    nav: {
      home: 'Home',
      capabilities: 'Capabilities',
      contact: 'Contact',
      links: 'Links',
      books: 'Books',
    },
    hero: {
      role: 'Machine Learning Developer',
      name: 'Abdullah Almousa',
      tagline: 'Advancing EDA and Algorithms to solve complex business problems.',
      emailPlaceholder: 'Enter your email...',
      connect: 'CONNECT',
      sent: 'SENT',
    },
    searchSection: {
      heading: 'Algorithms have evolved. Have you?',
      headingSerifWord: 'evolved',
      description:
        'Modern data engineering and algorithms now drive business decisions. I design ML systems that bridge the gap between high-dimensional data and actionable strategies.',
      bottomLine: 'Turning raw data into predictive intelligence.',
    },
    missionSection: {
      paragraph1:
        'I build systems where raw data meets advanced algorithms — designing optimized pipelines, exploring high-dimensional features, and crafting neural models that turn complexity into clarity.',
      paragraph2:
        'An engineering approach focused on mathematical precision, computational scale, and model reproducibility — filtering out the noise to deliver actual predictive value.',
    },
    solutionSection: {
      tag: 'PORTFOLIO',
      heading: 'Selected projects and featured work',
      headingSerifWord: 'featured',
      features: [
        {
          title: 'Malware Detection ML',
          body: 'Developed an ML detection system using static features, achieving 99.4% classification accuracy on large Android malware datasets.',
        },
        {
          title: 'GandI Adventure Game',
          body: 'Engineered using Java and Kotlin, featuring complex JSON state management and partnered distribution with Kinetic Hosting.',
        },
        {
          title: 'Advanced EDA & Algorithms',
          body: 'Statistical analysis on high-dimensional datasets with custom mathematical optimization algorithms.',
        },
        {
          title: 'Power BI Business Intelligence',
          body: 'Interactive dashboards visualizing core metrics, ML pipeline stability, and operational downtime.',
        },
      ],
    },
    timelineAchievements: {
      tag: 'TIMELINE',
      heading: 'Career Timeline',
      headingSerifWord: 'Timeline',
      timelineItems: [
        {
          year: '2025 - Present',
          title: 'GandI Open World Game (Sole Developer)',
          desc: 'Designed and engineered an open world game in 3 months. Attracted 1,200+ players; partnered with Kinetic Hosting for publishing and global distribution.',
        },
        {
          year: '2024',
          title: 'Android Malware Detection (Leader & Developer)',
          desc: 'Led development of a system at Prince Sattam Bin Abdulaziz University using static code analysis and ML, achieving 99.4% (Dataset 2) and 96.25% (Dataset 1) accuracy. Qualified in a Gulf-wide competition across all GCC countries.',
        },
        {
          year: '2024',
          title: 'IT Support Specialist (Internship)',
          desc: 'Diagnosed and resolved hardware/software incidents at Artar, improving internal system stability and workflow uptime.',
        },
        {
          year: 'Education',
          title: 'B.S. in Computer Science',
          desc: 'Prince Sattam Bin Abdulaziz University (Al-Kharj, Saudi Arabia). Specialized in programming, algorithms, and machine learning methodologies.',
        },
      ],
      tag2: 'HONORS',
      heading2: 'Key Achievements',
      heading2SerifWord: 'Achievements',
      achievements: [
        {
          title: '5th Place Nationwide',
          subtitle: 'Al-Khwarizmi Programming Contest',
          desc: 'Ranked 5th in the Saudi Arabia National Java Programming Contest organized by ACM, solving advanced algorithmic challenges under high time pressure.',
        },
        {
          title: '30+ Professional Certificates',
          subtitle: 'Great Learning (2025 - 2026)',
          desc: 'Granted over 30 specialized certificates in Machine Learning and Data Science, covering advanced algorithms, neural networks, and EDA.',
        },
        {
          title: 'Software Engineering Club Award',
          subtitle: 'University contribution',
          desc: 'Recognized for contributions and excellence in software development practices, student mentorship, and workshop leadership (2022).',
        },
      ],
    },
    ctaSection: {
      heading: "Let's Connect",
      headingSerifWord: 'Connect',
      text: "Looking for a machine learning developer to solve complex algorithmic challenges, build neural models, or optimize data pipelines? Let's build together.",
      button1: 'Email Me',
      button2: 'View CV',
    },
    footer: {
      copyright: '© 2026 Abdullah Almousa. All rights reserved.',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      kaggle: 'Kaggle',
    },
    capabilities: {
      tag: 'CAPABILITIES',
      heading: 'What I Can Do',
      headingSerifWord: 'Do',
      sub: 'I perform advanced exploratory analysis, design high-precision algorithms, and train scalable deep learning models.',
      serviceCards: [
        {
          title: 'Exploratory Data Analysis (EDA)',
          description: 'Performing deep dives into large, high-dimensional datasets to clean, normalize, and expose hidden trends that inform machine learning engineering and business logic.',
        },
        {
          title: 'Advanced Algorithmic Design',
          description: 'Designing specialized mathematical models, regression pipelines, and custom metrics for high-accuracy applications, focusing on robust predictive stability.',
        },
        {
          title: 'Deep Learning & Computer Vision',
          description: 'Training custom convolutional architectures (CNNs) and deep neural networks in PyTorch and TensorFlow, optimizing custom loops and feature extraction blocks.',
        },
      ],
      showcaseHeading: 'Project Showcase',
      showcaseHeadingSerifWord: 'Showcase',
      categories: [
        {
          category: 'Computer Vision',
          projects: [
            { name: 'DeepLearningMnist', desc: 'CNN for handwritten digit recognition with over 98% accuracy.' },
            { name: 'TensorflowImgClassification', desc: 'End-to-end multi-class image classification and augmentation pipeline.' },
          ],
        },
        {
          category: 'Predictive Modeling',
          projects: [
            { name: 'DeepLearningWine', desc: 'Physicochemical quality assessment neural network.' },
            { name: 'LoadApproval', desc: 'Automated loan eligibility prediction system using gradient boosting.' },
          ],
        },
        {
          category: 'Deep Learning Experiments',
          projects: [
            { name: 'TestTwoTensorFlow', desc: 'Custom training loops and gradient visualizers.' },
            { name: 'TenserflowEp0', desc: 'Foundational pattern implementations in TensorFlow.' },
          ],
        },
      ],
      codeLabel: 'CNN Architecture Template',
      copyCode: 'Copy Code',
      copied: 'Copied!',
      mockupBadge: 'Live Mockup',
      pipelineVisualizerTitle: 'ML Pipeline Visualizer',
      pipelineVisualizerDesc: 'Click Run Inference to simulate data ingestion, feature extraction, convolutional pooling, and softmax output generation.',
      pipelineSteps: [
        { name: 'Data Ingestion', step: 'Ingesting 28x28 grayscale image arrays' },
        { name: 'Feature Map', step: 'Computing 32 feature matrices (Relu)' },
        { name: 'Max Pooling', step: 'Downsampling spatial resolution to 14x14' },
        { name: 'Softmax Output', step: 'Mapping 64 flattened outputs to probability vector' },
      ],
      runInference: 'Run Inference',
      processing: 'Processing...',
      resetCanvas: 'Reset Canvas',
      inferenceResult: "Class: Handwritten Digit '7' (Conf: 99.4%)",
    },
    contact: {
      tag: 'GET IN TOUCH',
      heading: 'Contact Me',
      headingSerifWord: 'Me',
      activeNow: 'Active Now (Working)',
      away: 'Away (Off-hours)',
      description: 'Reach out for machine learning projects, algorithm designs, data pipelines, or technical consultations. I am typically responsive within 24 hours.',
      emailLabel: 'Email',
      locationLabel: 'Location',
      locationValue: 'Riyadh, Saudi Arabia (AST UTC+3)',
      inquiryTypeLabel: 'Inquiry Type',
      inquiryTypePlaceholder: 'Select inquiry type...',
      inquiryOptions: {
        collaboration: 'Collaboration',
        jobOpportunity: 'Job Opportunity',
        technicalDiscussion: 'Technical Discussion',
      },
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'Mohammad Ali',
      emailAddressLabel: 'Email Address',
      emailAddressPlaceholder: 'ali@example.com',
      organizationLabel: 'Organization',
      organizationPlaceholder: 'Company Name',
      noneButton: 'None',
      yourRoleLabel: 'Your Role',
      yourRolePlaceholder: 'e.g. Recruiter',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'What is this regarding?',
      messageLabel: 'Message',
      messagePlaceholder: 'Type your message here...',
      sendMessage: 'SEND MESSAGE',
      sending: 'SENDING...',
      success: 'Message sent successfully! Thank you.',
      errorFields: 'Please check the form fields and try again.',
      errorTooMany: 'Too many requests. Please try again later.',
      errorGeneric: 'Something went wrong. Please try again or email directly.',
      errorNetwork: 'Network error. Please check your connection and try again.',
      validationInquiryType: 'Please select an inquiry type',
      validationFullName: 'Full name is required',
      validationEmailRequired: 'Email address is required',
      validationEmailInvalid: 'Please enter a valid email address',
      validationOrganization: 'Organization is required',
      validationRole: 'Your role is required',
      validationSubject: 'Subject is required',
      validationMessage: 'Message is required',
    },
    links: {
      tag: 'CONNECT',
      heading: 'My Links',
      headingSerifWord: 'Links',
      sub: 'Explore my professional portfolios, code repositories, data science competition profiles, and reading list.',
      copyLink: 'Copy Link',
      copied: 'Copied!',
      visit: 'Visit',
      modalText: 'Scan QR code to visit',
      linkItems: [
        { name: 'My CV', description: 'Updated resume with full project details.' },
        { name: 'My Portfolio', description: 'My personal website and showcase.' },
        { name: 'LinkedIn', description: 'Professional networking and experience.' },
        { name: 'GitHub', description: 'Code repositories and open source work.' },
        { name: 'Kaggle', description: 'Data science competitions and notebooks.' },
        { name: 'My Books', description: 'My reading journey and literary collection.' },
      ],
    },
    books: {
      tag: 'JOURNEY',
      heading: 'Reading List',
      headingSerifWord: 'List',
      sub: 'A curated log of books I am reading, planning to read, or have completed.',
      searchPlaceholder: 'Search books...',
      filters: {
        all: 'all',
        reading: 'reading',
        planning: 'planning',
        finished: 'finished',
      },
      statusReading: 'Reading',
      statusPlanning: 'Planning',
      statusFinished: 'Finished',
      noMatch: 'No books match your criteria.',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      capabilities: 'القدرات',
      contact: 'تواصل',
      links: 'روابط',
      books: 'كتب',
    },
    hero: {
      role: 'مطوّر تعلّم الآلة',
      name: 'Abdullah Almousa',
      tagline: 'أطوّر تحليل البيانات الاستكشافي والخوارزميات لحل مشاكل الأعمال المعقدة.',
      emailPlaceholder: 'اكتب إيميلك...',
      connect: 'تواصل',
      sent: 'تم الإرسال',
    },
    searchSection: {
      heading: 'الخوارزميات تطوّرت. وأنت؟',
      headingSerifWord: 'تطوّرت',
      description:
        'هندسة البيانات الحديثة والخوارزميات صارت تقود قرارات الأعمال. أصمّم أنظمة تعلّم آلة تربط بين البيانات عالية الأبعاد والاستراتيجيات اللي تقدر تُطبّق.',
      bottomLine: 'أحوّل البيانات الخام لذكاء تنبؤي.',
    },
    missionSection: {
      paragraph1:
        'أبني أنظمة تلتقي فيها البيانات الخام بالخوارزميات المتقدمة — أصمّم خطوط معالجة محسّنة، أستكشف الخصائص عالية الأبعاد، وأبني نماذج عصبية تحوّل التعقيد لوضوح.',
      paragraph2:
        'نهج هندسي يركّز على الدقة الرياضية، والحساب على نطاق واسع، وقابلية تكرار النماذج — أموّت الضوضاء عشان أوصل قيمة تنبؤية حقيقية.',
    },
    solutionSection: {
      tag: 'الأعمال',
      heading: 'مشاريع مختارة وأعمال مميزة',
      headingSerifWord: 'مميزة',
      features: [
        {
          title: 'كشف البرمجيات الخبيثة بالذكاء الاصطناعي',
          body: 'طوّرت نظام كشف باستخدام الخصائص الثابتة، وصلت لدقة تصنيف 99.4% على قواعد بيانات كبيرة لبرمجيات أندرويد الخبيثة.',
        },
        {
          title: 'لعبة GandI Adventure',
          body: 'مبنية بـ Java و Kotlin، فيها إدارة حالة معقدة بـ JSON وشراكة نشر مع Kinetic Hosting.',
        },
        {
          title: 'تحليل البيانات والخوارزميات المتقدمة',
          body: 'تحليل إحصائي على بيانات عالية الأبعاد مع خوارزميات تحسين رياضي مخصصة.',
        },
        {
          title: 'ذكاء أعمال بـ Power BI',
          body: 'لوحات تفاعلية تعرض المؤشرات الأساسية، استقرار خط معالجة تعلّم الآلة، وأوقات توقف التشغيل.',
        },
      ],
    },
    timelineAchievements: {
      tag: 'المسار المهني',
      heading: 'مسيرتي المهنية',
      headingSerifWord: 'المسار',
      timelineItems: [
        {
          year: '2025 - الحاضر',
          title: 'لعبة GandI Open World (المطوّر الوحيد)',
          desc: 'صمّمت وبرمجت لعبة عالم مفتوح بـ 3 شهور. جذبت 1,200+ لاعب؛ وشرّكت مع Kinetic Hosting للنشر والتوزيع العالمي.',
        },
        {
          year: '2024',
          title: 'كشف برمجيات أندرويد الخبيثة (قائد ومطوّر)',
          desc: 'قُدت تطوير نظام بجامعة الأمير سطام بن عبدالعزيز باستخدام تحليل الشيفرة الثابتة وتعلّم الآلة، وصلت لدقة 99.4% (Dataset 2) و 96.25% (Dataset 1). والذي تأهل في مسابقة على مستوى الخليج.',
        },
        {
          year: '2024',
          title: 'أخصائي دعم تقني (تدريب عملي)',
          desc: 'شخّصت وحلّيت مشاكل الأجهزة والبرمجيات في Artar، وحسّنت استقرار الأنظمة الداخلية ووقت تشغيل العمليات.',
        },
        {
          year: 'التعليم',
          title: 'بكالوريوس علوم حاسب آلي',
          desc: 'جامعة الأمير سطام بن عبدالعزيز (الخرج، السعودية). تخصصت في البرمجة، الخوارزميات، ومناهج تعلّم الآلة.',
        },
      ],
      tag2: 'التكريمات',
      heading2: 'أبرز الإنجازات',
      heading2SerifWord: 'الإنجازات',
      achievements: [
        {
          title: 'المركز الخامس على مستوى المملكة',
          subtitle: 'مسابقة الخوارزمي للبرمجة',
          desc: 'حصلت على المركز الخامس في مسابقة الجافا الوطنية بالسعودية اللي أقامتها ACM، بحلّ مشاكل خوارزمية متقدمة تحت ضغط وقت كبير.',
        },
        {
          title: '+30 شهادة مهنية',
          subtitle: 'Great Learning (2025 - 2026)',
          desc: 'حصلت على أكثر من 30 شهادة متخصصة في تعلّم الآلة وعلوم البيانات، شاملة الخوارزميات المتقدمة والشبكات العصبية وتحليل البيانات.',
        },
        {
          title: 'جائزة نادي هندسة البرمجيات',
          subtitle: 'مساهمة جامعية',
          desc: 'تكريم لمساهماتي وتميّزي في ممارسات تطوير البرمجيات، إرشاد الطلاب، وقيادة ورش العمل (2022).',
        },
      ],
    },
    ctaSection: {
      heading: 'خلنا نتواصل',
      headingSerifWord: 'نتواصل',
      text: 'تدوّر مطوّر تعلّم آلة يحل تحديات خوارزمية معقدة، يبني نماذج عصبية، أو يحسّن خطوط معالجة البيانات؟ خلنا نبني سوا.',
      button1: 'راسلني',
      button2: 'شوف السيرة الذاتية',
    },
    footer: {
      copyright: '© 2026 Abdullah Almousa. جميع الحقوق محفوظة.',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      kaggle: 'Kaggle',
    },
    capabilities: {
      tag: 'القدرات',
      heading: 'وش أقدر أسوي',
      headingSerifWord: 'أسوي',
      sub: 'أسوي تحليلات استكشافية متقدمة، أصمّم خوارزميات عالية الدقة، وأدرّب نماذج تعلّم عميق قابلة للتوسع.',
      serviceCards: [
        {
          title: 'تحليل البيانات الاستكشافي (EDA)',
          description: 'أغوص بعمق في بيانات كبيرة عالية الأبعاد عشان أنظّفها وأطبعها وأكشف الاتجاهات المخفية اللي تخدم هندسة تعلّم الآلة ومنطق الأعمال.',
        },
        {
          title: 'تصميم خوارزميات متقدمة',
          description: 'تصميم نماذج رياضية متخصصة، خطوط انحدار، ومقاييس مخصصة لتطبيقات عالية الدقة، مع تركيز على استقرار تنبؤي قوي.',
        },
        {
          title: 'التعلّم العميق ورؤية الحاسوب',
          description: 'تدريب معمارية التفافية مخصصة (CNNs) وشبكات عصبية عميقة بـ PyTorch و TensorFlow، وتحسين حلقات التدريب المخصصة وكتل استخراج الخصائص.',
        },
      ],
      showcaseHeading: 'معرض المشاريع',
      showcaseHeadingSerifWord: 'المعرض',
      categories: [
        {
          category: 'رؤية الحاسوب',
          projects: [
            { name: 'DeepLearningMnist', desc: 'CNN للتعرف على الأرقام المكتوبة بخط اليد بدقة فوق 98%.' },
            { name: 'TensorflowImgClassification', desc: 'خط معالجة كامل لتصنيف الصور متعدد الفئات وزيادة البيانات.' },
          ],
        },
        {
          category: 'النمذجة التنبؤية',
          projects: [
            { name: 'DeepLearningWine', desc: 'شبكة عصبية لتقييم الجودة الفيزيوكيميائية.' },
            { name: 'LoadApproval', desc: 'نظام تنبؤ مؤتمت لأهلية القروض باستخدام gradient boosting.' },
          ],
        },
        {
          category: 'تجارب التعلّم العميق',
          projects: [
            { name: 'TestTwoTensorFlow', desc: 'حلقات تدريب مخصصة وأدوات تصوير التدرجات.' },
            { name: 'TenserflowEp0', desc: 'تنفيذه أنماط أساسية في TensorFlow.' },
          ],
        },
      ],
      codeLabel: 'قالب معمارية CNN',
      copyCode: 'نسخ الكود',
      copied: 'تم النسخ!',
      mockupBadge: 'نموذج حي',
      pipelineVisualizerTitle: 'مُحاكي خط معالجة تعلّم الآلة',
      pipelineVisualizerDesc: 'اضغط شغّل الاستدلال عشان تحاكي استقبال البيانات، استخراج الخصائص، التجميع التلافيفي، وإخراج softmax.',
      pipelineSteps: [
        { name: 'استقبال البيانات', step: 'استقبال مصفوفات صور رمادية 28x28' },
        { name: 'خريطة الخصائص', step: 'حساب 32 مصفوفة خصائص (Relu)' },
        { name: 'التجميع الأقصى', step: 'تقليل الدقة المكانية لـ 14x14' },
        { name: 'إخراج Softmax', step: 'تحويل 64 مخرج مسطح لمتجه احتمالات' },
      ],
      runInference: 'شغّل الاستدلال',
      processing: 'جارٍ المعالجة...',
      resetCanvas: 'إعادة الضبط',
      inferenceResult: "التصنيف: رقم مكتوب بخط اليد '7' (دقة: 99.4%)",
    },
    contact: {
      tag: 'تواصل معي',
      heading: 'راسلني',
      headingSerifWord: 'راسلني',
      activeNow: 'متاح الآن (دوام)',
      away: 'مغلق (خارج الدوام)',
      description: 'تواصل معي لمشاريع تعلّم الآلة، تصميم الخوارزميات، خطوط معالجة البيانات، أو استشارات تقنية. عادة أرد خلال 24 ساعة.',
      emailLabel: 'الإيميل',
      locationLabel: 'الموقع',
      locationValue: 'الرياض، السعودية (AST UTC+3)',
      inquiryTypeLabel: 'نوع الاستفسار',
      inquiryTypePlaceholder: 'اختر نوع الاستفسار...',
      inquiryOptions: {
        collaboration: 'تعاون',
        jobOpportunity: 'فرصة عمل',
        technicalDiscussion: 'نقاش تقني',
      },
      fullNameLabel: 'الاسم الكامل',
      fullNamePlaceholder: 'محمد علي',
      emailAddressLabel: 'عنوان الإيميل',
      emailAddressPlaceholder: 'ali@example.com',
      organizationLabel: 'المؤسسة',
      organizationPlaceholder: 'اسم الشركة',
      noneButton: 'لا يوجد',
      yourRoleLabel: 'دورك',
      yourRolePlaceholder: 'مثلاً: مسؤول توظيف',
      subjectLabel: 'الموضوع',
      subjectPlaceholder: 'وش الموضوع؟',
      messageLabel: 'الرسالة',
      messagePlaceholder: 'اكتب رسالتك هنا...',
      sendMessage: 'إرسال الرسالة',
      sending: 'جارٍ الإرسال...',
      success: 'تم إرسال رسالتك بنجاح! مشكور.',
      errorFields: 'تأكد من الحقول وحاول مرة ثانية.',
      errorTooMany: 'طلبات كثيرة. حاول بعدين.',
      errorGeneric: 'صار خطأ. حاول مرة ثانية أو راسلني مباشرة.',
      errorNetwork: 'مشكلة في النت. تأكد من اتصالك وحاول مرة ثانية.',
      validationInquiryType: 'اختر نوع الاستفسار',
      validationFullName: 'الاسم الكامل مطلوب',
      validationEmailRequired: 'عنوان الإيميل مطلوب',
      validationEmailInvalid: 'اكتب إيميل صحيح',
      validationOrganization: 'المؤسسة مطلوبة',
      validationRole: 'دورك مطلوب',
      validationSubject: 'الموضوع مطلوب',
      validationMessage: 'الرسالة مطلوبة',
    },
    links: {
      tag: 'تواصل',
      heading: 'روابطي',
      headingSerifWord: 'روابطي',
      sub: 'تصفّح ملفاتي المهنية، مستودعات الكود، ملفات مسابقات علوم البيانات، وقائمة قراءتي.',
      copyLink: 'نسخ الرابط',
      copied: 'تم النسخ!',
      visit: 'زيارة',
      modalText: 'امسح رمز QR للزيارة',
      linkItems: [
        { name: 'My CV', description: 'سيرتي الذاتية محدّثة بكل تفاصيل المشاريع.' },
        { name: 'My Portfolio', description: 'موقعي الشخصي ومعرض أعمالي.' },
        { name: 'LinkedIn', description: 'التواصل المهني والخبرات.' },
        { name: 'GitHub', description: 'مستودعات الكود والأعمال مفتوحة المصدر.' },
        { name: 'Kaggle', description: 'مسابقات علوم البيانات والدفاتر.' },
        { name: 'My Books', description: 'رحلتي في القراءة ومجموعتي الأدبية.' },
      ],
    },
    books: {
      tag: 'الرحلة',
      heading: 'قائمة القراءة',
      headingSerifWord: 'القراءة',
      sub: 'سجل منظم للكتب اللي أقرأها، أخطط أقرأها، أو خلّصتها.',
      searchPlaceholder: 'ابحث عن كتب...',
      filters: {
        all: 'الكل',
        reading: 'أقرأ',
        planning: 'مخطط',
        finished: 'منتهي',
      },
      statusReading: 'أقرأ',
      statusPlanning: 'مخطط',
      statusFinished: 'منتهي',
      noMatch: 'ما في كتب تطابق معاييرك.',
    },
  },
};