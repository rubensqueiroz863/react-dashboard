import Checkout from "../components/Checkout";

export default function PaginaCompra() {
  const item = {
    id: "sub_123",
    price: 2000, // em centavos
    name: "Assinatura Premium",
    description: "Acesso ilimitado por 1 mês",
    currency: "brl"
  };

  return <Checkout item={item} />;
}
