// Script to initialize SQLite database and tables for job-board

import sqlite3Init from 'sqlite3';
const sqlite3 = sqlite3Init.verbose();
import path from 'path';

const dbPath = path.join(process.cwd(), 'src/db/job-board.db');
const db = new sqlite3.Database(dbPath);

// Create tables matching the JSON data structure
const createTables = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY,
      title TEXT,
      company TEXT,
      location TEXT,
      description TEXT,
      requirements TEXT,
      postedAt TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS users (
      userId INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      username TEXT,
      userId INTEGER,
      email TEXT,
      bio TEXT,
      skills TEXT,
      experience TEXT,
      FOREIGN KEY(userId) REFERENCES users(userId)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS applications (
      id TEXT PRIMARY KEY,
      userId TEXT,
      jobId TEXT,
      status TEXT,
      appliedAt TEXT,
      FOREIGN KEY(userId) REFERENCES users(id),
      FOREIGN KEY(jobId) REFERENCES jobs(id)
    )`);
  });
};

createTables();
db.close();
console.log('SQLite database and tables created successfully.');
