import AnimatedPage from "./AnimatedPage";
import NavBar from "./NavBar";

export default async function Header() {
  return (
    <div className="flex flex-col bg-white">
      <NavBar/>
      <AnimatedPage />
    </div>
  );
}
 