import { KanbanBoard } from "@/components/board";
import NewTaskDialog from "@/components/board/new-task-dialog";
import { isUserAuthenticated } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function page() {
  const isAuthenticated = await isUserAuthenticated();

  if (!isAuthenticated) {
    redirect("/");
  }

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-start justify-between">
          <NewTaskDialog />
        </div>
        <KanbanBoard />
      </div>
    </>
  );
}
