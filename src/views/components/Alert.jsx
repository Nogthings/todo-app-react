
// eslint-disable-next-line react/prop-types
export default function Alert({children}) {
  return (
    <div
    className="bg-red-50 border border-red-200 rounded-md p-4"
    role="alert"
  >
    <div className="flex">
      <div className="flex-shrink-0">
        <svg
          className="h-4 w-4 text-red-400 mt-0.5"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
      </div>
      <div className="ml-4">
        <h3 className="text-sm text-red-800 font-semibold">
          {children}
        </h3>
      </div>
    </div>
  </div>
  )
}
