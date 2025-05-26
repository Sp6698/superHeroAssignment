import React from 'react';
import { AlertTriangle, Plus } from 'lucide-react';

const MedicationTable = ({ 
    medications = [],
    newMedication = '',
    onNewMedicationChange = () => {},
    onAddMedication = () => {},
    onDeleteMedication = () => {}
}) => {
    return (
        <div>
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
        </div>
    );
};

export default MedicationTable;