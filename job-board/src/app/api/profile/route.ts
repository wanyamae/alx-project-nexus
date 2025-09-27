import { NextRequest, NextResponse } from 'next/server';
import sqlite3Init from 'sqlite3';
import path from 'path';

const sqlite3 = sqlite3Init.verbose();
const dbPath = path.join(process.cwd(), 'src/db/job-board.db');

export async function GET(req: NextRequest): Promise<Response> {
  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }
  return await new Promise<Response>((resolve) => {
    const db = new sqlite3.Database(dbPath);
    db.get('SELECT * FROM profiles WHERE userId = ?', [userId], (err, row) => {
      db.close();
      if (err) {
        resolve(NextResponse.json({ error: 'DB error' }, { status: 500 }));
      } else if (!row) {
        resolve(NextResponse.json({ error: 'Profile not found' }, { status: 404 }));
      } else {
        resolve(NextResponse.json(row));
      }
    });
  });
}
