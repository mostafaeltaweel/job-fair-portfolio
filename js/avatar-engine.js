/**
 * ============================================================================
 * MOSTAFA ELTAWEEL — AUTHENTIC 3-STATE AVATAR CONTROLLER
 * Uses the user's authentic transparent cutout poses:
 * - Greeting: assets/poses/avatar-greeting.png (from Greating.webp)
 * - Speaking: assets/poses/avatar-speaking.png (from Speeking.webp)
 * - Idle:     assets/poses/avatar-idle.png     (from avatar.webp)
 * ============================================================================
 */

class AvatarEngine {
  constructor(options = {}) {
    this.stageId = options.stageId || 'avatarStage';
    this.poseImgId = options.poseImgId || 'avatarPoseImg';
    this.speechBubbleId = options.speechBubbleId || 'compactSpeechBubble';
    this.speechTextId = options.speechTextId || 'compactSpeechText';
    this.speechActionsId = options.speechActionsId || 'compactSpeechActions';

    this.stage = document.getElementById(this.stageId);
    this.poseImg = document.getElementById(this.poseImgId);
    this.speechBubble = document.getElementById(this.speechBubbleId);
    this.speechText = document.getElementById(this.speechTextId);
    this.speechActions = document.getElementById(this.speechActionsId);

    // Authentic transparent poses
    this.poses = {
      idle: 'assets/poses/avatar-idle.png',
      greeting: 'assets/poses/avatar-greeting.png',
      speaking: 'assets/poses/avatar-speaking.png'
    };

    this.currentPose = 'idle';
    this.typingInterval = null;
    this.isTyping = false;

    this.init();
  }

  init() {
    if (!this.stage || !this.poseImg) return;

    // Window resize / orientation change listener for real-time Smart Roaming evasion
    window.addEventListener('resize', () => this.checkCollisionAndEvade());
    window.addEventListener('orientationchange', () => this.checkCollisionAndEvade());

    // Start with authentic Greeting pose
    setTimeout(() => {
      this.playGreeting();
    }, 400);
  }

  checkCollisionAndEvade() {
    if (!this.stage) return;

    // On narrow mobile devices (<=768px), stage is already stacked vertically in column flow
    if (window.innerWidth <= 768) {
      this.stage.classList.remove('evade-mode');
      this.stage.style.transform = '';
      return;
    }

    const contactBar = document.getElementById('contactBarWrapper');
    if (!contactBar) return;

    const contactRect = contactBar.getBoundingClientRect();
    const stageRect = this.stage.getBoundingClientRect();

    // In horizontal layout, the bubble extends ~290px to the left of the avatar wrapper (230px)
    // Left edge of the bubble will reach: stageRect.right - (230 + 14 + 285) = stageRect.right - 529px
    const bubbleProjectedLeft = stageRect.right - 530;

    // Check collision with contact bar right edge (with 36px safety buffer)
    const isColliding = bubbleProjectedLeft <= (contactRect.right + 36);

    if (isColliding) {
      // Smart Roaming: Move bubble overhead so avatar's horizontal footprint is only 230px
      if (!this.stage.classList.contains('evade-mode')) {
        this.stage.classList.add('evade-mode');
      }
      this.stage.style.transform = 'translateY(-6px)';
    } else {
      this.stage.classList.remove('evade-mode');
      this.stage.style.transform = 'translateY(0)';
    }
  }

  setPose(poseKey) {
    if (!this.poses[poseKey] || !this.poseImg) return;
    this.currentPose = poseKey;
    this.poseImg.src = this.poses[poseKey];
  }

