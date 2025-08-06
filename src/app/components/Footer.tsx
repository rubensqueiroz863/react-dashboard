export default function Footer() {
    return (
        <footer className="flex sticky top-1/1 bg-neutral-900 text-white py-8 w-full">
            <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-2 px-4">
                <h1 className="text-3xl sm:text-4xl font-black mb-1">FinanX</h1>
                <span className="text-xs sm:text-sm text-neutral-400 text-center">
                    &copy; {new Date().getFullYear()} FinanX. Todos os direitos reservados.
                </span>
            </div>
        </footer>
    );
}