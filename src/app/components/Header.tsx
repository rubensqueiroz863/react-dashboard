import { auth } from "@clerk/nextjs/server";
import AnimatedPage from "./AnimatedPage";
import NavBar from "./NavBar";

export default async function Header() {
  const { userId } = await auth();

  return (
    <div className="flex flex-col my-20 bg-white pt-20">
      <NavBar/>
      <AnimatedPage userId={userId} />
    </div>
  );
}
