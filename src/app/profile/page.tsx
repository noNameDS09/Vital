'use client';
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Heart, Atom, Droplet, Bell, User, Sun } from "lucide-react"; // Ensure all Lucide icons are imported
import { useRouter } from "next/navigation";

// Define the Patient interface based on your API response structure
interface Patient {
  id: number;
  name: string;
  patientId: string;
  age: number;
  room: string;
  admissionDate: string;
  condition: string;
  vitalData: {
    time: string;
    hr: number;
    spo2: number;
    bp_sys: number;
    bp_dia: number;
  }[];
  alerts: {
    id: number;
    message: string;
    timestamp: string;
    severity: 'critical' | 'warning';
  }[];
  vitalCards: {
    name: string;
    value: number | string;
    unit: string;
    icon: string; // Changed to string as per your data.ts for React Native
    color: string;
    threshold: { critical: number[]; warning: number[] };
  }[];
}


const VitalCard = ({ name, value, unit, icon, color, threshold }) => {
  let IconComponent;
  switch (icon) {
    case 'heart':
      IconComponent = Heart;
      break;
    case 'atom':
      IconComponent = Atom;
      break;
    case 'droplet':
      IconComponent = Droplet;
      break;
    case 'sun': // Assuming 'sun' might be used for BP in your data
      IconComponent = Sun;
      break;
    default:
      IconComponent = Heart; // Default icon
  }

  let displayColor = color;
  if (
    name === "Heart Rate" &&
    (typeof value === 'number' && (value < threshold.critical[0] || value > threshold.critical[1]))
  ) {
    displayColor = "var(--destructive)";
  } else if (
    name === "SpO₂" &&
    (typeof value === 'number' && (value < threshold.critical[0] || value > threshold.critical[1]))
  ) {
    displayColor = "var(--destructive)";
  } else if (
    name === "Blood Pressure" &&
    typeof value === 'string' && (parseInt(value.split('/')[0]) > threshold.critical[1] || parseInt(value.split('/')[0]) < threshold.critical[0])
  ) {
    displayColor = "var(--destructive)";
  }


  return (
    <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[var(--muted-foreground)]">
          {name}
        </h3>
        <div className="text-[var(--primary)]" style={{ color }}>
          {IconComponent && <IconComponent size={24} />}
        </div>
      </div>
      <div className="text-4xl font-bold" style={{ color: displayColor }}>
        {value}
        <span className="text-base font-normal ml-2 text-[var(--muted-foreground)]">
          {unit}
        </span>
      </div>
    </div>
  );
};

const ChartCard = ({ vitalData, selectedAttributes }) => (
  <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-lg h-full">
    <h3 className="text-xl font-bold mb-4">Patient Vitals Trend</h3>
    <ResponsiveContainer width="100%" height="80%">
      <LineChart data={vitalData}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="time" stroke="var(--muted-foreground)" />
        <YAxis stroke="var(--muted-foreground)" />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "0.5rem",
          }}
          labelStyle={{ color: "var(--primary)" }}
        />
        {selectedAttributes.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={`var(--chart-${(index % 5) + 1})`}
            strokeWidth={2}
            name={key}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  </div>
);


