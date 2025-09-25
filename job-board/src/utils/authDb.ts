import sqlite3Init from 'sqlite3';
import path from 'path';

const sqlite3 = sqlite3Init.verbose();
const dbPath = path.join(__dirname, '../../db/job-board.db');

export function getUserByUsername(username: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      db.close();
      if (err) reject(err);
      else resolve(row);
    });
  });
}
