"use client";
import React, { useState } from 'react';
import { TextField } from './components/TextField';
import { SectionTitle } from '../sharedComponents/ui/SectionTitle';
import { Button } from '../sharedComponents/ui/Button';
import Image from 'next/image';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8000/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password: senha })
            });
            if (res.ok) {
                alert("Login realizado com sucesso!");
            } else {
                alert("E-mail ou senha inválidos.");
            }
        } catch (err) {
            alert("Erro ao conectar ao servidor.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background-primary">
            <SectionTitle
                title="Login de Usuário"
                text="Faça Login para gerenciar as informações do site"
            />
            <div className="flex flex-row bg-[#DDB7AB] rounded-3xl p-8 gap-8 mt-8 shadow-lg max-w-3xl w-full justify-center items-center">
                {/* Formulário */}
                <form onSubmit={handleLogin} className="flex flex-col">
                    <div className="bg-white rounded-2xl p-8 gap-4 w-[320px] min-w-[280px] max-w-[350px]">
                        <TextField
                            title="E-mail:"
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="exemplo@email.com"
                        />
                        <TextField
                            title="Senha:"
                            type="password"
                            required
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            placeholder="Digite sua senha"
                        />
                    </div>
                    <div className="flex justify-center mt-4">
                        <Button text={loading ? "Entrando..." : "Login"} buttonColor="light" />
                    </div>
                </form>
                {/* Imagem */}
                <div className="hidden md:block">
                    <Image
                        src="/images/Bolo Florido.jpeg"
                        alt="Login Visual"
                        width={260}
                        height={260}
                        className="rounded-2xl object-cover"
                    />
                </div>
            </div>
        </div>
    );
}