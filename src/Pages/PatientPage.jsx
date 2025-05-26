import React, { useState, useEffect } from 'react'
import PatientInfoDialog from '../components/PatientInfoDialog'

const PatientPage = () => {
    const [showPatientDialog, setShowPatientDialog] = useState(false)

    // Auto-open dialog when page loads
    useEffect(() => {
        setShowPatientDialog(true)
    }, [])

    const handleOpenDialog = () => {
        setShowPatientDialog(true)
    }

    const handleCloseDialog = () => {
        setShowPatientDialog(false)
    }

    return (
        <div className="relative h-full">
            <div className="h-full">
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Patient Management</h1>
                        <p className="text-gray-600 mb-6">This is the Patient Page - Manage all patient information here.</p>
                        <button
                            onClick={handleOpenDialog}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Open Patient Information
                        </button>
                    </div>
                </div>
            </div>

            {showPatientDialog && (
                <PatientInfoDialog onClose={handleCloseDialog} />
            )}
        </div>
    )
}

export default PatientPage