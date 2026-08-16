"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Agendamento() {
  const router = useRouter();

  const [servicoSelecionado, setServicoSelecionado] = useState("");
  const [verificandoLogin, setVerificandoLogin] = useState(true);

  useEffect(() => {
    async function verificarUsuario() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      setVerificandoLogin(false);
    }

    verificarUsuario();
  }, [router]);

  // Enquanto verifica se o usuário está logado
  if (verificandoLogin) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">
          Verificando acesso...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-2xl px-6 py-12">

        <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
          Vicente Barber Shop
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Agende seu horário
        </h1>

        <p className="mt-3 text-gray-400">
          Primeiro, escolha o serviço que deseja realizar.
        </p>

        <div className="mt-10 space-y-4">

          {/* CORTE */}
          <button
            type="button"
            onClick={() => setServicoSelecionado("Corte")}
            className={`w-full rounded-2xl border p-6 text-left transition ${
              servicoSelecionado === "Corte"
                ? "border-yellow-500 bg-gray-900"
                : "border-gray-800 bg-gray-950 hover:border-yellow-500"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  Corte
                </h2>

                <p className="mt-1 text-gray-400">
                  Corte masculino • 40 min
                </p>
              </div>

              <span className="text-xl font-bold text-yellow-500">
                R$ 40
              </span>
            </div>
          </button>

          {/* BARBA */}
          <button
            type="button"
            onClick={() => setServicoSelecionado("Barba")}
            className={`w-full rounded-2xl border p-6 text-left transition ${
              servicoSelecionado === "Barba"
                ? "border-yellow-500 bg-gray-900"
                : "border-gray-800 bg-gray-950 hover:border-yellow-500"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  Barba
                </h2>

                <p className="mt-1 text-gray-400">
                  Barba completa • 25 min
                </p>
              </div>

              <span className="text-xl font-bold text-yellow-500">
                R$ 25
              </span>
            </div>
          </button>

          {/* CORTE + BARBA */}
          <button
            type="button"
            onClick={() => setServicoSelecionado("Corte + Barba")}
            className={`w-full rounded-2xl border p-6 text-left transition ${
              servicoSelecionado === "Corte + Barba"
                ? "border-yellow-500 bg-gray-900"
                : "border-gray-800 bg-gray-950 hover:border-yellow-500"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  Corte + Barba
                </h2>

                <p className="mt-1 text-gray-400">
                  Corte + barba • 1 hora
                </p>
              </div>

              <span className="text-xl font-bold text-yellow-500">
                R$ 60
              </span>
            </div>
          </button>

        </div>

        {/* CONTINUAR */}
        {servicoSelecionado && (
          <Link
            href={`/agendamento/data?servico=${encodeURIComponent(
              servicoSelecionado
            )}`}
            className="mt-8 block w-full rounded-xl bg-red-900 px-6 py-4 text-center font-semibold transition hover:bg-red-800"
          >
            Continuar
          </Link>
        )}

      </div>
    </main>
  );
}