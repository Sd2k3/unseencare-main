import React, { useState } from 'react';
import {
  User,
  Heart,
  Brain,
  Pill,
  Users,
  Upload,
  X,
  Plus,
  Calendar,
  Phone,
  UserCog,
  Stethoscope,
  AlertTriangle,
  Activity,
  Shield
} from 'lucide-react';
import Sidebar from './Sidebar';

interface PatientInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  bloodType: string;
  address: string;
  phone: string;
  email: string;
  primaryContact: string;
  secondaryContact: string;
  photo: string | null;
}

interface Insurance {
  provider: string;
  policyNumber: string;
  groupNumber: string;
  phone: string;
}

interface Identification {
  type: string;
  number: string;
  expirationDate: string;
  scan: string | null;
}

interface MedicalCondition {
  name: string;
  diagnosedYear: string;
}

interface Surgery {
  name: string;
  year: string;
}

interface PrimaryCarePhysician {
  name: string;
  specialty: string;
  phone: string;
  email: string;
  address: string;
  lastVisit: string;
}

interface Specialist {
  name: string;
  specialty: string;
  phone: string;
}

interface DementiaAssessment {
  type: string;
  stage: 'Mild' | 'Moderate' | 'Severe';
  cognitiveScore: number;
  lastAssessment: string;
  nextAssessment: string;
  cognitiveSymptoms: {
    memoryLoss: string;
    confusion: string;
    languageProblems: string;
    disorientation: string;
  };
  behavioralSymptoms: {
    agitation: string;
    wandering: string;
    sleepDisturbances: string;
    depression: string;
  };
  clinicalNotes: string;
}

interface FunctionalAssessment {
  adls: {
    [key: string]: string;
  };
  iadls: {
    [key: string]: string;
  };
}

