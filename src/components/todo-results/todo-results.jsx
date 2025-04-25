import * as React from "react";
import "./todo-results.scss";
import { TodosContext } from "../../todo-context";
import { useNavigate } from "react-router-dom";

export const TodoResults = () => {
  const { todos } = React.useContext(TodosContext);
  const navigate = useNavigate();

  const calculateChecked = () => {
    // Fix the app to count the completed tasks
    return todos?.filter((todo) => todo.checked).length;
  };

  const handleLogout = () => {
    // localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="todo-results">
      <div className="counter total">Total: {todos?.length}</div>
      <div className="counter done">Done: {calculateChecked()}</div>
      <div className="counter pending">
        Pending: {todos?.length - calculateChecked()}
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
