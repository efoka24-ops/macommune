import { USE_SQL } from './config.js';
import { NewsArticle, Supporter, Testimonial, Badge, Evenement, Donation } from './models/index.js';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Entity mapping
const entityModels = {
  NewsArticle,
  Supporter,
  Testimonial,
  Badge,
  Evenement,
  Donation,
};

const dataFiles = {
  NewsArticle: path.join(__dirname, '..', 'data', 'news.json'),
  Supporter: path.join(__dirname, '..', 'data', 'supporters.json'),
  Testimonial: path.join(__dirname, '..', 'data', 'testimonials.json'),
  Badge: path.join(__dirname, '..', 'data', 'badges.json'),
  Evenement: path.join(__dirname, '..', 'data', 'evenements.json'),
  Donation: path.join(__dirname, '..', 'data', 'donations.json'),
};

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// JSON-based adapter
class JSONAdapter {
  readData(entity) {
    try {
      return JSON.parse(readFileSync(dataFiles[entity], 'utf-8'));
    } catch {
      return [];
    }
  }

  writeData(entity, data) {
    writeFileSync(dataFiles[entity], JSON.stringify(data, null, 2), 'utf-8');
  }

  async list(entity, sortField) {
    let records = this.readData(entity);
    if (sortField) {
      const desc = sortField.startsWith('-');
      const field = desc ? sortField.slice(1) : sortField;
      records = [...records].sort((a, b) => {
        const av = a[field] ?? '';
        const bv = b[field] ?? '';
        if (av < bv) return desc ? 1 : -1;
        if (av > bv) return desc ? -1 : 1;
        return 0;
      });
    }
    return records;
  }

  async create(entity, data) {
    const records = this.readData(entity);
    const newRecord = { id: generateId(), created_date: new Date().toISOString(), ...data };
    records.push(newRecord);
    this.writeData(entity, records);
    return newRecord;
  }

  async update(entity, id, data) {
    const records = this.readData(entity);
    const index = records.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Record not found');
    records[index] = { ...records[index], ...data, id };
    this.writeData(entity, records);
    return records[index];
  }

  async delete(entity, id) {
    let records = this.readData(entity);
    const index = records.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Record not found');
    records.splice(index, 1);
    this.writeData(entity, records);
    return true;
  }

  async findByField(entity, fieldName, fieldValue) {
    const records = this.readData(entity);
    return records.find(r => r[fieldName] === fieldValue) || null;
  }

  async updateByField(entity, fieldName, fieldValue, data) {
    const records = this.readData(entity);
    const index = records.findIndex(r => r[fieldName] === fieldValue);
    if (index === -1) throw new Error('Record not found');
    records[index] = { ...records[index], ...data };
    this.writeData(entity, records);
    return records[index];
  }
}

// SQL-based adapter using Sequelize
class SQLAdapter {
  async list(entity, sortField) {
    const Model = entityModels[entity];
    if (!Model) throw new Error('Unknown entity');

    const options = {};
    if (sortField) {
      const desc = sortField.startsWith('-');
      const field = desc ? sortField.slice(1) : sortField;
      options.order = [[field, desc ? 'DESC' : 'ASC']];
    }
    return Model.findAll(options);
  }

  async create(entity, data) {
    const Model = entityModels[entity];
    if (!Model) throw new Error('Unknown entity');
    return Model.create({ id: generateId(), created_date: new Date(), ...data });
  }

  async update(entity, id, data) {
    const Model = entityModels[entity];
    if (!Model) throw new Error('Unknown entity');
    const record = await Model.findByPk(id);
    if (!record) throw new Error('Record not found');
    return record.update(data);
  }

  async delete(entity, id) {
    const Model = entityModels[entity];
    if (!Model) throw new Error('Unknown entity');
    const record = await Model.findByPk(id);
    if (!record) throw new Error('Record not found');
    await record.destroy();
    return true;
  }

  async findByField(entity, fieldName, fieldValue) {
    const Model = entityModels[entity];
    if (!Model) throw new Error('Unknown entity');
    return Model.findOne({ where: { [fieldName]: fieldValue } });
  }

  async updateByField(entity, fieldName, fieldValue, data) {
    const Model = entityModels[entity];
    if (!Model) throw new Error('Unknown entity');
    const record = await Model.findOne({ where: { [fieldName]: fieldValue } });
    if (!record) throw new Error('Record not found');
    return record.update(data);
  }
}

const adapter = USE_SQL ? new SQLAdapter() : new JSONAdapter();

export { adapter, generateId };
