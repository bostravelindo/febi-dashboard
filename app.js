let currentUser = null;

// Init
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('loading').classList.add('hidden');
  }, 500);
  
  setupLogin();
  setupProdiOptions();
  checkAuth();
});

// Auth
function checkAuth() {
  const user = sessionStorage.getItem('currentUser');
  if (user) {
    currentUser = JSON.parse(user);
    showDashboard();
  }
}

function setupLogin() {
  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('loginId').value.trim();
    const pass = document.getElementById('loginPass').value;
    const users = storage.get('users');
    const user = users.find(u => u.id === id && u.password === pass);
    
    if (user) {
      currentUser = user;
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      showAlert('loginAlert', 'Login berhasil!', 'success');
      setTimeout(() => showDashboard(), 500);
    } else {
      showAlert('loginAlert', 'ID atau password salah!', 'error');
    }
  });

  document.getElementById('regMhsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const nim = form.nim.value.trim();
    
    if (storage.find('users', nim)) {
      showAlert('regMhsAlert', 'NIM sudah terdaftar!', 'error');
      return;
    }

    const user = {
      id: nim,
      password: form.pass.value,
      role: 'mahasiswa',
      nama: form.nama.value,
      email: form.email.value,
      registeredAt: new Date().toISOString()
    };
    
    const mhs = {
      nim: nim,
      nama: form.nama.value,
      email: form.email.value,
      wa: form.wa.value,
      prodi: form.prodi.value,
      tahunMasuk: parseInt(form.tahun.value),
      pembimbing1: '',
      pembimbing2: '',
      registeredAt: new Date().toISOString()
    };
    
    storage.add('users', user);
    storage.add('mahasiswa', mhs);
    
    showAlert('regMhsAlert', 'Registrasi berhasil! Silakan login.', 'success');
    form.reset();
    setTimeout(() => showTab('login'), 1500);
  });

  document.getElementById('regDosenForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const nip = form.nip.value.trim();
    
    if (storage.find('users', nip)) {
      showAlert('regDosenAlert', 'NIP sudah terdaftar!', 'error');
      return;
    }

    const user = {
      id: nip,
      password: form.pass.value,
      role: 'dosen',
      nama: form.nama.value,
      email: form.email.value,
      registeredAt: new Date().toISOString()
    };
    
    const dosen = {
      nip: nip,
      nama: form.nama.value,
      email: form.email.value,
      wa: form.wa.value,
      keahlian: form.keahlian.value,
      prodi: form.prodi.value,
      registeredAt: new Date().toISOString()
    };
    
    storage.add('users', user);
    storage.add('dosen', dosen);
    
    showAlert('regDosenAlert', 'Registrasi berhasil! Silakan login.', 'success');
    form.reset();
    setTimeout(() => showTab('login'), 1500);
  });
}

function logout() {
  if (confirm('Yakin ingin logout?')) {
    currentUser = null;
    sessionStorage.removeItem('currentUser');
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('dashboardPage').classList.add('hidden');
  }
}

function showDashboard() {
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('dashboardPage').classList.remove('hidden');
  
  document.getElementById('userName').textContent = currentUser.nama;
  document.getElementById('userRole').textContent = currentUser.role;
  
  setupNav();
  loadSection('home');
}

function setupNav() {
  const menus = {
    admin: ['home', 'mahasiswa', 'dosen', 'proposal', 'bimbingan', 'repository', 'settings'],
    mahasiswa: ['home', 'proposal', 'bimbingan', 'repository'],
    dosen: ['home', 'proposal', 'bimbingan', 'repository']
  };
  
  const labels = {
    home: '🏠 Dashboard',
    mahasiswa: '👨‍🎓 Mahasiswa',
    dosen: '👨‍🏫 Dosen',
    proposal: '📄 Proposal',
    bimbingan: '📚 Bimbingan',
    repository: '🗂️ Repository',
    settings: '⚙️ Settings'
  };
  
  const nav = document.getElementById('navMenu');
  nav.innerHTML = '';
  
  menus[currentUser.role].forEach(id => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = labels[id];
    a.onclick = () => loadSection(id);
    li.appendChild(a);
    nav.appendChild(li);
  });
  
  nav.querySelector('a').classList.add('active');
}

function loadSection(id) {
  document.querySelectorAll('.nav a').forEach(a => a.classList.remove('active'));
  event.target.classList.add('active');
  
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(`sec-${id}`).classList.add('active');
  
  switch(id) {
    case 'home': loadHome(); break;
    case 'mahasiswa': loadMahasiswa(); break;
    case 'dosen': loadDosen(); break;
    case 'proposal': loadProposal(); break;
    case 'bimbingan': loadBimbingan(); break;
    case 'repository': loadRepository(); break;
  }
}

