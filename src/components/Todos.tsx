import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/helpers";
import { Todo, TodosStatus, TodosView } from "@/lib/todoTypes";
import { useTaskStore } from "@/lib/zustStore";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { AiFillDelete, AiFillEdit, AiOutlineCheck } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { toast } from "sonner";

type Props = {
  view: TodosView;
  todoTodos: Todo[];
  setTodoTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  progressTodos: Todo[];
  setProgressTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  doneTodos: Todo[];
  setDoneTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const Todos = ({
  view,
  todoTodos,
  setTodoTodos,
  progressTodos,
  setProgressTodos,
  doneTodos,
  setDoneTodos,
}: Props) => {
  if (view !== TodosView.KanbanView) {
    return null;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 w-[95%] gap-6 m-4">
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
                key={todo.id}
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
                key={todo.id}
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
                key={todo.id}
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

export default Todos;

const Item = ({
  index,
  todo,
  todos,
  setTodos,
}: {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(todo.title);

  const inputRef = useRef<HTMLInputElement>(null);

  const { updateTitle, updateCompleted, updateStatus, removeOne } =
    useTaskStore();

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing]);

  const doEdit = () => {
    if (todo.status === "DONE") {
      toast(`Cannot edit a completed task. Move to another swimlane to edit.`);
      return;
    }

    setIsEditing(true);
  };

  const submitEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // setTodos(
    //   todos.map((t) => (t.id === todo.id ? { ...t, title: editedTitle } : t))
    // );

    updateTitle(todo.id, editedTitle);

    setIsEditing(false);
  };

  const doDelete = () => {
    // const filteredTodos = todos.filter((t) => t.id !== todo.id);
    //
    // setTodos(filteredTodos);
    //
    // saveToLocalstorage({
    //   status: todo.status,
    //   todos: filteredTodos,
    // });

    removeOne(todo.id);
  };

  const doDone = () => {
    toast("Not implemented");

    // updateCompleted(todo.id);

    // todo.completed
    //   ? updateStatus(todo.id, "TODO")
    //   : updateStatus(todo.id, "DONE");
  };

  return (
    <Draggable draggableId={todo.id} index={index} key={todo.id}>
      {(provided, snapshot) => (
        <form
          ref={provided.innerRef}
          className="flex items-center rounded-md bg-gray-500 p-2 mt-4 transition hover:scale-x-105 hover:shadow-md"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onSubmit={submitEdit}
        >
          {/* {todo.completed ? ( */}
          {/* <span className="flex-1 line-through ml-2">{todo.title}</span> */}
          {/* ) : */}
          {isEditing ? (
            <input
              type="text"
              className="text-black p-2 mx-1 flex-1 outline-none rounded-sm"
              autoFocus
              ref={inputRef}
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            <span
              className={cn(
                "flex-1 ml-2",
                todo.status === "DONE" && "line-through"
              )}
            >
              {todo.title}
            </span>
          )}
          <div className="flex gap-2">
            {!isEditing && (
              <>
                <span
                  className="mx-4 text-lg cursor-pointer hover:-translate-y-[2px]"
                  onClick={doEdit}
                >
                  <AiFillEdit />
                </span>
                <span
                  className="mx-4 text-lg cursor-pointer hover:-translate-y-[2px]"
                  onClick={doDelete}
                >
                  <AiFillDelete />
                </span>
                {/* <span
                  className="mx-4 text-lg cursor-pointer hover:-translate-y-[0px]"
                  onClick={doDone}
                >
                  <MdDone />
                </span> */}
              </>
            )}
          </div>
        </form>
      )}
    </Draggable>
  );
};
