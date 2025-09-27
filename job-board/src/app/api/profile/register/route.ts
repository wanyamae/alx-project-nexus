import { NextRequest, NextResponse } from 'next/server';
import sqlite3Init from 'sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs';

const sqlite3 = sqlite3Init.verbose();
const dbPath = path.join(process.cwd(), 'src/db/job-board.db');

export async function POST(req: NextRequest): Promise<Response> {
  const data = await req.json();
  // Hash password if present
  if (data.password && !data.password.startsWith('$2b$')) {
    data.password = bcrypt.hashSync(data.password, 8);
  }
  // Insert user
  return await new Promise<Response>((resolve) => {
    const db = new sqlite3.Database(dbPath);
    db.run(
      `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`,
      [
        data.username,
        data.password,
        data.role || 'user'],
      function (err) {
        if (err) {
          db.close();
          resolve(NextResponse.json({ error: 'User insert error', details: String(err) }, { status: 500 }));
        } else {
          // Insert profile
          const userId = this.lastID;
          db.run(
            `INSERT INTO profiles (name, username, userId, email, bio, skills, experience) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              data.name,
              data.username,
              userId,
              data.email,
              data.bio || '',
              data.skills || '',
              data.experience || ''
            ],
            function (err2) {
              db.close();
              if (err2) {
                resolve(NextResponse.json({ error: 'Profile insert error', details: String(err2) }, { status: 500 }));
              } else {
                resolve(NextResponse.json({ success: true }));
              }
            }
          );
        }
      }
    );
  });
}
