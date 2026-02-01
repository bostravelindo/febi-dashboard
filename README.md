# 📊 FEBI UINSI Dashboard

Dashboard Manajemen Skripsi untuk FEBI UINSI Samarinda

## 🚀 Quick Deploy (5 Menit)

### 1. Upload ke GitHub
1. Login ke GitHub.com
2. New repository: `febi-dashboard`
3. Upload semua file (drag & drop)
4. Commit

### 2. Enable GitHub Pages
1. Settings → Pages
2. Source: main branch, / (root)
3. Save

### 3. Akses Dashboard
```
https://[username].github.io/febi-dashboard/
```

**Login Default:**
- Username: `ADMIN001`
- Password: `admin123`

## ✨ Fitur

### Admin
- ✅ Dashboard & Statistik
- ✅ Manage Mahasiswa (CRUD)
- ✅ Manage Dosen (CRUD)
- ✅ Manage Proposal (CRUD)
- ✅ Manage Bimbingan (CRUD)
- ✅ Manage Repository (CRUD)
- ✅ Export/Import Data

### Mahasiswa
- ✅ Self Registration
- ✅ Dashboard
- ✅ Submit Proposal
- ✅ Track Bimbingan
- ✅ Search Repository

### Dosen
- ✅ Self Registration
- ✅ Dashboard
- ✅ Review Proposal
- ✅ Manage Bimbingan
- ✅ Access Repository

## 📁 File Structure

```
febi-dashboard/
├── index.html      # Main UI
├── style.css       # Styling
├── config.js       # Configuration
├── storage.js      # Data management
├── app.js          # Main logic
├── ui.js           # UI & CRUD
└── README.md       # This file
```

## 🎨 Customization

### Change Password
Edit `config.js` line 15:
```javascript
password: 'new-password'
```

### Change Colors
Edit `style.css` line 1:
```css
--primary:#1e5631;  /* Your color */
```

### Add Program Studi
Edit `config.js` line 7-11:
```javascript
programs: [
  'Ekonomi Syariah',
  'Perbankan Syariah',
  'Your New Program'
]
```

## 📱 Embed

```html
<iframe 
  src="https://[username].github.io/febi-dashboard/" 
  width="100%" 
  height="800px">
</iframe>
```

## 💾 Backup

### Export
1. Login as Admin
2. Settings → Export Data
3. Download JSON

### Import
1. Login as Admin
2. Settings → Import Data
3. Select JSON file

## 🐛 Troubleshooting

**Dashboard tidak muncul?**
- Wait 2-3 minutes after enabling Pages
- Clear cache (Ctrl+Shift+Del)

**Data hilang?**
- Don't use Incognito mode
- Check browser allows LocalStorage

## 📞 Support

Email: admin@febi.uinsi.ac.id

## 📄 License

MIT License - Free to use & modify

---

**Made with ❤️ for FEBI UINSI Samarinda**
