/* ===========================
   I18N — Internationalization
   Supports: id, en, ja
   =========================== */
const I18N = (function () {
    const TRANSLATIONS = {
        id: {
            // NAV
            "nav.home": "Home",
            "nav.courses": "Courses",
            "nav.now": "/now",
            "nav.uses": "/uses",
            "nav.blog": "Blog",
            "nav.support": "Support",
            "nav.dark": "Mode Gelap",
            "nav.light": "Mode Terang",

            // HERO
            "hero.download_cv": "Unduh CV",

            // ABOUT
            "about.title": "> ABOUT_ME.txt",
            "about.desc": "Haloo! Saya Damar Rifaldi Mutakin, mahasiswa Teknik Informatika di <a href=\"https://www.itera.ac.id/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"highlight text-decoration-underline\">Institut Teknologi Sumatera (ITERA)</a>. Saya passionate dalam membangun website dan game, serta terus mengembangkan skills di bidang software development. Terbuka untuk kolaborasi dan peluang belajar baru!",

            // SKILLS
            "skills.title": "> SKILL_TREE.dat",

            // PROJECTS
            "projects.title": "> PROJECTS_DIR.exe",
            "projects.filter_all": "ALL_FILES.sh",
            "projects.filter_web": "WEB_APPS.exe",
            "projects.filter_game": "GAMES.bin",
            "projects.search_placeholder": "_",
            "projects.not_found": "FILE_NOT_FOUND: Tidak ada hasil untuk",
            "projects.error": "ERROR: Gagal memuat data proyek.",
            "projects.retry": "COBA LAGI",
            "projects.total": "PROYEK",
            "projects.wip": "WIP",
            "projects.live": "LIVE",
            "projects.code": "KODE",
            "projects.demo": "DEMO",
            "projects.prev": "[< PREV]",
            "projects.next": "[NEXT >]",
            "projects.page": "HALAMAN",

            // OVERLAY
            "overlay.status": "STATUS",
            "overlay.category": "KATEGORI",
            "overlay.close": "[X] TUTUP",
            "overlay.view_code": "LIHAT KODE",
            "overlay.live_demo": "DEMO LANGSUNG",
            "overlay.no_repo": "BELUM ADA REPO",
            "overlay.no_demo": "BELUM ADA DEMO",
            "overlay.active": "[AKTIF]",

            // CONTACT
            "contact.title": "> CONNECT_WITH_ME",

            // FOOTER
            "footer.crafted": "Dibuat oleh TwentyEgg. 2026.",
            "footer.visits": "KUNJUNGAN_ANDA:",

            // TYPEWRITER
            "typewriter.0": "Hallo selamat datang di website profil saya",
            "typewriter.1": "Membangun website dan game...",
            "typewriter.2": "Terus meningkatkan skill coding.",
            "typewriter.3": "Ayo buat sesuatu yang keren!",

            // SUPPORT PAGE
            "support.bug_title": "> PUSAT_DUKUNGAN.exe",
            "support.name_label": "> NAMA_LENGKAP.str",
            "support.name_placeholder": "Masukkan nama...",
            "support.email_label": "> EMAIL_AKTIF.str",
            "support.email_placeholder": "alamat@email.com",
            "support.msg_label": "> PESAN_LOG.txt",
            "support.msg_placeholder": "Tulis laporan atau pesan di sini...",
            "support.submit": "SUBMIT_LOG",
            "support.sending": "MENGIRIM_LOG...",
            "support.success": "> SUKSES: Terima kasih atas laporan Anda!",
            "support.error_fields": "> ERROR: Semua bidang wajib diisi!",
            "support.error_email": "> ERROR: Format email tidak valid!",
            "support.error_send": "> ERROR: Terjadi kesalahan saat mengirim pesan.",
            "support.error_connect": "> ERROR: Gagal terhubung ke server.",
            "support.donate_title": "> SAWERAN.exe",
            "support.donate_desc": "Makasih Jajanannya Semoga Berkah dan Bikin Saya Jadi Semangat",

            // NOW PAGE
            "now.status": "STATUS_SAAT_INI",
            "now.learning": "SEDANG_BELAJAR",
            "now.building": "SEDANG_MEMBANGUN",
            "now.listening": "SEDANG_MENDENGARKAN",
            "now.updated": "Terakhir diperbarui: April 2026",

            // TERMINAL
            "terminal.welcome1": 'TWENTYEGG OS v1.0 — Ketik "help" untuk perintah.',
            "terminal.welcome2": 'Tekan ESC atau ketik "exit" untuk menutup.',
            "terminal.unknown": "tidak dikenali sebagai perintah.",
            "terminal.hint": 'Ketik "help" untuk perintah yang tersedia.',

            // 404
            "404.title": "ERROR_404: FILE_NOT_FOUND",
            "404.return": "[KEMBALI_HOME.exe]",

            // COURSES
            "courses.title": "> KURSUS_AKTIF.exe",
            "courses.desc": "Berikut adalah beberapa rekomendasi platform kursus dan pembelajaran online (gratis & berbayar) untuk meningkatkan skill programming Anda:",
            "courses.recommended": "PLATFORM REKOMENDASI",
            "courses.free": "BELAJAR GRATIS (FREE)",
        },

        en: {
            // NAV
            "nav.home": "Home",
            "nav.courses": "Courses",
            "nav.now": "/now",
            "nav.uses": "/uses",
            "nav.blog": "Blog",
            "nav.support": "Support",
            "nav.dark": "Dark Mode",
            "nav.light": "Light Mode",

            // HERO
            "hero.download_cv": "Download CV",

            // ABOUT
            "about.title": "> ABOUT_ME.txt",
            "about.desc": "Hello! I'm Damar Rifaldi Mutakin, an Informatics Engineering student at <a href=\"https://www.itera.ac.id/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"highlight text-decoration-underline\">Institut Teknologi Sumatera (ITERA)</a>. I'm passionate about building websites and games, constantly leveling up my software development skills. Open to collaborations and new learning opportunities!",

            // SKILLS
            "skills.title": "> SKILL_TREE.dat",

            // PROJECTS
            "projects.title": "> PROJECTS_DIR.exe",
            "projects.filter_all": "ALL_FILES.sh",
            "projects.filter_web": "WEB_APPS.exe",
            "projects.filter_game": "GAMES.bin",
            "projects.search_placeholder": "_",
            "projects.not_found": "FILE_NOT_FOUND: No results for",
            "projects.error": "ERROR: Failed to load project data.",
            "projects.retry": "RETRY",
            "projects.total": "PROJECTS",
            "projects.wip": "WIP",
            "projects.live": "LIVE",
            "projects.code": "CODE",
            "projects.demo": "DEMO",
            "projects.prev": "[< PREV]",
            "projects.next": "[NEXT >]",
            "projects.page": "PAGE",

            // OVERLAY
            "overlay.status": "STATUS",
            "overlay.category": "CATEGORY",
            "overlay.close": "[X] CLOSE",
            "overlay.view_code": "VIEW CODE",
            "overlay.live_demo": "LIVE DEMO",
            "overlay.no_repo": "NO REPO YET",
            "overlay.no_demo": "NO DEMO YET",
            "overlay.active": "[ACTIVE]",

            // CONTACT
            "contact.title": "> CONNECT_WITH_ME",

            // FOOTER
            "footer.crafted": "Crafted by TwentyEgg. 2026.",
            "footer.visits": "YOUR_VISITS:",

            // TYPEWRITER
            "typewriter.0": "Hello welcome to my profile website",
            "typewriter.1": "Building websites and games...",
            "typewriter.2": "Leveling up my coding skills.",
            "typewriter.3": "Let's create something awesome!",

            // SUPPORT PAGE
            "support.bug_title": "> SUPPORT_CENTER.exe",
            "support.name_label": "> FULL_NAME.str",
            "support.name_placeholder": "Enter your name...",
            "support.email_label": "> ACTIVE_EMAIL.str",
            "support.email_placeholder": "address@email.com",
            "support.msg_label": "> MESSAGE_LOG.txt",
            "support.msg_placeholder": "Write your report or message here...",
            "support.submit": "SUBMIT_LOG",
            "support.sending": "SENDING_LOG...",
            "support.success": "> SUCCESS: Thank you for your report!",
            "support.error_fields": "> ERROR: All fields are required!",
            "support.error_email": "> ERROR: Invalid email format!",
            "support.error_send": "> ERROR: An error occurred while sending.",
            "support.error_connect": "> ERROR: Failed to connect to server.",
            "support.donate_title": "> DONATE.exe",
            "support.donate_desc": "Thanks for the support! It keeps me motivated to keep building.",

            // NOW PAGE
            "now.status": "CURRENT_STATUS",
            "now.learning": "LEARNING_NOW",
            "now.building": "BUILDING_NOW",
            "now.listening": "LISTENING_TO",
            "now.updated": "Last updated: April 2026",

            // TERMINAL
            "terminal.welcome1": 'TWENTYEGG OS v1.0 — Type "help" for commands.',
            "terminal.welcome2": 'Press ESC or type "exit" to close.',
            "terminal.unknown": "is not recognized as a command.",
            "terminal.hint": 'Type "help" for available commands.',

            // 404
            "404.title": "ERROR_404: FILE_NOT_FOUND",
            "404.return": "[RETURN_HOME.exe]",

            // COURSES
            "courses.title": "> ACTIVE_COURSES.exe",
            "courses.desc": "Here are some recommended online learning platforms (free & paid) to level up your programming skills:",
            "courses.recommended": "RECOMMENDED PLATFORMS",
            "courses.free": "FREE LEARNING RESOURCES",
        },

        ja: {
            // NAV
            "nav.home": "ホーム",
            "nav.courses": "コース",
            "nav.now": "/今",
            "nav.uses": "/使用機器",
            "nav.blog": "ブログ",
            "nav.support": "サポート",
            "nav.dark": "ダークモード",
            "nav.light": "ライトモード",

            // HERO
            "hero.download_cv": "CVをダウンロード",

            // ABOUT
            "about.title": "> ABOUT_ME.txt",
            "about.desc": "こんにちは！私はダマル・リファルディ・ムタキンです。<a href=\"https://www.itera.ac.id/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"highlight text-decoration-underline\">スマトラ工科大学（ITERA）</a>の情報工学科の学生です。ウェブサイトやゲームを作ることに情熱を持ち、ソフトウェア開発のスキルを日々磨いています。コラボレーションや新しい学習機会を歓迎します！",

            // SKILLS
            "skills.title": "> スキル_ツリー.dat",

            // PROJECTS
            "projects.title": "> プロジェクト_ディレクトリ.exe",
            "projects.filter_all": "全ファイル.sh",
            "projects.filter_web": "ウェブアプリ.exe",
            "projects.filter_game": "ゲーム.bin",
            "projects.search_placeholder": "_",
            "projects.not_found": "ファイルが見つかりません：",
            "projects.error": "エラー：プロジェクトデータの読み込みに失敗しました。",
            "projects.retry": "再試行",
            "projects.total": "プロジェクト",
            "projects.wip": "制作中",
            "projects.live": "公開中",
            "projects.code": "コード",
            "projects.demo": "デモ",
            "projects.prev": "[< 前へ]",
            "projects.next": "[次へ >]",
            "projects.page": "ページ",

            // OVERLAY
            "overlay.status": "ステータス",
            "overlay.category": "カテゴリ",
            "overlay.close": "[X] 閉じる",
            "overlay.view_code": "コードを見る",
            "overlay.live_demo": "ライブデモ",
            "overlay.no_repo": "リポジトリなし",
            "overlay.no_demo": "デモなし",
            "overlay.active": "[稼働中]",

            // CONTACT
            "contact.title": "> つながりましょう",

            // FOOTER
            "footer.crafted": "TwentyEggが制作。2026年。",
            "footer.visits": "あなたの訪問回数:",

            // TYPEWRITER
            "typewriter.0": "こんにちは、プロフィールサイトへようこそ",
            "typewriter.1": "ウェブサイトとゲームを制作中...",
            "typewriter.2": "コーディングスキルをレベルアップ中。",
            "typewriter.3": "一緒に素晴らしいものを作りましょう！",

            // SUPPORT PAGE
            "support.bug_title": "> サポートセンター.exe",
            "support.name_label": "> 氏名.str",
            "support.name_placeholder": "名前を入力...",
            "support.email_label": "> メールアドレス.str",
            "support.email_placeholder": "address@email.com",
            "support.msg_label": "> メッセージ.txt",
            "support.msg_placeholder": "報告やメッセージをここに書いてください...",
            "support.submit": "送信",
            "support.sending": "送信中...",
            "support.success": "> 成功：ご報告ありがとうございます！",
            "support.error_fields": "> エラー：すべての項目を入力してください！",
            "support.error_email": "> エラー：メールアドレスの形式が正しくありません！",
            "support.error_send": "> エラー：送信中にエラーが発生しました。",
            "support.error_connect": "> エラー：サーバーへの接続に失敗しました。",
            "support.donate_title": "> 寄付.exe",
            "support.donate_desc": "応援ありがとうございます！モチベーションが上がります！",

            // NOW PAGE
            "now.status": "現在のステータス",
            "now.learning": "学習中",
            "now.building": "制作中",
            "now.listening": "聴いているもの",
            "now.updated": "最終更新：2026年4月",

            // TERMINAL
            "terminal.welcome1": 'TWENTYEGG OS v1.0 — "help"と入力してコマンドを表示。',
            "terminal.welcome2": 'ESCキーまたは"exit"と入力して閉じる。',
            "terminal.unknown": "は認識されたコマンドではありません。",
            "terminal.hint": '"help"と入力して利用可能なコマンドを確認。',

            // 404
            "404.title": "エラー_404: ファイルが見つかりません",
            "404.return": "[ホームに戻る.exe]",

            // COURSES
            "courses.title": "> アクティブコース.exe",
            "courses.desc": "プログラミングスキルを向上させるためのおすすめオンライン学習プラットフォーム（無料・有料）：",
            "courses.recommended": "おすすめプラットフォーム",
            "courses.free": "無料学習リソース",
        }
    };

    const SUPPORTED_LANGS = ['id', 'en', 'ja'];
    let currentLang = 'id';

    function get(key) {
        return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['en']?.[key] || key;
    }

    function setLang(lang) {
        if (!SUPPORTED_LANGS.includes(lang)) return;
        currentLang = lang;
        try { localStorage.setItem('lang', lang); } catch(e) {}
        document.documentElement.setAttribute('lang', lang === 'ja' ? 'ja' : lang === 'en' ? 'en' : 'id');
        document.dispatchEvent(new CustomEvent('langChanged', { detail: lang }));
        applyTranslations();
    }

    function getLang() { return currentLang; }

    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const attr = el.getAttribute('data-i18n-attr');
            const val = get(key);
            if (attr) {
                el.setAttribute(attr, val);
            } else {
                el.innerHTML = val;
            }
        });
    }

    function init() {
        let saved = null;
        try { saved = localStorage.getItem('lang'); } catch(e) {}
        const urlLang = new URLSearchParams(window.location.search).get('lang');
        currentLang = urlLang || saved || 'id';
        if (!SUPPORTED_LANGS.includes(currentLang)) currentLang = 'id';
        document.documentElement.setAttribute('lang', currentLang === 'ja' ? 'ja' : currentLang);
    }

    return { get, setLang, getLang, init, applyTranslations, SUPPORTED_LANGS };
})();
