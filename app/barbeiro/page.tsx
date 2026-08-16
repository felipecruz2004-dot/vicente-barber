"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Agendamento = {
  id: number;
  nome: string;
  telefone: string;
  servico: string;
  data: string;
  horario: string;
  status?: string;
  created_at: string;
};

export default function Barbeiro() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarAgendamentos() {
    setCarregando(true);
    setErro("");

    const hoje = new Date();

    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    const dataHoje = `${ano}-${mes}-${dia}`;

    const { data, error } = await supabase
      .from("agendamentos")
      .select("*")
      .eq("data", dataHoje)
      .order("horario", { ascending: true });

    if (error) {
      console.error(error);
      setErro("Não foi possível carregar os agendamentos.");
      setAgendamentos([]);
    } else {
      setAgendamentos(data || []);
    }

    setCarregando(false);
  }

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  const agendamentosAtivos = agendamentos.filter(
    (agendamento) => agendamento.status !== "cancelado"
  );

  return (
    <main className="min-h-screen bg-black text-white">
      {/* CABEÇALHO */}
      <header className="border-b border-gray-800 px-6 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-wider">
              VICENTE
            </h1>

            <p className="text-xs tracking-[0.3em] text-gray-400">
              BARBER SHOP
            </p>
          </div>

          <span className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-gray-300">
            Área do barbeiro
          </span>
        </div>
      </header>

      {/* CONTEÚDO */}
      <section className="mx-auto max-w-6xl px-6 py-10">

        {/* TÍTULO */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
              Agenda
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              Agenda de hoje
            </h2>

            <p className="mt-2 text-gray-400">
              Confira os clientes agendados para hoje.
            </p>
          </div>

          <button
            onClick={carregarAgendamentos}
            className="rounded-xl border border-gray-700 px-5 py-3 font-semibold transition hover:border-yellow-500 hover:text-yellow-500"
          >
            🔄 Atualizar
          </button>
        </div>

        {/* RESUMO */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
            <p className="text-sm text-gray-400">
              Agendamentos hoje
            </p>

            <p className="mt-2 text-3xl font-bold text-yellow-500">
              {agendamentosAtivos.length}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
            <p className="text-sm text-gray-400">
              Cancelados
            </p>

            <p className="mt-2 text-3xl font-bold text-red-500">
              {
                agendamentos.filter(
                  (agendamento) =>
                    agendamento.status === "cancelado"
                ).length
              }
            </p>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
            <p className="text-sm text-gray-400">
              Total registrados
            </p>

            <p className="mt-2 text-3xl font-bold">
              {agendamentos.length}
            </p>
          </div>

        </div>

        {/* AGENDA */}
        <div className="mt-10">

          <h3 className="mb-5 text-2xl font-bold">
            Clientes
          </h3>

          {carregando && (
            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-8 text-center text-gray-400">
              Carregando agenda...
            </div>
          )}

          {erro && (
            <div className="rounded-2xl border border-red-800 bg-red-950 p-6 text-center text-red-300">
              {erro}
            </div>
          )}

          {!carregando && !erro && agendamentos.length === 0 && (
            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-10 text-center">
              <p className="text-xl font-semibold">
                Nenhum agendamento hoje.
              </p>

              <p className="mt-2 text-gray-400">
                Quando um cliente agendar, ele aparecerá aqui.
              </p>
            </div>
          )}

          {!carregando && !erro && agendamentos.length > 0 && (
            <div className="space-y-4">

              {agendamentos.map((agendamento) => {

                const cancelado =
                  agendamento.status === "cancelado";

                return (
                  <div
                    key={agendamento.id}
                    className={`rounded-2xl border p-6 ${
                      cancelado
                        ? "border-red-900 bg-red-950/30"
                        : "border-gray-800 bg-gray-950"
                    }`}
                  >

                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                      {/* HORÁRIO */}
                      <div className="md:w-32">
                        <p className="text-3xl font-bold text-yellow-500">
                          {agendamento.horario.slice(0, 5)}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Horário
                        </p>
                      </div>

                      {/* CLIENTE */}
                      <div className="flex-1">
                        <p className="text-xl font-bold">
                          {agendamento.nome}
                        </p>

                        <p className="mt-1 text-gray-400">
                          📱 {agendamento.telefone}
                        </p>
                      </div>

                      {/* SERVIÇO */}
                      <div>
                        <p className="text-sm text-gray-500">
                          Serviço
                        </p>

                        <p className="mt-1 font-semibold">
                          {agendamento.servico}
                        </p>
                      </div>

                      {/* STATUS */}
                      <div>
                        {cancelado ? (
                          <span className="inline-block rounded-full bg-red-900 px-4 py-2 text-sm font-semibold text-red-200">
                            Cancelado
                          </span>
                        ) : (
                          <span className="inline-block rounded-full bg-green-900 px-4 py-2 text-sm font-semibold text-green-200">
                            Confirmado
                          </span>
                        )}
                      </div>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>

      </section>
    </main>
  );
}