interface SafetyAssessment {
  concerns: {
    wandering: boolean;
    falls: boolean;
    medication: boolean;
    kitchen: boolean;
    driving: boolean;
  };
  riskLevels: {
    [key: string]: string;
  };
  notes: string;
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Patient Info');
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1945-05-15',
    age: '78',
    gender: 'Male',
    bloodType: 'A+',
    address: '123 Main Street, Apt 4B, Anytown, CA 12345',
    phone: '+1 (555) 123-4567',
    email: 'john.doe@example.com',
    primaryContact: 'Sarah Johnson (Daughter) - +1 (555) 987-6543',
    secondaryContact: 'Michael Smith (Son) - +1 (555) 456-7890',
    photo: null
  });

  const [insurance, setInsurance] = useState<Insurance>({
    provider: 'Medicare',
    policyNumber: 'MED123456789',
    groupNumber: 'GRP987654',
    phone: '+1 (800) 555-1234'
  });

  const [identification, setIdentification] = useState<Identification>({
    type: "Driver's License",
    number: 'DL12345678',
    expirationDate: '2026-05-15',
    scan: null
  });

  const [medicalConditions, setMedicalConditions] = useState<MedicalCondition[]>([
    { name: 'Hypertension', diagnosedYear: '2015' },
    { name: 'Type 2 Diabetes', diagnosedYear: '2018' },
    { name: 'Osteoarthritis', diagnosedYear: '2019' }
  ]);

  const [surgeries, setSurgeries] = useState<Surgery[]>([
    { name: 'Hip Replacement', year: '2017' },
    { name: 'Cataract Surgery', year: '2019' }
  ]);

  const [allergies, setAllergies] = useState(
    'Penicillin - Severe rash, Sulfa drugs - Hives, Shellfish - Mild reaction'
  );

  const [familyHistory, setFamilyHistory] = useState(
    "Father - Alzheimer's disease (onset at 72), Mother - Hypertension, Sister - Type 2 Diabetes"
  );

  const [showAddCondition, setShowAddCondition] = useState(false);
  const [showAddSurgery, setShowAddSurgery] = useState(false);
  const [newCondition, setNewCondition] = useState({ name: '', diagnosedYear: '' });
  const [newSurgery, setNewSurgery] = useState({ name: '', year: '' });

  const [primaryCare, setPrimaryCare] = useState<PrimaryCarePhysician>({
    name: 'Dr. Robert Williams',
    specialty: 'Internal Medicine',
    phone: '+1 (555) 234-5678',
    email: 'dr.williams@medicalcenter.com',
    address: 'Greenwood Medical Center, 456 Health Avenue, Anytown, CA 12345',
    lastVisit: '2023-11-15'
  });

  const [specialists, setSpecialists] = useState<Specialist[]>([
    {
      name: 'Dr. Elizabeth Chen',
      specialty: 'Neurologist',
      phone: '+1 (555) 345-6789'
    },
    {
      name: 'Dr. James Thompson',
      specialty: 'Cardiologist',
      phone: '+1 (555) 456-7890'
    },
    {
      name: 'Dr. Sarah Martinez',
      specialty: 'Endocrinologist',
      phone: '+1 (555) 567-8901'
    }
  ]);

  const [dementiaAssessment, setDementiaAssessment] = useState<DementiaAssessment>({
    type: "Alzheimer's Disease",
    stage: 'Moderate',
    cognitiveScore: 18,
    lastAssessment: '2023-11-15',
    nextAssessment: '2024-05-15',
    cognitiveSymptoms: {
      memoryLoss: 'Moderate',
      confusion: 'Moderate',
      languageProblems: 'Mild',
      disorientation: 'Moderate'
    },
    behavioralSymptoms: {
      agitation: 'Mild',
      wandering: 'Moderate',
      sleepDisturbances: 'Mild',
      depression: 'Moderate'
    },
    clinicalNotes: 'Patient shows increased confusion in the evenings (sundowning). Memory for recent events significantly impaired, but long-term memories remain relatively intact. Responds well to routine and familiar environments. Becomes agitated when rushed or in unfamiliar settings.'
  });

  const [functionalAssessment, setFunctionalAssessment] = useState<FunctionalAssessment>({
    adls: {
      bathing: 'Needs Assistance',
      dressing: 'Needs Assistance',
      toileting: 'Needs Assistance',
      transferring: 'Independent',
      continence: 'Needs Assistance',
      feeding: 'Independent'
    },
    iadls: {
      mealPreparation: 'Dependent',
      managingMedication: 'Dependent',
      managingFinances: 'Dependent',
      usingTransportation: 'Needs Assistance',
      housework: 'Dependent'
    }
  });

  const [safetyAssessment, setSafetyAssessment] = useState<SafetyAssessment>({
    concerns: {
      wandering: true,
      falls: true,
      medication: true,
      kitchen: true,
      driving: true
    },
    riskLevels: {
      wandering: 'High Risk',
      falls: 'Moderate Risk',
      medication: 'High Risk',
      kitchen: 'High Risk',
      driving: 'Not Recommended'
    },
    notes: 'GPS tracking device implemented. Door alarms installed. Medication managed by caregiver with locked cabinet. Stove has automatic shut-off. Keys removed to prevent driving attempts. Bathroom grab bars installed.'
  });

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPatientInfo({ ...patientInfo, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCondition = () => {
    if (newCondition.name && newCondition.diagnosedYear) {
      setMedicalConditions([...medicalConditions, newCondition]);
      setNewCondition({ name: '', diagnosedYear: '' });
      setShowAddCondition(false);
    }
  };

  const handleAddSurgery = () => {
    if (newSurgery.name && newSurgery.year) {
      setSurgeries([...surgeries, newSurgery]);
      setNewSurgery({ name: '', year: '' });
      setShowAddSurgery(false);
    }
  };

  const renderPatientInfo = () => (
    <div className="space-y-6 animate-fadeIn ml-40">
      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text mb-4">
          Patient Information
        </h2>
        <p className="text-gray-600 mb-6">Basic information about the patient</p>

        <div className="flex items-center gap-8 mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-50 to-purple-50 flex items-center justify-center overflow-hidden">
              {patientInfo.photo ? (
                <img
                  src={patientInfo.photo}
                  alt="Patient"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-gray-400" />
              )}
            </div>
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
            <label
              htmlFor="photo-upload"
              className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-all duration-300"
            >
              <Upload className="w-4 h-4 text-gray-600" />
            </label>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={patientInfo.firstName}
                  onChange={(e) =>
                    setPatientInfo({ ...patientInfo, firstName: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={patientInfo.lastName}
                  onChange={(e) =>
                    setPatientInfo({ ...patientInfo, lastName: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <div className="relative">
              <input
                type="date"
                value={patientInfo.dateOfBirth}
                onChange={(e) =>
                  setPatientInfo({ ...patientInfo, dateOfBirth: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              />
              <Calendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="text"
              value={patientInfo.age}
              readOnly
              className="w-full px-4 py-2 rounded-lg border border-pink-200 bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              value={patientInfo.gender}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, gender: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blood Type
            </label>
            <select
              value={patientInfo.bloodType}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, bloodType: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            >
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Home Address
          </label>
          <textarea
            value={patientInfo.address}
            onChange={(e) =>
              setPatientInfo({ ...patientInfo, address: e.target.value })
            }
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                value={patientInfo.phone}
                onChange={(e) =>
                  setPatientInfo({ ...patientInfo, phone: e.target.value })
                }
                className="w-full px-4 py-2 pl-10 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              />
              <Phone className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={patientInfo.email}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, email: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Primary Emergency Contact
          </label>
          <input
            type="text"
            value={patientInfo.primaryContact}
            onChange={(e) =>
              setPatientInfo({ ...patientInfo, primaryContact: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Secondary Emergency Contact
          </label>
          <input
            type="text"
            value={patientInfo.secondaryContact}
            onChange={(e) =>
              setPatientInfo({ ...patientInfo, secondaryContact: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
          />
        </div>

        <button className="mt-8 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300">
          Save Patient Information
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text mb-4">
            Insurance Information
          </h2>
          <p className="text-gray-600 mb-6">Patient's health insurance details</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Provider
              </label>
              <input
                type="text"
                value={insurance.provider}
                onChange={(e) =>
                  setInsurance({ ...insurance, provider: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Policy Number
              </label>
              <input
                type="text"
                value={insurance.policyNumber}
                onChange={(e) =>
                  setInsurance({ ...insurance, policyNumber: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Group Number
              </label>
              <input
                type="text"
                value={insurance.groupNumber}
                onChange={(e) =>
                  setInsurance({ ...insurance, groupNumber: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Phone Number
              </label>
              <input
                type="tel"
                value={insurance.phone}
                onChange={(e) =>
                  setInsurance({ ...insurance, phone: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              />
            </div>
          </div>

          <button className="mt-6 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300">
            Save Insurance Information
          </button>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text mb-4">
            Identification
          </h2>
          <p className="text-gray-600 mb-6">Patient identification information</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Type
              </label>
              <select
                value={identification.type}
                onChange={(e) =>
                  setIdentification({ ...identification, type: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              >
                <option value="Driver's License">Driver's License</option>
                <option value="State ID">State ID</option>
                <option value="Passport">Passport</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Number
              </label>
              <input
                type="text"
                value={identification.number}
                onChange={(e) =>
                  setIdentification({ ...identification, number: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiration Date
              </label>
              <input
                type="date"
                value={identification.expirationDate}
                onChange={(e) =>
                  setIdentification({
                    ...identification,
                    expirationDate: e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Scan/Photo
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setIdentification({
                          ...identification,
                          scan: reader.result as string,
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                  id="id-scan"
                />
                <label
                  htmlFor="id-scan"
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 cursor-pointer"
                >
                  Upload
                </label>
                {identification.scan && (
                  <span className="text-green-600">✓ Uploaded</span>
                )}
              </div>
            </div>
          </div>

          <button className="mt-6 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300">
            Save Identification
          </button>
        </div>
      </div>
    </div>
  );

  const renderMedicalHistory = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text mb-4">
          Medical History
        </h2>
        <p className="text-gray-600 mb-6">
          Patient's comprehensive medical history
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial Dementia Diagnosis Date
            </label>
            <input
              type="date"
              value="2020-03-10"
              className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Diagnosing Physician
            </label>
            <input
              type="text"
              value="Dr. Elizabeth Chen, Neurologist"
              className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Other Medical Conditions
            </label>
            <div className="space-y-4">
              {medicalConditions.map((condition, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {condition.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Diagnosed {condition.diagnosedYear}
                    </p>
                  </div>
                  <button className="text-pink-600 hover:text-pink-700 transition-all duration-300">
                    Edit
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowAddCondition(true)}
              className="mt-4 w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
            >
              Add Medical Condition
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Surgical History
            </label>
            <div className="space-y-4">
              {surgeries.map((surgery, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{surgery.name}</h3>
                    <p className="text-sm text-gray-600">{surgery.year}</p>
                  </div>
                  <button className="text-pink-600 hover:text-pink-700 transition-all duration-300">
                    Edit
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowAddSurgery(true)}
              className="mt-4 w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
            >
              Add Surgical Procedure
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Allergies
            </label>
            <textarea
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Family Medical History
            </label>
            <textarea
              value={familyHistory}
              onChange={(e) => setFamilyHistory(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            />
          </div>
        </div>

        <button className="mt-8 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300">
          Save Medical History
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text mb-4">
            Primary Care Physician
          </h2>
          <p className="text-gray-600 mb-6">Patient's primary doctor information</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor Name
              </label>
              <input
                type="text"
                value={primaryCare.name}
                onChange={(e) =>
                  setPrimaryCare({ ...primaryCare, name: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialty
              </label>
              <input
                type="text"
                value={primaryCare.specialty}
                onChange={(e) =>
                  setPrimaryCare({ ...primaryCare, specialty: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={primaryCare.phone}
                onChange={(e) =>
                  setPrimaryCare({ ...primaryCare, phone: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={primaryCare.email}
                onChange={(e) =>
                  setPrimaryCare({ ...primaryCare, email: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Office Address
              </label>
              <textarea
                value={primaryCare.address}
                onChange={(e) =>
                  setPrimaryCare({ ...primaryCare, address: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Visit Date
              </label>
              <input
                type="date"
                value={primaryCare.lastVisit}
                onChange={(e) =>
                  setPrimaryCare({ ...primaryCare, lastVisit: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              />
            </div>
          </div>

          <button className="mt-6 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300">
            Save Primary Care Information
          </button>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text mb-4">
            Specialists
          </h2>
          <p className="text-gray-600 mb-6">Specialist physicians involved in patient care</p>

          <div className="space-y-4">
            {specialists.map((specialist, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{specialist.name}</h3>
                    <p className="text-sm text-gray-600">{specialist.specialty}</p>
                    <p className="text-sm text-pink-600">{specialist.phone}</p>
                  </div>
                  <button className="text-pink-600 hover:text-pink-700 transition-all duration-300">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-6 w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300">
            Add Specialist
          </button>

          <button className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300">
            Save Specialists
          </button>
        </div>
      </div>
    </div>
  );

  const renderDementiaAssessment = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text mb-4">
          Dementia Assessment
        </h2>
        <p className="text-gray-600 mb-6">Current dementia status and assessment</p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dementia Type
            </label>
            <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg">
              {dementiaAssessment.type}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Dementia Stage
            </label>
            <div className="grid grid-cols-3 gap-4">
              {['Mild / Early Stage', 'Moderate / Middle Stage', 'Severe / Late Stage'].map(
                (stage) => (
                  <button
                    key={stage}
                    className={`p-4 rounded-lg flex flex-col items-center gap-2 ${
                      dementiaAssessment.stage === stage.split(' / ')[0]
                        ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700'
                        : 'bg-gray-50 text-gray-600'
                    }`}
                  >
                    <Brain className="w-6 h-6" />
                    <span className="text-sm font-medium">{stage}</span>
                  </button>
                )
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cognitive Assessment Score
            </label>
            <div className="relative pt-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-pink-700">
                  Severe Impairment
                </span>
                <span className="text-xs font-semibold text-pink-700">
                  No Impairment
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full">
                  <div
                    className="w-3/5 bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${(dementiaAssessment.cognitiveScore / 30) * 100}%` }}
                  />
                </div>
                <span className="ml-4 text-sm font-medium text-gray-900">
                  {dementiaAssessment.cognitiveScore}/30 (MMSE)
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Mini-Mental State Examination (MMSE) - Last assessed: November 15, 2023
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Last Comprehensive Assessment Date
              </label>
              <input
                type="date"
                value={dementiaAssessment.lastAssessment}
                onChange={(e) =>
                  setDementiaAssessment({
                    ...dementiaAssessment,
                    lastAssessment: e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Next Assessment Due
              </label>
              <input
                type="date"
                value={dementiaAssessment.nextAssessment}
                onChange={(e) =>
                  setDementiaAssessment({
                    ...dementiaAssessment,
                    nextAssessment: e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Symptoms</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-4">Cognitive Symptoms</h4>
                <div className="space-y-4">
                  {Object.entries(dementiaAssessment.cognitiveSymptoms).map(
                    ([symptom, severity]) => (
                      <div key={symptom}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {symptom
                            .replace(/([A-Z])/g, ' $1')
                            .replace(/^./, (str) => str.toUpperCase())}
                        </label>
                        <select
                          value={severity}
                          onChange={(e) =>
                            setDementiaAssessment({
                              ...dementiaAssessment,
                              cognitiveSymptoms: {
                                ...dementiaAssessment.cognitiveSymptoms,
                                [symptom]: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                        >
                          {['None', 'Mild', 'Moderate', 'Severe'].map((level) => (
                            <option key={level} value={level}>
                              {level}
                            </option>
                          ))}
                        </select>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-4">Behavioral Symptoms</h4>
                <div className="space-y-4">
                  {Object.entries(dementiaAssessment.behavioralSymptoms).map(
                    ([symptom, severity]) => (
                      <div key={symptom}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {symptom
                            .replace(/([A-Z])/g, ' $1')
                            .replace(/^./, (str) => str.toUpperCase())}
                        </label>
                        <select
                          value={severity}
                          onChange={(e) =>
                            setDementiaAssessment({
                              ...dementiaAssessment,
                              behavioralSymptoms: {
                                ...dementiaAssessment.behavioralSymptoms,
                                [symptom]: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                        >
                          {['None', 'Mild', 'Moderate', 'Severe'].map((level) => (
                            <option key={level} value={level}>
                              {level}
                            </option>
                          ))}
                        </select>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Clinical Notes
            </label>
            <textarea
              value={dementiaAssessment.clinicalNotes}
              onChange={(e) =>
                setDementiaAssessment({
                  ...dementiaAssessment,
                  clinicalNotes: e.target.value,
                })
              }
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            />
          </div>
        </div>

        <button className="mt-8 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300">
          Save Dementia Assessment
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text mb-4">
            Functional Assessment
          </h2>
          <p className="text-gray-600 mb-6">Patient's ability to perform daily activities</p>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">
                Activities of Daily Living (ADLs)
              </h3>
              <div className="space-y-4">
                {Object.entries(functionalAssessment.adls).map(([activity, status]) => (
                  <div key={activity}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {activity
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, (str) => str.toUpperCase())}
                    </label>
                    <select
                      value={status}
                      onChange={(e) =>
                        setFunctionalAssessment({
                          ...functionalAssessment,
                          adls: {
                            ...functionalAssessment.adls,
                            [activity]: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                    >
                      {[
                        'Independent',
                        'Needs Assistance',
                        'Dependent',
                        'Not Applicable',
                      ].map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-4">
                Instrumental Activities of Daily Living (IADLs)
              </h3>
              <div className="space-y-4">
                {Object.entries(functionalAssessment.iadls).map(([activity, status]) => (
                  <div key={activity}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {activity
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, (str) => str.toUpperCase())}
                    </label>
                    <select
                      value={status}
                      onChange={(e) =>
                        setFunctionalAssessment({
                          ...functionalAssessment,
                          iadls: {
                            ...functionalAssessment.iadls,
                            [activity]: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                    >
                      {[
                        'Independent',
                        'Needs Assistance',
                        'Dependent',
                        'Not Applicable',
                      ].map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button className="mt-8 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300">
            Save Functional Assessment
          </button>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text mb-4">
            Safety Assessment
          </h2>
          <p className="text-gray-600 mb-6">Safety concerns and interventions</p>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Safety Concerns</h3>
              <div className="space-y-4">
                {Object.entries(safetyAssessment.concerns).map(([concern, isChecked]) => (
                  <div key={concern} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) =>
                          setSafetyAssessment({
                            ...safetyAssessment,
                            concerns: {
                              ...safetyAssessment.concerns,
                              [concern]: e.target.checked,
                            },
                          })
                        }
                        className="w-4 h-4 text-pink-600 border-pink-300 rounded focus:ring-pink-500"
                      />
                      <label className="text-sm font-medium text-gray-700">
                        {concern
                          .replace(/([A-Z])/g, ' $1')
                          .replace(/^./, (str) => str.toUpperCase())}
                      </label>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        safetyAssessment.riskLevels[concern] === 'High Risk'
                          ? 'bg-red-100 text-red-700'
                          : safetyAssessment.riskLevels[concern] === 'Moderate Risk'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {safetyAssessment.riskLevels[concern]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Safety Notes & Interventions
              </label>
              <textarea
                value={safetyAssessment.notes}
                onChange={(e) =>
                  setSafetyAssessment({
                    ...safetyAssessment,
                    notes: e.target.value,
                  })
                }
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              />
            </div>
          </div>

          <button className="mt-8 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300">
            Save Safety Assessment
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-8 ml-64">
      <Sidebar/>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text mb-2">
            Patient Settings
          </h1>
          <p className="text-gray-600">
            Manage patient information, medical details, and care preferences
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 mb-8">
          <div className="flex gap-4">
            {[
              { name: 'Patient Info', icon: User },
              { name: 'Medical', icon: Heart },
              { name: 'Dementia', icon: Brain },
              { name: 'Medication', icon: Pill },
              { name: 'Caregivers', icon: Users },
            ].map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === tab.name
                    ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'Patient Info' && renderPatientInfo()}
        {activeTab === 'Medical' && renderMedicalHistory()}
        {activeTab === 'Dementia' && renderDementiaAssessment()}
      </div>

      {/* Add Medical Condition Modal */}
      {showAddCondition && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
                Add Medical Condition
              </h3>
              <button
                onClick={() => setShowAddCondition(false)}
                className="text-gray-500 hover:text-pink-600 transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Condition Name
                </label>
                <input
                  type="text"
                  value={newCondition.name}
                  onChange={(e) =>
                    setNewCondition({ ...newCondition, name: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year Diagnosed
                </label>
                <input
                  type="text"
                  value={newCondition.diagnosedYear}
                  onChange={(e) =>
                    setNewCondition({
                      ...newCondition,
                      diagnosedYear: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowAddCondition(false)}
                className="px-4 py-2 text-gray-600 hover:text-pink-600 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCondition}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
              >
                Add Condition
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Surgery Modal */}
      {showAddSurgery && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
                Add Surgical Procedure
              </h3>
              <button
                onClick={() => setShowAddSurgery(false)}
                className="text-gray-500 hover:text-pink-600 transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Surgery Name
                </label>
                <input
                  type="text"
                  value={newSurgery.name}
                  onChange={(e) =>
                    setNewSurgery({ ...newSurgery, name: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  value={newSurgery.year}
                  onChange={(e) =>
                    setNewSurgery({ ...newSurgery, year: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowAddSurgery(false)}
                className="px-4 py-2 text-gray-600 hover:text-pink-600 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSurgery}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
              >
                Add Surgery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}