"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import users from '../data/users.json';
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

    const login = (username: string, password: string): boolean => {
        const found = users.find(
            (u) => u.username === username && bcrypt.compareSync(password, u.password)
        );

        if (found) {
            setUser(found);
            Cookies.set("user", JSON.stringify(found), { secure: true, sameSite: 'strict', expires: 0.3 }); 
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