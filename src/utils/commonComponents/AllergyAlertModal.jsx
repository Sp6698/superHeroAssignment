import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const AllergyAlertModal = ({
    isOpen = false,
    allergyAlert = null,
    onClose = () => { },
    onOverride = () => { },
    onViewAlternatives = () => { }
}) => {
    if (!isOpen || !allergyAlert) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
                <div className="p-6">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <AlertTriangle className="h-6 w-6 text-red-500" />
                        </div>
                        <div className="ml-3 w-full">
                            <h3 className="text-lg font-medium text-red-800 mb-2">
                                Allergy Alert
                            </h3>
                            <div className="text-sm text-gray-700 mb-4">
                                {allergyAlert.message}
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    onClick={onOverride}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm font-medium"
                                >
                                    Override Warning
                                </button>
                                <button
                                    onClick={onViewAlternatives}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                                >
                                    View Alternatives
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllergyAlertModal;