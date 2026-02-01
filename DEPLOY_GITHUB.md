# 🚀 Panduan Deploy ke GitHub Pages

## 📋 Prerequisites

- Akun GitHub (gratis)
- Browser (Chrome/Firefox/Edge)
- Text editor (opsional, bisa edit langsung di GitHub)

---

## 🎯 Step-by-Step Deployment (15 Menit)

### **STEP 1: Upload ke GitHub (5 menit)**

#### **Option A: Via GitHub Website (Paling Mudah)**

1. **Login** ke GitHub: https://github.com

2. **Create New Repository**
   - Klik tombol **"+"** di kanan atas → **"New repository"**
   - Repository name: `febi-dashboard` (atau nama lain)
   - Description: `Dashboard Manajemen Skripsi FEBI UINSI`
   - Public repository (centang **Public**)
   - ✅ Add README file
   - Klik **"Create repository"**

3. **Upload Files**
   - Di halaman repository, klik **"Add file"** → **"Upload files"**
   - **Drag & drop** semua file dan folder dari `febi-dashboard` folder:
     - `index.html`
     - Folder `css/`
     - Folder `js/`
     - Folder `data/`
     - Folder `assets/`
     - `README.md` (replace yang existing)
   - Scroll down, tulis commit message: "Initial commit"
   - Klik **"Commit changes"**

#### **Option B: Via Git Command Line** (Advanced)

```bash
# 1. Extract ZIP file
unzip febi-dashboard.zip
cd febi-dashboard

# 2. Initialize Git
git init
git add .
git commit -m "Initial commit"

# 3. Connect to GitHub
git remote add origin https://github.com/[username]/febi-dashboard.git
git branch -M main
git push -u origin main
```

---

### **STEP 2: Enable GitHub Pages (2 menit)**

1. **Buka Settings Repository**
   - Di halaman repository Anda
   - Klik tab **"Settings"**

2. **Navigate ke Pages**
   - Di sidebar kiri, klik **"Pages"**

3. **Configure Source**
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/ (root)`
   - Klik **"Save"**

4. **Wait for Deployment**
   - Tunggu 1-2 menit
   - Refresh halaman
   - Akan muncul banner: 
     > "Your site is live at https://[username].github.io/febi-dashboard/"

---

### **STEP 3: Test Dashboard (2 menit)**

1. **Buka URL** yang diberikan:
   ```
   https://[username].github.io/febi-dashboard/
   ```

2. **Test Login**
   - Username: `ADMIN001`
   - Password: `admin123`

3. **Verify Features**
   - ✅ Dashboard muncul
   - ✅ Login berhasil
   - ✅ Menu admin berfungsi
   - ✅ Tambah mahasiswa works
   - ✅ Data tersimpan (LocalStorage)

---

### **STEP 4: Customization (5 menit)**

#### **Edit Logo**

1. **Prepare Logo**
   - Logo format: PNG (recommended)
   - Size: 200x200 px (recommended)
   - Name: `logo.png`

2. **Upload Logo**
   - Buka folder `assets/` di GitHub
   - Klik **"Add file"** → **"Upload files"**
   - Upload `logo.png` (replace existing)
   - Commit changes

#### **Edit Configuration**

1. **Buka** `js/config.js` di GitHub

2. **Klik** icon **✏️** (Edit this file)

3. **Edit** sesuai kebutuhan:
   ```javascript
   institution: {
     name: 'FEBI UINSI Samarinda',
     fullName: 'Fakultas ... - Universitas ...',
     logo: 'assets/logo.png',
     website: 'https://febi.uinsi.ac.id'
   },
   
   programs: [
     'Ekonomi Syariah',
     'Perbankan Syariah',
     // Tambah program baru di sini
   ],
   
   defaultAdmin: {
     id: 'ADMIN001',
     password: 'gantipassword123', // Ganti password!
     ...
   }
   ```

4. **Commit changes**

5. **Wait** 1-2 menit untuk re-deploy

6. **Refresh** dashboard URL

---

## 🌐 Embed di Website

Untuk embed dashboard di website institusi:

### **Metode 1: Full Page iFrame**

```html
<iframe 
  src="https://[username].github.io/febi-dashboard/" 
  width="100%" 
  height="800px" 
  style="border: none;"
  title="FEBI Dashboard">
</iframe>
```

### **Metode 2: Popup/Modal**

```html
<button onclick="openDashboard()">Buka Dashboard</button>

