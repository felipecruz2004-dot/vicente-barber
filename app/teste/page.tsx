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
  created_at: string;
};

export default function Teste() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function buscarAgendamentos() {
      setCarregando(true);
      setErro("");

      const { data, error } = await supabase
        .from("agendamentos")
        .select("*")
        .order("data", { ascending: true })
        .order("horario", { ascending: true });

      if (error) {
        console.error("Erro ao buscar agendamentos:", error);
        setErro(error.message);
        setCarregando(false);
        return;
      }

      setAgendamentos(data || []);
      setCarregando(false);
    }

    buscarAgendamentos();
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">

        <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
          Vicente Barber Shop
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Teste do Supabase
        </h1>

        {carregando && (
          <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-950 p-6">
            <p className="text-gray-400">
              Carregando agendamentos...
            </p>
          </div>
        )}

        {!carregando && erro && (
          <div className="mt-8 rounded-2xl border border-red-800 bg-red-950 p-6">
            <h2 className="font-bold text-red-400">
              Erro ao conectar com a tabela
            </h2>

            <p className="mt-2 text-red-200">
              {erro}
            </p>
          </div>
        )}

        {!carregando && !erro && agendamentos.length === 0 && (
          <div className="mt-8 rounded-2xl border border-green-800 bg-green-950 p-6">
            <h2 className="font-bold text-green-400">
              Conexão funcionando!
            </h2>

            <p className="mt-2 text-green-200">
              A tabela "agendamentos" está vazia.
            </p>

            <p className="mt-4 text-sm text-gray-400">
              Isso é normal. Ainda não existe nenhum agendamento cadastrado.
            </p>
          </div>
        )}

        {!carregando && !erro && agendamentos.length > 0 && (
          <div className="mt-8 space-y-4">

            <h2 className="text-xl font-bold">
              Agendamentos encontrados
            </h2>

            {agendamentos.map((agendamento) => (
              <div
                key={agendamento.id}
                className="rounded-2xl border border-gray-800 bg-gray-950 p-6"
              >
                <p>
                  <strong>Nome:</strong> {agendamento.nome}
                </p>

                <p className="mt-2">
                  <strong>Telefone:</strong> {agendamento.telefone}
                </p>

                <p className="mt-2">
                  <strong>Serviço:</strong> {agendamento.servico}
                </p>

                <p className="mt-2">
                  <strong>Data:</strong> {agendamento.data}
                </p>

                <p className="mt-2">
                  <strong>Horário:</strong> {agendamento.horario}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}