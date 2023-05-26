import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { TodoProvider } from './providers/TodoProvider.jsx'
import router from './router.jsx'
import './index.css'
import ('preline')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodoProvider>
      <RouterProvider router={router}/>
    </TodoProvider>
  </React.StrictMode>,
)
