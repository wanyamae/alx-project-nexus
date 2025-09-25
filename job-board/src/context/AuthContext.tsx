"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthContextType } from '../interface';
import Cookies from 'js-cookie';
import bcrypt from 'bcryptjs';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = Cookies.get("user");
        if (storedUser) setUser(JSON.parse(storedUser));
        setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (data.user) {
            setUser(data.user);
            Cookies.set("user", JSON.stringify(data.user), { secure: true, sameSite: 'strict', expires: 0.3 });
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        Cookies.remove("user");
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};