// export enum Status {
//   TODO = "TODO",
//   IN_PROGRESS = "IN_PROGRESS",
//   DONE = "DONE",
// }

import { Id } from "../../convex/_generated/dataModel";

export type Status = "TODO" | "IN_PROGRESS" | "DONE" | "BACKLOG";
export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type ConvexTodo = {
  _id: Id<"dnd_todos">;
  // _id: string;
  _creationTime: number;
  title: string;
  status: Status;
  dueDay: Weekday;
  completed: boolean;
  updatedTime: number;
};

export type Todo = {
  // id: number;
  id: string;
  title: string;
  status: Status;
  dueDay?: Weekday;
  completed: boolean;
};

export enum TodosStatus {
  TodoTodos = "TodoTodos",
  WipTodos = "WipTodos",
  DoneTodos = "DoneTodos",
}

export enum TodosView {
  KanbanView = "KanbanView",
  CalendarView = "CalendarView",
  NoView = "",
}

export enum WeekdayEnum {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}
