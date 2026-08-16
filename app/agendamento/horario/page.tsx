"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Horario() {
  const searchParams = useSearchParams();

  const servico = searchParams.get("servico");
  const data = searchParams.get("data");

  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Horários disponíveis:
  // 08:00 até 19:00
  // intervalo de 1 hora
  const horarios = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ];

  useEffect(() => {
    async function buscarHorariosOcupados() {
      setCarregando(true);
      setErro("");

      // Verifica se existe uma data
      if (!data) {
        setErro("Data não encontrada.");
        setCarregando(false);
        return;
      }

      /*
       * A data vem da tela anterior no formato:
       *
       * 17-08-2026
       *
       * Mas o Supabase utiliza:
       *
       * 2026-08-17
       */

      const partesData = data.split("-");

      if (partesData.length !== 3) {
        setErro("Data inválida.");
        setCarregando(false);
        return;
      }

      const dia = partesData[0];
      const mes = partesData[1];
      const ano = partesData[2];

      // Converte DD-MM-AAAA para AAAA-MM-DD
      const dataBanco = `${ano}-${mes}-${dia}`;

      console.log("Data recebida:", data);
      console.log("Data consultada no Supabase:", dataBanco);

      /*
       * Busca os horários já agendados
       * para a data selecionada.
       */

      const { data: agendamentos, error } = await supabase
        .from("agendamentos")
        .select("horario")
        .eq("data", dataBanco);

      if (error) {
        console.error(
          "Erro ao buscar horários:",
          error
        );

        setErro(
          "Não foi possível carregar os horários."
        );

        setCarregando(false);
        return;
      }

      /*
       * Converte os horários do banco.
       *
       * Exemplo:
       *
       * 09:00
       *
       * ou
       *
       * 09:00:00
       *
       * Os dois serão tratados como 09:00.
       */

      const ocupados = (agendamentos || []).map(
        (agendamento) =>
          String(agendamento.horario).slice(0, 5)
      );

      console.log(
        "Horários ocupados:",
        ocupados
      );

      setHorariosOcupados(ocupados);

      setCarregando(false);
    }

    buscarHorariosOcupados();
  }, [data]);

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">

      <div className="mx-auto max-w-2xl">

        {/* CABEÇALHO */}

        <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
          Vicente Barber Shop
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Escolha o horário
        </h1>

        {/* INFORMAÇÕES */}

        <div className="mt-6 rounded-2xl border border-gray-800 bg-gray-950 p-5">

          <p className="text-sm text-gray-400">
            Serviço
          </p>

          <p className="mt-1 font-semibold">
            {servico || "Não informado"}
          </p>

          <p className="mt-4 text-sm text-gray-400">
            Data
          </p>

          <p className="mt-1 font-semibold">
            {data || "Não informada"}
          </p>

        </div>

        {/* CARREGANDO */}

        {carregando && (
          <div className="mt-10 rounded-2xl border border-gray-800 bg-gray-950 p-6">

            <p className="text-gray-400">
              Verificando horários disponíveis...
            </p>

          </div>
        )}

        {/* ERRO */}

        {!carregando && erro && (
          <div className="mt-10 rounded-2xl border border-red-800 bg-red-950 p-6">

            <h2 className="font-bold text-red-400">
              Não foi possível carregar os horários
            </h2>

            <p className="mt-2 text-red-200">
              {erro}
            </p>

          </div>
        )}

        {/* HORÁRIOS */}

        {!carregando && !erro && (
          <>

            <h2 className="mt-10 text-xl font-bold">
              Horários disponíveis
            </h2>

            <div className="mt-5 grid grid-cols-3 gap-3">

              {horarios.map((horario) => {

                const ocupado =
                  horariosOcupados.includes(
                    horario
                  );

                const selecionado =
                  horarioSelecionado ===
                  horario;

                return (
                  <button
                    key={horario}
                    type="button"
                    disabled={ocupado}
                    onClick={() => {
                      if (!ocupado) {
                        setHorarioSelecionado(
                          horario
                        );
                      }
                    }}
                    className={`
                      rounded-xl
                      border
                      px-4
                      py-4
                      font-semibold
                      transition

                      ${
                        ocupado
                          ? "cursor-not-allowed border-gray-900 bg-gray-900 text-gray-600"
                          : selecionado
                          ? "border-yellow-500 bg-yellow-500 text-black"
                          : "border-gray-800 bg-gray-950 hover:border-yellow-500"
                      }
                    `}
                  >

                    {horario}

                    {ocupado && (
                      <span className="mt-1 block text-xs">
                        Ocupado
                      </span>
                    )}

                  </button>
                );
              })}

            </div>

            {/* LEGENDA */}

            <div className="mt-6 flex gap-5 text-sm text-gray-400">

              <div className="flex items-center gap-2">

                <span className="h-3 w-3 rounded-full bg-yellow-500" />

                Selecionado

              </div>

              <div className="flex items-center gap-2">

                <span className="h-3 w-3 rounded-full bg-gray-700" />

                Ocupado

              </div>

            </div>

            {/* HORÁRIO SELECIONADO */}

            {horarioSelecionado && (
              <div className="mt-6 rounded-xl border border-yellow-800 bg-yellow-950/30 p-4">

                <p className="text-sm text-gray-400">
                  Horário selecionado
                </p>

                <p className="mt-1 text-xl font-bold text-yellow-500">
                  {horarioSelecionado}
                </p>

              </div>
            )}

            {/* CONTINUAR */}

            {horarioSelecionado && (
              <Link
                href={`/agendamento/dados?servico=${encodeURIComponent(
                  servico || ""
                )}&data=${encodeURIComponent(
                  data || ""
                )}&horario=${encodeURIComponent(
                  horarioSelecionado
                )}`}
                className="mt-8 block w-full rounded-xl bg-red-900 px-6 py-4 text-center font-semibold transition hover:bg-red-800"
              >
                Continuar
              </Link>
            )}

          </>
        )}

        {/* VOLTAR */}

        <Link
          href={`/agendamento/data?servico=${encodeURIComponent(
            servico || ""
          )}`}
          className="mt-5 block text-center text-sm text-gray-400 hover:text-white"
        >
          ← Voltar para data
        </Link>

      </div>

    </main>
  );
}