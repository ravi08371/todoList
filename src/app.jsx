import * as React from "react";
import { TodoForm } from "./components/todo-form";
import { TodoList } from "./components/todo-list";
import { TodoResults } from "./components/todo-results";
import { TodosContext } from "./todo-context";
import "./index.scss";
import useServices from "./components/hooks/useServices";

export const App = () => {
  const hookData = useServices();
  return (
    <div className="root">
      <TodosContext.Provider value={hookData}>
        <TodoResults />
        <TodoForm />
        <TodoList />
      </TodosContext.Provider>
    </div>
  );
};
