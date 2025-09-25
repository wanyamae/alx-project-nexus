import sqlite3Init from 'sqlite3';
import path from 'path';

const sqlite3 = sqlite3Init.verbose();
const dbPath = path.join(__dirname, '../../db/job-board.db');

export function getProfileByUserId(userId: string | number) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);
    db.get('SELECT * FROM profiles WHERE userId = ?', [userId], (err, row) => {
      db.close();
      if (err) reject(err);
      else resolve(row);
    });
  });
}

export function getApplicationsByUserId(userId: string | number) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);
    db.all('SELECT * FROM applications WHERE userId = ?', [userId], (err, rows) => {
      db.close();
      if (err) reject(err);
      else resolve(rows);
    });
  });
}
