"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Agendamento = {
  id: number;
  nome: string;
  telefone: string;
  servico: string;
  data: string;
  horario: string;
  status: string;
  created_at?: string;
};

export default function MeuAgendamento() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  const [agendamento, setAgendamento] =
    useState<Agendamento | null>(null);

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<
    "sucesso" | "erro" | ""
  >("");

  const [carregando, setCarregando] = useState(false);

  // =====================================================
  // CONSULTAR AGENDAMENTO
  // =====================================================

  async function consultarAgendamento() {
    setMensagem("");
    setTipoMensagem("");
    setAgendamento(null);

    if (!nome.trim()) {
      setMensagem("Digite seu nome.");
      setTipoMensagem("erro");
      return;
    }

    if (!telefone.trim()) {
      setMensagem("Digite seu telefone.");
      setTipoMensagem("erro");
      return;
    }

    setCarregando(true);

    const { data, error } = await supabase
      .from("agendamentos")
      .select("*")
      .eq("nome", nome.trim())
      .eq("telefone", telefone.trim())
      .eq("status", "agendado")
      .order("data", { ascending: true })
      .order("horario", { ascending: true })
      .limit(1)
      .maybeSingle();

    setCarregando(false);

    if (error) {
      console.error("Erro ao consultar:", error);

      setMensagem(
        "Não foi possível consultar o agendamento."
      );

      setTipoMensagem("erro");

      return;
    }

    if (!data) {
      setMensagem(
        "Não encontramos seu agendamento. Verifique o nome e telefone informados."
      );

      setTipoMensagem("erro");

      return;
    }

    setAgendamento(data);
  }

  // =====================================================
  // CANCELAR AGENDAMENTO
  // =====================================================

  async function cancelarAgendamento() {
    if (!agendamento) return;

    // Junta data + horário
    //
    // Exemplo:
    // 2026-08-08 + 15:00:00
    //
    // Resultado:
    // 2026-08-08T15:00:00

    const dataHoraAgendamento = new Date(
      `${agendamento.data}T${agendamento.horario}`
    );

    // Calcula 30 minutos antes
    const limiteCancelamento = new Date(
      dataHoraAgendamento.getTime() -
        30 * 60 * 1000
    );

    // Horário atual
    const agora = new Date();

    // =====================================================
    // VERIFICAÇÃO DOS 30 MINUTOS
    // =====================================================

    if (agora >= limiteCancelamento) {
      setMensagem(
        "Não é mais possível cancelar este agendamento. O cancelamento só pode ser feito até 30 minutos antes do horário."
      );

      setTipoMensagem("erro");

      return;
    }

    // =====================================================
    // CONFIRMAÇÃO
    // =====================================================

    const confirmar = window.confirm(
      "Tem certeza que deseja cancelar este agendamento?"
    );

    if (!confirmar) return;

    setCarregando(true);
    setMensagem("");
    setTipoMensagem("");

    // =====================================================
    // ATUALIZA O STATUS NO SUPABASE
    // =====================================================

    const { error } = await supabase
      .from("agendamentos")
      .update({
        status: "cancelado",
      })
      .eq("id", agendamento.id);

    setCarregando(false);

    if (error) {
      console.error("Erro ao cancelar:", error);

      setMensagem(
        "Não foi possível cancelar o agendamento."
      );

      setTipoMensagem("erro");

      return;
    }

    // Atualiza a tela
    setAgendamento({
      ...agendamento,
      status: "cancelado",
    });

    setMensagem(
      "Agendamento cancelado com sucesso!"
    );

    setTipoMensagem("sucesso");
  }

  // =====================================================
  // FORMATAR DATA
  // =====================================================

  function formatarData(data: string) {
    const partes = data.split("-");

    if (partes.length !== 3) {
      return data;
    }

    const [ano, mes, dia] = partes;

    return `${dia}/${mes}/${ano}`;
  }

  // =====================================================
  // TELA
  // =====================================================

  return (
    <main
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>Meu Agendamento</h1>

      <p>
        Informe seu nome e telefone utilizados
        no momento do agendamento.
      </p>

      {/* =================================================
          AVISO DOS 30 MINUTOS
      ================================================= */}

      <div
        style={{
          marginTop: "15px",
          padding: "14px",
          backgroundColor: "#fff3cd",
          border: "1px solid #ffe69c",
          borderRadius: "8px",
          color: "#664d03",
          fontSize: "14px",
        }}
      >
        ⚠️ <strong>Atenção:</strong> o cancelamento
        só pode ser realizado até 30 minutos antes
        do horário agendado.
      </div>

      {/* =================================================
          NOME
      ================================================= */}

      <label
        htmlFor="nome"
        style={{
          display: "block",
          marginTop: "25px",
          marginBottom: "6px",
          fontWeight: "bold",
        }}
      >
        Nome
      </label>

      <input
        id="nome"
        type="text"
        placeholder="Digite seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />

      {/* =================================================
          TELEFONE
      ================================================= */}

      <label
        htmlFor="telefone"
        style={{
          display: "block",
          marginTop: "15px",
          marginBottom: "6px",
          fontWeight: "bold",
        }}
      >
        Telefone
      </label>

      <input
        id="telefone"
        type="tel"
        placeholder="Ex: 19999999999"
        value={telefone}
        onChange={(e) =>
          setTelefone(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />

      {/* =================================================
          BOTÃO CONSULTAR
      ================================================= */}

      <button
        onClick={consultarAgendamento}
        disabled={carregando}
        style={{
          width: "100%",
          padding: "13px",
          marginTop: "20px",
          border: "none",
          borderRadius: "6px",
          cursor: carregando
            ? "not-allowed"
            : "pointer",
        }}
      >
        {carregando
          ? "Consultando..."
          : "Consultar agendamento"}
      </button>

      {/* =================================================
          MENSAGEM
      ================================================= */}

      {mensagem && (
        <div
          style={{
            marginTop: "20px",
            padding: "14px 16px",
            borderRadius: "8px",

            backgroundColor:
              tipoMensagem === "sucesso"
                ? "#dcfce7"
                : "#fee2e2",

            border:
              tipoMensagem === "sucesso"
                ? "1px solid #86efac"
                : "1px solid #fca5a5",

            color:
              tipoMensagem === "sucesso"
                ? "#166534"
                : "#991b1b",

            fontWeight: "500",
          }}
        >
          {mensagem}
        </div>
      )}

      {/* =================================================
          RESULTADO DO AGENDAMENTO
      ================================================= */}

      {agendamento && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
          }}
        >
          <h2>Seu agendamento</h2>

          <p>
            <strong>Nome:</strong>{" "}
            {agendamento.nome}
          </p>

          <p>
            <strong>Telefone:</strong>{" "}
            {agendamento.telefone}
          </p>

          <p>
            <strong>Serviço:</strong>{" "}
            {agendamento.servico}
          </p>

          <p>
            <strong>Data:</strong>{" "}
            {formatarData(agendamento.data)}
          </p>

          <p>
            <strong>Horário:</strong>{" "}
            {agendamento.horario.substring(0, 5)}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {agendamento.status === "agendado"
              ? "Agendado"
              : "Cancelado"}
          </p>

          {/* =================================================
              BOTÃO CANCELAR
          ================================================= */}

          {agendamento.status === "agendado" && (
            <button
              onClick={cancelarAgendamento}
              disabled={carregando}
              style={{
                width: "100%",
                padding: "13px",
                marginTop: "15px",
                border: "none",
                borderRadius: "6px",
                cursor: carregando
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {carregando
                ? "Cancelando..."
                : "Cancelar agendamento"}
            </button>
          )}
        </div>
      )}
    </main>
  );
}