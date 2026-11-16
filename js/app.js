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

    const isArabic = /[\u0600-\u06FF]/.test(query);
    const targetLang = isArabic ? 'ar' : this.currentLang;

    if (isArabic && this.currentLang !== 'ar') {
      document.documentElement.dir = 'rtl';
    } else if (!isArabic && this.currentLang === 'en') {
      document.documentElement.dir = 'ltr';
    }

    // 1. Thinking state
    this.avatarEngine.playThinking(async () => {
      try {
        const result = await GeminiChatService.ask(query, targetLang);

        if (result.highlight && result.highlight !== 'none') {
          this.highlightIcon(result.highlight);
        }

        // Only CV link allowed in the speech bubble
        const actions = [
          {
            label: targetLang === 'ar' ? 'تحميل الـ CV (PDF)' : 'Download CV (PDF)',
            download: 'assets/Mostafa_CV.pdf',
            filename: 'Mostafa_Mohamed_Eltaweel_CV.pdf',
            icon: '📄'
          }
        ];

        // Deliver Answer in authentic Speaking pose with ultra-compact bubble
        this.avatarEngine.speak(result.speech, {
          pose: 'speaking',
          actions: actions,
          speed: 18
        });

      } catch (err) {
        console.error(err);
        this.avatarEngine.speak(
          targetLang === 'ar'
            ? "يسعدني استعراض مشاريعي وخبراتي! يمكنك تحميل سيرتي الذاتية بالزر أدناه."
            : "I'd be glad to discuss my projects and data expertise! You can download my CV below.",
          {
            pose: 'speaking',
            actions: [
              { 
                label: targetLang === 'ar' ? 'تحميل الـ CV (PDF)' : 'Download CV (PDF)', 
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

  highlightIcon(actionName) {
    const iconMap = {
      cv: 'dockCvBtn',
      portfolio: 'dockPortfolioBtn',
      linkedin: 'dockLinkedinBtn',
      infographic: 'dockInfographicBtn',
      credentials: 'dockCredentialsBtn',
      whatsapp: 'dockWhatsappBtn'
    };

    const targetId = iconMap[actionName];
    if (targetId) {
      const btn = document.getElementById(targetId);
      if (btn) {
        btn.classList.add('pulse-active');
        setTimeout(() => btn.classList.remove('pulse-active'), 2200);
      }
    }
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.appController = new AppController();
});
