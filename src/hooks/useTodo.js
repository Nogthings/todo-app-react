import { useContext } from "react";
import TodoContext from "../providers/TodoProvider";

const useTodo = () => {
  return useContext(TodoContext);
}

export default useTodo;