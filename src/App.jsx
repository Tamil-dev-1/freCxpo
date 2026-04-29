import React from 'react'
import Home from './pages/Homepage/Home'
import {Route, Routes } from 'react-router-dom'
import Form from './pages/form/Form'

const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/form' element={<Form />} />
      </Routes>
    </div>
  )
}

export default App
