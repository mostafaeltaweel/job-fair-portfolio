/**
 * ============================================================================
 * MAIN CONTROLLER (THEME, LANGUAGE, CHAT & AUTHENTIC AVATAR INTEGRATION)
 * ============================================================================
 */

class AppController {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.currentLang = 'en'; // English LTR by default
    this.avatarEngine = null;

    this.init();
  }

  init() {
    // 1. Initialize AvatarEngine with authentic poses
    this.avatarEngine = new AvatarEngine({
      stageId: 'avatarStage',
      poseImgId: 'avatarPoseImg',
      speechBubbleId: 'compactSpeechBubble',
      speechTextId: 'compactSpeechText',
      speechActionsId: 'compactSpeechActions'
    });

    // 2. Set Theme
    this.applyTheme(this.currentTheme);

    // 3. Bind UI Events
    this.bindEvents();

    // 4. Initialize dynamic dock icon click handlers (stops motion when clicked)
    this.initDockInteractions();
  }

  initDockInteractions() {
    const dockElements = document.querySelectorAll('.dock-icon-btn, .dock-logo-container');
    dockElements.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.remove('pulse-active');
      });
    });
  }

  clearActiveHighlights() {
    const dockElements = document.querySelectorAll('.dock-icon-btn, .dock-logo-container');
    dockElements.forEach(btn => {
      btn.classList.remove('pulse-active');
    });
  }

  bindEvents() {
    // Theme Toggle (000000 / ffffff)
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const nextTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(nextTheme);
      });
    }

    // Language Toggle (EN / AR)
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        this.setLanguage(this.currentLang === 'en' ? 'ar' : 'en');
      });
    }

    // Prompt Submission
    const submitBtn = document.getElementById('promptSubmitBtn');
    const inputField = document.getElementById('promptInput');

    if (submitBtn) {
      submitBtn.addEventListener('click', () => this.handlePromptSubmit());
    }
    if (inputField) {
      inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.handlePromptSubmit();
      });
    }

    // Infographic Modal
    const infoBtn = document.getElementById('dockInfographicBtn');
    const infoModal = document.getElementById('infographicModal');
    const closeBtn = document.getElementById('closeModalBtn');

    if (infoBtn && infoModal) {
      infoBtn.addEventListener('click', () => {
        infoModal.classList.add('active');
        this.highlightIcon('infographic');
      });
    }
    if (closeBtn && infoModal) {
      closeBtn.addEventListener('click', () => {
        infoModal.classList.remove('active');
      });
    }
    if (infoModal) {
      infoModal.addEventListener('click', (e) => {
        if (e.target === infoModal) infoModal.classList.remove('active');
      });
    }

    // Credentials Hub Modal
    const credsBtn = document.getElementById('dockCredentialsBtn');
    const credsModal = document.getElementById('credentialsModal');
    const closeCredsBtn = document.getElementById('closeCredentialsModalBtn');

    if (credsBtn && credsModal) {
      credsBtn.addEventListener('click', () => {
        credsModal.classList.add('active');
        this.highlightIcon('credentials');
        if (this.avatarEngine) {
          this.avatarEngine.speak(
            this.currentLang === 'ar'
              ? "استعرض اعتماداتي الرسمية من Microsoft PL-300 و Google و IBM ودبلومة SD مع روابط التوثيق المباشرة!"
              : "Review my verified credentials from Microsoft PL-300, Google, IBM, and the DigiLians SD diploma!",
            {
              pose: 'speaking',
              actions: [
                {
                  label: this.currentLang === 'ar' ? 'تحميل الـ CV (PDF)' : 'Download CV (PDF)',
                  download: 'assets/Mostafa_CV.pdf',
                  filename: 'Mostafa_Mohamed_Eltaweel_CV.pdf',
                  icon: '📄'
                }
              ]
            }
          );
        }
      });
    }
    if (closeCredsBtn && credsModal) {
      closeCredsBtn.addEventListener('click', () => {
        credsModal.classList.remove('active');
      });
    }
    if (credsModal) {
      credsModal.addEventListener('click', (e) => {
        if (e.target === credsModal) credsModal.classList.remove('active');
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (infoModal) infoModal.classList.remove('active');
        if (credsModal) credsModal.classList.remove('active');
      }
    });

    // Direct CV Download click notification
    const cvBtn = document.getElementById('dockCvBtn');
    if (cvBtn) {
      cvBtn.addEventListener('click', () => {
        this.highlightIcon('cv');
        if (this.avatarEngine) {
          this.avatarEngine.speak(
            this.currentLang === 'ar'
              ? "جاري تحميل السيرة الذاتية (Mostafa_CV.pdf) إلى جهازك الآن! بالتوفيق في مراجعة الملف."
              : "Downloading Mostafa_CV.pdf directly to your device now! Enjoy reviewing.",
            {
              pose: 'speaking',
              actions: [
                { label: 'Download Again (PDF)', download: 'assets/Mostafa_CV.pdf', icon: '📄' }
              ]
            }
          );
        }
      });
    }

    // Direct Click on Avatar Pose
    const poseImg = document.getElementById('avatarPoseImg');
    if (poseImg) {
      poseImg.addEventListener('click', () => {
        if (this.avatarEngine) {
          this.avatarEngine.speak(
            this.currentLang === 'ar'
              ? "أهلاً بك! أنا مصطفى الطويل. اسألني عن مشاريعي في تحليل البيانات وشهادة PL-300 أو حمّل الـ CV!"
              : "Hello! I am Mostafa Eltaweel. Ask me about my data analytics projects, PL-300, or download my CV!",
            {
              pose: 'greeting',
              actions: [
                { 
                  label: this.currentLang === 'ar' ? 'تحميل الـ CV (PDF)' : 'Download CV (PDF)', 
                  download: 'assets/Mostafa_CV.pdf', 
                  filename: 'Mostafa_Mohamed_Eltaweel_CV.pdf', 
                  icon: '📄' 
                }
              ]
            }
          );
        }
      });
    }
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const iconEl = document.getElementById('themeIcon');
    if (iconEl) {
      iconEl.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  setLanguage(lang) {
    this.currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    const langIcon = document.getElementById('langIcon');
    if (langIcon) {
      langIcon.textContent = lang === 'ar' ? 'EN' : 'عربي';
    }

    const brandPill = document.getElementById('brandPillText');
    if (brandPill) {
      brandPill.textContent = "Mostafa Eltaweel _Applied AI & Data Analysis  Spicialize Deplome | DigiLians";
    }

    const input = document.getElementById('promptInput');
    if (input) {
      input.placeholder = lang === 'ar'
        ? "اسأل مصطفى أي سؤال (مثلاً: الـ CV، شهادة PL-300، شهادات Google/IBM، أو HMS)..."
        : "Ask Mostafa anything (e.g. CV, PL-300, Google/IBM certs, HMS)...";
    }

    if (this.avatarEngine) {
      if (lang === 'ar') {
        this.avatarEngine.speak(
          "أهلاً ومرحباً بك! أنا مساعد مصطفى الذكي. 🌟 هل تبحث عن محلل البيانات القادم لفريقك؟ يمكنك بسهولة تحميل السيرة الذاتية (CV)، أو استكشاف عروض مشاريعه المتخصصة، أو سؤالي عن أي شيء يخص خبراته في تحليل البيانات والذكاء الاصطناعي التطبيقي لترى كيف يمكنه إضافة قيمة حقيقية لأعمالك! وأخبرني إذا كنت ترغب في التواصل معه مباشرة.",
          {
            pose: 'greeting',
            actions: [
              { 
                label: 'تحميل الـ CV (PDF)', 
                download: 'assets/Mostafa_CV.pdf', 
                filename: 'Mostafa_Mohamed_Eltaweel_CV.pdf', 
                icon: '📄' 
              }
            ]
          }
        );
      } else {
        this.avatarEngine.playGreeting();
      }
    }
  }

  sendCustomQuery(queryText) {
    const inputField = document.getElementById('promptInput');
    if (inputField) {
      inputField.value = queryText;
      this.handlePromptSubmit();
    }
  }

  async handlePromptSubmit() {
    const input = document.getElementById('promptInput');
    if (!input || !this.avatarEngine || this.avatarEngine.isTyping) return;

    const query = input.value.trim();
    if (!query) return;

    input.value = '';
    input.blur();

    // 1. Clear any previously moving / pulsing dock icons when a new message is sent
    this.clearActiveHighlights();

    const isArabic = /[\u0600-\u06FF]/.test(query);
    const targetLang = isArabic ? 'ar' : this.currentLang;

    if (isArabic && this.currentLang !== 'ar') {
      document.documentElement.dir = 'rtl';
    } else if (!isArabic && this.currentLang === 'en') {
      document.documentElement.dir = 'ltr';
    }

    // 2. Thinking state
    this.avatarEngine.playThinking(async () => {
      try {
        const result = await GeminiChatService.ask(query, targetLang);

        // Dynamic topic detection to make sidebar icons interact with the conversation
        const combinedText = `${query} ${result.speech || ''} ${result.highlight || ''}`.toLowerCase();
        const activeTopics = new Set();

        if (result.highlight && result.highlight !== 'none') {
          activeTopics.add(result.highlight);
        }

        // 1. Web Portfolio (https://mostafaeltaweel.github.io/mostafa-eltaweel-portfolio/)
        if (/portfolio|بورتفوليو|معرض|معرض أعمال|معرض الاعمال|web portfolio|موقع|موقعه|سابقة أعمال/.test(combinedText)) {
          activeTopics.add('portfolio');
        }

        // 2. Live Project Demo (Streamlit ETD Capstone)
        if (/demo|ديمو|عرض حي|سرقة كهرباء|سرقة الكهرباء|theft|electric|smart meter|عدادات|streamlit|ستريمليت|تطبيق حي|تجربة النموذج/.test(combinedText)) {
          activeTopics.add('demo');
        }

        // 3. CV / Resume
        if (/cv|سيرة|سيرة ذاتية|resume|curriculum|الملف/.test(combinedText)) {
          activeTopics.add('cv');
        }

        // 4. WhatsApp / Direct Contact / Interview
        if (/whatsapp|واتساب|تواصل|اتصال|contact|call|phone|هاتف|رقم|reach|chat|interview|مقابلة|وظيفة|توظيف/.test(combinedText)) {
          activeTopics.add('whatsapp');
        }

        // 5. LinkedIn Profile
        if (/linkedin|لينكد|حساب لينكد|لينكدان/.test(combinedText)) {
          activeTopics.add('linkedin');
        }

        // 6. Credentials / Certifications
        if (/cert|certificate|شهادة|شهادات|credential|credentials|pl-300|pl300|dp-900|dp900|microsoft|google|ibm|digilians|مايكروسوفت/.test(combinedText)) {
          activeTopics.add('credentials');
        }

        // 7. Graduation Infographic
        if (/infographic|انفوجرافيك|انفوجراف|etd|poster|بوستر/.test(combinedText)) {
          activeTopics.add('infographic');
        }

        // General project queries if neither specific portfolio nor demo was flagged
        if (/project|projects|مشروع|مشاريع|hotel|fraud/.test(combinedText) && !activeTopics.has('portfolio') && !activeTopics.has('demo')) {
          activeTopics.add('demo');
        }

        // Trigger continuous pulse on all matching sidebar dock icons (keeps moving until clicked or next message)
        activeTopics.forEach(topic => this.highlightIcon(topic));

        // Sanitize speech to ensure NO raw URLs, emails or phone numbers appear in the chat text
        let speech = (result.speech || '').trim();
        speech = speech.replace(/https?:\/\/[^\s]+/g, '').trim();
        speech = speech.replace(/\+?20[0-9]{9,10}/g, '').replace(/01[0-2,5][0-9]{8}/g, '').trim();
        speech = speech.replace(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+/g, '').trim();
        speech = speech.replace(/\s*:\s*$/g, '.').replace(/\s{2,}/g, ' ');

        const actions = [];
        const isAr = targetLang === 'ar';

        // Deliver Answer in authentic Speaking pose without raw link clutter
        this.avatarEngine.speak(speech, {
          pose: 'speaking',
          actions: actions,
          speed: 18
        });

      } catch (err) {
        console.error(err);
        this.avatarEngine.speak(
          targetLang === 'ar'
            ? "يسعدني استعراض مشاريعي وخبراتي! يمكنك الاطلاع على السيرة الذاتية ومعرض الأعمال عبر الأيقونات المضيئة في الشريط الأيسر."
            : "I'd be glad to discuss my projects and data expertise! You can explore my CV and web portfolio via the highlighted icons on the left dock.",
          {
            pose: 'speaking',
            actions: [],
            speed: 18
          }
        );
      }
    });
  }

  highlightIcon(actionName) {
    const iconMap = {
      cv: 'dockCvBtn',
      portfolio: 'dockPortfolioBtn',
      demo: 'dockDemoBtn',
      linkedin: 'dockLinkedinBtn',
      infographic: 'dockInfographicBtn',
      credentials: 'dockCredentialsBtn',
      whatsapp: 'dockWhatsappBtn'
    };

    const targetId = iconMap[actionName];
    if (targetId) {
      const btn = document.getElementById(targetId);
      if (btn) {
        btn.classList.remove('pulse-active');
        void btn.offsetWidth;
        // Keeps moving continuously until the user clicks on it or sends another message!
        btn.classList.add('pulse-active');
      }
    }

    if (actionName === 'portfolio') {
      const logo = document.getElementById('dockLogoBtn');
      if (logo) {
        logo.classList.remove('pulse-active');
        void logo.offsetWidth;
        logo.classList.add('pulse-active');
      }
    }
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.appController = new AppController();
});
