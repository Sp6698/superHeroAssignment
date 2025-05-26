import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    Home, Users, Calendar, FileText, Settings,
    UserCheck, Activity, Pill
} from 'lucide-react'

const SideNav = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const menuItems = [
        { icon: Home, label: 'Dashboard', path: '/dashboard' },
        { icon: Users, label: 'Patients', path: '/patients' },
        { icon: Calendar, label: 'Appointments', path: '/appointments' },
        { icon: Activity, label: 'Vitals', path: '/vitals' },
        { icon: Pill, label: 'Prescriptions', path: '/prescriptions' },
        { icon: FileText, label: 'Reports', path: '/reports' },
        { icon: UserCheck, label: 'Staff', path: '/staff' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ]

    const handleMenuClick = (path) => {
        navigate(path)
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
                            onClick={() => handleMenuClick(item.path)}
                            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition ${location.pathname === item.path
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-700 hover:bg-blue-50'
                                }`}
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