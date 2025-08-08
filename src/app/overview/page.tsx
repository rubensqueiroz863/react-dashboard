import NavBarHome from "../components/NavBarHome";

export default function OverviewPage() {
    return (
        <div className="min-h-screen bg-neutral-300">
            <NavBarHome />
            <div className="flex justify-between h-60 m-5 rounded-xl bg-white text-center p-5">
                <div>
                   <div className="mb-10 mt-10 font-bold text-xl">
                    <p>Username</p>  
                    </div>
                    
                    <div className="flex justify-between">
                        <div>
                            <p>Receitas no mês atual</p>
                            <p>R$ 0,00</p> 
                        </div>
                        <div className="w-0.5 h-10 bg-neutral-200"></div>
                        <div>
                            <p>Despesas no mês atual</p>
                            <p>R$ 0,00</p>
                        </div>
                    </div> 
                </div>
                <div>
                   <div className="mb-10 mt-10 font-bold text-xl">
                    <p>Acesso rápido</p>  
                    </div>
                    
                    <div>
                        <button>
                            
                        </button>
                    </div>

                    <div>
                        <button>

                        </button>
                    </div>
                    <div>
                        <button>

                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}