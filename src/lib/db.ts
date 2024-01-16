import { Status, Todo } from "./todoTypes";

// export const saveToLocalstorage = ({
//   status,
//   todos,
// }: {
//   status: Status;
//   todos: Todo[];
// }) =>
//   window &&
//   typeof window !== undefined &&
//   (status === "TODO"
//     ? window.localStorage.setItem("todoTodos", JSON.stringify(todos))
//     : status === "IN_PROGRESS"
//     ? window.localStorage.setItem("progressTodos", JSON.stringify(todos))
//     : status === "DONE"
//     ? window.localStorage.setItem("doneTodos", JSON.stringify(todos))
//     : null);
