
import { NextRequest, NextResponse } from 'next/server';
import sqlite3Init from 'sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs';

const sqlite3 = sqlite3Init.verbose();
const dbPath = path.join(process.cwd(), 'src/db/job-board.db');

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  return new Promise((resolve) => {
    const db = new sqlite3.Database(dbPath);
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, userRaw) => {
      db.close();
      if (err) {
        console.error('DB error in /api/auth/login:', err);
        resolve(NextResponse.json({ error: 'DB error', details: String(err) }, { status: 500 }));
        return;
      }
      const user = userRaw as { password?: string } | undefined;
      if (!user) {
        console.warn('User not found in /api/auth/login:', username);
        resolve(NextResponse.json({ error: 'User not found' }, { status: 401 }));
      } else {
        console.log('User found in /api/auth/login:', user);
        if (user.password && bcrypt.compareSync(password, user.password)) {
          const { password: _pw, ...userSafe } = user;
          resolve(NextResponse.json({ user: userSafe }));
        } else {
          resolve(NextResponse.json({ error: 'Invalid password' }, { status: 401 }));
        }
      }
    });
  });
}
