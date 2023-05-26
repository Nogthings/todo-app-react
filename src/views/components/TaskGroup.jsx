import useTodo from "../../hooks/useTodo";

// eslint-disable-next-line react/prop-types
export default function TaskGroup({taskGroup}) {

  const { handleClickTaskGroup, actualTaskGroup} = useTodo();
  // eslint-disable-next-line react/prop-types, no-unused-vars
  const { title, id } = taskGroup;

  const focusActualTaskGroup = () => 
    actualTaskGroup.id === id ? "bg-blue-500 text-white hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-900 dark:text-white " : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900 "

  const listTasks = () => actualTaskGroup.id === id

  return (
    <div
    onClick={()=>handleClickTaskGroup(id)} 
    className={`${focusActualTaskGroup()} flex items-center  py-2  px-2 text-sm text-slate-700 rounded-md`}>
        <p className={`${listTasks() ? " text-white " : " text-gray-600 dark:text-gray-100 "}block text-base font-semibold uppercase`}>
          {title}
        </p>     
    </div>
  )
}
