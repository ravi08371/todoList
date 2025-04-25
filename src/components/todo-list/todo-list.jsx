import * as React from "react";
import { Checkbox } from "../checkbox";
import { TodosContext } from "../../todo-context";
import "./todo-list.scss";

export const TodoList = () => {
  const { todos, setTodos } = React.useContext(TodosContext);
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("all");
  const [page, setPage] = React.useState(1);

  const todosPerPage = 10;
  const filteredTodos = todos?.filter((todo) => {
    const matchesSearch = todo.label
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" ? todo.checked : !todo.checked);
    return matchesSearch && matchesFilter;
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

  const handleEdit = (id, newLabel) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, label: newLabel } : todo))
    );
  };

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      <div className="todo-filter-navbar">
        <div className="todo-filters">
          <button
            className="filter-button all"
            onClick={() => handleFilterChange("all")}
          >
            All
          </button>
          <button
            className="filter-button completed"
            onClick={() => handleFilterChange("completed")}
          >
            Completed
          </button>
          <button
            className="filter-button incomplete"
            onClick={() => handleFilterChange("incomplete")}
          >
            Incomplete
          </button>
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
      </div>
      {paginatedTodos?.length ? (
        <div className="todo-list-content">
          {paginatedTodos?.map((todoItem) => (
            <Checkbox
              key={todoItem.id}
              label={todoItem.label}
              checked={todoItem.checked}
              onClick={() => toggleCheck(todoItem.id)}
              onKeyUp={(e) => handleKeyUp(e, todoItem.id)}
              onDelete={() => handleDelete(todoItem.id)}
              onEdit={(newLabel) => handleEdit(todoItem.id, newLabel)}
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
