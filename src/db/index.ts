import { JSONFilePreset } from "lowdb/node";

import type { Column } from "@/components/board/board-column";
import type { Task } from "@/lib/store";

const users: { username: string; password: string }[] = [
  { username: "roopaish", password: "123456" },
];

const tasks: {
  username: string;
  tasks: (Omit<Task, "status"> & { status: string })[];
  columns: Column[];
}[] = [
  {
    username: "roopaish",
    tasks: [
      {
        id: "12",
        status: "IN_PROGRESS", // is the id of columns it is assigned to
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

const defaultData = { users, tasks };

const db = JSONFilePreset("db.json", defaultData);

export default db;
