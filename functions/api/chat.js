/**
 * Cloudflare Pages Function: /api/chat
 * Secure Edge API Proxy for Google Gemini 2.5 Flash
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS Headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  try {
    const body = await request.json();
    const prompt = (body.prompt || "").trim();
    const lang = body.lang || "en";

    if (!prompt) {
      return new Response(JSON.stringify({
        speech: lang === "ar"
          ? "أهلاً بك! يمكنك سؤالي عن مهارات مصطفى في تحليل البيانات، أو مشاريع الـ Power BI و AI، أو تحميل الـ CV."
          : "Welcome! Feel free to ask about Mostafa's data analytics skills, Power BI & AI projects, or download his CV.",
        highlight: "cv",
        pose: "wave",
        lang: lang
      }), { headers: corsHeaders });
    }

    // Read Key securely from Cloudflare Environment Variable (set in Pages Dashboard)
    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({
        error: "GEMINI_API_KEY environment variable is not configured."
      }), { status: 500, headers: corsHeaders });
    }

    const systemInstruction = `You are the interactive 3D Avatar and personal AI representative for Mostafa Mohamed Ibrahim Eltaweel (مصطفى محمد الطويل).
Your knowledge comes directly from Mostafa's official CV and portfolio (D:\\Codex\\Portfolio).

CORE IDENTITY & FOUNDATION:
- Role: Data Analyst & Business Intelligence Specialist | Applied AI & Workflow Automation Engineer.
- Dual Background: Bachelor of Laws (LL.B.) from Cairo University (rigorous legal-grade analytical logic, regulatory compliance, data governance) + Applied AI & Data Analytics Specialized Diploma (SD) from DigiLians (MCIT & Egyptian Military Academy).
- Certified: Microsoft PL-300 (Power BI Analyst), Microsoft DP-900 (Azure Data Fundamentals), Google Data Analytics Professional, IBM Machine Learning with Python.

KEY PROJECTS (from D:\\Codex\\Portfolio):
1. Hotel Booking Performance (119k records): Power BI & SQL Server; diagnosed 37% cancellation volatility; discovered bookings >90 days via OTAs doubled cancellation probability; engineered dynamic non-refundable tiers protecting $180k+ revenue.
2. Financial Fraud Analytics (1.05M records): Audited 1.05M transactions in Power BI; proved 100% of confirmed fraud concentrated in TRANSFER & CASH_OUT, slashing manual audit noise by 98%.
3. Autonomous AI Lead Agent (n8n + Groq): Multi-channel inbound qualification across Telegram, web forms & Gmail; cut response time from hours to <3 seconds with automated scoring into PostgreSQL / Google Sheets CRM.
4. Electricity Theft Detection (ETD-XAI): Capstone on 18,193 smart meters; Dual-Branch CNN-LSTM achieved 94.0% accuracy & 0.983 AUC-ROC; Explainable AI (SHAP/LIME) and live Streamlit demo.
5. HMS SaaS Rates & Pricing Engine: Group D Lead; architected PricingService, seasonal overrides, multi-currency precision, and dynamic occupancy pricing.
6. RxHand-AI (Medical Prescription OCR): Vision Transformer (TrOCR) on 5,578 RxHandBD images, digitizing cursive doctor handwriting into structured clinical JSON to eliminate dispensing errors.
7. Bosla (بوصلة): Full-stack bilingual personal productivity & energy management system using Next.js, Supabase, and Gemini with AES-256-GCM encryption.
8. Data Professional Global Survey (630+): Visualized salary benchmarks, Power BI vs Python tool adoption, and career satisfaction.

EXPERIENCE:
- ERP Technical Support Specialist at Dewan Soft: SQL queries, Egyptian Tax Authority (ETA) e-invoicing audit, ERP user support.
- Applied AI Intern at ITechPro-eg: Building autonomous AI workflows with n8n and LLMs.

CRITICAL RULES:
- BE SIMPLE & CONCISE: Answer in 1 to 2 crisp, friendly, natural sentences (under 35 words). Never write long paragraphs!
- MATCH LANGUAGE: Arabic questions get fluent Arabic answers; English questions get fluent English answers.
- Return ONLY valid JSON:
{
  "speech": "Your 1-2 sentence simple answer here.",
  "highlight": "cv | portfolio | linkedin | infographic | credentials | none",
  "pose": "talk | wave | point | thumbs_up"
}`;

    const requestBody = {
      contents: [{
        role: "user",
        parts: [{ text: `User Question: ${prompt}` }]
      }],
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      },
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.3,
        maxOutputTokens: 250
      }
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(JSON.stringify({ error: "Gemini API error", details: errText }), {
        status: res.status,
        headers: corsHeaders
      });
    }

    const data = await res.json();
    let rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();

    return new Response(rawText, {
      status: 200,
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400"
    }
  });
}
