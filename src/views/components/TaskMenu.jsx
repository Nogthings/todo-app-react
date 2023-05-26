import Modal from "react-modal";
import ModalEditTask from "./ModalEditTask";
import useTodo from "../../hooks/useTodo";
import axiosClient from "../../config/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

/* eslint-disable react/prop-types */
export default function TaskMenu({ task }) {
  // eslint-disable-next-line react/prop-types, no-unused-vars
  const { id, title, start_date, complete, priority, status } = task;
  const { handleClickModalEditTask, modalEditTask } = useTodo();

  const isTaskComplete = () => task.complete === 1;

  const handleSubmitDeleteTask = async () => {

    try {
      const {data} = await axiosClient.put(
        `tasks/${id}`, {
          title: task.title,
          start_date: task.start_date,
          complete: task.complete,
          priority: task.priority,
          status: 0,
          task_group_id: task.task_group_id
        }
      )
      
      toast.success(data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })

    } catch (error) {
      console.log(error);
      toast.error("Error, try again" ,{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }

  }

  const handleSubmitDoneTask = async () => {

    try {
      const {data} = await axiosClient.put(
        `tasks/${id}`, {
          title: task.title,
          start_date: task.start_date,
          complete: 1,
          priority: task.priority,
          status: task.status,
          task_group_id: task.task_group_id
        }
      )
      
      toast.success(data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })

    } catch (error) {
      console.log(error);
      toast.error("Error, try again" ,{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }

  }

  const handleSubmitUndoneTask = async () => {

    try {
      const {data} = await axiosClient.put(
        `tasks/${id}`, {
          title: task.title,
          start_date: task.start_date,
          complete: 0,
          priority: task.priority,
          status: task.status,
          task_group_id: task.task_group_id
        }
      )
      
      toast.success(data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })

    } catch (error) {
      console.log(error);
      toast.error("Error, try again" ,{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }

  }

  return (
    <div className={`${priority === 1 ? "border-green-500 " : priority === 2 ? "border-orange-500 " : "border-red-500 " } border-2 shadow-lg rounded-lg p-2`}>
      <p className="w-full text-grey-darkest p-2 mb-2">{title}</p>
      <p className="w-full text-grey-darkest text-xs px-2  mb-1">
        Start: {start_date}
      </p>
      <p className="w-full text-grey-darkest text-xs px-2 mb-4">
        Priority: {priority === 1 ? "Low" : priority === 2 ? "Medium" : "High" }
      </p>
      <div className="flex mb-4 items-center">
        {
          isTaskComplete() ?
          <button 
          onClick={()=>handleSubmitUndoneTask()}
          className="flex-no-shrink py-1 px-4 ml-4 mr-2 border-2 rounded hover:text-white text-gray-500 border-gray-500 hover:bg-gray-500 dark:text-gray-100 dark:border-gray-100 dark:hover:bg-gray-100 dark:hover:text-gray-200">
          Undone
        </button>
          :
          <button
          onClick={() => handleSubmitDoneTask()}
          className="flex-no-shrink py-1 px-4 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green-500">
          Done
        </button>
        }

        <button 
          onClick={() => {handleClickModalEditTask(), console.log(task);}}
          className="flex-no-shrink py-1 px-4 ml-4 mr-2 border-2 rounded hover:text-white text-orange-500 border-orange-500 hover:bg-orange-500">
          Edit
        </button>
        <button 
          onClick={() => handleSubmitDeleteTask()}
          className="flex-no-shrink py-1 px-4 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500">
          Remove
        </button>
      </div>

      <Modal isOpen={modalEditTask} style={customStyles}>
        <ModalEditTask task={task}/>
      </Modal>
    </div>
  );
}
