import { cn } from "@/lib/helpers";
import { ConvexTodo, Todo, TodosStatus, WeekdayEnum } from "@/lib/todoTypes";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Item from "./Item";

type Props = {
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

const CalendarView = ({
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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 w-[90%] gap-6 m-4">
      <Droppable droppableId={WeekdayEnum.Monday}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              `${DayColorScheme.Monday.bgColor} p-5 rounded-sm`,
              snapshot.isDraggingOver && "opacity-80"
            )}
          >
            <span
              className={`${DayColorScheme.Monday.titleColor} text-2xl font-semibold`}
            >
              Monday
            </span>
            {mondayTodos.map((item, index) => (
              <Item
                key={item._id}
                todo={item}
                index={index}
                todos={mondayTodos}
                setTodos={setMondayTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId={WeekdayEnum.Tuesday}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              `${DayColorScheme.Tuesday.bgColor} p-5 rounded-sm`,
              snapshot.isDraggingOver && "opacity-80"
            )}
          >
            <span
              className={`${DayColorScheme.Tuesday.titleColor} text-2xl font-semibold`}
            >
              Tuesday
            </span>
            {tuesdayTodos.map((item, index) => (
              <Item
                key={item._id}
                todo={item}
                index={index}
                todos={tuesdayTodos}
                setTodos={setTuesdayTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId={WeekdayEnum.Wednesday}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              `${DayColorScheme.Wednesday.bgColor} p-5 rounded-sm`,
              snapshot.isDraggingOver && "opacity-80"
            )}
          >
            <span
              className={`${DayColorScheme.Wednesday.titleColor} text-2xl font-semibold`}
            >
              Wednesday
            </span>
            {wednesdayTodos.map((item, index) => (
              <Item
                key={item._id}
                todo={item}
                index={index}
                todos={wednesdayTodos}
                setTodos={setWednesdayTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId={WeekdayEnum.Thursday}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              `${DayColorScheme.Thursday.bgColor} p-5 rounded-sm`,
              snapshot.isDraggingOver && "opacity-80"
            )}
          >
            <span
              className={`${DayColorScheme.Thursday.titleColor} text-2xl font-semibold`}
            >
              Thursday
            </span>
            {thursdayTodos.map((item, index) => (
              <Item
                key={item._id}
                todo={item}
                index={index}
                todos={thursdayTodos}
                setTodos={setThursdayTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId={WeekdayEnum.Friday}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              `${DayColorScheme.Friday.bgColor} p-5 rounded-sm`,
              snapshot.isDraggingOver && "opacity-80"
            )}
          >
            <span
              className={`${DayColorScheme.Friday.titleColor} text-2xl font-semibold`}
            >
              Friday
            </span>
            {fridayTodos.map((item, index) => (
              <Item
                key={item._id}
                todo={item}
                index={index}
                todos={fridayTodos}
                setTodos={setFridayTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId={WeekdayEnum.Saturday}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              `${DayColorScheme.Saturday.bgColor} p-5 rounded-sm`,
              snapshot.isDraggingOver && "opacity-80"
            )}
          >
            <span
              className={`${DayColorScheme.Saturday.titleColor} text-2xl font-semibold`}
            >
              Saturday
            </span>
            {saturdayTodos.map((item, index) => (
              <Item
                key={item._id}
                todo={item}
                index={index}
                todos={saturdayTodos}
                setTodos={setSaturdayTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId={WeekdayEnum.Sunday}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              `${DayColorScheme.Sunday.bgColor} p-5 rounded-sm`,
              snapshot.isDraggingOver && "opacity-80"
            )}
          >
            <span
              className={`${DayColorScheme.Sunday.titleColor} text-2xl font-semibold`}
            >
              Sunday
            </span>
            {sundayTodos.map((item, index) => (
              <Item
                key={item._id}
                todo={item}
                index={index}
                todos={sundayTodos}
                setTodos={setSundayTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default CalendarView;

const DayColorScheme = {
  Monday: {
    bgColor: "bg-gray-400",
    titleColor: "text-slate-900",
  },
  Wednesday: {
    bgColor: "bg-gray-400",
    titleColor: "text-slate-800",
  },
  Friday: {
    bgColor: "bg-gray-400",
    titleColor: "text-slate-700",
  },
  Sunday: {
    bgColor: "bg-gray-400",
    titleColor: "text-slate-900",
  },

  Tuesday: {
    bgColor: "bg-gray-600",
    titleColor: "text-white",
  },
  Thursday: {
    bgColor: "bg-gray-600",
    titleColor: "text-white",
  },
  Saturday: {
    bgColor: "bg-gray-600",
    titleColor: "text-white",
  },
};
