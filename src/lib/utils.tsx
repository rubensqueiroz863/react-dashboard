export const formatPrice = (price: number | null) => {
    if (!price) return "R$ 0.00";

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(price);
};

export const formatTransactions = (price: number | null) => {
    if (!price) return "R$ 0.00";

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(price);
};

export const subscriptionsFeatures = [
[
    "• Sem Conexão Bancária",
    "• Controle manual de contas e cartões",
    "• Criação de categorias e subcategorias",
    "• Limite de gastos ilimitados",
    "• Alerta de contas a pagar",
    "• Relatórios completos e fáceis de entender",
    "• Teste por 7 dias grátis",
],
[
    "• Tudo do Plano Manual",
    "• Até 3 contas/cartões conectados",
    "• Conexão via Open Finance",
    "• Importe vários lançamentos com 1 clique",
    "• Categorize os lançamentos do seu jeito",
    "• Mais agilidade para organizar finanças",
    "• Sem teste grátis",
],
[
    "• Tudo do Plano Manual",
    "• Tudo do Plano Conectado",
    "• Até 10 contas/cartões conectados",
    "• Sem teste grátis",
    "•",
    "•",
    "•",
],
];