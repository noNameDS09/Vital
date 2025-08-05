'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
    full_name: '',
    role: '',
    secret_code: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (value: string) => {
    setForm({ ...form, role: value });
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Signup failed');
      } else {
        router.push('/login');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-6 rounded-xl shadow-lg border bg-card text-card-foreground">
        <h2 className="text-2xl font-semibold mb-6 text-center text-foreground">Staff Signup</h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-foreground mb-1">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              onChange={handleChange} 
              value={form.email} 
              className="bg-background border-input text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-foreground mb-1">Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              onChange={handleChange} 
              value={form.password} 
              className="bg-background border-input text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div>
            <Label htmlFor="full_name" className="text-foreground mb-1">Full Name</Label>
            <Input 
              id="full_name" 
              name="full_name" 
              onChange={handleChange} 
              value={form.full_name} 
              className="bg-background border-input text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div>
            <Label htmlFor="role" className="text-foreground mb-1">Role</Label>
            <Select onValueChange={handleRoleChange}>
              <SelectTrigger className="bg-background border-input text-foreground">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-card border-input">
                <SelectItem value="nurse" className="text-foreground hover:bg-accent hover:text-accent-foreground">
                  Nurse
                </SelectItem>
                <SelectItem value="doctor" className="text-foreground hover:bg-accent hover:text-accent-foreground">
                  Doctor
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="secret_code" className="text-foreground mb-1">Staff Secret Code</Label>
            <Input 
              id="secret_code" 
              name="secret_code" 
              onChange={handleChange} 
              value={form.secret_code} 
              className="bg-background border-input text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}

          <Button 
            onClick={handleSubmit} 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90" 
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </div>
      </div>
    </div>
  );
}
