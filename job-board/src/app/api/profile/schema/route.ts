import { NextResponse } from 'next/server';
import sqlite3Init from 'sqlite3';
import path from 'path';

const sqlite3 = sqlite3Init.verbose();
const dbPath = path.join(process.cwd(), 'src/db/job-board.db');

export async function GET() {
  return new Promise((resolve) => {
    const db = new sqlite3.Database(dbPath);
    db.all(`PRAGMA table_info(profiles)`, (err, rows: { id: number; name: string; username: string; userId: number; email: string; bio: string; skills: string; experience: string; fk: number }[]) => {
      db.close();
      if (err) {
        resolve(NextResponse.json({ error: 'DB error', details: String(err) }, { status: 500 }));
      } else {
        // Only return editable fields (skip id, userId if needed)
        const fields = rows.filter((r: { name: string }) => r.name !== 'id');
        resolve(NextResponse.json(fields));
      }
    });
  });
}
