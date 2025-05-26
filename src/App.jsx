import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import SideNav from './components/SideNav'
import PatientInfo from './components/PatientInfo'

function App() {
  const [showSideNav, setShowSideNav] = useState(false)
  const [showPatientInfo, setShowPatientInfo] = useState(false)

  const handleMenuClick = () => {
    setShowSideNav(!showSideNav)
  }

  const handleOpenPatientDialog = () => {
    setShowPatientInfo(true)
    setShowSideNav(false) // Close SideNav when patient dialog opens
  }

  const handleClosePatientDialog = () => {
    setShowPatientInfo(false)
  }

  return (
    <div className='w-[100vw] h-[100vh] bg-gray-300 flex flex-col relative'>
      <NavBar onMenuClick={handleMenuClick} />

      <div className='flex-1 bg-gray-300'>
        {/* Main content area */}
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">Main Dashboard Content</h2>
          <p className="text-gray-600 mt-2">This is where your main application content would go.</p>
        </div>
      </div>

      {/* Side Navigation */}
      <SideNav
        isOpen={showSideNav && !showPatientInfo}
        onClose={() => setShowSideNav(false)}
        onOpenPatientDialog={handleOpenPatientDialog}
      />

      {/* Patient Info Modal */}
      {showPatientInfo && <PatientInfo onClose={handleClosePatientDialog} />}
    </div>
  )
}

export default App
