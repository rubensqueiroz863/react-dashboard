import Footer from "./components/Footer";
import Header from "./components/Header";

export default async function Page() {
  return (
    <div className=" flex flex-col">
      <Header />
      <div className="mt-30"></div>
      <Footer />
    </div>
  );
}
