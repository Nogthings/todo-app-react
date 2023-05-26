import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTodo from "../../hooks/useTodo";
import axiosClient from "../../config/axios";

export default function ModalEditTask(task) {

  const {  handleClickModalEditTask } = useTodo();
  const [title, setTitle] = useState(task.task.title);
  const [startDate, setStartDate] = useState(task.task.start_date);
  const [priority, setPriority] = useState(task.task.priority);

  const id = task.task.id;

  const handleSubmit = e => {
     e.preventDefault();
     handleSubmitNewTask();
     handleClickModalEditTask();
  }

  const handleSubmitNewTask = async () => {
    try {

      const {data} = await axiosClient.put(
        `tasks/${id}`,  {
          title: title,
          start_date: startDate,
          complete: 0,
          priority: priority,
          status: 1,
          task_group_id: task.task.task_group_id
        }
      )
      console.log(data);
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
    <div>
      <p className="text-center mb-4">Create Task</p>
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col gap-4">
          <div>
            <input
              onChange={(e) => setTitle(e.target.value)} 
              type="text"
              name="title"
              value={title}
              className="rounded w-full shadow-md"
              placeholder="Title"/>
          </div>
          <div>
            <input 
              onChange={(e) => setStartDate(e.target.value)}
              type="date"
              value={startDate}
              pattern="\d{4}-\d{2}-\d{2}"
              name="start_date"
              className="rounded w-full shadow-md"
              placeholder="Title"/>
          </div>
          <div>
            <select 
              className="rounded w-full shadow-md"
              onChange={(e) => setPriority(e.target.value)}
              value={priority}
              name="priority" 
              id="priority">
                <option value=""> -- SELECT PRIORITY -- </option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </select>
          </div>

          <div className="mt-5">
          <input
            className="flex-no-shrink py-1 px-4 ml-4 mr-2 border-2 rounded hover:text-white text-orange-500 border-orange-500 hover:bg-orange-500" 
            type="submit" 
            value="Edit"/>
          <button 
          onClick={() => handleClickModalEditTask()}
          className="flex-no-shrink py-1 px-4 ml-4 mr-2 border-2 rounded hover:text-white text-red-500 border-red-500 hover:bg-red-500">
          Cancel
        </button>
          </div>


        </form>
    </div>
  )
}
