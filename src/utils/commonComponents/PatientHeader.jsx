import React from 'react';
import { Phone, User } from 'lucide-react';

const PatientHeader = ({
    patientData = {
        initials: 'CS',
        name: 'Chinmay Sule',
        id: '100087-000015-2',
        phone: '+91-9096398014',
        gender: 'Male',
        age: '38Y'
    },
    allergies = []
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {patientData.initials}
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">{patientData.name}</h1>
                        <p className="text-gray-500 text-sm">{patientData.id}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {patientData.phone}
                    </div>
                    <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {patientData.gender}
                    </div>
                    <div className="flex items-center">
                        <span className="mr-1">🎂</span>
                        {patientData.age}
                    </div>
                </div>
            </div>

            {/* Allergies */}
            <div className="mt-4 flex flex-wrap gap-2">
                {allergies.map((allergy, index) => (
                    <span
                        key={index}
                        className={`px-2 py-1 rounded text-xs font-medium border ${allergy.color}`}
                    >
                        {allergy.name}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default PatientHeader;