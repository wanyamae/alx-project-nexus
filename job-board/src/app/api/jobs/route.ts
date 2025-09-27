import { NextResponse } from 'next/server';
import sqlite3Init from 'sqlite3';
import path from 'path';

const sqlite3 = sqlite3Init.verbose();
const dbPath = path.join(process.cwd(), 'src/db/job-board.db');

export async function GET(): Promise<Response> {
  return await new Promise<Response>((resolve) => {
    const db = new sqlite3.Database(dbPath);
    db.all('SELECT * FROM jobs', (err, rows) => {
      db.close();
      if (err) {
        resolve(NextResponse.json({ error: 'DB error' }, { status: 500 }));
      } else {
        resolve(NextResponse.json(rows));
      }
    });
  });
}
