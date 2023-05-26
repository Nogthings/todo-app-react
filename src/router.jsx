import { createBrowserRouter } from "react-router-dom";
import Layout from "./views/layouts/Layout";
import Home from "./Views/Home";


const router = createBrowserRouter(
  [
    { path: '/', element: <Layout/>, children: [
      { index: true, element: <Home/>}
    ]}
  ]
);

export default router;