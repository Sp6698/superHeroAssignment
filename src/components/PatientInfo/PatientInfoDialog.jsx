import React, { useState } from 'react';
import { Search, Edit, Trash2 } from 'lucide-react';

// Import reusable components

import PatientHeader from '../../utils/commonComponents/PatientHeader.jsx';
import SearchVisitSection from '../../utils/commonComponents/SearchVisitSection.jsx';
import CollapsibleSection from '../../utils/commonComponents/CollapsibleSection.jsx';
import MedicationTable from '../../utils/commonComponents/MedicationTable.jsx';
import AllergyAlertModal from '../../utils/commonComponents/AllergyAlertModal.jsx';
import DialogHeader from '../../utils/commonComponents/DialogHeader.jsx';

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

    // Data for components
    const patientData = {
        initials: 'CS',
        name: 'Chinmay Sule',
        id: '100087-000015-2',
        phone: '+91-9096398014',
        gender: 'Male',
        age: '38Y'
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
                <DialogHeader onClose={onClose} />

                <div className="p-4">
                    {/* Patient Header */}
                    <PatientHeader
                        patientData={patientData}
                        allergies={allergies}
                    />

                    {/* Search and Visit Dates */}
                    <SearchVisitSection
                        visitDates={visitDates}
                        activeVisitIndex={0}
                    />

                    {/* Medical Sections */}
                    <div className="space-y-3">
                        {/* Vitals */}
                        <CollapsibleSection
                            title="Vitals"
                            count={sectionCounts.vitals}
                            isExpanded={expandedSections.vitals}
                            onToggle={() => toggleSection('vitals')}
                        >
                            <div className="p-3">
                                <p className="text-gray-600 text-sm">Vitals data would be displayed here...</p>
                            </div>
                        </CollapsibleSection>

                        {/* Diagnosis */}
                        <CollapsibleSection
                            title="Diagnosis"
                            count={sectionCounts.diagnosis}
                            isExpanded={expandedSections.diagnosis}
                            onToggle={() => toggleSection('diagnosis')}
                        >
                            <div className="p-3">
                                <p className="text-gray-600 text-sm">Diagnosis information would be displayed here...</p>
                            </div>
                        </CollapsibleSection>

                        {/* Investigation */}
                        <CollapsibleSection
                            title="Investigation"
                            count={sectionCounts.investigation}
                            isExpanded={expandedSections.investigation}
                            onToggle={() => toggleSection('investigation')}
                        >
                            <div className="p-3">
                                <p className="text-gray-600 text-sm">Investigation results would be displayed here...</p>
                            </div>
                        </CollapsibleSection>

                        {/* Prescriptions */}
                        <CollapsibleSection
                            title="Prescriptions"
                            count={sectionCounts.prescriptions}
                            isExpanded={expandedSections.prescriptions}
                            onToggle={() => toggleSection('prescriptions')}
                            headerActions={
                                <>
                                    <Search className="w-3 h-3 text-gray-400" />
                                    <Edit className="w-3 h-3 text-gray-400" />
                                    <Trash2 className="w-3 h-3 text-gray-400" />
                                </>
                            }
                        >
                            <MedicationTable
                                medications={medications}
                                newMedication={newMedication}
                                onNewMedicationChange={setNewMedication}
                                onAddMedication={addNewMedication}
                                onDeleteMedication={() => deleteMedication}
                            />
                        </CollapsibleSection>

                        {/* Other Sections */}
                        {[
                            { key: 'complaints', label: 'Complaints & History of Present Illness' },
                            { key: 'history', label: 'History' },
                            { key: 'clinicalForms', label: 'Clinical Forms' },
                            { key: 'service', label: 'Service' }
                        ].map((section) => (
                            <CollapsibleSection
                                key={section.key}
                                title={section.label}
                                count={sectionCounts[section.key]}
                                isExpanded={expandedSections[section.key]}
                                onToggle={() => toggleSection(section.key)}
                            >
                                <div className="p-3">
                                    <p className="text-gray-600 text-sm">
                                        {section.key === 'complaints' && 'Complaints and history information would be displayed here...'}
                                        {section.key === 'history' && 'Medical history would be displayed here...'}
                                        {section.key === 'clinicalForms' && 'Clinical forms would be displayed here...'}
                                        {section.key === 'service' && 'Service information would be displayed here...'}
                                    </p>
                                </div>
                            </CollapsibleSection>
                        ))}
                    </div>
                </div>

                {/* Allergy Alert Modal */}
                <AllergyAlertModal
                    isOpen={!!allergyAlert}
                    allergyAlert={allergyAlert}
                    onClose={() => setAllergyAlert(null)}
                    onOverride={overrideAllergy}
                    onViewAlternatives={viewAlternatives}
                />
            </div>
        </div>
    );
};

export default PatientInfoDialog;