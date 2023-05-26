import { createContext, useState, useEffect } from "react";
import axiosClient from "../config/axios";
import useSWR from "swr";


const TodoContext = createContext();

// eslint-disable-next-line react/prop-types
const TodoProvider = ({children}) => {

  const [taskGroups, setTaskGroups] = useState([]);
  const [actualTaskGroup, setActualTaskGroup] = useState({});
  const [modalCreateGroup, setModalCreateGroup] = useState(false);
  const [modalCreateTask, setModalCreateTask] = useState(false);
  const [modalEditTask, setModalEditTask] = useState(false);

  const obtainTaskGroups = async () => {
    try {
      const {data} = await axiosClient('taskgroup');
      setTaskGroups(data.data);
      setActualTaskGroup(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    obtainTaskGroups();
  }, []);

  const handleClickTaskGroup = (id) => {
    const taskGroup = taskGroups.filter((taskGroup) => taskGroup.id === id)[0];
    setActualTaskGroup(taskGroup);
    console.log(actualTaskGroup);
  }

  const handleClickModalCreateTask = () => {
    setModalCreateTask(!modalCreateTask);
  }

  const handleClickModalCreateGroup = () => {
    setModalCreateGroup(!modalCreateGroup);
  }

  const handleClickModalEditTask = () => {
    setModalEditTask(!modalEditTask);
  }
  

  return (
    <TodoContext.Provider
      value={{
        taskGroups,
        actualTaskGroup,
        handleClickTaskGroup,
        modalCreateGroup,
        handleClickModalCreateGroup,
        modalCreateTask,
        handleClickModalCreateTask,
        handleClickModalEditTask,
        modalEditTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );

};

export { TodoProvider };

export default TodoContext;