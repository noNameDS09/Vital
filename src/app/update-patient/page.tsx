'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

export default function AddHistoryPage() {
  const [patients, setPatients] = useState<{ id: string; full_name: string }[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [form, setForm] = useState({ diagnosis: '', treatment: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch patient list on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('You must be logged in');
      return;
    }

    fetch('/api/patient/list', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPatients(data);
        } else {
          setError(data.error || 'Failed to load patients');
        }
      })
      .catch(err => {
        console.error(err);
        setError('Something went wrong');
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('You must be logged in');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/patient/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          patient_id: selectedPatientId,
          diagnosis: form.diagnosis,
          treatment: form.treatment
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to add history');
      } else {
        setSuccess('Medical history added successfully!');
        setForm({ diagnosis: '', treatment: '' });
        setSelectedPatientId('');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-6 rounded-xl shadow-lg border bg-card text-card-foreground">
        <h2 className="text-2xl font-semibold mb-6 text-center">Add Medical History</h2>

        <div className="space-y-4">
          <div>
            <Label className='mb-1'>Patient</Label>
            <Select onValueChange={setSelectedPatientId} value={selectedPatientId}>
              <SelectTrigger className="bg-background border-input text-foreground">
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent className="bg-card border-input">
                {patients.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="diagnosis" className='mb-1'>Diagnosis</Label>
            <Input
              id="diagnosis"
              name="diagnosis"
              value={form.diagnosis}
              onChange={handleChange}
              placeholder="e.g. Flu, Fever"
            />
          </div>

          <div>
            <Label htmlFor="treatment" className='mb-1'>Treatment</Label>
            <Input
              id="treatment"
              name="treatment"
              value={form.treatment}
              onChange={handleChange}
              placeholder="e.g. Paracetamol 500mg"
            />
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <Button
            onClick={handleSubmit}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save History'}
          </Button>
        </div>
      </div>
    </div>
  );
}
