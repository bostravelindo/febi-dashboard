class Storage {
  constructor() {
    this.key = 'febiData';
    this.init();
  }

  init() {
    if (!localStorage.getItem(this.key)) {
      const defaultData = {
        users: [CONFIG.defaultAdmin],
        mahasiswa: [],
        dosen: [],
        proposals: [],
        bimbingan: [],
        repository: []
      };
      this.save(defaultData);
    }
  }

  getData() {
    return JSON.parse(localStorage.getItem(this.key) || '{}');
  }

  save(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  get(collection) {
    return this.getData()[collection] || [];
  }

  add(collection, item) {
    const data = this.getData();
    data[collection].push(item);
    this.save(data);
  }

  update(collection, id, updates, idField = 'id') {
    const data = this.getData();
    const index = data[collection].findIndex(item => item[idField] === id);
    if (index !== -1) {
      data[collection][index] = { ...data[collection][index], ...updates };
      this.save(data);
      return true;
    }
    return false;
  }

  delete(collection, id, idField = 'id') {
    const data = this.getData();
    data[collection] = data[collection].filter(item => item[idField] !== id);
    this.save(data);
  }

  find(collection, id, idField = 'id') {
    return this.get(collection).find(item => item[idField] === id);
  }

  exportJSON() {
    const data = this.getData();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `febi-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          this.save(data);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsText(file);
    });
  }

  clear() {
    this.init();
  }
}

const storage = new Storage();
