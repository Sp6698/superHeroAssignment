import React from 'react';
import { Search, Calendar } from 'lucide-react';

const SearchVisitSection = ({
    searchPlaceholder = "Search Medicines Eg. Antihypertensives",
    visitDates = [],
    activeVisitIndex = 0,
    onVisitSelect = () => { }
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4">
            <div className="relative mb-3">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder={searchPlaceholder}
                    className="w-[32vw] pl-9 pr-12 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute right-180 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">
                    ⌘/
                </div>
            </div>

            <div className="flex justify-between space-x-3">
                <div>
                    {visitDates.map((date, index) => (
                        <button
                            key={index}
                            onClick={() => onVisitSelect(index)}
                            className={`px-3 mx-2 py-1.5 rounded text-sm font-medium ${index === activeVisitIndex
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-100 border border-gray-300'
                                }`}
                        >
                            {date}
                        </button>
                    ))}
                </div>
                <button className="text-gray-400 hover:text-gray-600 p-1 text-right">
                    <Calendar className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default SearchVisitSection;