"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import users from '../data/users.json';
import type { User, AuthContextType } from '../interface';
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
        setLoading(false);
    }, []);

    const login = (username: string, password: string): boolean => {
        const found = users.find(
            (u) => u.username === username && u.password === password
        );

        if (found) {
            setUser(found);
            localStorage.setItem("user", JSON.stringify(found));
            return true;
        }
        return false;
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
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
}