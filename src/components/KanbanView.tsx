import { cn } from "@/lib/helpers";
import { ConvexTodo, Todo, TodosStatus } from "@/lib/todoTypes";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Item from "./Item";

type Props = {
  todoTodos: ConvexTodo[];
  setTodoTodos: React.Dispatch<React.SetStateAction<ConvexTodo[]>>;
  progressTodos: ConvexTodo[];
  setProgressTodos: React.Dispatch<React.SetStateAction<ConvexTodo[]>>;
  doneTodos: ConvexTodo[];
  setDoneTodos: React.Dispatch<React.SetStateAction<ConvexTodo[]>>;
};

const KanbanView = ({
  todoTodos,
  setTodoTodos,
  progressTodos,
  setProgressTodos,
  doneTodos,
  setDoneTodos,
}: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 w-[90%] gap-6 m-4">
      <Droppable droppableId={TodosStatus.TodoTodos}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "bg-gray-400 p-5 rounded-sm",
              snapshot.isDraggingOver && "opacity-80"
            )}
          >
            <span className="text-white text-2xl font-semibold">Todo</span>
            {todoTodos.map((todo, idx) => (
              <Item
                key={todo._id}
                index={idx}
                todo={todo}
                todos={todoTodos}
                setTodos={setTodoTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId={TodosStatus.WipTodos}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "bg-blue-400 p-5 rounded-sm",
              snapshot.isDraggingOver && "opacity-60"
            )}
          >
            <span className="text-white text-2xl font-semibold">Progress</span>
            {progressTodos.map((todo, idx) => (
              <Item
                key={todo._id}
                index={idx}
                todo={todo}
                todos={progressTodos}
                setTodos={setProgressTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId={TodosStatus.DoneTodos}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "bg-red-400 p-5 rounded-sm",
              snapshot.isDraggingOver && "opacity-80"
            )}
          >
            <span className="text-white text-2xl font-semibold">
              Completed (Done)
            </span>
            {doneTodos.map((todo, idx) => (
              <Item
                key={todo._id}
                index={idx}
                todo={todo}
                todos={doneTodos}
                setTodos={setDoneTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanView;
