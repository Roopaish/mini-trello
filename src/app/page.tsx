import { isUserAuthenticated } from "@/lib/session";
import { redirect } from "next/navigation";
import { CreateWorkspaceForm } from "./create-workspace-form";

export default async function Home() {
  const isAuthenticated = await isUserAuthenticated();

  if (isAuthenticated) {
    redirect("/workspace");
  }
  return (
    <main className=" p-24">
      <CreateWorkspaceForm />
    </main>
  );
}
