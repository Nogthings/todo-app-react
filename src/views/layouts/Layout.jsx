import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import useTodo from "../../hooks/useTodo";
import TaskGroup from "../components/TaskGroup";
import ModalCreateGroup from "../components/ModalCreateGroup";

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

Modal.setAppElement('#root');

export default function Layout() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    const body = document.querySelector("body");
    body.classList.toggle("dark");
    body.classList.toggle("light");
  };

  const { modalCreateGroup, handleClickModalCreateGroup, taskGroups } = useTodo();

  return (
    <>
      <div className="bg-gray-50 dark:bg-slate-900">
  {/* <!-- ========== HEADER ========== --> */}
  <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b text-sm py-2.5 sm:py-4 dark:bg-slate-900 dark:border-gray-700">
      <nav
        className="max-w-7xl flex basis-full items-center w-full mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="mr-5 md:mr-8">
          <Link
            className="flex-none text-xl font-semibold dark:text-white"
            to="/"
            aria-label="Brand"
          >
            Todo
          </Link>
        </div>

        <div className="w-full flex items-center justify-end ml-auto  sm:gap-x-3 sm:order-3">
          <div className="flex flex-row items-center justify-end gap-2">
            <div className="mr-2">
              <button
                onClick={toggleTheme}
                className="hs-dark-mode-active:hidden  hs-dark-mode group flex items-center text-gray-600 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-gray-500"
                data-hs-theme-click-value="dark"
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                </svg>
              </button>
              <button
                onClick={toggleTheme}
                className="hs-dark-mode-active:block hidden hs-dark-mode group  items-center text-gray-600 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-gray-500"
                data-hs-theme-click-value="light"
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                </svg>
              </button>
            </div>


            {/* DROPDOWN START */}
            {/* <div className={`${comprobarAutenticado() ? "hidden" : ""}`}> */}
            <div className="">
            <button 
          onClick={() => handleClickModalCreateGroup()}
          className="flex-no-shrink py-1 px-4 ml-4 mr-2 border-2 rounded hover:text-white text-blue-500 border-blue-500 hover:bg-blue-500">
          Create Group
        </button>
            </div>
            {/* DROPDOWN END */}
          </div>
        </div>
      </nav>
    </header>
  {/* <!-- ========== END HEADER ========== --> */}

  <nav
      className="sticky -top-px bg-white z-10 text-sm font-medium text-black ring-1 ring-gray-900 ring-opacity-5 border-t shadow-sm shadow-gray-100 pt-6 md:pb-6 -mt-px dark:bg-slate-900 dark:border-gray-800 dark:shadow-slate-700/[.7]"
      aria-label="Jump links"
    >
      <div className="max-w-7xl snap-x w-full flex items-center overflow-x-auto overflow-hidden space-x-2 scrollbar-x px-4 sm:px-6 lg:px-8 pb-4 md:pb-0 mx-auto dark:scrollbar-x">

      {taskGroups.map((taskGroup) => (
        <TaskGroup
          key={taskGroup.id}
          taskGroup={taskGroup}/>
      ))}

      </div>
    </nav>

        {/* <!-- Content --> */}
        <div className="w-full pt-10 px-4 sm:px-6 md:px-8 h-screen">
          {/* <!-- Page Heading --> */}
          <Outlet />
          {/* <!-- End Page Heading --> */}
        </div>

</div>




      <Modal
        isOpen={modalCreateGroup}
        style={customStyles}
      >
        <ModalCreateGroup/>
        

      </Modal>

      <ToastContainer/>

    </>
  )

}
