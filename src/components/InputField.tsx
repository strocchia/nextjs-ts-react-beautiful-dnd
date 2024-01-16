import React from "react";

type Props = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  addNew: (e: React.MouseEvent | React.FormEvent<HTMLElement>) => void;
};

const InputField = ({ title, setTitle, addNew }: Props) => {
  return (
    <form
      className="flex flex-col relative m-6 min-w-full lg:min-w-[500px]"
      onSubmit={addNew}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title..."
        className="text-black outline-none border border-neutral-300 rounded-lg p-3 transition-shadow ease-in-out hover:shadow-lg"
      />
      <button
        className="w-10 h-10 absolute top-1 right-2 text-white bg-blue-500 rounded-lg"
        type="submit"
      >
        Go!
      </button>
    </form>
  );
};

export default InputField;
