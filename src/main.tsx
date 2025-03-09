import { StrictMode } from 'react'
import {  createBrowserRouter, Route, RouterProvider } from "react-router";
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.tsx'
import Home from './pages/Home.tsx';
import Searching from './pages/Searching.tsx';
import { createRoutesFromElements } from 'react-router';
import About from './pages/About.tsx';

import Sorting from './pages/Sorting.tsx';
import Race from './pages/race/Race.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='race' element={<Race/>}/>
      <Route path='algorithms/searching' element={<Searching/>}/>
      <Route path='algorithms/sorting' element={<Sorting/>}/>
      <Route path='about' element={<About/>}/>
    </Route>
  )
)
createRoot(document.getElementById('root')!).render(

  <StrictMode>


  <RouterProvider router={router}/>

  </StrictMode>,

)
