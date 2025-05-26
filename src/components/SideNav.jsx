import React from 'react'
import {
    Home, Users, Calendar, FileText, Settings,
    UserCheck, Activity, Pill
} from 'lucide-react'

const SideNav = ({ onOpenPatientDialog }) => {
    const menuItems = [
        { icon: Home, label: 'Dashboard' },
        { icon: Users, label: 'Patients' }, // trigger PatientInfo here
        { icon: Calendar, label: 'Appointments' },
        { icon: Activity, label: 'Vitals' },
        { icon: Pill, label: 'Prescriptions' },
        { icon: FileText, label: 'Reports' },
        { icon: UserCheck, label: 'Staff' },
        { icon: Settings, label: 'Settings' },
    ]

    const handleMenuClick = (label) => {
        if (label === 'Patients') {
            onOpenPatientDialog()
        }
    }

    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
                <nav className="space-y-2">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleMenuClick(item.label)}
                            className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-100 rounded-md transition"
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="p-4 border-t border-gray-200">
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
        </aside>
    )
}

export default SideNav
