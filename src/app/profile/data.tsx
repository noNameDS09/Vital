import { Heart, Atom, Droplet } from 'lucide-react';
import React from 'react';

interface Alert {
  id: number;
  message: string;
  timestamp: string;
  severity: 'critical' | 'warning';
}

interface VitalDataPoint {
  time: string;
  hr: number;
  spo2: number;
  bp_sys: number;
  bp_dia: number;
}

export interface Patient {
  id: number;
  name: string;
  patientId: string;
  age: number;
  room: string;
  admissionDate: string;
  condition: string;
  vitalData: VitalDataPoint[];
  alerts: Alert[];
  vitalCards: {
    name: string;
    value: number | string;
    unit: string;
    icon: React.ReactElement;
    color: string;
    threshold: { critical: number[]; warning: number[] };
  }[];
}

export const patients: Patient[] = [
  {
    id: 1,
    name: 'John Doe',
    patientId: '123456',
    age: 65,
    room: 'ICU 2B',
    admissionDate: '2024-08-01',
    condition: 'Post-operative sepsis',
    vitalData: [
      { time: '10:00', hr: 75, spo2: 98, bp_sys: 120, bp_dia: 80 },
      { time: '10:05', hr: 78, spo2: 97, bp_sys: 122, bp_dia: 82 },
      { time: '10:10', hr: 80, spo2: 96, bp_sys: 125, bp_dia: 84 },
      { time: '10:15', hr: 82, spo2: 95, bp_sys: 128, bp_dia: 85 },
      { time: '10:20', hr: 85, spo2: 94, bp_sys: 130, bp_dia: 86 },
      { time: '10:25', hr: 84, spo2: 93, bp_sys: 129, bp_dia: 85 },
      { time: '10:30', hr: 86, spo2: 92, bp_sys: 132, bp_dia: 88 },
    ],
    alerts: [
      { id: 1, message: 'SpO₂ critically low. Possible respiratory distress.', timestamp: '10:28 AM', severity: 'critical' },
      { id: 2, message: 'Heart rate elevated. Patient agitation detected.', timestamp: '10:20 AM', severity: 'warning' },
    ],
    vitalCards: [
      { name: 'Heart Rate', value: 86, unit: 'bpm', icon: <Heart size={24} />, color: 'var(--primary)', threshold: { critical: [30, 110], warning: [40, 100] } },
      { name: 'SpO₂', value: 92, unit: '%', icon: <Atom size={24} />, color: 'var(--chart-4)', threshold: { critical: [0, 90], warning: [90, 95] } },
      { name: 'Blood Pressure', value: '132/88', unit: 'mmHg', icon: <Droplet size={24} />, color: 'var(--chart-2)', threshold: { critical: [0, 140], warning: [120, 139] } },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    patientId: '789012',
    age: 45,
    room: 'ICU 3A',
    admissionDate: '2024-07-28',
    condition: 'Acute respiratory failure',
    vitalData: [
      { time: '10:00', hr: 95, spo2: 89, bp_sys: 110, bp_dia: 75 },
      { time: '10:05', hr: 98, spo2: 88, bp_sys: 112, bp_dia: 76 },
      { time: '10:10', hr: 101, spo2: 87, bp_sys: 115, bp_dia: 78 },
      { time: '10:15', hr: 105, spo2: 86, bp_sys: 118, bp_dia: 80 },
      { time: '10:20', hr: 108, spo2: 85, bp_sys: 120, bp_dia: 81 },
      { time: '10:25', hr: 110, spo2: 84, bp_sys: 122, bp_dia: 82 },
      { time: '10:30', hr: 112, spo2: 83, bp_sys: 124, bp_dia: 83 },
    ],
    alerts: [
      { id: 1, message: 'SpO₂ dangerously low. Immediate respiratory support needed.', timestamp: '10:25 AM', severity: 'critical' },
      { id: 2, message: 'Tachycardia detected. Patient is unstable.', timestamp: '10:10 AM', severity: 'critical' },
    ],
    vitalCards: [
      { name: 'Heart Rate', value: 112, unit: 'bpm', icon: <Heart size={24} />, color: 'var(--primary)', threshold: { critical: [30, 110], warning: [40, 100] } },
      { name: 'SpO₂', value: 83, unit: '%', icon: <Atom size={24} />, color: 'var(--chart-4)', threshold: { critical: [0, 90], warning: [90, 95] } },
      { name: 'Blood Pressure', value: '124/83', unit: 'mmHg', icon: <Droplet size={24} />, color: 'var(--chart-2)', threshold: { critical: [0, 140], warning: [120, 139] } },
    ],
  },
  {
    id: 3,
    name: 'Robert Johnson',
    patientId: '345678',
    age: 72,
    room: 'ICU 1A',
    admissionDate: '2024-08-05',
    condition: 'Cardiac arrest',
    vitalData: [
      { time: '10:00', hr: 60, spo2: 99, bp_sys: 130, bp_dia: 85 },
      { time: '10:05', hr: 62, spo2: 99, bp_sys: 132, bp_dia: 86 },
      { time: '10:10', hr: 65, spo2: 98, bp_sys: 135, bp_dia: 88 },
      { time: '10:15', hr: 68, spo2: 98, bp_sys: 137, bp_dia: 89 },
      { time: '10:20', hr: 70, spo2: 98, bp_sys: 138, bp_dia: 90 },
      { time: '10:25', hr: 72, spo2: 98, bp_sys: 140, bp_dia: 91 },
      { time: '10:30', hr: 75, spo2: 98, bp_sys: 142, bp_dia: 92 },
    ],
    alerts: [
      { id: 1, message: 'Blood pressure rising. Hypertension detected.', timestamp: '10:25 AM', severity: 'warning' },
    ],
    vitalCards: [
      { name: 'Heart Rate', value: 75, unit: 'bpm', icon: <Heart size={24} />, color: 'var(--primary)', threshold: { critical: [30, 110], warning: [40, 100] } },
      { name: 'SpO₂', value: 98, unit: '%', icon: <Atom size={24} />, color: 'var(--chart-4)', threshold: { critical: [0, 90], warning: [90, 95] } },
      { name: 'Blood Pressure', value: '142/92', unit: 'mmHg', icon: <Droplet size={24} />, color: 'var(--chart-2)', threshold: { critical: [0, 140], warning: [120, 139] } },
    ],
  },
  {
    id: 4,
    name: 'Emily Davis',
    patientId: '901234',
    age: 58,
    room: 'ICU 4D',
    admissionDate: '2024-08-04',
    condition: 'Diabetic ketoacidosis',
    vitalData: [
      { time: '10:00', hr: 85, spo2: 97, bp_sys: 125, bp_dia: 85 },
      { time: '10:05', hr: 88, spo2: 97, bp_sys: 128, bp_dia: 86 },
      { time: '10:10', hr: 90, spo2: 96, bp_sys: 130, bp_dia: 87 },
      { time: '10:15', hr: 92, spo2: 96, bp_sys: 132, bp_dia: 88 },
      { time: '10:20', hr: 95, spo2: 95, bp_sys: 135, bp_dia: 90 },
      { time: '10:25', hr: 98, spo2: 95, bp_sys: 138, bp_dia: 91 },
      { time: '10:30', hr: 100, spo2: 94, bp_sys: 140, bp_dia: 92 },
    ],
    alerts: [
      { id: 1, message: 'Hypoxia detected. Oxygen saturation dropping.', timestamp: '10:20 AM', severity: 'critical' },
      { id: 2, message: 'Heart rate steadily increasing. Monitor for agitation.', timestamp: '10:10 AM', severity: 'warning' },
    ],
    vitalCards: [
      { name: 'Heart Rate', value: 100, unit: 'bpm', icon: <Heart size={24} />, color: 'var(--primary)', threshold: { critical: [30, 110], warning: [40, 100] } },
      { name: 'SpO₂', value: 94, unit: '%', icon: <Atom size={24} />, color: 'var(--chart-4)', threshold: { critical: [0, 90], warning: [90, 95] } },
      { name: 'Blood Pressure', value: '140/92', unit: 'mmHg', icon: <Droplet size={24} />, color: 'var(--chart-2)', threshold: { critical: [0, 140], warning: [120, 139] } },
    ],
  },
  {
    id: 5,
    name: 'Michael Brown',
    patientId: '567890',
    age: 33,
    room: 'ICU 5C',
    admissionDate: '2024-08-03',
    condition: 'Traumatic brain injury',
    vitalData: [
      { time: '10:00', hr: 68, spo2: 99, bp_sys: 145, bp_dia: 95 },
      { time: '10:05', hr: 70, spo2: 99, bp_sys: 148, bp_dia: 96 },
      { time: '10:10', hr: 72, spo2: 99, bp_sys: 150, bp_dia: 98 },
      { time: '10:15', hr: 75, spo2: 98, bp_sys: 152, bp_dia: 100 },
      { time: '10:20', hr: 78, spo2: 98, bp_sys: 155, bp_dia: 102 },
      { time: '10:25', hr: 80, spo2: 98, bp_sys: 158, bp_dia: 104 },
      { time: '10:30', hr: 82, spo2: 98, bp_sys: 160, bp_dia: 105 },
    ],
    alerts: [
      { id: 1, message: 'Intracranial pressure increase. Blood pressure elevated.', timestamp: '10:15 AM', severity: 'critical' },
      { id: 2, message: 'Pupil reaction delayed. Neurological assessment advised.', timestamp: '10:05 AM', severity: 'warning' },
    ],
    vitalCards: [
      { name: 'Heart Rate', value: 82, unit: 'bpm', icon: <Heart size={24} />, color: 'var(--primary)', threshold: { critical: [30, 110], warning: [40, 100] } },
      { name: 'SpO₂', value: 98, unit: '%', icon: <Atom size={24} />, color: 'var(--chart-4)', threshold: { critical: [0, 90], warning: [90, 95] } },
      { name: 'Blood Pressure', value: '160/105', unit: 'mmHg', icon: <Droplet size={24} />, color: 'var(--chart-2)', threshold: { critical: [0, 140], warning: [120, 139] } },
    ],
  },
  {
    id: 6,
    name: 'Sarah Wilson',
    patientId: '234567',
    age: 28,
    room: 'ICU 6F',
    admissionDate: '2024-08-02',
    condition: 'Post-cardiac catheterization',
    vitalData: [
      { time: '10:00', hr: 70, spo2: 99, bp_sys: 115, bp_dia: 70 },
      { time: '10:05', hr: 71, spo2: 99, bp_sys: 116, bp_dia: 71 },
      { time: '10:10', hr: 72, spo2: 99, bp_sys: 117, bp_dia: 72 },
      { time: '10:15', hr: 73, spo2: 99, bp_sys: 118, bp_dia: 73 },
      { time: '10:20', hr: 74, spo2: 99, bp_sys: 119, bp_dia: 74 },
      { time: '10:25', hr: 75, spo2: 99, bp_sys: 120, bp_dia: 75 },
      { time: '10:30', hr: 76, spo2: 99, bp_sys: 121, bp_dia: 76 },
    ],
    alerts: [],
    vitalCards: [
      { name: 'Heart Rate', value: 76, unit: 'bpm', icon: <Heart size={24} />, color: 'var(--primary)', threshold: { critical: [30, 110], warning: [40, 100] } },
      { name: 'SpO₂', value: 99, unit: '%', icon: <Atom size={24} />, color: 'var(--chart-4)', threshold: { critical: [0, 90], warning: [90, 95] } },
      { name: 'Blood Pressure', value: '121/76', unit: 'mmHg', icon: <Droplet size={24} />, color: 'var(--chart-2)', threshold: { critical: [0, 140], warning: [120, 139] } },
    ],
  },
  {
    id: 7,
    name: 'David Lee',
    patientId: '890123',
    age: 55,
    room: 'ICU 1C',
    admissionDate: '2024-07-31',
    condition: 'Pneumonia',
    vitalData: [
      { time: '10:00', hr: 80, spo2: 93, bp_sys: 118, bp_dia: 78 },
      { time: '10:05', hr: 82, spo2: 92, bp_sys: 120, bp_dia: 80 },
      { time: '10:10', hr: 84, spo2: 91, bp_sys: 122, bp_dia: 81 },
      { time: '10:15', hr: 86, spo2: 90, bp_sys: 125, bp_dia: 83 },
      { time: '10:20', hr: 88, spo2: 89, bp_sys: 128, bp_dia: 85 },
      { time: '10:25', hr: 90, spo2: 88, bp_sys: 130, bp_dia: 86 },
      { time: '10:30', hr: 92, spo2: 87, bp_sys: 132, bp_dia: 87 },
    ],
    alerts: [
      { id: 1, message: 'Oxygen saturation falling. Consider non-invasive ventilation.', timestamp: '10:20 AM', severity: 'critical' },
      { id: 2, message: 'Heart rate steadily increasing.', timestamp: '10:10 AM', severity: 'warning' },
    ],
    vitalCards: [
      { name: 'Heart Rate', value: 92, unit: 'bpm', icon: <Heart size={24} />, color: 'var(--primary)', threshold: { critical: [30, 110], warning: [40, 100] } },
      { name: 'SpO₂', value: 87, unit: '%', icon: <Atom size={24} />, color: 'var(--chart-4)', threshold: { critical: [0, 90], warning: [90, 95] } },
      { name: 'Blood Pressure', value: '132/87', unit: 'mmHg', icon: <Droplet size={24} />, color: 'var(--chart-2)', threshold: { critical: [0, 140], warning: [120, 139] } },
    ],
  },
  {
    id: 8,
    name: 'Olivia White',
    patientId: '456789',
    age: 62,
    room: 'ICU 5A',
    admissionDate: '2024-07-29',
    condition: 'Chronic kidney disease',
    vitalData: [
      { time: '10:00', hr: 78, spo2: 97, bp_sys: 140, bp_dia: 90 },
      { time: '10:05', hr: 80, spo2: 97, bp_sys: 142, bp_dia: 91 },
      { time: '10:10', hr: 82, spo2: 96, bp_sys: 145, bp_dia: 92 },
      { time: '10:15', hr: 84, spo2: 96, bp_sys: 148, bp_dia: 93 },
      { time: '10:20', hr: 86, spo2: 95, bp_sys: 150, bp_dia: 94 },
      { time: '10:25', hr: 88, spo2: 95, bp_sys: 152, bp_dia: 95 },
      { time: '10:30', hr: 90, spo2: 94, bp_sys: 155, bp_dia: 96 },
    ],
    alerts: [
      { id: 1, message: 'Elevated blood pressure. Consider medication adjustment.', timestamp: '10:10 AM', severity: 'warning' },
      { id: 2, message: 'SpO₂ dropping. Assess for fluid overload.', timestamp: '10:20 AM', severity: 'critical' },
    ],
    vitalCards: [
      { name: 'Heart Rate', value: 90, unit: 'bpm', icon: <Heart size={24} />, color: 'var(--primary)', threshold: { critical: [30, 110], warning: [40, 100] } },
      { name: 'SpO₂', value: 94, unit: '%', icon: <Atom size={24} />, color: 'var(--chart-4)', threshold: { critical: [0, 90], warning: [90, 95] } },
      { name: 'Blood Pressure', value: '155/96', unit: 'mmHg', icon: <Droplet size={24} />, color: 'var(--chart-2)', threshold: { critical: [0, 140], warning: [120, 139] } },
    ],
  },
  {
    id: 9,
    name: 'James Moore',
    patientId: '678901',
    age: 48,
    room: 'ICU 3B',
    admissionDate: '2024-08-01',
    condition: 'Liver cirrhosis',
    vitalData: [
      { time: '10:00', hr: 88, spo2: 96, bp_sys: 105, bp_dia: 65 },
      { time: '10:05', hr: 85, spo2: 97, bp_sys: 104, bp_dia: 64 },
      { time: '10:10', hr: 82, spo2: 98, bp_sys: 103, bp_dia: 63 },
      { time: '10:15', hr: 79, spo2: 98, bp_sys: 102, bp_dia: 62 },
      { time: '10:20', hr: 76, spo2: 99, bp_sys: 101, bp_dia: 61 },
      { time: '10:25', hr: 73, spo2: 99, bp_sys: 100, bp_dia: 60 },
      { time: '10:30', hr: 70, spo2: 99, bp_sys: 99, bp_dia: 59 },
    ],
    alerts: [
      { id: 1, message: 'Blood pressure dropping. Potential hypotension.', timestamp: '10:20 AM', severity: 'critical' },
      { id: 2, message: 'Heart rate decreasing. Monitor for bradycardia.', timestamp: '10:15 AM', severity: 'warning' },
    ],
    vitalCards: [
      { name: 'Heart Rate', value: 70, unit: 'bpm', icon: <Heart size={24} />, color: 'var(--primary)', threshold: { critical: [30, 110], warning: [40, 100] } },
      { name: 'SpO₂', value: 99, unit: '%', icon: <Atom size={24} />, color: 'var(--chart-4)', threshold: { critical: [0, 90], warning: [90, 95] } },
      { name: 'Blood Pressure', value: '99/59', unit: 'mmHg', icon: <Droplet size={24} />, color: 'var(--chart-2)', threshold: { critical: [0, 140], warning: [120, 139] } },
    ],
  },
  {
    id: 10,
    name: 'Sophia Clark',
    patientId: '012345',
    age: 39,
    room: 'ICU 4C',
    admissionDate: '2024-07-27',
    condition: 'Drug overdose',
    vitalData: [
      { time: '10:00', hr: 65, spo2: 98, bp_sys: 110, bp_dia: 70 },
      { time: '10:05', hr: 63, spo2: 98, bp_sys: 108, bp_dia: 69 },
      { time: '10:10', hr: 60, spo2: 97, bp_sys: 105, bp_dia: 68 },
      { time: '10:15', hr: 58, spo2: 97, bp_sys: 102, bp_dia: 67 },
      { time: '10:20', hr: 55, spo2: 96, bp_sys: 100, bp_dia: 66 },
      { time: '10:25', hr: 52, spo2: 95, bp_sys: 98, bp_dia: 65 },
      { time: '10:30', hr: 50, spo2: 94, bp_sys: 95, bp_dia: 64 },
    ],
    alerts: [
      { id: 1, message: 'Severe bradycardia detected. Respiratory depression imminent.', timestamp: '10:25 AM', severity: 'critical' },
      { id: 2, message: 'Oxygen saturation dropping. Administer naloxone.', timestamp: '10:15 AM', severity: 'critical' },
    ],
    vitalCards: [
      { name: 'Heart Rate', value: 50, unit: 'bpm', icon: <Heart size={24} />, color: 'var(--primary)', threshold: { critical: [30, 110], warning: [40, 100] } },
      { name: 'SpO₂', value: 94, unit: '%', icon: <Atom size={24} />, color: 'var(--chart-4)', threshold: { critical: [0, 90], warning: [90, 95] } },
      { name: 'Blood Pressure', value: '95/64', unit: 'mmHg', icon: <Droplet size={24} />, color: 'var(--chart-2)', threshold: { critical: [0, 140], warning: [120, 139] } },
    ],
  },
];
