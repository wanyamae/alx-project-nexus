import { NextRequest, NextResponse } from 'next/server';
import sqlite3Init from 'sqlite3';
import path from 'path';

const sqlite3 = sqlite3Init.verbose();
const dbPath = path.join(process.cwd(), 'src/db/job-board.db');

// Helper to run db queries as Promise
function runQuery<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);
    db.all(sql, params, (err, rows) => {
      db.close();
      if (err) reject(err);
      else resolve(rows as T[]);
    });
  });
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  try {
    const saved = await runQuery('SELECT * FROM saved_jobs WHERE userId = ?', [userId]);
    return NextResponse.json(saved);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { userId, jobId } = await req.json();
  if (!userId || !jobId) return NextResponse.json({ error: 'Missing userId or jobId' }, { status: 400 });
  try {
    await runQuery('INSERT OR IGNORE INTO saved_jobs (userId, jobId, savedAt) VALUES (?, ?, ?)', [userId, jobId, new Date().toISOString()]);
    return NextResponse.json({ success: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { userId, jobId } = await req.json();
  if (!userId || !jobId) return NextResponse.json({ error: 'Missing userId or jobId' }, { status: 400 });
  try {
    await runQuery('DELETE FROM saved_jobs WHERE userId = ? AND jobId = ?', [userId, jobId]);
    return NextResponse.json({ success: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
