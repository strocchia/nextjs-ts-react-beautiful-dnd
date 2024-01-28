import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/helpers";
import { ConvexTodo, Todo, TodosStatus, TodosView } from "@/lib/todoTypes";
import { useTaskStore } from "@/lib/zustStore";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { AiFillDelete, AiFillEdit, AiOutlineCheck } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { toast } from "sonner";
import KanbanView from "./KanbanView";
import CalendarView from "./CalendarView";

type Props = {
  view: TodosView;
  todoTodos: ConvexTodo[];
  setTodoTodos: React.Dispatch<React.SetStateAction<ConvexTodo[]>>;
  progressTodos: ConvexTodo[];
  setProgressTodos: React.Dispatch<React.SetStateAction<ConvexTodo[]>>;
  doneTodos: ConvexTodo[];
  setDoneTodos: React.Dispatch<React.SetStateAction<ConvexTodo[]>>;

  mondayTodos: ConvexTodo[];
  setMondayTodos: React.Dispatch<React.SetStateAction<ConvexTodo[]>>;
  tuesdayTodos: ConvexTodo[];
  setTuesdayTodos: React.Dispatch<React.SetStateAction<ConvexTodo[]>>;
  wednesdayTodos: ConvexTodo[];
  setWednesdayTodos: React.Dispatch<React.SetStateAction<ConvexTodo[]>>;
  thursdayTodos: ConvexTodo[];
  setThursdayTodos: React.Dispatch<React.SetStateAction<ConvexTodo[]>>;
  fridayTodos: ConvexTodo[];
  setFridayTodos: React.Dispatch<React.SetStateAction<ConvexTodo[]>>;
};

const Todos = ({
  view,
  todoTodos,
  setTodoTodos,
  progressTodos,
  setProgressTodos,
  doneTodos,
  setDoneTodos,

  mondayTodos,
  setMondayTodos,
  tuesdayTodos,
  setTuesdayTodos,
  wednesdayTodos,
  setWednesdayTodos,
  thursdayTodos,
  setThursdayTodos,
  fridayTodos,
  setFridayTodos,
}: Props) => {
  // if (view !== TodosView.KanbanView) {
  //   return null;
  // }

  return (
    <>
      {view === TodosView.KanbanView && (
        <KanbanView
          todoTodos={todoTodos}
          progressTodos={progressTodos}
          doneTodos={doneTodos}
          setTodoTodos={setTodoTodos}
          setProgressTodos={setProgressTodos}
          setDoneTodos={setDoneTodos}
        />
      )}
      {view === TodosView.CalendarView && (
        <CalendarView
          mondayTodos={mondayTodos}
          setMondayTodos={setMondayTodos}
          tuesdayTodos={tuesdayTodos}
          setTuesdayTodos={setTuesdayTodos}
          wednesdayTodos={wednesdayTodos}
          setWednesdayTodos={setWednesdayTodos}
          thursdayTodos={thursdayTodos}
          setThursdayTodos={setThursdayTodos}
          fridayTodos={fridayTodos}
          setFridayTodos={setFridayTodos}
        />
      )}
      {view === TodosView.NoView && (
        <div>No View here ... under construction</div>
      )}
    </>
  );
};

export default Todos;
