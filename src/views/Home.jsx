import TaskMenu from "./components/TaskMenu";
import EmptyTasks from "./components/EmptyTasks";
import useTodo from "../hooks/useTodo";
import useSWR from "swr";
import axiosClient from "../config/axios";
import Modal from "react-modal";
import ModalCreateTask from "./components/ModalCreateTask";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function Home() {
  const { actualTaskGroup, modalCreateTask, handleClickModalCreateTask } =
    useTodo();

  const fetcher = () => axiosClient("tasks").then((data) => data.data);
  const { data, error, isLoading } = useSWR("tasks", fetcher, {
    refreshInterval: 500,
  });

  console.log(data);
  console.log(error);

  if (isLoading)
    return (
      <div className="min-h-[15rem] flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
        <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
          <div className="flex justify-center">
            <div
              className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );

  const tasks = data.data.filter(
    (task) => task.task_group_id === actualTaskGroup.id
  );

  const noTasks = () => tasks.length === 0;

  return (
    <div>
      <div className="flex items-center justify-between rounded bg-gray-100 dark:bg-slate-800 dark:text-white p-2 max-w-xl mx-auto space-y-5">
        <h1 className="text-center text-lg font-semibold">Tasks:</h1>
        <button 
          onClick={() => handleClickModalCreateTask()}
          className="flex-no-shrink py-1 px-4 ml-4 mr-2 border-2 rounded hover:text-white text-blue-500 border-blue-500 hover:bg-blue-500">
          Create
        </button>
      </div>
      <div className="rounded bg-gray-100 dark:bg-slate-800 dark:text-white p-2 max-w-xl mx-auto space-y-5 mt-5">
        {tasks.map((task) => (
          <TaskMenu key={task.id} task={task} />
        ))}

        <div className={`${noTasks() ? "  " : " hidden "}`}>
          <EmptyTasks />
        </div>
      </div>

      <Modal isOpen={modalCreateTask} style={customStyles}>
        <ModalCreateTask id={actualTaskGroup.id} />
      </Modal>
    </div>
  );
}
