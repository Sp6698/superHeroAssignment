import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import SideNav from './components/SideNav'
import MainPage from './Pages/MainPage'
import PatientPage from './Pages/PatientPage'
import NavBar from './components/NavBar'

function App() {
  const [showSideNav, setShowSideNav] = useState(true) // open by default

  const handleToggleSideNav = () => {
    setShowSideNav(prev => !prev)
  }

  return (
    <Router>
      <div className='w-screen h-screen bg-gray-300 flex flex-col'>
        <NavBar onMenuClick={handleToggleSideNav} />

        <div className="flex flex-1 overflow-hidden">
          {showSideNav && <SideNav />}

          <main className="flex-1 bg-gray-100 overflow-auto">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/patients" element={<PatientPage />} />
              <Route path="/" element={<MainPage />} />
              <Route path="/appointments" element={<div className="flex items-center justify-center h-full"><div className="text-center"><h1 className="text-2xl font-semibold text-gray-800">Appointments</h1><p className="text-gray-600 mt-2">Work in Progress...</p></div></div>} />
              <Route path="/vitals" element={<div className="flex items-center justify-center h-full"><div className="text-center"><h1 className="text-2xl font-semibold text-gray-800">Vitals</h1><p className="text-gray-600 mt-2">Work in Progress...</p></div></div>} />
              <Route path="/prescriptions" element={<div className="flex items-center justify-center h-full"><div className="text-center"><h1 className="text-2xl font-semibold text-gray-800">Prescriptions</h1><p className="text-gray-600 mt-2">Work in Progress...</p></div></div>} />
              <Route path="/reports" element={<div className="flex items-center justify-center h-full"><div className="text-center"><h1 className="text-2xl font-semibold text-gray-800">Reports</h1><p className="text-gray-600 mt-2">Work in Progress...</p></div></div>} />
              <Route path="/staff" element={<div className="flex items-center justify-center h-full"><div className="text-center"><h1 className="text-2xl font-semibold text-gray-800">Staff</h1><p className="text-gray-600 mt-2">Work in Progress...</p></div></div>} />
              <Route path="/settings" element={<div className="flex items-center justify-center h-full"><div className="text-center"><h1 className="text-2xl font-semibold text-gray-800">Settings</h1><p className="text-gray-600 mt-2">Work in Progress...</p></div></div>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App