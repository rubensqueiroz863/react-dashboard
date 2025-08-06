import Footer from "./components/Footer";
import Header from "./components/Header";

export default async function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Footer />
    </div>
  );
}
