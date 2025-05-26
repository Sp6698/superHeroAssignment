import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import SideNav from './components/SideNav'
import PatientInfo from './components/PatientInfo'

function App() {
  const [showPatientInfo, setShowPatientInfo] = useState(false)
  const [showSideNav, setShowSideNav] = useState(true) // open by default

  const handleOpenPatientDialog = () => {
    setShowPatientInfo(true)
  }

  const handleClosePatientDialog = () => {
    setShowPatientInfo(false)
  }

  const handleToggleSideNav = () => {
    setShowSideNav(prev => !prev)
  }

  return (
    <div className='w-screen h-screen bg-gray-300 flex flex-col'>
      <NavBar onMenuClick={handleToggleSideNav} />

      <div className="flex flex-1 overflow-hidden">
        {showSideNav && (
          <SideNav onOpenPatientDialog={handleOpenPatientDialog} />
        )}

        <main className="flex-1 bg-gray-100 flex items-center justify-center overflow-auto">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800">Welcome To Our WEB App</h1>
            <p className="text-gray-600 mt-2">This is where your main application content would go.</p>
          </div>
        </main>
      </div>

      {showPatientInfo && <PatientInfo onClose={handleClosePatientDialog} />}
    </div>
  )
}

export default App
