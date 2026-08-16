"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Confirmacao() {
  const searchParams = useSearchParams();

  const servico = searchParams.get("servico") || "";
  const data = searchParams.get("data") || "";
  const horario = searchParams.get("horario") || "";
  const nome = searchParams.get("nome") || "";
  const telefone = searchParams.get("telefone") || "";

  const [salvando, setSalvando] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const [erro, setErro] = useState("");

  async function confirmarAgendamento() {
    setSalvando(true);
    setErro("");

    /*
     * Verifica se todos os dados existem.
     */

    if (
      !nome ||
      !telefone ||
      !servico ||
      !data ||
      !horario
    ) {
      setErro(
        "Não foi possível realizar o agendamento. Alguns dados estão faltando."
      );

      setSalvando(false);

      return;
    }


    /*
     * Converte:
     *
     * 08-08-2026
     *
     * para:
     *
     * 2026-08-08
     */

    const partesData = data.split("-");

    if (partesData.length !== 3) {
      setErro("A data selecionada é inválida.");

      setSalvando(false);

      return;
    }

    const dataBanco =
      `${partesData[2]}-${partesData[1]}-${partesData[0]}`;


    console.log("Tentando salvar agendamento:");

    console.log({
      nome,
      telefone,
      servico,
      data: dataBanco,
      horario,
    });


    /*
     * SALVA NO SUPABASE
     */

    const { error } = await supabase
      .from("agendamentos")
      .insert({
        nome,
        telefone,
        servico,
        data: dataBanco,
        horario,
      });


    /*
     * ERRO
     */

    if (error) {

      console.error(
        "Erro ao salvar agendamento:",
        error
      );


      /*
       * Código 23505 =
       * registro duplicado.
       *
       * Isso acontece quando alguém
       * já reservou o mesmo dia e horário.
       */

      if (error.code === "23505") {

        setErro(
          "Esse horário acabou de ser reservado por outra pessoa. Por favor, volte e escolha outro horário."
        );

      } else {

        setErro(error.message);

      }


      setSalvando(false);

      return;
    }


    /*
     * SUCESSO
     */

    console.log(
      "Agendamento salvo com sucesso!"
    );

    setSalvo(true);
    setSalvando(false);
  }


  return (

    <main className="min-h-screen bg-black px-6 py-12 text-white">

      <div className="mx-auto max-w-2xl">


        {/* CABEÇALHO */}

        <div className="text-center">

          <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
            Vicente Barber Shop
          </p>


          {!salvo ? (

            <>

              <h1 className="mt-6 text-4xl font-bold">
                Confirmar agendamento
              </h1>

              <p className="mt-3 text-gray-400">
                Confira os dados antes de confirmar.
              </p>

            </>

          ) : (

            <>

              <div className="mx-auto mt-8 flex h-20 w-20 items-center justify-center rounded-full bg-green-600">

                <span className="text-4xl font-bold">
                  ✓
                </span>

              </div>


              <h1 className="mt-6 text-4xl font-bold">
                Agendamento confirmado!
              </h1>


              <p className="mt-3 text-gray-400">
                Tudo certo, {nome}!
              </p>

            </>

          )}

        </div>


        {/* RESUMO */}

        <div className="mt-10 rounded-2xl border border-gray-800 bg-gray-950 p-6">

          <h2 className="text-xl font-bold">
            Detalhes do agendamento
          </h2>


          <div className="mt-6 space-y-5">


            {/* CLIENTE */}

            <div>

              <p className="text-sm text-gray-400">
                Cliente
              </p>

              <p className="font-semibold">
                {nome}
              </p>

            </div>


            {/* TELEFONE */}

            <div>

              <p className="text-sm text-gray-400">
                Telefone
              </p>

              <p className="font-semibold">
                {telefone}
              </p>

            </div>


            {/* SERVIÇO */}

            <div>

              <p className="text-sm text-gray-400">
                Serviço
              </p>

              <p className="font-semibold">
                {servico}
              </p>

            </div>


            {/* DATA */}

            <div>

              <p className="text-sm text-gray-400">
                Data
              </p>

              <p className="font-semibold">
                {data}
              </p>

            </div>


            {/* HORÁRIO */}

            <div>

              <p className="text-sm text-gray-400">
                Horário
              </p>

              <p className="text-2xl font-bold text-yellow-500">
                {horario}
              </p>

            </div>

          </div>

        </div>


        {/* ERRO */}

        {erro && (

          <div className="mt-6 rounded-2xl border border-red-800 bg-red-950 p-5">

            <p className="font-bold text-red-400">
              Não foi possível realizar o agendamento.
            </p>


            <p className="mt-2 text-red-200">
              {erro}
            </p>

          </div>

        )}


        {/* BOTÃO CONFIRMAR */}

        {!salvo && (

          <button
            type="button"
            onClick={confirmarAgendamento}
            disabled={salvando}
            className="mt-8 w-full rounded-xl bg-red-900 px-6 py-4 text-center font-semibold transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
          >

            {salvando
              ? "Salvando agendamento..."
              : "Confirmar agendamento"}

          </button>

        )}


        {/* SUCESSO */}

        {salvo && (

          <div className="mt-6 rounded-2xl border border-yellow-900 bg-yellow-950/30 p-5">

            <p className="text-sm text-yellow-200">
              📱 Guarde essas informações. Seu horário foi
              registrado com sucesso.
            </p>

          </div>

        )}


        {/* VOLTAR */}

        {salvo && (

          <Link
            href="/"
            className="mt-8 block w-full rounded-xl bg-red-900 px-6 py-4 text-center font-semibold transition hover:bg-red-800"
          >
            Voltar para o início
          </Link>

        )}

      </div>

    </main>

  );
}