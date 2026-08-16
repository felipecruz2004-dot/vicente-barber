import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Cabeçalho */}
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

          {/* ENTRAR */}
          <Link
            href="/login"
            className="rounded-lg border border-gray-700 px-4 py-2 text-sm transition hover:border-yellow-500 hover:text-yellow-500"
          >
            Entrar
          </Link>

        </div>
      </header>

      {/* Principal */}
      <section className="mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center px-6 text-center">

        <div className="mb-8 flex h-40 w-40 items-center justify-center rounded-full border-4 border-yellow-500 bg-white shadow-lg">
          <div>
            <p className="text-2xl font-black text-red-900">
              VICENTE
            </p>

            <p className="text-xs font-bold tracking-widest text-black">
              BARBER SHOP
            </p>
          </div>
        </div>

        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-yellow-500">
          Estilo • Precisão • Qualidade
        </p>

        <h2 className="text-4xl font-bold md:text-6xl">
          Seu estilo começa aqui.
        </h2>

        <p className="mt-5 max-w-xl text-gray-400">
          Escolha seu serviço, veja os horários disponíveis
          e agende seu corte de forma rápida e fácil.
        </p>

        {/* BOTÕES */}
        <div className="mt-8 flex w-full max-w-md flex-col gap-4">

          {/* AGENDAR HORÁRIO */}
          <Link
            href="/agendamento"
            className="w-full rounded-xl bg-red-900 px-10 py-4 text-lg font-semibold shadow-lg transition hover:bg-red-800"
          >
            Agendar horário
          </Link>

          {/* CONSULTAR AGENDAMENTO */}
          <Link
            href="/meu-agendamento"
            className="w-full rounded-xl border border-gray-700 bg-gray-950 px-10 py-4 text-lg font-semibold text-white transition hover:border-yellow-500 hover:text-yellow-500"
          >
            Consultar agendamento
          </Link>

        </div>

      </section>

      {/* Serviços */}
      <section className="border-t border-gray-800 px-6 py-16">

        <div className="mx-auto max-w-6xl">

          <h2 className="text-center text-3xl font-bold">
            Nossos serviços
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">

            {/* CORTE */}
            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
              <h3 className="text-xl font-bold">
                Corte
              </h3>

              <p className="mt-2 text-gray-400">
                Corte masculino
              </p>

              <p className="mt-5 text-2xl font-bold text-yellow-500">
                R$ 40
              </p>
            </div>

            {/* BARBA */}
            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
              <h3 className="text-xl font-bold">
                Barba
              </h3>

              <p className="mt-2 text-gray-400">
                Barba completa
              </p>

              <p className="mt-5 text-2xl font-bold text-yellow-500">
                R$ 25
              </p>
            </div>

            {/* CORTE + BARBA */}
            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
              <h3 className="text-xl font-bold">
                Corte + Barba
              </h3>

              <p className="mt-2 text-gray-400">
                Corte completo + barba
              </p>

              <p className="mt-5 text-2xl font-bold text-yellow-500">
                R$ 60
              </p>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}