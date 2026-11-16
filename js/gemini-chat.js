/**
 * GEMINI CHAT SERVICE & HIGH-PRECISION SMART FALLBACK ENGINE
 */

class SmartFallbackEngine {
  static detectLanguage(text) {
    const arabicPattern = /[\u0600-\u06FF\u0750-\u077F]/;
    return arabicPattern.test(text) ? 'ar' : 'en';
  }

  static resolve(promptText, requestedLang = 'en') {
    const text = (promptText || '').toLowerCase().trim();
    const lang = this.detectLanguage(text) || requestedLang || 'en';

    // 1. CV / Resume / Download
    if (
      text.includes('cv') || 
      text.includes('سيرة') || 
      text.includes('resume') || 
      text.includes('تحميل') || 
      text.includes('download') || 
      text.includes('pdf')
    ) {
      return {
        speech: lang === 'ar'
          ? "أهلاً بك! يمكنك تحميل سيرتي الذاتية كملف PDF مباشرة من أيقونة الـ CV على اليسار. معتمد Microsoft PL-300 وخريج برنامج SD مسار Applied AI & Data Analytics."
          : "Welcome! You can download my complete CV PDF directly using the CV icon on the left dock. Microsoft PL-300 certified Data Analyst.",
        highlight: "cv",
        pose: "point",
        lang: lang
      };
    }

    // 2. Google / IBM / Microsoft Certifications
    if (
      text.includes('google') || 
      text.includes('جوجل')
    ) {
      return {
        speech: lang === 'ar'
          ? "حاصل على شهادة Google Data Analytics الاحترافية المعتمدة عبر Coursera، والتي تغطي تنظيف البيانات، SQL، R، وتحويل البيانات لقرارات تجارية. اضغط على أيقونة الشهادات للتوثيق."
          : "I earned the official Google Data Analytics Professional Certificate via Coursera, covering SQL, R, data cleaning, and business insights. Click the credentials icon to verify.",
        highlight: "credentials",
        pose: "thumbs_up",
        lang: lang
      };
    }

    if (
      text.includes('ibm') || 
      text.includes('اي بي ام')
    ) {
      return {
        speech: lang === 'ar'
          ? "حاصل على شهادة Machine Learning with Python المعتمدة من IBM عبر Coursera، متقناً خوارزميات الانحدار، التصنيف، والتجميع بـ Scikit-Learn. اضغط على أيقونة الشهادات للتحقق."
          : "I hold IBM's Machine Learning with Python certificate via Coursera, proficient in regression, classification, clustering, and Scikit-Learn pipelines. Click credentials to verify.",
        highlight: "credentials",
        pose: "thumbs_up",
        lang: lang
      };
    }

    if (
      text.includes('pl-300') || 
      text.includes('pl300') || 
      text.includes('microsoft') || 
      text.includes('مايكروسوفت')
    ) {
      return {
        speech: lang === 'ar'
          ? "أنا معتمد رسمياً كـ Microsoft Power BI Data Analyst Associate (PL-300). أتقن نمذجة الـ Star-Schema، معادلات DAX المتقدمة، وخطوط Power Query ETL. اضغط على أيقونة الشهادات للتحقق الرسمي."
          : "Officially certified Microsoft Power BI Data Analyst Associate (PL-300). Expert in Star-Schema modeling, advanced DAX time-intelligence, and Power Query ETL. Click credentials to verify.",
        highlight: "credentials",
        pose: "thumbs_up",
        lang: lang
      };
    }

    if (
      text.includes('شهادة') || 
      text.includes('شهادات') || 
      text.includes('cert') || 
      text.includes('credential') || 
      text.includes('badge')
    ) {
      return {
        speech: lang === 'ar'
          ? "أحمل 3 اعتمادات دولية موثقة: Microsoft PL-300، Google Data Analytics، و IBM Machine Learning، بالإضافة لدبلومة SD من DigiLians. اضغط على أيقونة الشهادات لاستعراضها وروابط التحقق."
          : "I hold 3 internationally verified credentials: Microsoft PL-300, Google Data Analytics, and IBM Machine Learning, plus the DigiLians SD Diploma. Click the credentials icon to review and verify.",
        highlight: "credentials",
        pose: "thumbs_up",
        lang: lang
      };
    }

    // 3. Hotel Booking Performance (119k)
    if (
      text.includes('hotel booking') || 
      text.includes('حجوزات') || 
      text.includes('إلغاء') || 
      text.includes('119k') || 
      text.includes('cancellation')
    ) {
      return {
        speech: lang === 'ar'
          ? "حللت 119,390 حجز فندقي عبر SQL Server ولوحة Power BI لمعالجة تذبذب الإلغاءات (37%). أثبتت أن الحجوزات المبكرة لأكثر من 90 يوماً عبر وكلاء السفر تتضاعف احتمالية إلغائها وابتكرت خطط تسعير غير مستردة."
          : "Diagnosed 119,390 hotel booking records in Power BI and SQL Server. Found bookings >90 days via OTAs doubled cancellations (37% baseline); engineered dynamic non-refundable pricing tiers.",
        highlight: "portfolio",
        pose: "point",
        lang: lang
      };
    }

    // 4. Financial Fraud Analytics (1M+)
    if (
      text.includes('fraud') || 
      text.includes('احتيال') || 
      text.includes('تزوير') || 
      text.includes('financial fraud')
    ) {
      return {
        speech: lang === 'ar'
          ? "حللت 1.05 مليون معاملة مالية للكشف عن أنماط الاحتيال النادرة (0.11%). أثبتت التحليلات أن 100% من حالات الاحتيال تركزت حصرياً في نمطي TRANSFER و CASH_OUT، مما قلص جهد الرقابة بـ 98%."
          : "Audited 1,048,575 transactions in Power BI for fraud anomalies. Proved 100% of confirmed fraud concentrated in TRANSFER and CASH_OUT modes, reducing manual audit noise by 98%.",
        highlight: "portfolio",
        pose: "point",
        lang: lang
      };
    }

    // 5. HMS / Pricing Engine
    if (
      text.includes('hms') || 
      text.includes('تسعير') || 
      text.includes('pricing') || 
      text.includes('فندق') || 
      text.includes('rates')
    ) {
      return {
        speech: lang === 'ar'
          ? "في مشروع HMS SaaS قمت بقيادة Group D لهندسة محرك الأسعار وخدمة PricingService وقواعد المواسم والتسعير الديناميكي بحسب نسبة الإشغال وتعدد العملات بدقة عشرية."
          : "In the HMS project, I led Group D to architect the Rates & Pricing Engine: PricingService, seasonal overlap rules, multi-currency precision, and dynamic occupancy pricing.",
        highlight: "portfolio",
        pose: "point",
        lang: lang
      };
    }

    // 6. Electricity Theft Detection (ETD)
    if (
      text.includes('كهرباء') || 
      text.includes('سرقة') || 
      text.includes('تخرج') || 
      text.includes('etd') || 
      text.includes('theft') || 
      text.includes('electricity') || 
      text.includes('capstone')
    ) {
      return {
        speech: lang === 'ar'
          ? "مشروع تخرجي ETD-XAI حلل 18,193 عداد ذكي بنموذج CNN-LSTM محققاً دقة 94.0% و AUC-ROC 0.983! يمكنك الضغط على أيقونة الإنفوجرافيك أو تجربة الديمو السحابي عبر Streamlit."
          : "My capstone ETD-XAI analyzed 18,193 smart meters with Dual-Branch CNN-LSTM, reaching 94.0% accuracy and 0.983 AUC! Check out the infographic or live Streamlit demo.",
        highlight: "infographic",
        pose: "point",
        lang: lang
      };
    }

    // 7. Power BI / Sales / DAX
    if (
      text.includes('power bi') || 
      text.includes('dax') || 
      text.includes('sales') || 
      text.includes('مبيعات') || 
      text.includes('داشبورد') || 
      text.includes('dashboard') ||
      text.includes('star')
    ) {
      return {
        speech: lang === 'ar'
          ? "بنيت لوحة مؤشرات المبيعات بـ Power BI بمخطط النجمة (Star-Schema) ومقاييس DAX لحساب صافي الإيرادات وهامش الربح ومتوسط الطلب."
          : "I developed the Sales Analytics Dashboard in Power BI using Star-Schema modeling and advanced DAX measures for Revenue, Margins, and AOV.",
        highlight: "portfolio",
        pose: "thumbs_up",
        lang: lang
      };
    }

    // 8. Contact / WhatsApp / LinkedIn / Hire
    if (
      text.includes('whatsapp') || 
      text.includes('واتساب') || 
      text.includes('تليفون') || 
      text.includes('موبايل') || 
      text.includes('phone')
    ) {
      return {
        speech: lang === 'ar'
          ? "يمكنك مراسلتي فورياً عبر واتساب على الرقم: 01112611898 (+201112611898) أو الضغط على أيقونة الواتساب في الشريط الجانبي!"
          : "You can message me instantly on WhatsApp at +201112611898 or click the WhatsApp icon on the left dock!",
        highlight: "whatsapp",
        pose: "thumbs_up",
        lang: lang
      };
    }

    if (
      text.includes('link') || 
      text.includes('لينكد') || 
      text.includes('تواصل') || 
      text.includes('اتصال') || 
      text.includes('email') || 
      text.includes('contact') || 
      text.includes('hire') || 
      text.includes('job')
    ) {
      return {
        speech: lang === 'ar'
          ? "يسعدني جداً التواصل معك لمناقشة فرص العمل في تحليل البيانات! اضغط على أيقونة LinkedIn على اليسار أو راسلني عبر واتساب: +201112611898."
          : "I would love to connect and discuss Data Analyst opportunities! Click the LinkedIn icon on the left or reach out directly on WhatsApp (+201112611898).",
        highlight: "linkedin",
        pose: "thumbs_up",
        lang: lang
      };
    }

    // 9. Degree / Program / Track / Law
    if (
      text.includes('program') || 
      text.includes('track') || 
      text.includes('sd') || 
      text.includes('حقوق') || 
      text.includes('law') || 
      text.includes('دراسة') || 
      text.includes('تعليم') ||
      text.includes('digilians')
    ) {
      return {
        speech: lang === 'ar'
          ? "خريج برنامج SD (Specialized Diploma) مسار Applied AI & Data Analytics بمبادرة DigiLians، وحاصل على ليسانس الحقوق من جامعة القاهرة مما يعزز دقتين التحليلية والامتثال."
          : "Graduate of the SD Program, Applied AI & Data Analytics Track from DigiLians, with an LL.B. Law degree providing rigorous analytical and compliance logic.",
        highlight: "cv",
        pose: "wave",
        lang: lang
      };
    }

    // 10. ERP & Experience
    if (
      text.includes('erp') || 
      text.includes('خبرة') || 
      text.includes('experience') || 
      text.includes('dewan') || 
      text.includes('itechpro')
    ) {
      return {
        speech: lang === 'ar'
          ? "عملت كأخصائي دعم فني لنظم ERP في شركة Dewan Soft مدققاً للفواتير الإلكترونية على منظومة الضرائب، وأعمل كمهندس AI متدرب في ITechPro-eg للأتمتة بـ n8n."
          : "I worked as an ERP Support Specialist at DewanSoft auditing e-invoices with the tax portal, and currently intern at ITechPro-eg building AI automation.",
        highlight: "cv",
        pose: "point",
        lang: lang
      };
    }

    // 11. AI Lead Automation (n8n + Groq)
    if (
      text.includes('n8n') || 
      text.includes('lead') || 
      text.includes('أتمتة') || 
      text.includes('automation') || 
      text.includes('عملاء')
    ) {
      return {
        speech: lang === 'ar'
          ? "طورت وكيلاً ذكياً للأتمتة بـ n8n و Groq لفرز العملاء المحتملين عبر تليجرام وجيميل، مقلصاً زمن الرد من ساعات إلى أقل من 3 ثوانٍ مع التسجيل في CRM!"
          : "I built an autonomous lead qualification agent using n8n and Groq LLMs across Telegram & Gmail, slashing response time from hours to <3 seconds into PostgreSQL CRM.",
        highlight: "portfolio",
        pose: "talk",
        lang: lang
      };
    }

    // 12. Global Survey Analytics (630+ Data Professionals)
    if (
      text.includes('survey') || 
      text.includes('استبيان') || 
      text.includes('رواتب') || 
      text.includes('salaries') || 
      text.includes('630')
    ) {
      return {
        speech: lang === 'ar'
          ? "حللت بيانات استبيان عالمي لأكثر من 630 متخصص بيانات، موضحاً توزيع الرواتب، وتفضيلات الأدوات بين Power BI وبايثون، ومؤشرات الرضا الوظيفي."
          : "I analyzed a global survey of 630+ data professionals, visualizing salary benchmarks, tool adoption (Power BI vs Python), and work-life satisfaction in Power BI.",
        highlight: "portfolio",
        pose: "talk",
        lang: lang
      };
    }

    // 13. RxHand-AI / Prescription OCR
    if (
      text.includes('rxhand') || 
      text.includes('روشتة') || 
      text.includes('prescription') || 
      text.includes('ocr') || 
      text.includes('طبي')
    ) {
      return {
        speech: lang === 'ar'
          ? "مشروع RxHand-AI يعتمد على نماذج TrOCR لقراءة خط اليد في الروشتات الطبية وتحويلها لبيانات مهيكلة بدقة لمنع الأخطاء الدوائية في الصيدليات."
          : "RxHand-AI leverages TrOCR deep learning to digitize handwritten medical prescriptions into structured data, preventing pharmacy dispensing errors.",
        highlight: "portfolio",
        pose: "talk",
        lang: lang
      };
    }

    // Default Greeting / Prompt Response
    return {
      speech: lang === 'ar'
        ? "أهلاً ومرحباً بك! أنا مساعد مصطفى الذكي. 🌟 هل تبحث عن محلل البيانات القادم لفريقك؟ يمكنك بسهولة تحميل السيرة الذاتية (CV)، أو استكشاف عروض مشاريعه المتخصصة، أو سؤالي عن أي شيء يخص خبراته في تحليل البيانات والذكاء الاصطناعي التطبيقي لترى كيف يمكنه إضافة قيمة حقيقية لأعمالك! وأخبرني إذا كنت ترغب في التواصل معه مباشرة."
        : "Hello and welcome! I’m Mostafa’s Assistant. 🌟 Looking for the next Data Analyst for your team? You can easily download CV, explore his specialized project demos, or ask me anything about his expertise in Data Analysis & Applied AI to see how can you add value to your business! Let me know if you’d like to get in touch with me directly.",
      highlight: "cv",
      pose: "wave",
      lang: lang
    };
  }
}

