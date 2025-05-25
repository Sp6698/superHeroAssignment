import { useState } from 'react'

import './App.css'
import NavBar from './components/NavBar'
import PatientInfo from './components/PatientInfo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-[100vw] h-[100vh] bg-gray-300 flex flex-col'>
      <NavBar />
      <PatientInfo />
    </div>
  )
}

export default App
