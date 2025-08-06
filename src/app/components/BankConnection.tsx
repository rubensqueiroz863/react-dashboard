'use client';

import { motion } from "framer-motion";
import Footer from "./Footer";

export default function BankConnection() {
    return (
        <div>
            <div className="max-w-5xl mx-auto px-4">
                <div className="mx-10">
                    <div className="flex items-center">
                        <p className="text-black font-semibold text-xl">Conexão Bancária</p>
                        <div className="flex ml-2 py-1 bg-neutral-800 rounded-xl w-12 items-center justify-center">
                            <p className="text-white text-sm">novo</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col xl:flex-row w-full">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                className="font-bold text-5xl mt-2 font-sans"
                            >
                                <h1>Importe suas finanças</h1>
                                <h1>com um clique</h1>
                            </motion.div>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.7 }}
                                className="my-2 max-w-140 text-xl"
                            >
                                Conecte seus bancos e veja as suas movimentações bancárias centralizadas no FinanX com a tecnologia do Belvo.
                            </motion.p>
                            <div className="flex flex-col gap-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.7 }}
                                    className="p-5 bg-neutral-100 rounded-lg"
                                >
                                    <p className="font-bold text-xl">
                                        Menos trabalho, mais tempo livre
                                    </p>
                                    <p>
                                        Seus lançamentos chegam prontos direto do seu banco.
                                    </p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7, duration: 0.7 }}
                                    className="p-5 bg-neutral-100 rounded-lg"
                                >
                                    <p className="font-bold text-xl">
                                        Seus gastos sob controle desde o primeiro dia
                                    </p>
                                    <p>
                                        Traga seu histórico de <strong>90 dias</strong> e não comece do zero.
                                    </p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9, duration: 0.7 }}
                                    className="p-5 bg-neutral-100 rounded-lg"
                                >
                                    <p className="font-bold text-xl">
                                        Conecte contas PF e PJ sem dor de cabeça
                                    </p>
                                    <p>
                                        Finanças pessoais e do negócio organizadas no mesmo lugar.
                                    </p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.1, duration: 0.7 }}
                                    className="p-5 bg-neutral-100 rounded-lg"
                                >
                                    <p className="font-bold text-xl">
                                        Segurança em primeiro lugar
                                    </p>
                                    <p>
                                        Tecnologia do Banco Central para proteger seus dados e sua privacidade.
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                        
                        <div className="hidden md:block w-px mx-10 bg-neutral-300" style={{ minHeight: 200 }} />
                        { /* Aqui deve ser adicionada a troca de imagens com resposividade pelos card ao lado */}
                        <div>*Responsividade com troca de imagens</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}