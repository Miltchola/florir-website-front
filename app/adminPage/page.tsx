"use client";
import React, { useEffect } from 'react';
import { Header } from '../sharedComponents/layout/Header';

export default function AdminPage() {
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            window.location.href = "/login";
        }
    }, []);

    const navLinks = [
        { label: 'VOLTAR', href: '/' },
    ];

    return (
        <div>
            <Header
                navLinks={navLinks}
            />
            <span>TEXTO</span>
        </div>
    );
}