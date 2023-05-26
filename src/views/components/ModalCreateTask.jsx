import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTodo from "../../hooks/useTodo";
import axiosClient from "../../config/axios";

export default function ModalCreateTask(id) {

  const {  handleClickModalCreateTask } = useTodo();
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [priority, setPriority] = useState();

  const handleSubmit = e => {
    e.preventDefault();
    handleSubmitNewTask();
    handleClickModalCreateTask();
  }

  const handleSubmitNewTask = async () => {
    console.log(id);
    try {
      const formData = new FormData();

      formData.append('title', title);
      formData.append('start_date', startDate);
      formData.append('complete', 0);
      formData.append('priority', priority);
      formData.append('status', 1);
      formData.append('task_group_id', id.id);

      const {data} = await axiosClient.post(
        'tasks', formData
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
              className="rounded w-full shadow-md"
              placeholder="Title"/>
          </div>
          <div>
            <input 
              onChange={(e) => setStartDate(e.target.value)}
              type="date"
              pattern="\d{4}-\d{2}-\d{2}"
              name="start_date"
              className="rounded w-full shadow-md"
              placeholder="Title"/>
          </div>
          <div>
            <select 
              className="rounded w-full shadow-md"
              onChange={(e) => setPriority(e.target.value)}
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
            className="flex-no-shrink py-1 px-4 ml-4 mr-2 border-2 rounded hover:text-white text-blue-500 border-blue-500 hover:bg-blue-500" 
            type="submit" 
            value="Create"/>
          <button 
          onClick={() => handleClickModalCreateTask()}
          className="flex-no-shrink py-1 px-4 ml-4 mr-2 border-2 rounded hover:text-white text-red-500 border-red-500 hover:bg-red-500">
          Cancel
        </button>
          </div>


        </form>
    </div>
  )
}
