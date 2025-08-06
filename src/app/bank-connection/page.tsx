import BankConnection from "../components/BankConnection";
import Header from "../components/Header";

export default async function BankConnectionPage() {
    return (
        <div className="min-h-screen overflow-auto flex flex-col">
            <Header />
            <hr className="mx-10 mb-45" />
            <BankConnection />
        </div>
    );
}