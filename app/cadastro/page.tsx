"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Cadastro() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function cadastrar(e: React.FormEvent) {
    console.log("BOTÃO CRIAR CONTA FOI CLICADO");
    e.preventDefault();

    setErro("");
    setSucesso("");

    if (senha !== confirmarSenha) {
      setErro("As senhas não são iguais.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    setCarregando(true);

    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (error) {
      setErro(error.message);
      setCarregando(false);
      return;
    }

    setSucesso(
      "Conta criada! Verifique seu e-mail para confirmar o cadastro."
    );

    setCarregando(false);
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-md">

        <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
          Vicente Barber Shop
        </p>

        <h1 className="mt-4 text-4xl font-bold">
          Criar conta
        </h1>

        <p className="mt-3 text-gray-400">
          Crie sua conta para fazer seus agendamentos.
        </p>

        <form onSubmit={cadastrar} className="mt-8 space-y-5">

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              E-mail
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="w-full rounded-xl border border-gray-800 bg-gray-950 p-4 text-white outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Senha
            </label>

            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
              className="w-full rounded-xl border border-gray-800 bg-gray-950 p-4 text-white outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Confirmar senha
            </label>

            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Digite a senha novamente"
              required
              className="w-full rounded-xl border border-gray-800 bg-gray-950 p-4 text-white outline-none focus:border-yellow-500"
            />
          </div>

          {erro && (
            <div className="rounded-xl border border-red-800 bg-red-950 p-4 text-red-300">
              {erro}
            </div>
          )}

          {sucesso && (
            <div className="rounded-xl border border-green-800 bg-green-950 p-4 text-green-300">
              {sucesso}
            </div>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded-xl bg-yellow-500 p-4 font-bold text-black transition hover:bg-yellow-400 disabled:opacity-50"
          >
            {carregando ? "Criando conta..." : "Criar conta"}
          </button>

        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Já possui uma conta?
          </p>

          <button
            onClick={() => router.push("/login")}
            className="mt-2 font-semibold text-yellow-500 hover:text-yellow-400"
          >
            Fazer login
          </button>
        </div>

      </div>
    </main>
  );
}