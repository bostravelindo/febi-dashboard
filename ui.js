// UI Helpers
function showTab(tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById(tab === 'login' ? 'loginForm' : tab === 'regMhs' ? 'regMhsForm' : 'regDosenForm').classList.add('active');
}

function showAlert(id, msg, type) {
  const el = document.getElementById(id);
  el.className = `alert alert-${type} show`;
  el.textContent = msg;
  setTimeout(() => el.classList.remove('show'), 3000);
}

function setupProdiOptions() {
  ['prodiMhs', 'prodiDosen'].forEach(id => {
    const select = document.getElementById(id);
    CONFIG.programs.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p;
      opt.textContent = p;
      select.appendChild(opt);
    });
  });
}

function searchTable(tableId, query) {
  const table = document.getElementById(tableId);
  const rows = table.getElementsByTagName('tr');
  for (let i = 1; i < rows.length; i++) {
    const text = rows[i].textContent.toLowerCase();
    rows[i].style.display = text.includes(query.toLowerCase()) ? '' : 'none';
  }
}

function openModal(title, content) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = content;
  document.getElementById('modal').classList.add('show');
}

function closeModal() {
  document.getElementById('modal').classList.remove('show');
}

// CRUD Mahasiswa
function addMhs() {
  const content = `
    <form onsubmit="saveMhs(event)">
      <input type="text" name="nim" placeholder="NIM" required>
      <input type="text" name="nama" placeholder="Nama" required>
      <input type="email" name="email" placeholder="Email" required>
      <input type="text" name="wa" placeholder="WhatsApp" required>
      <select name="prodi" required>${CONFIG.programs.map(p => `<option value="${p}">${p}</option>`).join('')}</select>
      <input type="number" name="tahun" placeholder="Tahun Masuk" value="2024" required>
      <button type="submit" class="btn-primary">Simpan</button>
    </form>
  `;
  openModal('Tambah Mahasiswa', content);
}

function saveMhs(e) {
  e.preventDefault();
  const form = e.target;
  const nim = form.nim.value.trim();
  
  if (storage.find('mahasiswa', nim, 'nim')) {
    alert('NIM sudah ada!');
    return;
  }
  
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
  
  storage.add('mahasiswa', mhs);
  closeModal();
  loadMahasiswa();
}

function editMhs(nim) {
  const mhs = storage.find('mahasiswa', nim, 'nim');
  if (!mhs) return;
  
  const content = `
    <form onsubmit="updateMhs(event, '${nim}')">
      <input type="text" value="${mhs.nim}" disabled>
      <input type="text" name="nama" value="${mhs.nama}" required>
      <input type="email" name="email" value="${mhs.email}" required>
      <input type="text" name="wa" value="${mhs.wa}" required>
      <select name="prodi" required>${CONFIG.programs.map(p => `<option value="${p}" ${p === mhs.prodi ? 'selected' : ''}>${p}</option>`).join('')}</select>
      <input type="number" name="tahun" value="${mhs.tahunMasuk}" required>
      <button type="submit" class="btn-primary">Update</button>
    </form>
  `;
  openModal('Edit Mahasiswa', content);
}

function updateMhs(e, nim) {
  e.preventDefault();
  const form = e.target;
  
  const updates = {
    nama: form.nama.value,
    email: form.email.value,
    wa: form.wa.value,
    prodi: form.prodi.value,
    tahunMasuk: parseInt(form.tahun.value)
  };
  
  storage.update('mahasiswa', nim, updates, 'nim');
  closeModal();
  loadMahasiswa();
}

function deleteMhs(nim) {
  if (confirm('Hapus mahasiswa ini?')) {
    storage.delete('mahasiswa', nim, 'nim');
    storage.delete('users', nim);
    loadMahasiswa();
  }
}

// CRUD Dosen
function addDosen() {
  const content = `
    <form onsubmit="saveDosen(event)">
      <input type="text" name="nip" placeholder="NIP" required>
      <input type="text" name="nama" placeholder="Nama" required>
      <input type="email" name="email" placeholder="Email" required>
      <input type="text" name="wa" placeholder="WhatsApp" required>
      <input type="text" name="keahlian" placeholder="Keahlian" required>
      <select name="prodi" required>${CONFIG.programs.map(p => `<option value="${p}">${p}</option>`).join('')}</select>
      <button type="submit" class="btn-primary">Simpan</button>
    </form>
  `;
  openModal('Tambah Dosen', content);
}

function saveDosen(e) {
  e.preventDefault();
  const form = e.target;
  const nip = form.nip.value.trim();
  
  if (storage.find('dosen', nip, 'nip')) {
    alert('NIP sudah ada!');
    return;
  }
  
  const dosen = {
    nip: nip,
    nama: form.nama.value,
    email: form.email.value,
    wa: form.wa.value,
    keahlian: form.keahlian.value,
    prodi: form.prodi.value,
    registeredAt: new Date().toISOString()
  };
  
  storage.add('dosen', dosen);
  closeModal();
  loadDosen();
}