class GeminiChatService {
  static async ask(userPrompt, defaultLang = 'en') {
    const prompt = (userPrompt || '').trim();
    if (!prompt) {
      return SmartFallbackEngine.resolve('', defaultLang);
    }

    const detectedLang = SmartFallbackEngine.detectLanguage(prompt) || defaultLang || 'en';

    // 1. Try Cloudflare Pages Edge Function (/api/chat) first
    try {
      const edgeResp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt, lang: detectedLang })
      });

      if (edgeResp.ok) {
        const parsed = await edgeResp.json();
        if (parsed && parsed.speech) {
          return {
            speech: parsed.speech,
            highlight: parsed.highlight || "cv",
            pose: parsed.pose || "point",
            lang: SmartFallbackEngine.detectLanguage(parsed.speech) || detectedLang
          };
        }
      }
    } catch (edgeErr) {
      // Not hosted on Cloudflare Pages or /api/chat not running (e.g. static local file)
      console.debug("Edge API not active, checking direct config or fallback:", edgeErr);
    }

    const apiKey = (typeof CONFIG !== 'undefined' && CONFIG.GEMINI_API_KEY) || window.localStorage.getItem('MOSTAFA_GEMINI_API_KEY') || "";

    // 2. If no direct API key, use the local Smart Fallback immediately
    if (!apiKey || apiKey === "YOUR_GOOGLE_AI_STUDIO_API_KEY") {
      await new Promise(r => setTimeout(r, 120)); // Realistic micro-delay
      return SmartFallbackEngine.resolve(prompt, defaultLang);
    }

    // 3. Direct Google AI Studio REST API Call
    const model = (typeof CONFIG !== 'undefined' && CONFIG.GEMINI_MODEL) || 'gemini-3.5-flash-lite';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    const contextPrompt = `Context from Mostafa's Knowledge Base:\n${JSON.stringify(KNOWLEDGE_BASE.candidate)}\nUser Question: ${prompt}`;

    const requestBody = {
      contents: [{
        role: "user",
        parts: [{ text: contextPrompt }]
      }],
      systemInstruction: {
        parts: [{ text: (typeof CONFIG !== 'undefined' && CONFIG.SYSTEM_INSTRUCTION) || "You are Mostafa Eltaweel's AI Avatar." }]
      },
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.3,
        maxOutputTokens: 250
      }
    };

    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      if (!resp.ok) {
        return SmartFallbackEngine.resolve(prompt, defaultLang);
      }

      const data = await resp.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) return SmartFallbackEngine.resolve(prompt, defaultLang);

      const parsed = JSON.parse(rawText);
      return {
        speech: parsed.speech || SmartFallbackEngine.resolve(prompt, defaultLang).speech,
        highlight: parsed.highlight || "cv",
        pose: parsed.pose || "point",
        lang: SmartFallbackEngine.detectLanguage(parsed.speech) || detectedLang
      };
    } catch (e) {
      console.warn("Falling back to local smart engine:", e);
      return SmartFallbackEngine.resolve(prompt, defaultLang);
    }
  }
}
