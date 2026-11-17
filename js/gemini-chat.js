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
          ? "يمكنك تحميل السيرة الذاتية الرسمية لمصطفى بصيغة PDF مباشرة من أيقونة الـ CV المضيئة في الشريط الأيسر."
          : "You can download Mostafa's official CV PDF directly from the highlighted CV icon on the left dock.",
        highlight: "cv",
        pose: "point",
        lang: lang
      };
    }

    // 1.1 Web Portfolio
    if (
      text.includes('portfolio') || 
      text.includes('بورتفوليو') || 
      text.includes('معرض') || 
      text.includes('سابقة أعمال') ||
      text.includes('موقعك') ||
      text.includes('موقع مصطفى')
    ) {
      return {
        speech: lang === 'ar'
          ? "يسعدني استعراض أعمالي ومشاريعي معكم! يمكنك تصفح معرض الأعمال والبورتفوليو المتكامل لمصطفى عبر أيقونة البورتفوليو المضيئة في الشريط الأيسر."
          : "I'd love to share my projects! You can explore Mostafa's full web portfolio and case studies via the highlighted Portfolio icon on the left dock.",
        highlight: "portfolio",
        pose: "point",
        lang: lang
      };
    }

    // 1.2 Live Project Demo (Streamlit ETD)
    if (
      text.includes('demo') || 
      text.includes('ديمو') || 
      text.includes('عرض حي') || 
      text.includes('تجربة') ||
      text.includes('streamlit') || 
      text.includes('ستريمليت')
    ) {
      return {
        speech: lang === 'ar'
          ? "يمكنك تجربة العرض الحي التفاعلي لنموذج كشف سرقة الكهرباء (ETD-XAI) واختبار الحالات مباشرة عبر أيقونة الديمو المضيئة في الشريط الأيسر."
          : "You can test the interactive live demo of the Electricity Theft Detection model directly via the highlighted Demo icon on the left dock.",
        highlight: "demo",
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
          ? "مصطفى حاصل على شهادة Google Data Analytics Professional عبر Coursera، والتي أتقن من خلالها SQL ولغة R واستخلاص الرؤى لاتخاذ القرارات التجارية."
          : "Mostafa earned the Google Data Analytics Professional Certificate via Coursera, mastering SQL, R programming, and data-driven business decision insights.",
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
          ? "مصطفى حاصل على شهادة Machine Learning with Python من شركة IBM، ويتقن بناء وتطبيق خوارزميات التعلم الآلي عبر مكتبة Scikit-Learn."
          : "Mostafa holds the IBM Machine Learning with Python certificate, proficient in regression, classification, and clustering pipelines using Scikit-Learn.",
        highlight: "credentials",
        pose: "thumbs_up",
        lang: lang
      };
    }

    if (
      text.includes('pl-300') || 
      text.includes('pl300') || 
      text.includes('microsoft') || 
      text.includes('مايكروسوفت') ||
      text.includes('dp-900') ||
      text.includes('dp900') ||
      text.includes('azure')
    ) {
      return {
        speech: lang === 'ar'
          ? "مصطفى حاصل على شهادتين معتمدتين دولياً من مايكروسوفت: PL-300 في تحليل البيانات بـ Power BI، و DP-900 في أساسيات بيانات السحابة Azure."
          : "Mostafa is dual-certified by Microsoft: PL-300 (Power BI Data Analyst Associate) and DP-900 (Azure Data Fundamentals).",
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
          ? "يحمل مصطفى 4 اعتمادات دولية موثقة: Microsoft PL-300، Microsoft Azure DP-900، Google Data Analytics، و IBM Machine Learning. اضغط على أيقونة الشهادات للتحقق الرسمي."
          : "Mostafa holds 4 verified credentials: Microsoft PL-300, Microsoft Azure DP-900, Google Data Analytics, and IBM Machine Learning. Click the credentials icon to verify.",
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
          ? "حلل مصطفى 119,390 حجزاً فندقياً في Power BI و SQL Server، وأثبت أن الحجوزات المبكرة لأكثر من 90 يوماً عبر وكالات السفر عبر الإنترنت تزيد احتمالية إلغائها بمعدل 2.1 ضعف."
          : "Mostafa analyzed 119,390 hotel bookings in Power BI & SQL Server, proving bookings made 90+ days ahead through OTAs were 2.1x more likely to be cancelled.",
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
          ? "دقق مصطفى أكثر من مليون معاملة مالية (1,048,575) في Power BI، وأثبت أن 100% من الاحتيال المؤكد تركز حصرياً في مدفوعات TRANSFER و CASH_OUT، مما قلص جهد التدقيق اليدوي بـ 98%."
          : "Mostafa audited 1,048,575 transactions in Power BI, proving 100% of confirmed fraud was concentrated in TRANSFER and CASH_OUT payments, cutting manual audit noise by 98%.",
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
          ? "في مشروع HMS SaaS، قاد مصطفى فريق Group D لهندسة محرك الأسعار وخدمة PricingService لحساب التسعير الديناميكي بحسب نسبة الإشغال وتعدد العملات."
          : "In the HMS project, Mostafa was the Group D Lead architecting the Rates & Pricing Engine: PricingService, seasonal overrides, and dynamic occupancy pricing.",
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
          ? "مشروع تخرج مصطفى ETD-XAI هو نظام ذكي حلل 18,193 عداداً ذكياً بنموذج Dual-Branch CNN-LSTM محققاً دقة 94.0% و 0.983 ROC-AUC مع تفسير النتائج بـ Explainable AI."
          : "Mostafa's capstone ETD-XAI analyzed 18,193 smart meters with Dual-Branch CNN-LSTM, reaching 94.0% accuracy and 0.983 ROC-AUC with Explainable AI and live demo.",
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
          ? "مصطفى معتمد رسمياً كـ Microsoft Power BI Data Analyst (PL-300). بنى لوحات تحكم متقدمة بمخطط النجمة (Star-Schema) ومقاييس DAX لحساب صافي الإيرادات وهامش الربح."
          : "Mostafa is a Microsoft Certified Power BI Data Analyst (PL-300). He built advanced Star-Schema dashboards with DAX measures for net revenue, profit margins, and AOV.",
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
          ? "يسعد مصطفى دائماً بالتواصل معكم! يمكنك مراسلته مباشرة بالضغط على أيقونة الواتساب المضيئة في الشريط الأيسر."
          : "Mostafa would love to connect! You can reach him directly by clicking the highlighted WhatsApp icon on the left dock.",
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
          ? "يسعد مصطفى بمناقشة الفرص الوظيفية وإجراء المقابلات! يمكنك التواصل معه مباشرة عبر أيقونة الواتساب أو زيارة حسابه على لينكد إن عبر الشريط الأيسر."
          : "Mostafa is eager to discuss career opportunities and interviews! You can connect with him directly via the WhatsApp or LinkedIn icons on the left dock.",
        highlight: "whatsapp",
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
      text.includes('digilians') ||
      text.includes('تجنيد') ||
      text.includes('military')
    ) {
      return {
        speech: lang === 'ar'
          ? "تخرج مصطفى من برنامج الدبلومة المتخصصة SD في Applied AI & Data Analytics بمبادرة DigiLians، ويحمل ليسانس الحقوق من جامعة القاهرة مما يعزز منطقه التحليلي وحوكمة البيانات، وقد أتم الخدمة العسكرية بالكامل."
          : "Mostafa completed the 11-month SD Diploma in Applied AI & Data Analytics from DigiLians, holds an LL.B. Law degree from Cairo University for governance rigor, and has completed his military service.",
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
      text.includes('itechpro') ||
      text.includes('قصة') ||
      text.includes('story') ||
      text.includes('xceed') ||
      text.includes('idh')
    ) {
      return {
        speech: lang === 'ar'
          ? "بدأ مصطفى مسيرته في خدمة عملاء Xceed ثم استقبال IDH ثم أخصائي دعم فني لنظم ERP بشركة Dewan Soft لحل 10-20 تذكرة يومياً، وتدقيق الفواتير على بوابة الضرائب. حالياً يعمل كمتدرب AI في ITechPro-eg."
          : "Mostafa started at Xceed, then IDH, and served as ERP Support Specialist at Dewan Soft solving 10-20 daily cases and auditing e-invoices. He currently interns at ITechPro-eg building AI workflows.",
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
          ? "طوّر مصطفى وكيلاً ذكياً للأتمتة بـ n8n و Groq LLM لفرز وتأهيل العملاء المحتملين عبر تليجرام وجيميل، مقلصاً زمن الرد من ساعات إلى أقل من 3 ثوانٍ مع التسجيل في CRM."
          : "Mostafa built an autonomous lead qualification agent using n8n and Groq LLMs across Telegram & Gmail, slashing response time from hours to <3 seconds into CRM.",
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
          ? "حلل مصطفى استبياناً عالمياً شمل أكثر من 630 متخصص بيانات في Power BI، مستعرضاً توزيع الرواتب، وتفضيلات الأدوات بين Power BI وبايثون، ومؤشرات الرضا المهني."
          : "Mostafa analyzed a global survey of 630+ data professionals in Power BI, visualizing salary benchmarks, tool preferences (Power BI vs Python), and job satisfaction.",
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
        ? "أهلاً بك، أنا المساعد الشخصي لمصطفى الطويل. ما هي الوظيفة أو الدور المطلوب لديكم؟ سأخبرك بدقة كيف تتطابق خبراته ومشاريعه مع متطلباتكم."
        : "Hi, I'm Mostafa's assistant. Which role are you hiring for? I'll tell you quickly how he fits.",
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
