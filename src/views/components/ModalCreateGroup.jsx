import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTodo from "../../hooks/useTodo";
import axiosClient from "../../config/axios";

export default function ModalCreateTask(id) {

  const {  handleClickModalCreateGroup } = useTodo();
  const [title, setTitle] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    handleSubmitNewTask();
    handleClickModalCreateGroup();
  }

  const handleSubmitNewTask = async () => {
    console.log(id);
    try {
      const formData = new FormData();

      formData.append('title', title);
      formData.append('status', 1);

      const {data} = await axiosClient.post(
        'taskgroup', formData
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
      toast.error("Error, try again" + error ,{
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

          <div className="mt-5">
          <input
            className="flex-no-shrink py-1 px-4 ml-4 mr-2 border-2 rounded hover:text-white text-blue-500 border-blue-500 hover:bg-blue-500" 
            type="submit" 
            value="Create"/>
          <button 
          onClick={() => handleClickModalCreateGroup()}
          className="flex-no-shrink py-1 px-4 ml-4 mr-2 border-2 rounded hover:text-white text-red-500 border-red-500 hover:bg-red-500">
          Cancel
        </button>
          </div>


        </form>
    </div>
  )
}