const AlertsCard = ({ alerts }) => (
  <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-lg">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-bold">Real-time Alerts</h3>
      <Bell size={24} className="text-[var(--destructive)]" />
    </div>
    <ul>
      {alerts.map((alert) => (
        <li
          key={alert.id}
          className={`py-3 border-b border-[var(--border)] last:border-b-0 ${
            alert.severity === "critical"
              ? "text-[var(--destructive)]"
              : "text-[var(--chart-2)]"
          }`}
        >
          <div className="font-semibold">{alert.message}</div>
          <div className="text-sm text-[var(--muted-foreground)]">
            {alert.timestamp}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const Dashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedChartAttributes, setSelectedChartAttributes] = useState<string[]>(['hr']); // Initially select only heart rate
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/patient/vitals");
        const data = await res.json();
        setPatients(data.patients);

        if (data.patients.length > 0) {
          setSelectedPatient(data.patients[0]);
          // Keep the initial selection as 'hr' only
          setSelectedChartAttributes(['hr']);
        }
      } catch (error) {
        console.error("Failed to fetch patient data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value);
    const foundPatient = patients.find((p) => p.id === selectedId);
    if (foundPatient) {
      setSelectedPatient(foundPatient);
    }
  };

  // Handler for chart attribute checkboxes with max 3 selection limit (case insensitive)
  const handleChartAttributeChange = (attribute: string) => {
    setSelectedChartAttributes((prev) => {
      // Case insensitive comparison
      const isAlreadySelected = prev.some(item => item.toLowerCase() === attribute.toLowerCase());
      
      if (isAlreadySelected) {
        // If attribute is already selected, remove it (case insensitive)
        return prev.filter((item) => item.toLowerCase() !== attribute.toLowerCase());
      } else if (prev.length < 3) {
        // If less than 3 attributes selected, add the new one
        return [...prev, attribute];
      } else {
        // If already 3 attributes selected, show an alert and don't add
        alert('You can select a maximum of 3 vital signs for the chart.');
        return prev;
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
        <p>Loading patient data...</p>
      </div>
    );
  }

  if (!selectedPatient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
        <p>No patient data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--background)] min-h-screen p-8 text-[var(--foreground)] font-sans mt-16">
      <div className="container mx-auto">
        <div className="flex justify-between mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-0">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Patient Dashboard
            </h1>
          </div>
          <div className="flex gap-6 ">
            <button onClick={() => router.push("/add-patient")} className="bg-blue-600 hover:cursor-pointer px-3 py-1 rounded-md">
              Add Patient
            </button>
            <button onClick={() => router.push("/update-patient")} className="bg-blue-600 hover:cursor-pointer p-4 py-1 rounded-md">
              Update Patients
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Select Patient</h2>
          <div className="max-w-xs">
            <label
              htmlFor="patient-select"
              className="block text-sm font-medium text-[var(--muted-foreground)] mb-2"
            >
              Patient List
            </label>
            <select
              id="patient-select"
              className="w-full p-3 border border-[var(--border)] rounded-lg bg-[var(--card)] text-[var(--foreground)] focus:outline-none"
              value={selectedPatient.id}
              onChange={handleSelectChange}
            >
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} (ID: {patient.patientId})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Chart Attribute Selection */}
        <div className="mb-8 p-4 rounded-lg bg-[var(--card)] border border-[var(--border)] shadow-lg">
          <h3 className="text-xl font-bold mb-4">Chart Display Options</h3>
          <p className="text-sm text-[var(--muted-foreground)] mb-3">
            Select up to 3 vital signs to display in the chart ({selectedChartAttributes.length}/3 selected)
          </p>
          <div className="flex flex-wrap gap-4">
            {selectedPatient?.vitalData?.[0] &&
              Object.keys(selectedPatient.vitalData[0])
                .filter((key) => key !== "time" && key !== 'id' && key !== 'pid')
                .map((key) => {
                  // Case insensitive check for selection
                  const isSelected = selectedChartAttributes.some(attr => attr.toLowerCase() === key.toLowerCase());
                  const isDisabled = !isSelected && selectedChartAttributes.length >= 3;
                  
                  return (
                    <label 
                      key={key} 
                      className={`flex items-center space-x-2 ${
                        isDisabled ? 'text-[var(--muted-foreground)] cursor-not-allowed' : 'text-[var(--foreground)] cursor-pointer'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-[var(--primary)] bg-[var(--input)] border-[var(--border)] rounded disabled:opacity-50"
                        checked={isSelected}
                        disabled={isDisabled}
                        onChange={() => handleChartAttributeChange(key)}
                      />
                      <span className={isDisabled ? 'opacity-50' : ''}>{key.toUpperCase()}</span>
                    </label>
                  );
                })}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
          <div className="lg:col-span-2">
            <ChartCard vitalData={selectedPatient.vitalData} selectedAttributes={selectedChartAttributes} />
          </div>
          <div className="flex flex-col gap-6">
            <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center text-[var(--accent-foreground)]">
                  <User size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedPatient.name}</h3>
                  <p className="text-[var(--muted-foreground)]">
                    ID: {selectedPatient.patientId}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm mt-6">
                <div>
                  <p className="text-[var(--muted-foreground)]">Age</p>
                  <p className="font-semibold">{selectedPatient.age} years</p>
                </div>
                <div>
                  <p className="text-[var(--muted-foreground)]">Room</p>
                  <p className="font-semibold">{selectedPatient.room}</p>
                </div>
                <div>
                  <p className="text-[var(--muted-foreground)]">Admission Date</p>
                  <p className="font-semibold">{selectedPatient.admissionDate}</p>
                </div>
                <div>
                  <p className="text-[var(--muted-foreground)]">Condition</p>
                  <p className="font-semibold text-[var(--chart-3)]">
                    {selectedPatient.condition}
                  </p>
                </div>
              </div>
            </div>
            <AlertsCard alerts={selectedPatient.alerts} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {selectedPatient.vitalCards.map((vital) => (
            <VitalCard key={vital.name} {...vital} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;