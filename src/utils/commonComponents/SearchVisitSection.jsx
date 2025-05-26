import React, { useState, useRef, useEffect } from 'react';
import { Search, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const SearchVisitSection = ({
    searchPlaceholder = "Search Medicines Eg. Antihypertensives",
    visitDates = [],
    activeVisitIndex = 0,
    onVisitSelect = () => { }
}) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const datePickerRef = useRef(null);

    // Close date picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                setShowDatePicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }

        return days;
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleDateSelect = (date) => {
        const formattedDate = formatDate(date);
        console.log('Selected date:', formattedDate);
        setShowDatePicker(false);
    };

    const navigateMonth = (direction) => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(currentMonth.getMonth() + direction);
        setCurrentMonth(newMonth);
    };

    const days = getDaysInMonth(currentMonth);
    const monthYear = currentMonth.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

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
                <button
                    className="text-gray-400 hover:text-gray-600 p-1 text-right"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    ref={datePickerRef}
                >
                    <Calendar className="w-4 h-4" />
                </button>

                {showDatePicker && (
                    <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg z-50 ">
                        {/* Month Navigation */}
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={() => navigateMonth(-1)}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <h3 className="font-medium text-gray-900">{monthYear}</h3>
                            <button
                                onClick={() => navigateMonth(1)}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Days of Week Headers */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                                <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Days */}
                        <div className="grid grid-cols-7 gap-1">
                            {days.map((day, index) => (
                                <div key={index} className="aspect-square">
                                    {day && (
                                        <button
                                            onClick={() => handleDateSelect(day)}
                                            className="w-full h-full text-sm hover:bg-blue-100 rounded flex items-center justify-center transition-colors"
                                        >
                                            {day.getDate()}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {showDatePicker && (
                    <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 w-72">
                        {/* Month Navigation */}
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={() => navigateMonth(-1)}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <h3 className="font-medium text-gray-900">{monthYear}</h3>
                            <button
                                onClick={() => navigateMonth(1)}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Days of Week Headers */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                                <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Days */}
                        <div className="grid grid-cols-7 gap-1">
                            {days.map((day, index) => (
                                <div key={index} className="aspect-square">
                                    {day && (
                                        <button
                                            onClick={() => handleDateSelect(day)}
                                            className="w-full h-full text-sm hover:bg-blue-100 rounded flex items-center justify-center transition-colors"
                                        >
                                            {day.getDate()}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchVisitSection;