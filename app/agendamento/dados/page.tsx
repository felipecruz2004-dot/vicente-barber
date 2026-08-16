"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Dados() {
  const searchParams = useSearchParams();

  const servico = searchParams.get("servico");
  const data = searchParams.get("data");
  const horario = searchParams.get("horario");

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  const podeContinuar =
    nome.trim() !== "" && telefone.trim() !== "";

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">

      <div className="mx-auto max-w-2xl">

        <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
          Vicente Barber Shop
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Seus dados
        </h1>

        <p className="mt-3 text-gray-400">
          Preencha seus dados para finalizar o agendamento.
        </p>


        {/* RESUMO */}
        <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-950 p-6">

          <h2 className="text-lg font-bold">
            Resumo do agendamento
          </h2>

          <div className="mt-5 space-y-4">

            <div>
              <p className="text-sm text-gray-400">
                Serviço
              </p>

              <p className="font-semibold">
                {servico}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Data
              </p>

              <p className="font-semibold">
                {data}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Horário
              </p>

              <p className="font-semibold">
                {horario}
              </p>
            </div>

          </div>

        </div>


        {/* FORMULÁRIO */}
        <div className="mt-8 space-y-6">

          <div>

            <label className="mb-2 block text-sm font-medium">
              Nome
            </label>

            <input
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-4 text-white outline-none transition focus:border-yellow-500"
            />

          </div>


          <div>

            <label className="mb-2 block text-sm font-medium">
              Telefone
            </label>

            <input
              type="tel"
              placeholder="(19) 99999-9999"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-4 text-white outline-none transition focus:border-yellow-500"
            />

          </div>

        </div>


        {/* CONTINUAR */}
        {podeContinuar && (
          <Link
            href={`/agendamento/confirmacao?servico=${encodeURIComponent(
              servico || ""
            )}&data=${encodeURIComponent(
              data || ""
            )}&horario=${encodeURIComponent(
              horario || ""
            )}&nome=${encodeURIComponent(
              nome
            )}&telefone=${encodeURIComponent(
              telefone
            )}`}
            className="mt-8 block w-full rounded-xl bg-red-900 px-6 py-4 text-center font-semibold transition hover:bg-red-800"
          >
            Continuar
          </Link>
        )}


        {/* VOLTAR */}
        <Link
          href={`/agendamento/horario?servico=${encodeURIComponent(
            servico || ""
          )}&data=${encodeURIComponent(
            data || ""
          )}`}
          className="mt-5 block text-center text-sm text-gray-400 hover:text-white"
        >
          ← Voltar para horário
        </Link>

      </div>

    </main>
  );
}