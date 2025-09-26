// Script to migrate JSON data and seed random data into SQLite

import sqlite3Init from 'sqlite3';
import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sqlite3 = sqlite3Init.verbose();
const dbPath = path.join(process.cwd(), 'src/db/job-board.db');
const db = new sqlite3.Database(dbPath);

function readJSON(file) {
  return JSON.parse(readFileSync(path.join(__dirname, '../data', file), 'utf-8'));
}

const jobs = readJSON('jobs.json');
let users = readJSON('users.json');
// If passwords are not hashed, hash them with bcryptjs
import bcrypt from 'bcryptjs';
users = users.map(u => ({
  ...u,
  password: u.password.startsWith('$2b$') ? u.password : bcrypt.hashSync(u.password, 8)
}));
let profiles = readJSON('profiles.json');
// Ensure all required fields exist for the schema
profiles = profiles.map(p => ({
  id: p.userId.toString(),
  name: p.name,
  userId: p.userId.toString(),
  email: p.email || '',
  bio: p.bio || '',
  skills: p.skills || '',
  experience: p.experience || ''
}));
const applications = readJSON('applications.json');


function seedTable(table, columns, data) {
  const placeholders = columns.map(() => '?').join(',');
  const stmt = db.prepare(`INSERT OR IGNORE INTO ${table} (${columns.join(',')}) VALUES (${placeholders})`);
  data.forEach(row => {
    stmt.run(columns.map(col => row[col]));
  });
  stmt.finalize();
}


db.serialize(() => {
  seedTable('jobs', ['id','title','company','location','description','requirements','postedAt','logoUrl','jobUrl'], jobs);
  seedTable('users', ['userId','username','password','role'], users);
  seedTable('profiles', ['id','name','userId','email','bio','skills','experience'], profiles);
  seedTable('applications', ['id','userId','jobId','status','appliedAt'], applications);

  // Seed random jobs with logoUrl and jobUrl
  for (let i = 0; i < 5; i++) {
    db.run(
      `INSERT INTO jobs (id, title, company, location, description, requirements, postedAt, logoUrl, jobUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        `random${i}`,
        `Random Job ${i}`,
        `Company ${i}`,
        `Location ${i}`,
        `Description ${i}`,
        `Requirements ${i}`,
        new Date().toISOString(),
        `https://logo.clearbit.com/random${i}.com`,
        `https://random${i}.com/careers/job${i}`
      ]
    );
  }
});

db.close();
console.log('Database seeded with JSON and random data.');