  playGreeting() {
    this.checkCollisionAndEvade();
    this.setPose('greeting');
    const isAr = document.documentElement.lang === 'ar' || document.documentElement.dir === 'rtl';
    const msg = isAr
      ? "أهلاً بك، أنا المساعد الشخصي لمصطفى الطويل. ما هي الوظيفة أو الدور المطلوب لديكم؟ سأخبرك بدقة كيف تتطابق خبراته ومشاريعه مع متطلباتكم."
      : "Hi, I'm Mostafa's assistant. Which role are you hiring for? I'll tell you quickly how he fits.";
    const actions = [
      { 
        label: isAr ? "تحميل السيرة الذاتية (PDF)" : "Download CV (PDF)", 
        download: "assets/Mostafa_CV.pdf", 
        filename: "Mostafa_Mohamed_Eltaweel_CV.pdf", 
        icon: "📄" 
      }
    ];

    this.speak(msg, {
      pose: 'greeting',
      actions: actions,
      speed: 18,
      onComplete: () => {
        // Settle smoothly to Idle stance after greeting completes
        setTimeout(() => {
          if (this.currentPose === 'greeting') {
            this.setPose('idle');
            this.stage.style.transform = 'translateY(0)';
          }
        }, 2200);
      }
    });
  }

  playThinking(onComplete) {
    this.checkCollisionAndEvade();
    this.setSpeechText("Thinking through your question...");
    this.clearActions();

    setTimeout(() => {
      if (onComplete) onComplete();
    }, 900);
  }

  speak(text, options = {}) {
    // Dynamic collision evasion before speaking
    this.checkCollisionAndEvade();

    // Switch to Speaking pose while talking
    this.setPose(options.pose || 'speaking');

    this.typewrite(text, options.speed || 18, () => {
      this.clearActions();
      if (options.actions && options.actions.length > 0) {
        this.renderActions(options.actions);
      }

      if (options.onComplete) {
        options.onComplete();
      } else {
        // Settle back to Idle pose after speech ends
        setTimeout(() => {
          if (!this.isTyping) {
            this.setPose('idle');
            this.stage.style.transform = 'translateY(0)';
          }
        }, 1600);
      }
    });
  }

  typewrite(text, speed = 18, onComplete) {
    if (!this.speechText) return;

    this.isTyping = true;
    this.speechText.textContent = '';
    clearInterval(this.typingInterval);

    const isArabic = /[\u0600-\u06FF]/.test(text);
    this.speechText.style.direction = isArabic ? 'rtl' : 'ltr';

    let index = 0;
    this.typingInterval = setInterval(() => {
      if (index < text.length) {
        this.speechText.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(this.typingInterval);
        this.isTyping = false;
        if (onComplete) onComplete();
      }
    }, speed);
  }

  setSpeechText(text) {
    if (!this.speechText) return;
    clearInterval(this.typingInterval);
    this.speechText.textContent = text;
  }

  clearActions() {
    if (this.speechActions) {
      this.speechActions.innerHTML = '';
      this.speechActions.style.display = 'none';
    }
  }

  renderActions(actions) {
    if (!this.speechActions || !actions || actions.length === 0) return;

    this.speechActions.innerHTML = '';
    this.speechActions.style.display = 'flex';

    actions.forEach(act => {
      const btn = document.createElement('a');
      btn.className = 'compact-action-btn';
      btn.innerHTML = `${act.icon ? act.icon + ' ' : ''}${act.label}`;

      if (act.url) {
        btn.href = act.url;
        btn.target = '_blank';
        btn.rel = 'noopener';
      } else if (act.download) {
        btn.href = act.download;
        btn.setAttribute('download', act.filename || 'Mostafa_CV.pdf');
      } else if (act.action) {
        btn.href = '#';
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.triggerAction(act.action);
        });
      }

      this.speechActions.appendChild(btn);
    });
  }

  triggerAction(actionName) {
    switch (actionName) {
      case 'download-cv':
        const cvLink = document.createElement('a');
        cvLink.href = 'assets/Mostafa_CV.pdf';
        cvLink.download = 'Mostafa_Mohamed_Eltaweel_CV.pdf';
        document.body.appendChild(cvLink);
        cvLink.click();
        document.body.removeChild(cvLink);
        break;
      case 'credentials':
      case 'pl300':
        const credModal = document.getElementById('credentialsModal');
        if (credModal) credModal.classList.add('active');
        break;
      case 'infographic':
      case 'etd':
        const infoModal = document.getElementById('infographicModal');
        if (infoModal) infoModal.classList.add('active');
        break;
      case 'hms':
        if (window.appController) {
          window.appController.sendCustomQuery('HMS Pricing Engine');
        }
        break;
      default:
        break;
    }
  }
}

window.AvatarEngine = AvatarEngine;
