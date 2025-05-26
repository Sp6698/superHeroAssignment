import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CollapsibleSection = ({
    title,
    count = 0,
    isExpanded = false,
    onToggle = () => { },
    children,
    headerActions = null
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 text-left"
            >
                <div className="flex items-center">
                    {isExpanded ? (
                        <ChevronDown className="w-4 h-4 mr-2 text-gray-500" />
                    ) : (
                        <ChevronUp className="w-4 h-4 mr-2 text-gray-500" />
                    )}
                    <span className="font-medium text-gray-900 text-sm">{title}</span>
                </div>
                <div className="flex items-center space-x-2">
                    {headerActions}
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                        {count}
                    </span>
                </div>
            </button>
            {isExpanded && (
                <div className="border-t border-gray-200">
                    {children}
                </div>
            )}
        </div>
    );
};

export default CollapsibleSection;