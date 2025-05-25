import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, Search, Edit, Trash2, Plus, MoreHorizontal, Phone, User, Calendar } from 'lucide-react';

const PatientInfo = () => {
    const [expandedSections, setExpandedSections] = useState({
        vitals: true,
        diagnosis: true,
        investigation: true,
        prescriptions: true,
        complaints: true,
        history: true,
        clinicalForms: true,
        service: true
    });

    const [medications, setMedications] = useState([
        {
            id: 1,
            name: 'Digoxin',
            type: 'Tablet',
            frequency: '1-1 tab/day',
            dose: 'BD',
            duration: '7 days',
            remarks: 'Patient shows signs of fatigue and dyspnea'
        },
        {
            id: 2,
            name: 'Furosemide',
            type: 'Intravenous',
            frequency: '5 ml/day',
            dose: 'OD',
            duration: '4 days',
            remarks: 'Confirmed post HbA1c test, further monito...'
        }
    ]);

    const [newMedication, setNewMedication] = useState('');

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const addNewMedication = () => {
        if (newMedication.trim()) {
            const newMed = {
                id: medications.length + 1,
                name: newMedication,
                type: 'Tablet',
                frequency: '',
                dose: '',
                duration: '',
                remarks: ''
            };
            setMedications([...medications, newMed]);
            setNewMedication('');
        }
    };

    const deleteMedication = (id) => {
        setMedications(medications.filter(med => med.id !== id));
    };

    const allergies = [
        { name: 'Sulfa Drug Allergy', color: 'bg-blue-100 text-blue-800' },
        { name: 'Statin Muscle Pain', color: 'bg-purple-100 text-purple-800' },
        { name: 'Peanut Allergy', color: 'bg-orange-100 text-orange-800' },
        { name: 'Penicillin Allergy', color: 'bg-yellow-100 text-yellow-800' },
        { name: 'Smoker', color: 'bg-red-100 text-red-800' },
        { name: 'Alcohol Use', color: 'bg-pink-100 text-pink-800' }
    ];

    const visitDates = ['11th Jan, 2025', '3rd Jan, 2025', '28th Dec, 2024', '1st Oct, 2024'];

    const sectionCounts = {
        vitals: 5,
        diagnosis: 2,
        investigation: 1,
        prescriptions: 0,
        complaints: 2,
        history: 4,
        clinicalForms: 2,
        service: 4
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button className="flex items-center text-gray-600 hover:text-gray-800">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back
                        </button>
                        <div className="text-sm text-gray-500">Changes saved</div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
                            Actions
                            <ChevronDown className="w-4 h-4 ml-2" />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-6">
                {/* Patient Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                                    CS
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Chinmay Sule</h1>
                                    <p className="text-gray-500">100087-000015-2</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-6 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <Phone className="w-4 h-4 mr-2" />
                                    +91-9096398014
                                </div>
                                <div className="flex items-center">
                                    <User className="w-4 h-4 mr-2" />
                                    Male
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    38Y
                                </div>
                            </div>
                        </div>

                        {/* Allergies */}
                        <div className="mt-6 flex flex-wrap gap-2">
                            {allergies.map((allergy, index) => (
                                <span
                                    key={index}
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${allergy.color}`}
                                >
                                    {allergy.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Search and Visit Dates */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="p-6">
                        <div className="relative mb-4">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search Medicines Eg. Antihypertensives"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                                ⌘/
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            {visitDates.map((date, index) => (
                                <button
                                    key={index}
                                    className={`px-4 py-2 rounded-md text-sm font-medium ${index === 0
                                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {date}
                                </button>
                            ))}
                            <button className="text-gray-400 hover:text-gray-600">
                                <Calendar className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Medical Sections */}
                <div className="space-y-4">
                    {/* Vitals */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <button
                            onClick={() => toggleSection('vitals')}
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                        >
                            <div className="flex items-center">
                                {expandedSections.vitals ? (
                                    <ChevronDown className="w-5 h-5 mr-2 text-gray-500" />
                                ) : (
                                    <ChevronUp className="w-5 h-5 mr-2 text-gray-500" />
                                )}
                                <span className="font-medium text-gray-900">Vitals</span>
                            </div>
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                                {sectionCounts.vitals}
                            </span>
                        </button>
                        {expandedSections.vitals && (
                            <div className="border-t border-gray-200 p-4">
                                <p className="text-gray-600">Vitals data would be displayed here...</p>
                            </div>
                        )}
                    </div>

                    {/* Diagnosis */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <button
                            onClick={() => toggleSection('diagnosis')}
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                        >
                            <div className="flex items-center">
                                {expandedSections.diagnosis ? (
                                    <ChevronDown className="w-5 h-5 mr-2 text-gray-500" />
                                ) : (
                                    <ChevronUp className="w-5 h-5 mr-2 text-gray-500" />
                                )}
                                <span className="font-medium text-gray-900">Diagnosis</span>
                            </div>
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                                {sectionCounts.diagnosis}
                            </span>
                        </button>
                        {expandedSections.diagnosis && (
                            <div className="border-t border-gray-200 p-4">
                                <p className="text-gray-600">Diagnosis information would be displayed here...</p>
                            </div>
                        )}
                    </div>

                    {/* Investigation */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <button
                            onClick={() => toggleSection('investigation')}
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                        >
                            <div className="flex items-center">
                                {expandedSections.investigation ? (
                                    <ChevronDown className="w-5 h-5 mr-2 text-gray-500" />
                                ) : (
                                    <ChevronUp className="w-5 h-5 mr-2 text-gray-500" />
                                )}
                                <span className="font-medium text-gray-900">Investigation</span>
                            </div>
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                                {sectionCounts.investigation}
                            </span>
                        </button>
                        {expandedSections.investigation && (
                            <div className="border-t border-gray-200 p-4">
                                <p className="text-gray-600">Investigation results would be displayed here...</p>
                            </div>
                        )}
                    </div>

                    {/* Prescriptions */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <button
                            onClick={() => toggleSection('prescriptions')}
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                        >
                            <div className="flex items-center">
                                {expandedSections.prescriptions ? (
                                    <ChevronDown className="w-5 h-5 mr-2 text-gray-500" />
                                ) : (
                                    <ChevronUp className="w-5 h-5 mr-2 text-gray-500" />
                                )}
                                <span className="font-medium text-gray-900">Prescriptions</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Search className="w-4 h-4 text-gray-400" />
                                <Edit className="w-4 h-4 text-gray-400" />
                                <Trash2 className="w-4 h-4 text-gray-400" />
                            </div>
                        </button>
                        {expandedSections.prescriptions && (
                            <div className="border-t border-gray-200">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <input type="checkbox" className="rounded" />
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Medication Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Frequency
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Dose
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Duration
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Remarks
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {medications.map((med) => (
                                                <tr key={med.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <input type="checkbox" className="rounded" />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">{med.name}</div>
                                                            <div className="text-sm text-gray-500">{med.type}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {med.frequency}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                                                            {med.dose}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {med.duration}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                                                        {med.remarks}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="px-6 py-4 border-t border-gray-200">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            value={newMedication}
                                            onChange={(e) => setNewMedication(e.target.value)}
                                            placeholder="Type vital name and press enter..."
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            onKeyPress={(e) => e.key === 'Enter' && addNewMedication()}
                                        />
                                        <button
                                            onClick={addNewMedication}
                                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={addNewMedication}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                        >
                                            Save
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => { }}
                                        className="mt-3 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        New Row
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Other Sections */}
                    {['complaints', 'history', 'clinicalForms', 'service'].map((section) => (
                        <div key={section} className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <button
                                onClick={() => toggleSection(section)}
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                            >
                                <div className="flex items-center">
                                    {expandedSections[section] ? (
                                        <ChevronDown className="w-5 h-5 mr-2 text-gray-500" />
                                    ) : (
                                        <ChevronUp className="w-5 h-5 mr-2 text-gray-500" />
                                    )}
                                    <span className="font-medium text-gray-900">
                                        {section === 'complaints' && 'Complaints & History of Present Illness'}
                                        {section === 'history' && 'History'}
                                        {section === 'clinicalForms' && 'Clinical Forms'}
                                        {section === 'service' && 'Service'}
                                    </span>
                                </div>
                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                                    {sectionCounts[section]}
                                </span>
                            </button>
                            {expandedSections[section] && (
                                <div className="border-t border-gray-200 p-4">
                                    <p className="text-gray-600">
                                        {section === 'complaints' && 'Complaints and history information would be displayed here...'}
                                        {section === 'history' && 'Medical history would be displayed here...'}
                                        {section === 'clinicalForms' && 'Clinical forms would be displayed here...'}
                                        {section === 'service' && 'Service information would be displayed here...'}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PatientInfo;