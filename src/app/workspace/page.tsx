import { KanbanBoard } from "@/components/board";
import NewTaskDialog from "@/components/board/new-task-dialog";
import { getSessionData, isUserAuthenticated } from "@/lib/session";
import { redirect } from "next/navigation";

const getInitialTasks = async (username?: string) => {
  if (!username) return null;
  try {
    const res = await fetch(
      `${process.env.URL}/api/initial-data?username=${username}`,
      {
        method: "GET",
        credentials: "same-origin",
      }
    );

    const jsonData = await res.json();
    if (res.status === 400) {
      throw Error(jsonData.message);
    }
    return jsonData;
  } catch (e) {
    console.log("-----------------");
    console.log(e);
    console.log("+++++++++++++++++");
  }
};

export default async function page() {
  const isAuthenticated = await isUserAuthenticated();
  const session = await getSessionData();
  const initialTasks = await getInitialTasks(session.username);

  if (!isAuthenticated) {
    redirect("/");
  }

  return (
    <div className="overflow-hidden">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 ">
        <div className="flex items-start justify-between">
          <NewTaskDialog />
        </div>
        <KanbanBoard initialTasks={initialTasks} />
      </div>
    </div>
  );
}
