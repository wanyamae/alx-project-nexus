import { NextRequest, NextResponse } from 'next/server';
import sqlite3Init from 'sqlite3';
import path from 'path';

const sqlite3 = sqlite3Init.verbose();
const dbPath = path.join(process.cwd(), 'src/db/job-board.db');

export async function POST(req: NextRequest): Promise<Response> {
  const data = await req.json();
  const { id, name, email, bio, skills, experience } = data;
  return await new Promise<Response>((resolve) => {
    const db = new sqlite3.Database(dbPath);
    db.run(
      `UPDATE profiles SET name = ?, email = ?, bio = ?, skills = ?, experience = ? WHERE id = ?`,
      [name, email, bio, skills, experience, id],
      function (err) {
        db.close();
        if (err) {
          resolve(NextResponse.json({ error: 'DB error', details: String(err) }, { status: 500 }));
        } else {
          resolve(NextResponse.json({ success: true }));
        }
      }
    );
  });
}
