import Link from "next/link";
import NavBarHome from "../components/NavBarHome";

export default function OverviewPage() {
    return (
        <div className="min-h-screen bg-neutral-300">
            <NavBarHome />

            <div className="flex flex-col xl:flex-row xl:items-start items-center 
                 w-full rounded-xl bg-white text-center p-5 gap-5">
                
                {/* Bloco do Usuário */}
                <div className="w-full xl:w-1/2">
                    <div className="mb-6 mt-6 font-bold text-xl">
                        <p>Username</p>  
                    </div>
                    
                    <div className="flex justify-between items-center my-4 flex-wrap">
                        <div className="flex flex-col items-center flex-1 min-w-[140px]">
                            <p className="text-sm">Receitas no mês atual</p>
                            <p>R$ 0,00</p> 
                        </div>
                        <div className="w-px h-10 bg-neutral-200 hidden md:block"></div>
                        <div className="flex flex-col items-center flex-1 min-w-[140px]">
                            <p className="text-sm">Despesas no mês atual</p>
                            <p>R$ 0,00</p>
                        </div>     
                    </div>
                </div>

                {/* Divisor vertical apenas no desktop */}
                <div className="hidden xl:flex items-center">
                    <div className="w-px h-40 bg-neutral-200"></div>
                </div>

                {/* Bloco de Acesso Rápido */}
                <div className="w-full xl:w-1/2">
                    <div className="mb-6 mt-6 font-bold text-xl">
                        <p>Acesso rápido</p> 
                    </div>
                    <div className="mb-6 mt-6 font-bold text-xl">
                    </div>
                    <div className="flex flex-wrap gap-6 items-center justify-center">
                        <div className="relative group border p-2 rounded-md hover:bg-neutral-100 border-neutral-200">
                            <button className="cursor-pointer m-1">
                                <img 
                                    src="https://i.postimg.cc/7hjfMpkW/images.png" 
                                    alt="Add expense icon"
                                    className="w-8 h-8 mx-auto"
                                />
                            </button>
                            <span className="absolute border mt-2 w-30 top-full mb-2 hidden group-hover:block bg-white text-xs px-2 py-1 rounded">
                                Adicionar Despesa
                            </span>
                        </div>

                        <div className="relative group border p-2 rounded-md hover:bg-neutral-100 border-neutral-200">
                            <button className="cursor-pointer m-1">
                                <img 
                                    src="https://i.postimg.cc/nrXXmn6m/images-1.png" 
                                    alt="Add revenue icon"
                                    className="w-8 h-8 mx-auto"
                                />
                            </button>
                            <span className="absolute border mt-2 w-30 top-full mb-2 hidden group-hover:block bg-white text-xs px-2 py-1 rounded">
                                Adicionar Receita
                            </span>
                        </div>

                        <Link href="/reports">
                            <div className="relative group border p-2 rounded-md hover:bg-neutral-100 border-neutral-200">
                                <button className="cursor-pointer m-1">
                                    <img 
                                        src="https://i.postimg.cc/mrTWq8Zp/383f43305de4fbc3c6a3bdfb25a1b758-icone-de-grafico-de-marketing.webp" 
                                        alt="Graphic image"
                                        className="w-8 h-8 mx-auto"
                                    />
                                </button>
                                <span className="absolute border mt-2 w-30 top-full mb-2 hidden group-hover:block bg-white text-xs px-2 py-1 rounded">
                                    Ver Relatórios
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
