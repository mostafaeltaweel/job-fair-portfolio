"""
=============================================================================
MOSTAFA ELTAWEEL — INTERACTIVE 3D AVATAR PORTFOLIO & CANDIDATE ENGINE (STREAMLIT)
Track: Applied AI & Data Analytics | Specialized Diploma (SD) | DigiLians
Identical to index.html UI
=============================================================================
"""

import os
import re
import base64
import streamlit as st
import streamlit.components.v1 as components
from dotenv import load_dotenv

load_dotenv()

st.set_page_config(
    page_title="Mostafa Eltaweel _Applied AI & Data Analysis  Spicialize Deplome | DigiLians",
    page_icon="assets/logo-calligraphy-white.png" if os.path.exists("assets/logo-calligraphy-white.png") else "🌟",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Streamlit UI overrides to ensure full-bleed immersion
st.markdown("""
<style>
    /* Completely hide Streamlit header, footer, menu, sidebar, and decorations */
    #MainMenu, header, footer, [data-testid="stSidebar"], [data-testid="stToolbar"], [data-testid="stHeader"], [data-testid="stDecoration"] {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    .stApp {
        background-color: #000000 !important;
        padding: 0 !important;
        margin: 0 !important;
        overflow: hidden !important;
    }
    .block-container, [data-testid="stVerticalBlock"] {
        padding: 0 !important;
        margin: 0 !important;
        max-width: 100vw !important;
        width: 100vw !important;
        height: 100vh !important;
    }
    iframe {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        border: none !important;
        margin: 0 !important;
        padding: 0 !important;
        z-index: 999999 !important;
    }
</style>
""", unsafe_allow_html=True)


def get_base64_uri(path):
    if not os.path.exists(path):
        return ""
    ext = os.path.splitext(path)[1].lower()
    mimes = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.webp': 'image/webp',
        '.pdf': 'application/pdf',
        '.svg': 'image/svg+xml'
    }
    mime = mimes.get(ext, 'application/octet-stream')
    with open(path, 'rb') as f:
        return f"data:{mime};base64," + base64.b64encode(f.read()).decode('utf-8')


@st.cache_data
def get_bundled_portfolio_html():
    base_dir = os.path.dirname(os.path.abspath(__file__))

    def read_rel(rel_path):
        full_path = os.path.join(base_dir, rel_path)
        with open(full_path, 'r', encoding='utf-8') as f:
            return f.read()

    html = read_rel('index.html')
    css_style = read_rel('css/style.css')
    css_avatar = read_rel('css/avatar-motion.css')
    js_kb = read_rel('js/knowledge-base.js')
    js_config = read_rel('js/config.js')
    js_chat = read_rel('js/gemini-chat.js')
    js_avatar = read_rel('js/avatar-engine.js')
    js_app = read_rel('js/app.js')

    # Get API key from st.secrets or os.getenv
    api_key = None
    try:
        if "GEMINI_API_KEY" in st.secrets:
            api_key = st.secrets["GEMINI_API_KEY"]
    except Exception:
        api_key = None
    if not api_key:
        api_key = os.getenv("GEMINI_API_KEY", "")

    if api_key:
        js_config = js_config.replace(
            'GEMINI_API_KEY: window.localStorage.getItem(\'MOSTAFA_GEMINI_API_KEY\') || ""',
            f'GEMINI_API_KEY: "{api_key}"'
        )

    # Assets to Base64
    logo_b64 = get_base64_uri(os.path.join(base_dir, 'assets/logo-calligraphy-white.png'))
    greeting_b64 = get_base64_uri(os.path.join(base_dir, 'assets/poses/avatar-greeting.png'))
    idle_b64 = get_base64_uri(os.path.join(base_dir, 'assets/poses/avatar-idle.png'))
    speaking_b64 = get_base64_uri(os.path.join(base_dir, 'assets/poses/avatar-speaking.png'))
    ms_logo_b64 = get_base64_uri(os.path.join(base_dir, 'assets/images/microsoft-logo.png'))
    google_logo_b64 = get_base64_uri(os.path.join(base_dir, 'assets/images/google-logo.png'))
    ibm_logo_b64 = get_base64_uri(os.path.join(base_dir, 'assets/images/ibm-logo.png'))
    digilians_logo_b64 = get_base64_uri(os.path.join(base_dir, 'assets/images/digilians-logo.png'))
    cv_b64 = get_base64_uri(os.path.join(base_dir, 'assets/Mostafa_CV.pdf'))
    infographic_b64 = get_base64_uri(os.path.join(base_dir, 'assets/Electricity_Theft_Detection_Infographic.pdf'))

    # Replace CSS links with inline <style>
    css_bundle = f"<style>\n{css_style}\n{css_avatar}\n</style>"
    html = re.sub(r'<link\s+rel="stylesheet"\s+href="css/style\.css">', '', html)
    html = re.sub(r'<link\s+rel="stylesheet"\s+href="css/avatar-motion\.css">', '', html)
    html = html.replace('</head>', f'{css_bundle}\n</head>')

    # Replace asset references in HTML
    html = html.replace('src="assets/logo-calligraphy-white.png"', f'src="{logo_b64}"')
    html = html.replace('href="assets/logo-calligraphy-white.png"', f'href="{logo_b64}"')
    html = html.replace('src="assets/poses/avatar-greeting.png"', f'src="{greeting_b64}"')
    html = html.replace('src="assets/images/microsoft-logo.png"', f'src="{ms_logo_b64}"')
    html = html.replace('src="assets/images/google-logo.png"', f'src="{google_logo_b64}"')
    html = html.replace('src="assets/images/ibm-logo.png"', f'src="{ibm_logo_b64}"')
    html = html.replace('src="assets/images/digilians-logo.png"', f'src="{digilians_logo_b64}"')
    html = html.replace('href="assets/Mostafa_CV.pdf"', f'href="{cv_b64}"')
    html = html.replace('src="assets/Electricity_Theft_Detection_Infographic.pdf"', f'src="{infographic_b64}"')

    # Replace poses in avatar-engine.js
    js_avatar = js_avatar.replace("'assets/poses/avatar-idle.png'", f"'{idle_b64}'")
    js_avatar = js_avatar.replace("'assets/poses/avatar-greeting.png'", f"'{greeting_b64}'")
    js_avatar = js_avatar.replace("'assets/poses/avatar-speaking.png'", f"'{speaking_b64}'")

    # In app.js / gemini-chat.js, replace any asset paths
    js_avatar = js_avatar.replace('assets/Mostafa_CV.pdf', cv_b64)
    js_app = js_app.replace('assets/Mostafa_CV.pdf', cv_b64)

    # Replace JS script tags with inline scripts
    js_bundle = f"<script>\n{js_kb}\n{js_config}\n{js_chat}\n{js_avatar}\n{js_app}\n</script>"
    html = re.sub(r'<script\s+src="js/knowledge-base\.js"></script>', '', html)
    html = re.sub(r'<script\s+src="js/config\.js"></script>', '', html)
    html = re.sub(r'<script\s+src="js/gemini-chat\.js"></script>', '', html)
    html = re.sub(r'<script\s+src="js/avatar-engine\.js"></script>', '', html)
    html = re.sub(r'<script\s+src="js/app\.js"></script>', '', html)
    html = html.replace('</body>', f'{js_bundle}\n</body>')

    return html

portfolio_html = get_bundled_portfolio_html()
components.html(portfolio_html, height=1200, scrolling=False)
