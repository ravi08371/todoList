import * as React from "react";
import { TodosContext } from "../../todo-context";
import "./todo-form.scss";

export const TodoForm = () => {
  const { todos, setTodos } = React.useContext(TodosContext);
  const [task, setTask] = React.useState("");
  const [date, setDate] = React.useState("");

  const handleAddTodo = () => {
    console.log("this is todos", todos);
    if (task.trim()) {
      const newTodo = {
        id: Date.now(),
        label: task,
        checked: false,
        todoDate: date,
      };
      setTodos([...todos, newTodo]); // Add new task to the list
      setTask(""); // Clear input field
    }

    // Fix the app to display list of all tasks
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleAddTodo();
    }
  };

  return (
    <div className="todo-form">
      <input
        placeholder="Enter new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        // onKeyUp={handleKeyUp}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        // onKeyUp={handleKeyUp}
      />
      <button type="button" onClick={handleAddTodo}>
        Add task
      </button>
    </div>
  );
};
