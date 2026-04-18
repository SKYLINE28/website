# 📁 Website Structure Documentation

## Overview

Struktur website TwentyEgg telah direfactor untuk meningkatkan **maintainability**, **scalability**, dan **organization** menggunakan prinsip **Antigravity Modularization**.

---

## 📂 Directory Structure

### Root Level
```
website_project/
├── index.html              # Landing page utama
├── 404.html                # Error page
├── README.md               # Project documentation
├── STRUCTURE.md            # File ini (struktur dokumentasi)
├── assets/                 # Aset statis (gambar, dokumen)
├── css/                    # Stylesheet
├── data/                   # Data files (JSON)
├── js/                     # JavaScript modules
└── pages/                  # Sub-pages HTML
```

---

## 📁 Folder Details

### `assets/`
**Tujuan**: Menyimpan semua aset statis website

```
assets/
├── docs/                   # Dokumen (CV, PDF, dll)
└── images/                 # Gambar dan ikon
    └── avatar.jpg          # Avatar profile
```

**Catatan**: Folder ini terpisah dari `js/` dan `css/` untuk menjaga organisasi yang jelas antara aset visual dan kode.

---

### `css/`
**Tujuan**: Menyimpan stylesheet website

```
css/
└── style.css               # Main stylesheet (Retro theme)
```

**Catatan**: Saat ini menggunakan single CSS file. Jika berkembang, dapat dipecah menjadi:
- `css/core/` - Base styles, variables, utilities
- `css/components/` - Component-specific styles
- `css/themes/` - Theme variations

---

### `data/`
**Tujuan**: Menyimpan data dalam format JSON untuk dynamic loading

```
data/
└── projects.json           # Project portfolio data
```

**Struktur `projects.json`**:
```json
[
    {
        "id": "project-id",
        "name": "PROJECT_NAME.exe",
        "desc": "Short description",
        "fullDesc": "Full description",
        "tags": ["Tag1", "Tag2"],
        "category": "web|game|tool",
        "codeUrl": "https://...",
        "demoUrl": "https://...",
        "wip": false
    }
]
```

**Keuntungan**:
- ✅ Mudah menambah/edit proyek tanpa mengubah kode
- ✅ Data terpisah dari logika rendering
- ✅ Dapat di-load secara dinamis dengan `fetch()`
- ✅ Scalable untuk integrasi database di masa depan

---

### `js/`
**Tujuan**: Menyimpan semua JavaScript modules dengan organisasi berbasis fungsi

#### Struktur Hierarki:
```
js/
├── core/                   # Core functionality
│   ├── main.js             # Entry point, initialization
│   ├── theme.js            # Theme toggle logic
│   └── script.js           # Legacy (dapat di-refactor)
├── components/             # UI Components
│   ├── nav.js              # Navigation menu
│   ├── projects.js         # Project explorer & data loading
│   ├── terminal.js         # Terminal-styled UI
│   ├── typewriter.js       # Typewriter animation
│   └── progress.js         # Progress bar
└── effects/                # Visual Effects
    ├── scroll.js           # Scroll effects
    ├── reveal.js           # Reveal on scroll
    ├── particles.js        # Particle effects
    ├── fireworks.js        # Fireworks animation
    ├── mousetrail.js       # Mouse trail effect
    ├── clipboard.js        # Copy to clipboard
    ├── konami.js           # Konami code easter egg
    └── counter.js          # Visitor counter
```

#### Penjelasan Kategori:

**`core/`** - Logika Inti
- Dijalankan pertama kali
- Menangani inisialisasi global
- Theme management
- Main entry point

**`components/`** - Komponen UI
- Komponen interaktif yang dapat digunakan ulang
- Menangani rendering dan event handling
- Termasuk data loading (projects.js)

**`effects/`** - Efek Visual
- Efek dekoratif dan animasi
- Tidak critical untuk fungsionalitas
- Dapat di-disable tanpa merusak UX

#### Loading Order (dalam HTML):
```html
<!-- 1. Core (harus pertama) -->
<script src="js/core/theme.js"></script>
<script src="js/core/main.js"></script>

<!-- 2. Components -->
<script src="js/components/nav.js"></script>
<script src="js/components/projects.js"></script>
<!-- ... -->

<!-- 3. Effects (dapat di-load terakhir) -->
<script src="js/effects/scroll.js"></script>
<!-- ... -->
```

---

### `pages/`
**Tujuan**: Menyimpan halaman HTML tambahan

```
pages/
├── courses.html            # Halaman kursus/pembelajaran
├── now.html                # Status /now page
├── support.html            # Halaman support & donation
└── system_menu.html        # System menu navigation
```

**Catatan**: Semua pages menggunakan relative path untuk script loading:
```html
<script src="../js/core/theme.js"></script>
```

---

## 🔄 Data Flow

### Project Loading Flow:
```
index.html
    ↓
<script src="js/components/projects.js"></script>
    ↓
ProjectExplorer.init()
    ↓
loadProjectsData()
    ↓
fetch('data/projects.json')
    ↓
PROJECTS_DATA = [...]
    ↓
renderProjects()
    ↓
DOM Updated
```

---

## 📝 Best Practices

### Menambah Proyek Baru:
1. Edit `data/projects.json`
2. Tambahkan object proyek baru
3. Tidak perlu mengubah kode JavaScript

### Menambah Efek Baru:
1. Buat file baru di `js/effects/`
2. Wrap dalam IIFE atau module pattern
3. Import di HTML setelah core scripts

### Menambah Komponen Baru:
1. Buat file baru di `js/components/`
2. Pastikan tidak ada dependency circular
3. Load setelah core scripts

---

## 🚀 Future Improvements

- [ ] Split `css/style.css` menjadi modular CSS files
- [ ] Implementasi module bundler (Webpack/Vite)
- [ ] Migrasi ke TypeScript untuk type safety
- [ ] Implementasi component framework (React/Vue)
- [ ] Database integration untuk dynamic content
- [ ] API backend untuk data management
- [ ] Build process & minification

---

## 📚 References

- **Modular JavaScript**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
- **JSON Format**: https://www.json.org/
- **Fetch API**: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- **Retro Design**: https://en.wikipedia.org/wiki/Retro_style

---

**Last Updated**: April 2026
**Maintained By**: TwentyEgg
