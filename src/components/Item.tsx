import React, { useEffect, useRef, useState } from "react";
import { ConvexTodo, Todo } from "@/lib/todoTypes";
import { toast } from "sonner";
import { Draggable } from "react-beautiful-dnd";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { cn } from "@/lib/helpers";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const Item = ({
  index,
  todo,
  todos,
  setTodos,
}: {
  index: number;
  todo: ConvexTodo;
  todos?: ConvexTodo[];
  setTodos?: React.Dispatch<React.SetStateAction<ConvexTodo[]>>;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(todo.title);

  const inputRef = useRef<HTMLInputElement>(null);

  const updateTitle = useMutation(api.todos.updateTitle);
  const updateCompleted = useMutation(api.todos.updateCompleted);
  const updateStatus = useMutation(api.todos.updateStatus);
  const removeOne = useMutation(api.todos.remove);

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

    updateTitle({ id: todo._id, title: editedTitle });

    setIsEditing(false);
  };

  const doDelete = () => {
    removeOne({ id: todo._id });
  };

  const doDone = () => {
    toast("Not implemented");
  };

  return (
    <Draggable draggableId={todo._id} index={index} key={todo._id}>
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

export default Item;
