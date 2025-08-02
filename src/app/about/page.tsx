import NavBar from "../components/NavBar";

export default function About() {
    return (
        <div>
            <NavBar />
            <main className="max-w-3xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">Sobre o Projeto</h1>
                
                <section className="space-y-4 text-lg leading-relaxed text-gray-800">
                    <p>
                        O <strong>Dashboard Financeiro Pessoal</strong> é uma aplicação web desenvolvida com <strong>React</strong> e <strong>Next.js</strong>, criada para facilitar o controle das finanças pessoais de forma prática, rápida e intuitiva. A plataforma permite o registro e acompanhamento de receitas, despesas e saldo mensal, oferecendo uma visão clara da saúde financeira do usuário.
                    </p>

                    <p>
                        O sistema foi projetado para ser totalmente responsivo e de fácil usabilidade, permitindo a categorização de gastos, análise de desempenho financeiro ao longo do tempo e visualização dos dados por meio de gráficos e relatórios interativos.
                    </p>

                    <p>
                        Este projeto também tem como objetivo consolidar conhecimentos em desenvolvimento web moderno, com foco na criação de componentes reutilizáveis, uso de hooks do React, roteamento dinâmico com Next.js e integração com APIs. É uma iniciativa prática para unir tecnologia e organização financeira em uma única solução.
                    </p>
                </section>
            </main>
        </div>
    );
}
