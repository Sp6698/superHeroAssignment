import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, Search, Edit, Trash2, Plus, MoreHorizontal, Phone, User, Calendar, AlertTriangle, X } from 'lucide-react';

const PatientInfoDialog = ({ onClose }) => {
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
            remarks: 'Patient shows signs of fatigue and dyspnea',
            hasAllergy: false
        },
        {
            id: 2,
            name: 'Furosemide',
            type: 'Intravenous',
            frequency: '5 ml/day',
            dose: 'OD',
            duration: '4 days',
            remarks: 'Confirmed post HbA1c test, further monito...',
            hasAllergy: false
        },
        {
            id: 3,
            name: 'Antihypertensives',
            type: 'Intravenous',
            frequency: '1-1 tab/day',
            dose: 'BD',
            duration: '5 days',
            remarks: 'Confirmed post HbA1c test, further monito...',
            hasAllergy: false
        },
        {
            id: 4,
            name: 'Amoxicillin',
            type: 'Intravenous',
            frequency: '1-1 tab/day',
            dose: 'OD',
            duration: '5 days',
            remarks: 'Confirmed post HbA1c test, further monito...',
            hasAllergy: true
        }
    ]);

    const [newMedication, setNewMedication] = useState('');
    const [allergyAlert, setAllergyAlert] = useState(null);

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Allergy checking system
    const allergyDatabase = {
        'amoxicillin': 'Penicillin Allergy',
        'penicillin': 'Penicillin Allergy',
        'ampicillin': 'Penicillin Allergy',
        'peanut': 'Peanut Allergy',
        'simvastatin': 'Statin Muscle Pain',
        'atorvastatin': 'Statin Muscle Pain',
        'sulfamethoxazole': 'Sulfa Drug Allergy',
        'trimethoprim': 'Sulfa Drug Allergy'
    };

    const checkForAllergies = (medicationName) => {
        const lowerMedName = medicationName.toLowerCase();
        for (const [med, allergy] of Object.entries(allergyDatabase)) {
            if (lowerMedName.includes(med)) {
                return allergy;
            }
        }
        return null;
    };

    const addNewMedication = () => {
        if (newMedication.trim()) {
            const detectedAllergy = checkForAllergies(newMedication);

            if (detectedAllergy) {
                setAllergyAlert({
                    medication: newMedication,
                    allergy: detectedAllergy,
                    message: `This patient is allergic to ${detectedAllergy.toLowerCase()}-based medications, including ${newMedication}. Prescribing this medication may cause a severe allergic reaction.`
                });
                return;
            }

            const newMed = {
                id: medications.length + 1,
                name: newMedication,
                type: 'Tablet',
                frequency: '',
                dose: '',
                duration: '',
                remarks: '',
                hasAllergy: false
            };
            setMedications([...medications, newMed]);
            setNewMedication('');
        }
    };

    const overrideAllergy = () => {
        const newMed = {
            id: medications.length + 1,
            name: allergyAlert.medication,
            type: 'Tablet',
            frequency: '',
            dose: '',
            duration: '',
            remarks: '',
            hasAllergy: true
        };
        setMedications([...medications, newMed]);
        setNewMedication('');
        setAllergyAlert(null);
    };

    const viewAlternatives = () => {
        alert('Alternative medications would be displayed here');
    };

    const deleteMedication = (id) => {
        setMedications(medications.filter(med => med.id !== id));
    };

    const allergies = [
        { name: 'Sulfa Drug Allergy', color: 'bg-blue-100 text-blue-700 border-blue-200' },
        { name: 'Statin Muscle Pain', color: 'bg-orange-100 text-orange-700 border-orange-200' },
        { name: 'Peanut Allergy', color: 'bg-orange-100 text-orange-700 border-orange-200' },
        { name: 'Penicillin Allergy', color: 'bg-red-100 text-red-700 border-red-200' },
        { name: 'Smoker', color: 'bg-red-100 text-red-700 border-red-200' },
        { name: 'Alcohol Use', color: 'bg-red-100 text-red-700 border-red-200' }
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
        <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm flex justify-center items-start z-10 overflow-auto">
            <div className="bg-white shadow-xl mt-10 mx-50 w-full  overflow-auto">
                {/* Header */}
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
                            <div className="text-sm text-gray-500">Changes saved</div>
                            <button className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 flex items-center">
                                Actions
                                <ChevronDown className="w-3 h-3 ml-1" />
                            </button>
                            <button className="text-gray-500 hover:text-gray-700">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    {/* Patient Header */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                    CS
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">Chinmay Sule</h1>
                                    <p className="text-gray-500 text-sm">100087-000015-2</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <Phone className="w-3 h-3 mr-1" />
                                    +91-9096398014
                                </div>
                                <div className="flex items-center">
                                    <User className="w-3 h-3 mr-1" />
                                    Male
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-1">📅</span>
                                    38Y
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

                    {/* Search and Visit Dates */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4">
                        <div className="relative mb-3">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search Medicines Eg. Antihypertensives"
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
                                        className={`px-3 mx-2 py-1.5 rounded text-sm font-medium ${index === 0
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

                    {/* Medical Sections */}
                    <div className="space-y-3">
                        {/* Vitals */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <button
                                onClick={() => toggleSection('vitals')}
                                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 text-left"
                            >
                                <div className="flex items-center">
                                    {expandedSections.vitals ? (
                                        <ChevronDown className="w-4 h-4 mr-2 text-gray-500" />
                                    ) : (
                                        <ChevronUp className="w-4 h-4 mr-2 text-gray-500" />
                                    )}
                                    <span className="font-medium text-gray-900 text-sm">Vitals</span>
                                </div>
                                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                                    {sectionCounts.vitals}
                                </span>
                            </button>
                            {expandedSections.vitals && (
                                <div className="border-t border-gray-200 p-3">
                                    <p className="text-gray-600 text-sm">Vitals data would be displayed here...</p>
                                </div>
                            )}
                        </div>

                        {/* Diagnosis */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <button
                                onClick={() => toggleSection('diagnosis')}
                                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 text-left"
                            >
                                <div className="flex items-center">
                                    {expandedSections.diagnosis ? (
                                        <ChevronDown className="w-4 h-4 mr-2 text-gray-500" />
                                    ) : (
                                        <ChevronUp className="w-4 h-4 mr-2 text-gray-500" />
                                    )}
                                    <span className="font-medium text-gray-900 text-sm">Diagnosis</span>
                                </div>
                                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                                    {sectionCounts.diagnosis}
                                </span>
                            </button>
                            {expandedSections.diagnosis && (
                                <div className="border-t border-gray-200 p-3">
                                    <p className="text-gray-600 text-sm">Diagnosis information would be displayed here...</p>
                                </div>
                            )}
                        </div>

                        {/* Investigation */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <button
                                onClick={() => toggleSection('investigation')}
                                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 text-left"
                            >
                                <div className="flex items-center">
                                    {expandedSections.investigation ? (
                                        <ChevronDown className="w-4 h-4 mr-2 text-gray-500" />
                                    ) : (
                                        <ChevronUp className="w-4 h-4 mr-2 text-gray-500" />
                                    )}
                                    <span className="font-medium text-gray-900 text-sm">Investigation</span>
                                </div>
                                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                                    {sectionCounts.investigation}
                                </span>
                            </button>
                            {expandedSections.investigation && (
                                <div className="border-t border-gray-200 p-3">
                                    <p className="text-gray-600 text-sm">Investigation results would be displayed here...</p>
                                </div>
                            )}
                        </div>

                        {/* Prescriptions */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <button
                                onClick={() => toggleSection('prescriptions')}
                                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 text-left"
                            >
                                <div className="flex items-center">
                                    {expandedSections.prescriptions ? (
                                        <ChevronDown className="w-4 h-4 mr-2 text-gray-500" />
                                    ) : (
                                        <ChevronUp className="w-4 h-4 mr-2 text-gray-500" />
                                    )}
                                    <span className="font-medium text-gray-900 text-sm">Prescriptions</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Search className="w-3 h-3 text-gray-400" />
                                    <Edit className="w-3 h-3 text-gray-400" />
                                    <Trash2 className="w-3 h-3 text-gray-400" />
                                </div>
                            </button>
                            {expandedSections.prescriptions && (
                                <div className="border-t border-gray-200">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                        <input type="checkbox" className="rounded w-3 h-3" />
                                                    </th>
                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                        Medication Name
                                                    </th>
                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                        Frequency
                                                    </th>
                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                        Dose
                                                    </th>
                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                        Duration
                                                    </th>
                                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                        Remarks
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {medications.map((med) => (
                                                    <tr key={med.id} className="hover:bg-gray-50 cursor-pointer">
                                                        <td className="px-3 py-2">
                                                            <input type="checkbox" className="rounded w-3 h-3" />
                                                        </td>
                                                        <td className="px-3 py-2">
                                                            <div className="flex items-center">
                                                                {med.hasAllergy && (
                                                                    <AlertTriangle className="w-3 h-3 text-red-500 mr-2" />
                                                                )}
                                                                <div>
                                                                    <div className="text-sm font-medium text-gray-900">{med.name}</div>
                                                                    <div className="text-xs text-gray-500">{med.type}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-3 py-2 text-sm text-gray-900">
                                                            {med.frequency}
                                                        </td>
                                                        <td className="px-3 py-2">
                                                            <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                                                                {med.dose}
                                                            </span>
                                                        </td>
                                                        <td className="px-3 py-2 text-sm text-gray-900">
                                                            {med.duration}
                                                        </td>
                                                        <td className="px-3 py-2 text-sm text-gray-900 max-w-xs truncate">
                                                            {med.remarks}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="px-3 py-3 border-t border-gray-200">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <input
                                                type="text"
                                                value={newMedication}
                                                onChange={(e) => setNewMedication(e.target.value)}
                                                placeholder="Type vital name and press enter..."
                                                className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                onKeyPress={(e) => e.key === 'Enter' && addNewMedication()}
                                            />
                                            <button className="text-red-600 hover:text-red-800 text-xs font-medium px-2">
                                                Delete
                                            </button>
                                            <button
                                                onClick={addNewMedication}
                                                className="text-blue-600 hover:text-blue-800 text-xs font-medium px-2"
                                            >
                                                Save
                                            </button>
                                        </div>
                                        <button className="flex items-center text-blue-600 hover:text-blue-800 text-xs font-medium">
                                            <Plus className="w-3 h-3 mr-1" />
                                            New Row
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Other Sections */}
                        {[
                            { key: 'complaints', label: 'Complaints & History of Present Illness' },
                            { key: 'history', label: 'History' },
                            { key: 'clinicalForms', label: 'Clinical Forms' },
                            { key: 'service', label: 'Service' }
                        ].map((section) => (
                            <div key={section.key} className="bg-white rounded-lg shadow-sm border border-gray-200">
                                <button
                                    onClick={() => toggleSection(section.key)}
                                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 text-left"
                                >
                                    <div className="flex items-center">
                                        {expandedSections[section.key] ? (
                                            <ChevronDown className="w-4 h-4 mr-2 text-gray-500" />
                                        ) : (
                                            <ChevronUp className="w-4 h-4 mr-2 text-gray-500" />
                                        )}
                                        <span className="font-medium text-gray-900 text-sm">{section.label}</span>
                                    </div>
                                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
                                        {sectionCounts[section.key]}
                                    </span>
                                </button>
                                {expandedSections[section.key] && (
                                    <div className="border-t border-gray-200 p-3">
                                        <p className="text-gray-600 text-sm">
                                            {section.key === 'complaints' && 'Complaints and history information would be displayed here...'}
                                            {section.key === 'history' && 'Medical history would be displayed here...'}
                                            {section.key === 'clinicalForms' && 'Clinical forms would be displayed here...'}
                                            {section.key === 'service' && 'Service information would be displayed here...'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Allergy Alert Modal */}
                {allergyAlert && (
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
                                                onClick={overrideAllergy}
                                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm font-medium"
                                            >
                                                Override Warning
                                            </button>
                                            <button
                                                onClick={viewAlternatives}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                                            >
                                                View Alternatives
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setAllergyAlert(null)}
                                        className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientInfoDialog;