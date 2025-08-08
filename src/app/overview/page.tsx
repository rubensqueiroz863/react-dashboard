import Link from "next/link";
import NavBarHome from "../components/NavBarHome";

export default function OverviewPage() {
    return (
        <div className="min-h-screen bg-neutral-300">
            <NavBarHome />
            <div className="flex xl:mx-60 justify-between h-60 m-5 rounded-xl bg-white text-center p-5">
                <div className="w-1/2">
                   <div className="mb-10 mt-10 font-bold text-xl">
                    <p>Username</p>  
                    </div>
                    
                    <div className="flex justify-between items-center my-2">
                        <div>
                            <p className="text-sm w-40">Receitas no mês atual</p>
                            <p>R$ 0,00</p> 
                        </div>
                        <div className="w-0.5 h-10 bg-neutral-200"></div>
                        <div>
                            <p className="text-sm w-40">Despesas no mês atual</p>
                            <p>R$ 0,00</p>
                        </div>     
                    </div>
                    <div className="w-full flex justify-start">
                        <Link href="/reports">
                            <div className="border rounded-md hover:bg-neutral-100 border-neutral-200">
                                <button className="cursor-pointer m-1">
                                    <img 
                                        src="https://i.postimg.cc/mrTWq8Zp/383f43305de4fbc3c6a3bdfb25a1b758-icone-de-grafico-de-marketing.webp" 
                                        alt="Graphic image"
                                        className="w-10 h-10"
                                    />
                                </button>
                            </div>
                        </Link> 
                    </div>
                    
                </div>
                <div className="h-full items-center justify-center">
                    <div className="w-0.5 m-8 my-5 h-40 bg-neutral-200"></div>
                </div>
                {/* Trocar imgs por pngs com fundo transparente */}
                <div className="text-center w-1/2">
                    <div className="mb-10 mt-10 font-bold text-xl">
                        <p>Acesso rápido</p>  
                    </div>
                    <div className="flex flex-wrap gap-10 items-center justify-center">
                        {/* Adicionar funcionalidade de abrir modal ao clicar nos botões e salvar a despesa no banco de dados */}
                        <button className="bg-white rounded-md border hover:bg-neutral-100 border-neutral-200 px-1 py-0.5 cursor-pointer">
                            <img 
                                src="https://i.postimg.cc/7hjfMpkW/images.png" 
                                alt="Add expense icon"
                                className="w-10 h-10 mx-auto"
                            />
                            <p>despesa</p>
                        </button>

                        <button className="bg-white rounded-md border hover:bg-neutral-100 border-neutral-200 px-1.5 py-0.5 cursor-pointer">
                            <img 
                                src="https://i.postimg.cc/nrXXmn6m/images-1.png" 
                                alt="Add revenue icon"
                                className="w-10 h-10 mx-auto"
                            />
                            <p>Receita</p>
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}