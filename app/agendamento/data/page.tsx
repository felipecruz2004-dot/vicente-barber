"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const diasSemana = [
  "DOM",
  "SEG",
  "TER",
  "QUA",
  "QUI",
  "SEX",
  "SÁB",
];

const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export default function Data() {
  const searchParams = useSearchParams();

  const servico = searchParams.get("servico");

  // Data atual
  const hoje = new Date();

  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();

  // Quantidade de dias do mês atual
  const quantidadeDias = new Date(
    ano,
    mes + 1,
    0
  ).getDate();

  // Cria todos os dias do mês
  const dias = Array.from(
    { length: quantidadeDias },
    (_, index) => {
      const dia = index + 1;

      const data = new Date(
        ano,
        mes,
        dia
      );

      return {
        dia,
        diaSemana: diasSemana[data.getDay()],
        mes: meses[mes],
        data: `${String(dia).padStart(2, "0")}-${String(
          mes + 1
        ).padStart(2, "0")}-${ano}`,
      };
    }
  );

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">

      <div className="mx-auto max-w-2xl">

        {/* CABEÇALHO */}
        <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
          Vicente Barber Shop
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Escolha a data
        </h1>

        <p className="mt-3 text-gray-400">
          Serviço selecionado:
        </p>

        <p className="mt-1 text-lg font-semibold text-yellow-500">
          {servico}
        </p>

        {/* MÊS */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold">
            {meses[mes]} {ano}
          </h2>
        </div>

        {/* DATAS */}
        <div className="mt-6 grid grid-cols-2 gap-4">

          {dias.map((item) => (
            <Link
              key={item.data}
              href={`/agendamento/horario?servico=${encodeURIComponent(
                servico || ""
              )}&data=${item.data}`}
              className="rounded-2xl border border-gray-800 bg-gray-950 p-5 text-center transition hover:border-yellow-500 hover:bg-gray-900"
            >

              <p className="text-sm text-gray-400">
                {item.diaSemana}
              </p>

              <p className="mt-2 text-3xl font-bold">
                {String(item.dia).padStart(2, "0")}
              </p>

              <p className="text-sm text-gray-400">
                {item.mes}
              </p>

            </Link>
          ))}

        </div>

        {/* VOLTAR */}
        <Link
          href="/agendamento"
          className="mt-8 block text-center text-sm text-gray-400 hover:text-white"
        >
          ← Voltar para serviços
        </Link>

      </div>

    </main>
  );
}