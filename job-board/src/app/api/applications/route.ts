export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, jobId, jobTitle, status = 'Applied' } = body;
  if (!userId || !jobId || !jobTitle) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  return new Promise((resolve) => {
    const db = new sqlite3.Database(dbPath);
    const appliedAt = new Date().toISOString();
    db.run(
      'INSERT INTO applications (userId, jobId, jobTitle, status, appliedAt) VALUES (?, ?, ?, ?, ?)',
      [userId, jobId, jobTitle, status, appliedAt],
      function (err) {
        db.close();
        if (err) {
          resolve(NextResponse.json({ error: 'DB error' }, { status: 500 }));
        } else {
          resolve(NextResponse.json({ success: true, applicationId: this.lastID }));
        }
      }
    );
  });
}
import { NextRequest, NextResponse } from 'next/server';
import sqlite3Init from 'sqlite3';
import path from 'path';

const sqlite3 = sqlite3Init.verbose();
const dbPath = path.join(process.cwd(), 'src/db/job-board.db');

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }
  return new Promise((resolve) => {
    const db = new sqlite3.Database(dbPath);
    db.all('SELECT * FROM applications WHERE userId = ?', [userId], (err, rows) => {
      db.close();
      if (err) {
        resolve(NextResponse.json({ error: 'DB error' }, { status: 500 }));
      } else {
        resolve(NextResponse.json(rows));
      }
    });
  });
}
