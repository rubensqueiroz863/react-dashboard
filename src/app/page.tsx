import { auth } from "@clerk/nextjs/server";
import AnimatedPage from "./components/AnimatedPage";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex flex-col bg-white min-h-screen pt-16">
      <AnimatedPage userId={userId} />
    </div>
  );
}
