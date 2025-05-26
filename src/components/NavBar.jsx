import React from 'react'
import { Menu } from 'lucide-react'

const NavBar = ({ onMenuClick }) => {
    return (
        <div className="flex justify-between items-center bg-gray-300 border-b border-gray-700 px-4 h-12">
            <div className="flex items-center gap-2">
                <Menu
                    size={20}
                    className="text-black cursor-pointer hover:text-gray-700"
                    onClick={onMenuClick}
                />

                <span className="text-lg font-bold text-blue-900">Almighty</span>
            </div>
            <div>
                <div className="w-8 h-8 flex items-center justify-center rounded-full text-lg">
                    😊
                </div>
            </div>
        </div>
    )
}

export default NavBar
