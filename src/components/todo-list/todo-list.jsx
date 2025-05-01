import * as React from "react";
import { Checkbox } from "../checkbox";
import { TodosContext } from "../../todo-context";
import "./todo-list.scss";

export const TodoList = () => {
  const { todos, setTodos } = React.useContext(TodosContext);
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("all");
  const [page, setPage] = React.useState(1);
  const todayDate = new Date();
  const newdate = new Date(todos?.[0]?.todoDate);
  console.log("this is tyd date", newdate);
  

  const todosPerPage = 10;
  const filteredTodos = todos?.filter((todo) => {
    const matchesSearch = todo.label
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" ? todo.checked : !todo.checked);

      const compareDates = filter === "latest" && (
        todos.sort((a, b) => new Date(a.todoDate) - new Date(b.todoDate))
      );
      
    const oldestDates = filter === "oldest" && (
        todos.sort((a, b) => new Date(b.todoDate) - new Date(a.todoDate))
      );
    return (matchesSearch && matchesFilter) || (compareDates || oldestDates);
  });

  const paginatedTodos = filteredTodos?.slice(
    (page - 1) * todosPerPage,
    page * todosPerPage
  );

  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  const handleDelete = (id) => {
    // Fix the app to delete a task
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleCheck = (id) => {
    // Fix the app to mark a task as completed
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const handleKeyUp = (e, id) => {
    if (e.keyCode === 13) {
      toggleCheck(id);
    }
  };
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1);
  };

  const handleEdit = (id, newLabel, newDate) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, label: newLabel, todoDate: newDate } : todo
      )
    );
  };

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      <div className="todo-filter-navbar">
        <div className="todo-filters">
          <button
            className={`filter-button all ${filter === "all" && "active"}`}
            onClick={() => handleFilterChange("all")}
          >
            All
          </button>
          <button
            className={`filter-button completed ${filter === "completed" && "active"}`}
            onClick={() => handleFilterChange("completed")}
          >
            Completed
          </button>
          <button
            className={`filter-button incomplete ${filter === "incomplete" && "active"}`}
            onClick={() => handleFilterChange("incomplete")}
          >
            Incomplete
          </button>
          
          <button
            className={`filter-button incomplete ${filter === "latest" && "active"}`}
            onClick={() => handleFilterChange("latest")}
          >
            Latest
          </button>
          <button
            className={`filter-button incomplete ${filter === "oldest" && "active"}`}
            onClick={() => handleFilterChange("oldest")}
          >
            Oldest
          </button>
         
        </div>
      </div>
      <div>
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="todo-search"
          />
      </div>
      {paginatedTodos?.length ? (
        <div className="todo-list-content">
          {paginatedTodos?.map((todoItem) => (
            <Checkbox
              key={todoItem.id}
              label={todoItem.label}
              checked={todoItem.checked}
              dueDate={todoItem.todoDate}
              onClick={() => toggleCheck(todoItem.id)}
              onKeyUp={(e) => handleKeyUp(e, todoItem.id)}
              onDelete={() => handleDelete(todoItem.id)}
              onEdit={(newLabel, newDate) => handleEdit(todoItem.id, newLabel, newDate)}
            />
          ))}
        </div>
      ) : (
        <div className="no-todos">
          Looks like you&apos;re up for a challenge!
        </div>
      )}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
