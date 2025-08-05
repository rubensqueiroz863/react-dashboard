import Header from "../components/Header";

export default function BankConnectionPage() {
    return (
        <div>
            <Header/>
            <hr className="mx-10 mb-20"/>
            <div className="mx-10">
                <div className="flex items-center">
                    <p className="text-black font-semibold text-xl">Conexão Bancária</p>
                    <div className="flex ml-2 py-1 bg-neutral-800 rounded-xl w-12 items-center justify-center">
                        <p className="text-white text-sm">
                            novo
                        </p>
                    </div>
                </div>
                <div className="font-bold text-5xl mt-2 font-sans">
                    <h1 className="">Importe suas finanças</h1>
                    <h1>com um clique</h1>
                </div>
                <p className=" my-2 w-140 text-xl">Conecte seus bancos e veja as suas movimentações bancárias centralizadas no FinanX com a tecnologia do Belvo.</p>
                <div className="flex flex-col gap-4">
                    <div className="h-15 p-5">
                        <p className="font-bold text-xl">
                            Menos trabalho, mais tempo livre
                        </p>
                        <p>
                            Seus lançamentos chegam prontos direto do seu banco.
                        </p>
                    </div>
                    <div className="h-15 p-5">
                        <p className="font-bold text-xl">
                            Seus gastos sob controle desde o primeiro dia
                        </p>
                        <p>
                            Traga seu histórico de <strong>90 dias</strong> e não comece do zero.
                        </p>
                    </div>
                    <div className="h-15 p-5">
                        <p className="font-bold text-xl">
                            Conecte contas PF e PJ sem dor de cabeça
                        </p>
                        <p>
                            Finanças pessoais e do negócio organizadas no mesmo lugar.
                        </p>
                    </div>
                    <div className="h-15 p-5">
                        <p className="font-bold text-xl">
                            Segurança em primeiro lugar
                        </p>
                        <p>
                            Tecnologia do Banco Central para proteger seus dados e sua privacidade.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}