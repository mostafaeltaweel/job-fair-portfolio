# Mostafa Eltaweel — Interactive Avatar Portfolio, Streamlit AI & Executive CV

> **UI Headline:** `Mostafa Eltaweel _Applied AI & Data Analysis  Spicialize Deplome | DigiLians`  
> **Role Positioning:** Data Analyst & Business Intelligence Specialist | Applied AI Engineer  
> **Program:** SD (Specialized Diploma) | **Track:** Applied AI & Data Analytics (DigiLians - MCIT & Egyptian Military Academy)  
> **Core Credentials:**
> - 🏆 **Microsoft Certified: Power BI Data Analyst Associate (PL-300)** [ID: `b5d4c2c72a13d32`]
> - ☁️ **Microsoft Certified: Azure Data Fundamentals (DP-900)**
> - 🌐 **Google Data Analytics Professional Certificate** [ID: `XMKR1FA09WQD`]
> - 🤖 **IBM Machine Learning with Python Professional Certificate** [ID: `2UABLVCGZBDC`]
> **Academic Foundation:** Bachelor of Laws (LL.B.) — Faculty of Law, Cairo University (Analytical logic & compliance)  
> **Dual Deployment:**
> 1. Static Portfolio for **GitHub Pages** (Instant QR Code scanning for Job Fair recruiters).
> 2. Full-featured **Streamlit App (`app.py`)** with Google Gemini API integration for Streamlit Community Cloud.

---

## 🌟 Key Features

1. **Ultra-Minimalist 3-Zone Web Architecture (`index.html`):**
   - **Left Vertical Dock (Always Left):**
     - Calligraphy Emblem (`assets/logo-calligraphy-white.png`)
     - Direct CV Download (`assets/Mostafa_CV.pdf`)
     - Live ETD Streamlit Demo link (`https://theft-electric-detection-c.streamlit.app/`)
     - LinkedIn Profile (`https://www.linkedin.com/in/mostafa-eltaweel`)
     - Graduation Infographic Modal
     - Verified Credentials Hub (PL-300, DP-900, Google, IBM, DigiLians SD)
     - WhatsApp Direct Instant Chat (`https://wa.me/201022938076`)
     - Theme Toggle (`#000000` Dark / `#FFFFFF` Light) & Language Switcher (EN / عربي)
   - **Center Stage:**
     - Candidate Brand Pill: `Mostafa Eltaweel _Applied AI & Data Analysis  Spicialize Deplome | DigiLians`
     - Clean Floating Search Bar (*"Ask Mostafa..."*)
   - **Right Side / Mobile Anchored:**
     - Authentic transparent interactive character cutout standing directly over the dark scenic wallpaper with zero box/edges.
     - Ultra-compact speech bubble with direct `[Download CV (PDF)]` link.

2. **Full-Featured Streamlit App (`app.py`):**
   - Complete conversational AI assistant powered by Google AI Studio Gemini API (`gemini-2.5-flash`).
   - Built-in candidate knowledge base (PL-300, DP-900, Hotel 119k project, 1.05M Fraud detection, HMS pricing engine).
   - Direct CV download button in sidebar.
   - Interactive project metrics and verified credential links.
   - Deterministic Smart Fallback so the app never crashes even without an API key!

3. **Elite Executive 2-Page CV (`assets/Mostafa_CV.pdf`):**
   - Incorporates Microsoft Azure Data Fundamentals (DP-900) & Power BI (PL-300).
   - STAR-method quantified achievements (119k records analyzed, \$180k+ protected revenue, 1.05M fraud transactions, 98% noise reduction, 94% accuracy ETD model).
   - Cairo University LL.B. legal rigor, data governance, and commercial ERP technical support experience.

---

## 📁 Repository Structure

```
├── index.html                   # Web application (ready for GitHub Pages)
├── app.py                       # Streamlit application with Gemini API integration
├── requirements.txt             # Python dependencies (streamlit, google-generativeai, etc.)
├── .env.example                 # Template for API keys
├── .gitignore                   # Excludes .env, pycache, temporary files
├── css/
│   ├── style.css                # Pure #000000 / #FFFFFF themes, responsive dock & tooltips
│   └── avatar-motion.css        # Authentic avatar stances & compact speech bubble
├── js/
│   ├── config.js                # Web app config & Gemini settings
│   ├── knowledge-base.js        # Knowledge base chunks (PL-300, DP-900, Projects)
│   ├── gemini-chat.js           # Gemini API client & Smart Fallback engine
│   ├── avatar-engine.js         # Authentic poses & speech bubble manager
│   └── app.js                   # Main web app controller
└── assets/
    ├── poses/                   # Transparent cutouts (idle, greeting, speaking)
    ├── logo-calligraphy-white.png # Calligraphy emblem
    ├── Mostafa_CV.pdf           # Executive 2-page PDF resume
    └── images/                  # Official partner logos (Microsoft, Google, IBM, DigiLians)
```

---

## 🚀 How to Run

### Option A: Static Web Application (GitHub Pages)
Simply open `index.html` in any browser, or run with any static server:
```bash
npx serve .
```

### Option B: Streamlit Application (`app.py`)
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. (Optional) Add your Google AI Studio API key in `.env`:
   ```bash
   GEMINI_API_KEY=YOUR_KEY_HERE
   ```
3. Run the Streamlit app:
   ```bash
   streamlit run app.py
   ```

---

## 🌐 Pushing to GitHub & Enabling GitHub Pages

1. **Initialize Git and Commit:**
   ```bash
   git init
   git add .
   git commit -m "feat: executive portfolio, streamlit gemini app, and upgraded CV with DP-900"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages for the Web Portfolio:**
   - In your GitHub repo, go to **Settings** > **Pages**.
   - Under **Source**, select **Deploy from a branch** (`main` branch, root `/`).
   - Click **Save**. Your site will be live at `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPO_NAME>/`!

3. **Deploy the Streamlit App to cloudflare :**
   - Visit(https://2baea7d7.job-fair-portfolio.pages.dev/).
