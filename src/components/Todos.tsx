import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/helpers";
import { ConvexTodo, Todo, TodosStatus, TodosView } from "@/lib/todoTypes";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { AiFillDelete, AiFillEdit, AiOutlineCheck } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { toast } from "sonner";
import KanbanView from "./KanbanView";
import CalendarView from "./CalendarView";
import {
  BsArrow90DegUp,
  BsArrowBarUp,
  BsArrowUp,
  BsArrowUpCircle,
} from "react-icons/bs";

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
  saturdayTodos: ConvexTodo[];
  setSaturdayTodos: React.Dispatch<React.SetStateAction<ConvexTodo[]>>;
  sundayTodos: ConvexTodo[];
  setSundayTodos: React.Dispatch<React.SetStateAction<ConvexTodo[]>>;
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
  saturdayTodos,
  setSaturdayTodos,
  sundayTodos,
  setSundayTodos,
}: Props) => {
  if (view === TodosView.NoView) {
    return (
      <div className="flex gap-8 items-center">
        <BsArrowUpCircle size={20} />
        Pick a view above
      </div>
    );
  }

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
          saturdayTodos={saturdayTodos}
          setSaturdayTodos={setSaturdayTodos}
          sundayTodos={sundayTodos}
          setSundayTodos={setSundayTodos}
        />
      )}
    </>
  );
};

export default Todos;
