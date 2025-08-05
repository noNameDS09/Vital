"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Heart, Droplet, Sun, Bell, User, Atom } from "lucide-react";
import { patients } from "./data";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const VitalCard = ({ name, value, unit, icon, color, threshold }) => {
  let displayColor = color;
  if (
    name === "Heart Rate" &&
    (value < threshold.critical[0] || value > threshold.critical[1])
  ) {
    displayColor = "var(--destructive)";
  } else if (
    name === "SpO₂" &&
    (value < threshold.critical[0] || value > threshold.critical[1])
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
          {icon}
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

const ChartCard = ({ vitalData }) => (
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
        <Line
          type="monotone"
          dataKey="hr"
          stroke="var(--primary)"
          strokeWidth={2}
          name="Heart Rate"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="spo2"
          stroke="var(--chart-4)"
          strokeWidth={2}
          name="SpO₂"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="bp_sys"
          stroke="var(--chart-2)"
          strokeWidth={2}
          name="Systolic BP"
          dot={false}
        />
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

const App = () => {
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const foundPatient = patients.find((p) => p.id.toString() === selectedId);
    if (foundPatient) {
      setSelectedPatient(foundPatient);
    }
  };
  const router = useRouter();

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
          <button onClick={() => router.push("/add-patient")} className="bg-blue-600 px-3 py-1 rounded-md">
            Add Patient
          </button>
          <button onClick={() => router.push("/update-patient")} className="bg-blue-600 p-4 py-1 rounded-md">
            Update Patients
          </button>
        </div>
        </div>
        {/* Patient Dropdown */}
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

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
          <div className="lg:col-span-2">
            <ChartCard vitalData={selectedPatient.vitalData} />
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
                  <p className="text-[var(--muted-foreground)]">
                    Admission Date
                  </p>
                  <p className="font-semibold">
                    {selectedPatient.admissionDate}
                  </p>
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

        {/* Vital Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {selectedPatient.vitalCards.map((vital) => (
            <VitalCard key={vital.name} {...vital} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
