import { Column } from "@/components/board/board-column";
import { Task } from "@/lib/store";

export const users: { username: string; password: string }[] = [
  { username: "roopaish", password: "123456" },
];

export const tasks: {
  username: string;
  tasks: (Omit<Task, "status"> & { status: string })[];
  columns: Column[];
}[] = [
  {
    username: "roopaish",
    tasks: [
      {
        id: "12",
        status: "TODO", // is the id of columns it is assigned to
        title: "Hello",
        description: "Hi what is this?",
      },
    ],
    columns: [
      {
        id: "TODO",
        title: "Todo",
      },
      {
        id: "IN_PROGRESS",
        title: "In progress",
      },
      {
        id: "DONE",
        title: "Done",
      },
    ],
  },
];