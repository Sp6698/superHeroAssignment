import React from 'react'
import {
    Home, Users, Calendar, FileText, Settings,
    UserCheck, Activity, Pill, X
} from 'lucide-react'

const SideNav = ({ isOpen, onClose, onOpenPatientDialog }) => {
    const menuItems = [
        { icon: Home, label: 'Dashboard', active: false },
        { icon: Users, label: 'Patients', active: true },
        { icon: Calendar, label: 'Appointments', active: false },
        { icon: Activity, label: 'Vitals', active: false },
        { icon: Pill, label: 'Prescriptions', active: false },
        { icon: FileText, label: 'Reports', active: false },
        { icon: UserCheck, label: 'Staff', active: false },
        { icon: Settings, label: 'Settings', active: false },
    ]

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

            {/* Sidebar */}
            <div className="relative w-64 bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Menu Items */}
                <div className="p-4">
                    <nav className="space-y-2">
                        {menuItems.map((item, index) => (
                            <button
                                key={index}
                                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${item.active ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Patient Info Button */}
                    <div className="mt-8 pt-4 border-t border-gray-200">
                        <button
                            onClick={onOpenPatientDialog}
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
                        >
                            Open Patient Info
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            Dr
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">Dr. Smith</p>
                            <p className="text-xs text-gray-500">Administrator</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideNav
