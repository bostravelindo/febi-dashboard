# 📊 FEBI UINSI Dashboard - Sistem Manajemen Skripsi

Dashboard manajemen skripsi untuk FEBI UINSI Samarinda dengan 3 program studi:
- Ekonomi Syariah
- Perbankan Syariah  
- Manajemen Bisnis Syariah

## 🚀 Live Demo

**URL:** `https://[username].github.io/febi-dashboard/`

## ✨ Fitur

### Admin
- ✅ Manajemen Data Mahasiswa
- ✅ Manajemen Data Dosen
- ✅ Approval Proposal Skripsi
- ✅ Monitoring Bimbingan
- ✅ Statistik & Analytics
- ✅ Repository Skripsi

### Mahasiswa
- ✅ Submit Proposal Skripsi
- ✅ Tracking Bimbingan (Bab 1-5)
- ✅ Upload Skripsi ke Repository
- ✅ Search Repository

### Dosen
- ✅ Lihat Mahasiswa Bimbingan
- ✅ Update Progress Bimbingan
- ✅ Approval Proposal

## 📁 Struktur Folder

```
febi-dashboard/
├── index.html              # Dashboard utama
├── css/
│   └── style.css          # Styling
├── js/
│   ├── app.js             # Main application logic
│   ├── storage.js         # LocalStorage management
│   └── config.js          # Configuration
├── data/
│   └── sample.json        # Sample data
├── assets/
│   └── logo.png           # Logo UINSI
└── README.md              # Dokumentasi
```

## 🔧 Setup & Deployment

### Option 1: Deploy ke GitHub Pages (Recommended)

1. **Fork/Clone Repository**
   ```bash
   git clone https://github.com/[username]/febi-dashboard.git
   cd febi-dashboard
   ```

2. **Edit Configuration**
   - Buka `js/config.js`
   - Sesuaikan setting sesuai kebutuhan

3. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

4. **Enable GitHub Pages**
   - Buka Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`
   - Save

5. **Akses Dashboard**
   - URL: `https://[username].github.io/febi-dashboard/`

### Option 2: Deploy Lokal

1. **Download Repository**
   - Download ZIP atau clone

2. **Buka dengan Browser**
   - Double-click `index.html`
   - Atau gunakan local server:
     ```bash
     python -m http.server 8000
     # Akses: http://localhost:8000
     ```

## 💾 Data Storage

Dashboard menggunakan **hybrid storage**:

1. **LocalStorage** (Primary)
   - Data tersimpan di browser
   - Akses cepat
   - Offline-capable

2. **Google Sheets** (Optional Sync)
   - Untuk backup/export
   - Multi-device sync
   - Lihat `SETUP_GOOGLE_SHEETS.md` untuk konfigurasi

## 🔐 Default Login

**Admin:**
- Username: `ADMIN001`
- Password: `admin123`

**Mahasiswa:** (buat sendiri via register)
**Dosen:** (buat sendiri via register)

## 🎨 Customization

### Logo
Ganti file `assets/logo.png` dengan logo institusi Anda.

### Warna
Edit `css/style.css` - variabel CSS:
```css
:root {
  --primary-color: #1e5631;
  --secondary-color: #2d8659;
  --accent-color: #3ba876;
}
```

### Program Studi
Edit `js/config.js`:
```javascript
PROGRAMS = [
  'Ekonomi Syariah',
  'Perbankan Syariah',
  'Manajemen Bisnis Syariah',
  // Tambah program studi baru
];
```

## 📱 Embed di Website

Untuk embed dashboard di website:

```html
<iframe 
  src="https://[username].github.io/febi-dashboard/" 
  width="100%" 
  height="800px" 
  frameborder="0">
</iframe>
```

## 🔄 Update Data

### Via Interface
- Login sebagai Admin
- Kelola data melalui UI

### Via Export/Import
- Admin → Settings → Export Data (JSON)
- Edit JSON file
- Admin → Settings → Import Data

### Via Google Sheets (Optional)
- Setup sync ke Google Sheets
- Edit di Google Sheets
- Auto-sync ke dashboard

## 🐛 Troubleshooting

### Data Hilang Setelah Refresh
- Check LocalStorage di browser (F12 → Application)
- Pastikan browser tidak dalam Private/Incognito mode
- Backup data reguler via Export

### Dashboard Tidak Muncul di GitHub Pages
- Check Settings → Pages → Source sudah benar
- Tunggu 2-3 menit untuk deployment
- Clear browser cache

### Embed Tidak Berfungsi
- Check CORS settings
- Pastikan iframe allowed di hosting
- Test dengan `X-Frame-Options: ALLOWALL`

## 📝 Changelog

### Version 1.0.0 (2026-01-30)
- ✅ Initial release
- ✅ Full CRUD operations
- ✅ LocalStorage management
- ✅ Responsive design
- ✅ Export/Import data
- ✅ Statistics dashboard

## 🤝 Contributing

Contributions welcome! Please:
1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - Free to use and modify

## 👥 Credits

- **Developer:** FEBI UINSI Development Team
- **Design:** Bootstrap 5 + Custom CSS
- **Icons:** Font Awesome
- **Charts:** Chart.js

## 📞 Support

Untuk bantuan:
- Email: admin@febi.uinsi.ac.id
- GitHub Issues: [Report Bug](https://github.com/[username]/febi-dashboard/issues)

---

**Made with ❤️ for FEBI UINSI Samarinda**
