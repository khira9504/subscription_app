import { LoginForm } from "@/components/auth/LoginForm";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getAuthSession();
  if (session?.user) {
    redirect("/");
  };

  return (
    <main className="flex justify-center">
      <LoginForm />
    </main>
  );
};