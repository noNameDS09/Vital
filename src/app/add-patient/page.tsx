'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function CreatePatientPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
    full_name: '',
    date_of_birth: '',
    gender: '',
    address: '',
    contact_number: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('You must be logged in as a nurse.');
      setLoading(false);
      return;
    }

    try {
        console.log(form)
      const res = await fetch('/api/patient/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create patient');
      } else {
        setSuccess('Patient created successfully!');
        setForm({
          email: '',
          password: '',
          full_name: '',
          date_of_birth: '',
          gender: '',
          address: '',
          contact_number: ''
        });
        router.push('/profile')
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 mt-16">
      <div className="w-full max-w-md p-6 rounded-xl shadow-lg border bg-card text-card-foreground">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create New Patient</h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email" className='mb-1'>Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              value={form.email}
              placeholder="patient@example.com"
            />
          </div>

          <div>
            <Label htmlFor="password" className='mb-1'>Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              value={form.password}
              placeholder="••••••••"
            />
          </div>

          <div>
            <Label htmlFor="full_name" className='mb-1'>Full Name</Label>
            <Input
              id="full_name"
              name="full_name"
              onChange={handleChange}
              value={form.full_name}
              placeholder="John Doe"
            />
          </div>

          <div>
            <Label htmlFor="date_of_birth" className='mb-1'>Date of Birth</Label>
            <Input
              id="date_of_birth"
              name="date_of_birth"
              type="date"
              onChange={handleChange}
              value={form.date_of_birth}
            />
          </div>

          <div>
            <Label htmlFor="gender" className='mb-1'>Gender</Label>
            <Input
              id="gender"
              name="gender"
              onChange={handleChange}
              value={form.gender}
              placeholder="male / female / other"
            />
          </div>

          <div>
            <Label htmlFor="address" className='mb-1'>Address</Label>
            <Input
              id="address"
              name="address"
              onChange={handleChange}
              value={form.address}
              placeholder="123 Main Street"
            />
          </div>

          <div>
            <Label htmlFor="contact_number" className='mb-1'>Contact Number</Label>
            <Input
              id="contact_number"
              name="contact_number"
              onChange={handleChange}
              value={form.contact_number}
              placeholder="9876543210"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <Button
            onClick={handleSubmit}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Patient'}
          </Button>
        </div>
      </div>
    </div>
  );
}
