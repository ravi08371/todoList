import React, { useEffect, useState } from "react";

const useServices = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [todos, setTodos] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(user?.mobileNo)) || [];
    return saved;
  });

  useEffect(() => {
    if (user?.mobileNo) {
      localStorage.setItem(user.mobileNo, JSON.stringify(todos));
    }
  }, [todos, user]);

  return {
    todos,
    setTodos,
  };
};

export default useServices;
