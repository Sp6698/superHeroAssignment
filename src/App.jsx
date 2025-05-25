import { useState } from 'react'

import './App.css'
import NavBar from './components/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='w-[100vw] h-[100vh] bg-gray-300 '>
        <NavBar />
        <h1>hello</h1>
      </div>
    </>
  )
}

export default App
