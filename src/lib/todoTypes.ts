// export enum Status {
//   TODO = "TODO",
//   IN_PROGRESS = "IN_PROGRESS",
//   DONE = "DONE",
// }

export type Status = "TODO" | "IN_PROGRESS" | "DONE" | "BACKLOG" | null;

export type Todo = {
  // id: number;
  id: string;
  title: string;
  status: Status;
  completed: boolean;
};

export enum TodosStatus {
  TodoTodos = "TodoTodos",
  WipTodos = "WipTodos",
  DoneTodos = "DoneTodos",
}

export enum TodosView {
  KanbanView = "KanbanView",
  NoView = "",
}
