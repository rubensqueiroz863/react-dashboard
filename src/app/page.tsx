import { auth } from "@clerk/nextjs/server";
import AnimatedPage from "./components/AnimatedPage";
import NavBar from "./components/NavBar";

export default async function Page() {
  const { userId } = await auth();

  return (
    <div className="flex flex-col bg-white min-h-screen pt-16">
      <NavBar/>
      <AnimatedPage userId={userId} />
    </div>
  );
}
