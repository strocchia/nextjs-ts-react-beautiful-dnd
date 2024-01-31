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
import {
  ConvexTodo,
  Status,
  Todo,
  TodosStatus,
  TodosView,
} from "@/lib/todoTypes";
import { cn } from "@/lib/helpers";
import { BsCalendarWeek, BsFillKanbanFill, BsKanbanFill } from "react-icons/bs";
import InputField from "@/components/InputField";
import { useTaskStore } from "@/lib/zustStore";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export default function Home() {
  const [title, setTitle] = useState<string>("");
  const [view, setView] = useState<TodosView>(TodosView.KanbanView);

  const [activeId, setActiveId] = useState<Id<"dnd_todos">>(
    "" as Id<"dnd_todos">
  );

  const todos = useQuery(api.todos.get) || [];
  const createTodo = useMutation(api.todos.create);
  const updateTodoStat = useMutation(api.todos.updateStatus);

  const todoTodos = useQuery(api.todos.getByStatus, { status: "TODO" }) ?? [];
  const progressTodos =
    useQuery(api.todos.getByStatus, {
      status: "IN_PROGRESS",
    }) ?? [];
  const doneTodos = useQuery(api.todos.getByStatus, { status: "DONE" }) ?? [];
  const backlogTodos =
    useQuery(api.todos.getByStatus, { status: "BACKLOG" }) ?? [];

  const mondayTodos =
    useQuery(api.todos.getByDueDay, { dueDay: "Monday" }) ?? [];
  const tuesdayTodos =
    useQuery(api.todos.getByDueDay, { dueDay: "Tuesday" }) ?? [];
  const wednesdayTodos =
    useQuery(api.todos.getByDueDay, {
      dueDay: "Wednesday",
    }) ?? [];
  const thursdayTodos =
    useQuery(api.todos.getByDueDay, { dueDay: "Thursday" }) ?? [];
  const fridayTodos =
    useQuery(api.todos.getByDueDay, { dueDay: "Friday" }) ?? [];
  const saturdayTodos =
    useQuery(api.todos.getByDueDay, { dueDay: "Saturday" }) ?? [];
  const sundayTodos =
    useQuery(api.todos.getByDueDay, { dueDay: "Sunday" }) ?? [];

  useEffect(() => {
    // manually hydrate the task store
    useTaskStore.persist.rehydrate();
  }, []);

  const addNewOne = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) return;

    createTodo({
      title: title,
      status: "TODO",
      dueDay: "Monday",
      completed: false,
    });

    setTitle("");
  };

  const handleDragStart = async (
    start: DragStart,
    provided: ResponderProvided
  ) => {
    if (!start) return;

    setActiveId(start.draggableId as Id<"dnd_todos">);
  };

  const handleDragEnd = async (
    result: DropResult,
    provided: ResponderProvided
  ) => {
    const { source, destination } = result;

    if (!destination || !activeId) return;

    let add: ConvexTodo;
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
      add = {
        _id: "" as Id<"dnd_todos">,
        _creationTime: Date.now(),
        title: "",
        status: "TODO",
        dueDay: "Monday",
        completed: false,
        updatedTime: Date.now(),
      };
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

    updateTodoStat({ id: activeId, status: newStatus });
  };

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="p-2">
        <div className="flex flex-col items-center min-h-100vh py-4">
          <h2 className="text-2xl font-semibold">Task This</h2>
          <div className="flex gap-4 mt-2 items-center">
            <span
              className={cn(
                "text-3xl text-gray-500 cursor-pointer",
                view === TodosView.KanbanView &&
                  "text-gray-300 outline outline-offset-2 outline-slate-300"
              )}
              onClick={() => setView(TodosView.KanbanView)}
            >
              <BsFillKanbanFill />
            </span>
            <span
              onClick={() => setView(TodosView.CalendarView)}
              className={cn(
                "text-3xl text-gray-500 cursor-pointer",
                view === TodosView.CalendarView &&
                  "text-gray-300 outline outline-offset-2 outline-slate-300"
              )}
            >
              <BsCalendarWeek />
            </span>
          </div>
          <div className="flex gap-12 mt-3">
            <span
              className={cn(
                "text-sm text-gray-300 italic",
                view === TodosView.CalendarView && "ml-[5.7rem]"
              )}
            >
              {view === TodosView.KanbanView ? (
                "Kanban"
              ) : view === TodosView.CalendarView ? (
                "Calendar"
              ) : (
                <span className="inline-block" />
              )}
            </span>
            <span className="inline-block" />
          </div>
          <InputField title={title} setTitle={setTitle} addNew={addNewOne} />
          <Todos
            view={view}
            todoTodos={todoTodos}
            progressTodos={progressTodos}
            doneTodos={doneTodos}
            setTodoTodos={() => {}}
            setProgressTodos={() => {}}
            setDoneTodos={() => {}}
            mondayTodos={mondayTodos}
            setMondayTodos={() => {}}
            tuesdayTodos={tuesdayTodos}
            setTuesdayTodos={() => {}}
            wednesdayTodos={wednesdayTodos}
            setWednesdayTodos={() => {}}
            thursdayTodos={thursdayTodos}
            setThursdayTodos={() => {}}
            fridayTodos={fridayTodos}
            setFridayTodos={() => {}}
            saturdayTodos={saturdayTodos}
            setSaturdayTodos={() => {}}
            sundayTodos={sundayTodos}
            setSundayTodos={() => {}}
          />
        </div>
      </div>
    </DragDropContext>
  );
}
