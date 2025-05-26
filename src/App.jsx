import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import SideNav from './components/SideNav'
import PatientInfo from './components/PatientInfo'

function App() {
  const [showPatientInfo, setShowPatientInfo] = useState(false)

  const handleOpenPatientDialog = () => {
    setShowPatientInfo(true)
  }

  const handleClosePatientDialog = () => {
    setShowPatientInfo(false)
  }

  return (
    <div className='w-screen h-screen bg-gray-300 flex flex-col'>
      <NavBar />

      <div className="flex flex-1 overflow-hidden">
        <SideNav onOpenPatientDialog={handleOpenPatientDialog} />

        <main className="flex-1 p-6 overflow-auto bg-gray-100">
          <h1 className="text-2xl font-semibold text-gray-800">Welcome To Our WEB App</h1>
          <p className="text-gray-600 mt-2">This is where your main application content would go.</p>
        </main>
      </div>

      {/* Patient Info Modal */}
      {showPatientInfo && <PatientInfo onClose={handleClosePatientDialog} />}
    </div>
  )
}

export default App
