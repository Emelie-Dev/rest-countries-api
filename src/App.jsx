import React from "react"
import Header from "./components/Header/Header"
import Main from "./components/Main/Main"
import { Routes, Route } from "react-router-dom"
import Countries from "./components/Main/Countries/Countries"

function App() {
  

  return (
   
   <>
   
    <Header />

    <Main />

    <Routes>

      <Route path='/' element={<Countries /> }/>
      <Route path='/country/:country' element={<Countries />} />
    </Routes>

   </>
  )
}

export default App
