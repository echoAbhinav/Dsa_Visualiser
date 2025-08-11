import { StrictMode } from 'react'
import { RouterProvider } from "react-router";
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.tsx'
import Home from './pages/Home.tsx';
import Searching from './pages/Searching.tsx';
import {
  createBrowserRouter
} from "react-router";

import Algobot from './pages/Algobot.tsx'
import About from './pages/About.tsx';
import {ArraysPage,StacksPage,QueuesPage,LinkedListsPage} from './pages/data-structures';
import Sorting from './pages/Sorting.tsx';
import Race from './pages/race/Race.tsx';


let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // No <Outlet />, so child routes won’t show!
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "algorithms/searching", element: <Searching /> },
      { path: "algorithms/sorting", element: <Sorting /> },
      { path: "race", element: <Race /> },
      { path: "data-structures/arrays", element: <ArraysPage /> },
      { path: "data-structures/queues", element: <QueuesPage /> },
      { path: "data-structures/stacks", element: <StacksPage /> },
      { path: "data-structures/linked-lists", element: <LinkedListsPage /> },
      { path: "algobot", element: <Algobot /> },
    ],
  },
]);
createRoot(document.getElementById('root')!).render(

  <StrictMode>


<RouterProvider router={router} />


  </StrictMode>,

)