function editDosen(nip) {
  const dosen = storage.find('dosen', nip, 'nip');
  if (!dosen) return;
  
  const content = `
    <form onsubmit="updateDosen(event, '${nip}')">
      <input type="text" value="${dosen.nip}" disabled>
      <input type="text" name="nama" value="${dosen.nama}" required>
      <input type="email" name="email" value="${dosen.email}" required>
      <input type="text" name="wa" value="${dosen.wa}" required>
      <input type="text" name="keahlian" value="${dosen.keahlian}" required>
      <select name="prodi" required>${CONFIG.programs.map(p => `<option value="${p}" ${p === dosen.prodi ? 'selected' : ''}>${p}</option>`).join('')}</select>
      <button type="submit" class="btn-primary">Update</button>
    </form>
  `;
  openModal('Edit Dosen', content);
}

function updateDosen(e, nip) {
  e.preventDefault();
  const form = e.target;
  
  const updates = {
    nama: form.nama.value,
    email: form.email.value,
    wa: form.wa.value,
    keahlian: form.keahlian.value,
    prodi: form.prodi.value
  };
  
  storage.update('dosen', nip, updates, 'nip');
  closeModal();
  loadDosen();
}

function deleteDosen(nip) {
  if (confirm('Hapus dosen ini?')) {
    storage.delete('dosen', nip, 'nip');
    storage.delete('users', nip);
    loadDosen();
  }
}

// CRUD Proposal
function addProposal() {
  const mhs = storage.get('mahasiswa');
  const dosen = storage.get('dosen');
  
  const content = `
    <form onsubmit="saveProposal(event)">
      <select name="nim" required>
        <option value="">Pilih Mahasiswa</option>
        ${mhs.map(m => `<option value="${m.nim}">${m.nim} - ${m.nama}</option>`).join('')}
      </select>
      <input type="text" name="judul" placeholder="Judul Proposal" required>
      <select name="p1" required>
        <option value="">Pembimbing 1</option>
        ${dosen.map(d => `<option value="${d.nama}">${d.nama}</option>`).join('')}
      </select>
      <select name="p2" required>
        <option value="">Pembimbing 2</option>
        ${dosen.map(d => `<option value="${d.nama}">${d.nama}</option>`).join('')}
      </select>
      <select name="status" required>
        ${CONFIG.proposalStatus.map(s => `<option value="${s}">${s}</option>`).join('')}
      </select>
      <textarea name="catatan" placeholder="Catatan"></textarea>
      <button type="submit" class="btn-primary">Simpan</button>
    </form>
  `;
  openModal('Tambah Proposal', content);
}

function saveProposal(e) {
  e.preventDefault();
  const form = e.target;
  
  const proposal = {
    id: 'PROP' + Date.now(),
    nim: form.nim.value,
    judul: form.judul.value,
    pembimbing1: form.p1.value,
    pembimbing2: form.p2.value,
    status: form.status.value,
    catatan: form.catatan.value,
    createdAt: new Date().toISOString()
  };
  
  storage.add('proposals', proposal);
  closeModal();
  loadProposal();
}

function editProposal(id) {
  const prop = storage.find('proposals', id);
  if (!prop) return;
  
  const dosen = storage.get('dosen');
  const content = `
    <form onsubmit="updateProposal(event, '${id}')">
      <input type="text" value="${prop.judul}" name="judul" required>
      <select name="p1" required>
        ${dosen.map(d => `<option value="${d.nama}" ${d.nama === prop.pembimbing1 ? 'selected' : ''}>${d.nama}</option>`).join('')}
      </select>
      <select name="p2" required>
        ${dosen.map(d => `<option value="${d.nama}" ${d.nama === prop.pembimbing2 ? 'selected' : ''}>${d.nama}</option>`).join('')}
      </select>
      <select name="status" required>
        ${CONFIG.proposalStatus.map(s => `<option value="${s}" ${s === prop.status ? 'selected' : ''}>${s}</option>`).join('')}
      </select>
      <textarea name="catatan">${prop.catatan || ''}</textarea>
      <button type="submit" class="btn-primary">Update</button>
    </form>
  `;
  openModal('Edit Proposal', content);
}

function updateProposal(e, id) {
  e.preventDefault();
  const form = e.target;
  
  const updates = {
    judul: form.judul.value,
    pembimbing1: form.p1.value,
    pembimbing2: form.p2.value,
    status: form.status.value,
    catatan: form.catatan.value
  };
  
  storage.update('proposals', id, updates);
  closeModal();
  loadProposal();
}

function deleteProposal(id) {
  if (confirm('Hapus proposal ini?')) {
    storage.delete('proposals', id);
    loadProposal();
  }
}

