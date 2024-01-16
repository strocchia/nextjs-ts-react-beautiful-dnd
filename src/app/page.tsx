"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";
import {
  DragDropContext,
  DragStart,
  // Draggable,
  DropResult,
  // Droppable,
  ResponderProvided,
} from "react-beautiful-dnd";
import Todos from "@/components/Todos";
import { Status, Todo, TodosStatus, TodosView } from "@/lib/todoTypes";
import { cn } from "@/lib/helpers";
import { BsCalendarWeek, BsFillKanbanFill, BsKanbanFill } from "react-icons/bs";
import InputField from "@/components/InputField";
import { useTaskStore } from "@/lib/zustStore";

export default function Home() {
  const [title, setTitle] = useState<string>("");
  const [view, setView] = useState<TodosView>(TodosView.KanbanView);
  // const [todoTodos, setTodoTodos] = useState<Todo[]>([]);
  // const [progressTodos, setProgressTodos] = useState<Todo[]>([]);
  // const [doneTodos, setDoneTodos] = useState<Todo[]>([]);

  const {
    addNewOne: addToStore,
    todos,
    activeTask,
    onDrag,
    updateStatus,
  } = useTaskStore();

  const todoTodos = todos.filter((t) => t.status === "TODO");
  const progressTodos = todos.filter((p) => p.status === "IN_PROGRESS");
  const doneTodos = todos.filter((d) => d.status === "DONE");
  const backlogTodos = todos.filter((b) => b.status === "BACKLOG");

  useEffect(() => {
    // let todoTodos = window.localStorage.getItem("todoTodos");
    // let progressTodos = window.localStorage.getItem("progressTodos");
    // let doneTodos = window.localStorage.getItem("doneTodos");

    // todoTodos && setTodoTodos(JSON.parse(todoTodos));
    // progressTodos && setProgressTodos(JSON.parse(progressTodos));
    // doneTodos && setDoneTodos(JSON.parse(doneTodos));

    // manually hydrate
    useTaskStore.persist.rehydrate();
  }, []);

  // useEffect(() => {
  //   console.log("hit1a");
  //   if (typeof window !== undefined) {
  //     console.log("hit1b");
  //     window.localStorage.setItem("todoTodos", JSON.stringify(todoTodos));
  //     window.localStorage.setItem(
  //       "progressTodos",
  //       JSON.stringify(progressTodos)
  //     );
  //     window.localStorage.setItem("doneTodos", JSON.stringify(doneTodos));
  //   }
  // }, [todoTodos, progressTodos, doneTodos]);

  const addNewOne = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) return;

    // const newTodo: Todo = {
    //   // id: Date.now().toString(),
    //   id: uuid(),
    //   title: title,
    //   status: "TODO",
    //   completed: false,
    // };

    // setTodoTodos((prev) => {
    //   return [...todoTodos, newTodo];
    // });

    // // saveToLocalstorage({
    // //   status: "TODO",
    // //   todos: [...todoTodos, newTodo],
    // // });

    addToStore(title);

    setTitle("");
  };

  const handleDragStart = async (
    start: DragStart,
    provided: ResponderProvided
  ) => {
    if (!start) return;

    console.log(start);

    onDrag(start.draggableId);
  };

  const handleDragEnd = async (
    result: DropResult,
    provided: ResponderProvided
  ) => {
    const { source, destination } = result;

    if (!destination || !activeTask) return;

    let add: Todo;
    let newStatus: Status;

    const dropContainerId = source.droppableId as TodosStatus;

    if (dropContainerId === TodosStatus.TodoTodos) {
      add = todoTodos[source.index];
      todoTodos.splice(source.index, 1);
    } else if (dropContainerId === TodosStatus.WipTodos) {
      add = progressTodos[source.index];
      progressTodos.splice(source.index, 1);
    } else if (dropContainerId === TodosStatus.DoneTodos) {
      add = doneTodos[source.index];
      doneTodos.splice(source.index, 1);
    } else {
      add = { id: "", title: "", status: "TODO", completed: false };
    }

    switch (destination.droppableId as TodosStatus) {
      case TodosStatus.TodoTodos:
        todoTodos.splice(destination.index, 0, add);
        newStatus = "TODO";
        break;

      case TodosStatus.WipTodos:
        progressTodos.splice(destination.index, 0, add);
        newStatus = "IN_PROGRESS";
        break;

      case TodosStatus.DoneTodos:
        doneTodos.splice(destination.index, 0, add);
        newStatus = "DONE";
        break;

      default:
        newStatus = "TODO";
        break;
    }

    updateStatus(activeTask?.id, newStatus);
  };

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="p-2">
        <div className="flex flex-col items-center min-h-100vh py-4">
          <h2 className="text-2xl font-semibold">Task This</h2>
          <div className="flex gap-4 items-center">
            <span
              className={cn(
                "text-3xl text-gray-300 cursor-pointer",
                view === TodosView.KanbanView && "text-gray-900"
              )}
              onClick={() => setView(TodosView.KanbanView)}
            >
              <BsFillKanbanFill />
            </span>
            <span
              onClick={() => setView(TodosView.NoView)}
              className={cn(
                "text-3xl text-gray-300 cursor-pointer",
                view !== TodosView.KanbanView && "text-gray-900"
              )}
            >
              <BsCalendarWeek />
            </span>
          </div>
          <div className="flex mt-2">
            <span className="text-xs text-gray-100 italic">
              {view === TodosView.KanbanView ? "Kanban" : "Calendar ... TBD"}
            </span>
          </div>
          <InputField title={title} setTitle={setTitle} addNew={addNewOne} />
          <Todos
            view={view}
            todoTodos={todoTodos}
            progressTodos={progressTodos}
            doneTodos={doneTodos}
            // setTodoTodos={setTodoTodos}
            // setProgressTodos={setProgressTodos}
            // setDoneTodos={setDoneTodos}
            setTodoTodos={() => {}}
            setProgressTodos={() => {}}
            setDoneTodos={() => {}}
          />
        </div>
      </div>
    </DragDropContext>
  );
}