function loadHome() {
  const data = storage.getData();
  document.getElementById('statMhs').textContent = data.mahasiswa.length;
  document.getElementById('statDosen').textContent = data.dosen.length;
  document.getElementById('statProposal').textContent = data.proposals.length;
  document.getElementById('statRepo').textContent = data.repository.length;
}

function loadMahasiswa() {
  const mhs = storage.get('mahasiswa');
  const tbody = document.getElementById('mhsBody');
  
  if (mhs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center">Belum ada data</td></tr>';
    return;
  }
  
  tbody.innerHTML = mhs.map(m => `
    <tr>
      <td>${m.nim}</td>
      <td>${m.nama}</td>
      <td>${m.email}</td>
      <td>${m.prodi}</td>
      <td>${m.tahunMasuk}</td>
      <td>
        <button class="btn-success btn-sm" onclick="editMhs('${m.nim}')">Edit</button>
        <button class="btn-danger btn-sm" onclick="deleteMhs('${m.nim}')">Hapus</button>
      </td>
    </tr>
  `).join('');
}

function loadDosen() {
  const dosen = storage.get('dosen');
  const tbody = document.getElementById('dosenBody');
  
  if (dosen.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center">Belum ada data</td></tr>';
    return;
  }
  
  tbody.innerHTML = dosen.map(d => `
    <tr>
      <td>${d.nip}</td>
      <td>${d.nama}</td>
      <td>${d.email}</td>
      <td>${d.keahlian}</td>
      <td>${d.prodi}</td>
      <td>
        <button class="btn-success btn-sm" onclick="editDosen('${d.nip}')">Edit</button>
        <button class="btn-danger btn-sm" onclick="deleteDosen('${d.nip}')">Hapus</button>
      </td>
    </tr>
  `).join('');
}

function loadProposal() {
  const proposals = storage.get('proposals');
  const tbody = document.getElementById('proposalBody');
  
  if (proposals.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center">Belum ada data</td></tr>';
    return;
  }
  
  tbody.innerHTML = proposals.map(p => `
    <tr>
      <td>${p.nim}</td>
      <td>${p.judul}</td>
      <td>${p.pembimbing1}</td>
      <td>${p.pembimbing2}</td>
      <td><span class="badge badge-${p.status === 'Disetujui' ? 'success' : 'warning'}">${p.status}</span></td>
      <td>
        <button class="btn-success btn-sm" onclick="editProposal('${p.id}')">Edit</button>
        <button class="btn-danger btn-sm" onclick="deleteProposal('${p.id}')">Hapus</button>
      </td>
    </tr>
  `).join('');
}

function loadBimbingan() {
  const bimbingan = storage.get('bimbingan');
  const tbody = document.getElementById('bimbinganBody');
  
  if (bimbingan.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center">Belum ada data</td></tr>';
    return;
  }
  
  tbody.innerHTML = bimbingan.map(b => {
    const progress = Object.values(b.babProgress || {}).filter(s => s === 'ACC').length;
    return `
    <tr>
      <td>${b.nim}</td>
      <td>${b.judul}</td>
      <td>${b.currentBab}</td>
      <td>${progress}/5</td>
      <td><span class="badge badge-${b.status === 'ACC' ? 'success' : 'warning'}">${b.status}</span></td>
      <td>
        <button class="btn-success btn-sm" onclick="editBimbingan('${b.id}')">Edit</button>
        <button class="btn-danger btn-sm" onclick="deleteBimbingan('${b.id}')">Hapus</button>
      </td>
    </tr>
  `}).join('');
}

function loadRepository() {
  const repo = storage.get('repository');
  const tbody = document.getElementById('repoBody');
  
  if (repo.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center">Belum ada data</td></tr>';
    return;
  }
  
  tbody.innerHTML = repo.map(r => `
    <tr>
      <td>${r.year}</td>
      <td>${r.author}</td>
      <td>${r.title}</td>
      <td>${r.prodi}</td>
      <td>
        <button class="btn-success btn-sm" onclick="viewRepo('${r.id}')">Lihat</button>
        <button class="btn-danger btn-sm" onclick="deleteRepo('${r.id}')">Hapus</button>
      </td>
    </tr>
  `).join('');
}

// Export/Import
function exportData() {
  storage.exportJSON();
}

function importData() {
  document.getElementById('importFile').click();
  document.getElementById('importFile').onchange = async (e) => {
    try {
      await storage.importJSON(e.target.files[0]);
      alert('Import berhasil!');
      location.reload();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };
}

function clearData() {
  if (confirm('PERINGATAN: Hapus semua data?')) {
    if (confirm('Konfirmasi sekali lagi!')) {
      storage.clear();
      alert('Data dihapus!');
      location.reload();
    }
  }
}
