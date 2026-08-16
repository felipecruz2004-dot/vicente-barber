"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function fazerLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErro("");
    setCarregando(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: senha,
    });

    if (error) {
      console.error("Erro no login:", error);

      setErro("E-mail ou senha incorretos.");
      setCarregando(false);
      return;
    }

    // Login realizado com sucesso
    router.push("/");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">

      <div className="mx-auto max-w-md">

        {/* CABEÇALHO */}
        <div className="text-center">

          <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
            Vicente Barber Shop
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            Entrar
          </h1>

          <p className="mt-3 text-gray-400">
            Entre na sua conta para agendar seu horário.
          </p>

        </div>

        {/* FORMULÁRIO */}
        <form
          onSubmit={fazerLogin}
          className="mt-10 space-y-5"
        >

          {/* E-MAIL */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              E-mail
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@email.com"
              required
              autoComplete="email"
              className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-4 text-white outline-none transition focus:border-yellow-500"
            />
          </div>

          {/* SENHA */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Senha
            </label>

            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Sua senha"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-4 text-white outline-none transition focus:border-yellow-500"
            />
          </div>

          {/* ERRO */}
          {erro && (
            <div className="rounded-xl border border-red-900 bg-red-950/40 p-4 text-sm text-red-400">
              {erro}
            </div>
          )}

          {/* BOTÃO */}
          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded-xl bg-red-900 px-6 py-4 font-semibold transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>

        </form>

        {/* CADASTRO */}
        <div className="mt-8 text-center">

          <p className="text-gray-400">
            Ainda não tem uma conta?
          </p>

          <Link
            href="/cadastro"
            className="mt-2 inline-block font-semibold text-yellow-500 hover:text-yellow-400"
          >
            Criar conta
          </Link>

        </div>

        {/* VOLTAR */}
        <div className="mt-6 text-center">

          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-white"
          >
            ← Voltar para o início
          </Link>

        </div>

      </div>

    </main>
  );
}