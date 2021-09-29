const fs = require('fs');

export class Repository {
  constructor(file) {
    this.path = `data/${file}.json`;
    this.records = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
  }

  save() {
    fs.writeFileSync(this.path, JSON.stringify(this.records, null, 4));
  }

  getAll() {
    return this.records;
  }

  getById(id) {
    return this.records.find((x) => x.id.toString() === id.toString());
  }

  create(record) {
    record.id = this.records.length ? Math.max(...this.records.map((x) => x.id)) + 1 : 1;
    record.createAt = new Date().toISOString();

    this.records.push(record);
    this.save();
  }

  update(id, params) {
    const record = this.records.find((x) => x.id.toString() === id.toString());
    Object.assign(record, params);
    this.save();
  }

  remove(id) {
    this.records = this.records.filter((x) => x.id.toString() !== id.toString());
    this.save();
  }
}