<script>
function openDashboard() {
  window.open('https://[username].github.io/febi-dashboard/', 
              'Dashboard', 
              'width=1200,height=800');
}
</script>
```

### **Metode 3: Direct Link**

```html
<a href="https://[username].github.io/febi-dashboard/" 
   target="_blank" 
   class="btn btn-primary">
  Buka Dashboard Skripsi
</a>
```

---

## 🔧 Maintenance & Updates

### **Update Dashboard**

1. **Edit Files** di GitHub:
   - Navigate ke file yang mau di-edit
   - Klik icon ✏️
   - Edit content
   - Commit changes

2. **Upload New Files**:
   - Klik "Add file" → "Upload files"
   - Upload files
   - Commit

3. **Auto Re-deploy**:
   - GitHub Pages akan auto re-deploy setiap commit
   - Tunggu 1-2 menit
   - Refresh browser (Ctrl+Shift+R untuk hard refresh)

### **Backup Data**

1. **Via Dashboard UI**:
   - Login sebagai Admin
   - Settings → Export Data
   - Download JSON file
   - Simpan di tempat aman

2. **Scheduled Backup**:
   - Data auto-backup setiap 1 jam ke LocalStorage
   - Manual backup: Settings → Create Backup

### **Restore Data**

1. **Via Dashboard UI**:
   - Login sebagai Admin
   - Settings → Import Data
   - Upload JSON file
   - Confirm

---

## 🎨 Advanced Customization

### **Change Theme Colors**

Edit `css/style.css`:

```css
:root {
  --primary-color: #1e5631;    /* Hijau UINSI */
  --secondary-color: #2d8659;  /* Hijau lebih muda */
  --accent-color: #3ba876;     /* Hijau accent */
}
```

### **Add Custom Pages**

1. Create new HTML file (e.g., `about.html`)
2. Upload to repository root
3. Access via: `https://[username].github.io/febi-dashboard/about.html`

### **Connect to Google Sheets** (Optional)

See `SETUP_GOOGLE_SHEETS.md` for detailed guide.

---

## 🐛 Troubleshooting

### **Dashboard Tidak Muncul**

**Check:**
- ✅ GitHub Pages enabled?
- ✅ Branch = `main`?
- ✅ Folder = `/root`?
- ✅ Files uploaded correctly?

**Solution:**
- Settings → Pages → Re-save settings
- Wait 2-3 minutes
- Clear browser cache (Ctrl+Shift+Del)

### **404 Not Found**

**Check:**
- URL correct? `https://[username].github.io/[repo-name]/`
- Repository name matches URL?

**Solution:**
- Double-check repository name
- Ensure `index.html` in root folder

### **Data Tidak Tersimpan**

**Check:**
- Browser Private/Incognito mode? (LocalStorage disabled)
- Browser cookies/storage allowed?

**Solution:**
- Use normal browser mode
- Check browser settings → Allow cookies and site data

### **Embed Tidak Berfungsi**

**Check:**
- iFrame allowed di hosting?
- CORS settings?

**Solution:**
- Contact hosting provider
- Use direct link instead of embed

---

## 📊 Monitoring & Analytics

### **GitHub Built-in Stats**

- Repository → Insights → Traffic
- View visitors, page views, clones

### **Add Google Analytics** (Optional)

Edit `index.html`, add before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🔐 Security Best Practices

### **Change Default Password**

**SEGERA** setelah deploy:

1. Login dengan default credentials
2. Settings → Change Password
3. Gunakan password kuat

### **Regular Backups**

- Export data setiap minggu
- Simpan di multiple locations
- Test restore process

### **Monitor Access**

- GitHub → Settings → Security
- Enable two-factor authentication
- Review repository access

---

## 📞 Support

**Masalah Deployment?**
- GitHub Pages Docs: https://docs.github.com/pages
- GitHub Community: https://github.com/community

**Masalah Dashboard?**
- Create issue di repository
- Email: admin@febi.uinsi.ac.id

---

## ✅ Checklist

Sebelum go-live:

- [ ] Repository created
- [ ] Files uploaded
- [ ] GitHub Pages enabled
- [ ] Dashboard accessible via URL
- [ ] Login works (default credentials)
- [ ] Logo customized
- [ ] Configuration updated
- [ ] Default password changed
- [ ] Test add/edit/delete operations
- [ ] Data backup downloaded
- [ ] Documentation updated
- [ ] Embed code tested (if needed)

---

**Selamat! Dashboard Anda sudah live! 🎉**

**URL:** `https://[username].github.io/febi-dashboard/`

Share URL ini ke dosen dan mahasiswa untuk mulai menggunakan dashboard!
