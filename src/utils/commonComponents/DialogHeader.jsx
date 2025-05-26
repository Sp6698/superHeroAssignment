import React from 'react';
import { ArrowLeft, ChevronDown, MoreHorizontal } from 'lucide-react';

const DialogHeader = ({
    onClose = () => { },
    showSavedStatus = true,
    actionButtonText = "Actions",
    onActionClick = () => { }
}) => {
    return (
        <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <button
                        onClick={onClose}
                        className="flex items-center text-gray-600 hover:text-gray-800 text-sm"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back
                    </button>
                </div>
                <div className="flex items-center space-x-3">
                    {showSavedStatus && (
                        <div className="text-sm text-gray-500">Changes saved</div>
                    )}
                    <button
                        onClick={onActionClick}
                        className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 flex items-center"
                    >
                        {actionButtonText}
                        <ChevronDown className="w-3 h-3 ml-1" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DialogHeader;