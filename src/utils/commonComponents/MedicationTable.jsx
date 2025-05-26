import React, { useState } from 'react';
import { AlertTriangle, Plus, X } from 'lucide-react';

const MedicationTable = ({
    medications = [],
    newMedication = '',
    onNewMedicationChange = () => { },
    onAddMedication = () => { },
    onDeleteMedication = () => { }
}) => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMedication, setAlertMedication] = useState(null);
    const [alertPosition, setAlertPosition] = useState({ top: 0, left: 0 });

    const handleRowClick = (med, event) => {
        if (med.hasAllergy) {
            const rect = event.currentTarget.getBoundingClientRect();
            const containerRect = event.currentTarget.closest('div').getBoundingClientRect();
            setAlertPosition({
                top: rect.top - containerRect.top - 120, // Position relative to container
                left: rect.left - containerRect.left + rect.width / 2 - 200 // Center horizontally
            });
            setAlertMedication(med);
            setShowAlert(true);
        }
    };

    const closeAlert = () => {
        setShowAlert(false);
        setAlertMedication(null);
    };

    return (
        <div className="relative">
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
                            <tr key={med.id} className="hover:bg-gray-50 cursor-pointer" onClick={(e) => handleRowClick(med, e)}>
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
                        onChange={(e) => onNewMedicationChange(e.target.value)}
                        placeholder="Type vital name and press enter..."
                        className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && onAddMedication()}
                    />
                    <button
                        onClick={onDeleteMedication}
                        className="text-red-600 hover:text-red-800 text-xs font-medium px-2"
                    >
                        Delete
                    </button>
                    <button
                        onClick={onAddMedication}
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

            {/* Alert Dialog */}
            {showAlert && (
                <div
                    className="absolute bg-white rounded-lg shadow-lg border border-gray-200 z-50 w-96"
                    style={{
                        top: `${alertPosition.top}px`,
                        left: `${alertPosition.left}px`,
                        transform: 'translateX(-50%)'
                    }}
                >
                    <div className="flex items-center justify-between p-4 border-b">
                        <h3 className="text-lg font-medium text-red-600">Allergy Alert</h3>
                        <button onClick={closeAlert} className="text-gray-400 hover:text-gray-600">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="p-4">
                        <p className="text-sm text-gray-700 mb-4">
                            The patient is allergic to Penicillin-based medications, including Amoxicillin. Prescribing this medication may cause a severe allergic reaction.
                        </p>
                    </div>
                    <div className="flex justify-end space-x-2 p-4 border-t">
                        <button
                            onClick={closeAlert}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded"
                        >
                            Override Warning
                        </button>
                        <button
                            onClick={closeAlert}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded"
                        >
                            View Alternatives
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Demo component to show functionality
const Demo = () => {
    const [medications, setMedications] = useState([
        {
            id: 1,
            name: "Amoxicillin",
            type: "Antibiotic",
            frequency: "3 times daily",
            dose: "500mg",
            duration: "7 days",
            remarks: "Take with food",
            hasAllergy: true
        },
        {
            id: 2,
            name: "Ibuprofen",
            type: "NSAID",
            frequency: "As needed",
            dose: "200mg",
            duration: "PRN",
            remarks: "For pain relief",
            hasAllergy: false
        }
    ]);

    const [newMedication, setNewMedication] = useState('');

    const handleAddMedication = () => {
        if (newMedication.trim()) {
            const newMed = {
                id: medications.length + 1,
                name: newMedication,
                type: "New medication",
                frequency: "As prescribed",
                dose: "TBD",
                duration: "TBD",
                remarks: "",
                hasAllergy: false
            };
            setMedications([...medications, newMed]);
            setNewMedication('');
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Medication Management</h1>
            <MedicationTable
                medications={medications}
                newMedication={newMedication}
                onNewMedicationChange={setNewMedication}
                onAddMedication={handleAddMedication}
                onDeleteMedication={() => console.log('Delete clicked')}
            />
        </div>
    );
};

export default Demo;