// CRUD Bimbingan
function addBimbingan() {
  const mhs = storage.get('mahasiswa');
  const dosen = storage.get('dosen');
  
  const content = `
    <form onsubmit="saveBimbingan(event)">
      <select name="nim" required>
        <option value="">Pilih Mahasiswa</option>
        ${mhs.map(m => `<option value="${m.nim}">${m.nim} - ${m.nama}</option>`).join('')}
      </select>
      <input type="text" name="judul" placeholder="Judul Skripsi" required>
      <select name="p1" required>
        <option value="">Pembimbing 1</option>
        ${dosen.map(d => `<option value="${d.nama}">${d.nama}</option>`).join('')}
      </select>
      <select name="p2" required>
        <option value="">Pembimbing 2</option>
        ${dosen.map(d => `<option value="${d.nama}">${d.nama}</option>`).join('')}
      </select>
      <select name="bab" required>
        ${CONFIG.babs.map(b => `<option value="${b}">${b}</option>`).join('')}
      </select>
      <select name="status" required>
        ${CONFIG.bimbinganStatus.map(s => `<option value="${s}">${s}</option>`).join('')}
      </select>
      <button type="submit" class="btn-primary">Simpan</button>
    </form>
  `;
  openModal('Tambah Bimbingan', content);
}

function saveBimbingan(e) {
  e.preventDefault();
  const form = e.target;
  
  const babProgress = {};
  CONFIG.babs.forEach(b => babProgress[b] = 'Draft');
  
  const bimbingan = {
    id: 'BIMB' + Date.now(),
    nim: form.nim.value,
    judul: form.judul.value,
    pembimbing1: form.p1.value,
    pembimbing2: form.p2.value,
    currentBab: form.bab.value,
    status: form.status.value,
    babProgress: babProgress,
    createdAt: new Date().toISOString()
  };
  
  storage.add('bimbingan', bimbingan);
  closeModal();
  loadBimbingan();
}

function editBimbingan(id) {
  const bimb = storage.find('bimbingan', id);
  if (!bimb) return;
  
  const content = `
    <form onsubmit="updateBimbingan(event, '${id}')">
      <input type="text" value="${bimb.judul}" name="judul" required>
      <select name="bab" required>
        ${CONFIG.babs.map(b => `<option value="${b}" ${b === bimb.currentBab ? 'selected' : ''}>${b}</option>`).join('')}
      </select>
      <select name="status" required>
        ${CONFIG.bimbinganStatus.map(s => `<option value="${s}" ${s === bimb.status ? 'selected' : ''}>${s}</option>`).join('')}
      </select>
      <button type="submit" class="btn-primary">Update</button>
    </form>
  `;
  openModal('Edit Bimbingan', content);
}

function updateBimbingan(e, id) {
  e.preventDefault();
  const form = e.target;
  
  const updates = {
    judul: form.judul.value,
    currentBab: form.bab.value,
    status: form.status.value
  };
  
  storage.update('bimbingan', id, updates);
  closeModal();
  loadBimbingan();
}

function deleteBimbingan(id) {
  if (confirm('Hapus bimbingan ini?')) {
    storage.delete('bimbingan', id);
    loadBimbingan();
  }
}

// CRUD Repository
function addRepo() {
  const content = `
    <form onsubmit="saveRepo(event)">
      <input type="text" name="author" placeholder="Nama Penulis" required>
      <input type="text" name="title" placeholder="Judul Skripsi" required>
      <textarea name="abstract" placeholder="Abstrak" required></textarea>
      <input type="text" name="keywords" placeholder="Keywords (pisah dengan koma)" required>
      <input type="number" name="year" placeholder="Tahun" value="2024" required>
      <select name="prodi" required>
        ${CONFIG.programs.map(p => `<option value="${p}">${p}</option>`).join('')}
      </select>
      <input type="text" name="fileUrl" placeholder="URL File (opsional)">
      <button type="submit" class="btn-primary">Simpan</button>
    </form>
  `;
  openModal('Upload Repository', content);
}

function saveRepo(e) {
  e.preventDefault();
  const form = e.target;
  
  const repo = {
    id: 'REPO' + Date.now(),
    author: form.author.value,
    title: form.title.value,
    abstract: form.abstract.value,
    keywords: form.keywords.value.split(',').map(k => k.trim()),
    year: parseInt(form.year.value),
    prodi: form.prodi.value,
    fileUrl: form.fileUrl.value || '',
    uploadDate: new Date().toISOString()
  };
  
  storage.add('repository', repo);
  closeModal();
  loadRepository();
}

function viewRepo(id) {
  const repo = storage.find('repository', id);
  if (!repo) return;
  
  const content = `
    <h4>${repo.title}</h4>
    <p><strong>Penulis:</strong> ${repo.author}</p>
    <p><strong>Tahun:</strong> ${repo.year}</p>
    <p><strong>Prodi:</strong> ${repo.prodi}</p>
    <p><strong>Keywords:</strong> ${repo.keywords.join(', ')}</p>
    <p><strong>Abstrak:</strong></p>
    <p>${repo.abstract}</p>
    ${repo.fileUrl ? `<p><a href="${repo.fileUrl}" target="_blank" class="btn-primary">Download File</a></p>` : ''}
  `;
  openModal('Detail Repository', content);
}

function deleteRepo(id) {
  if (confirm('Hapus repository ini?')) {
    storage.delete('repository', id);
    loadRepository();
  }
}
