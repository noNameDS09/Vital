'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
      } else {
        // Optional: store tokens in localStorage or cookie
        // localStorage.setItem('token', data.access_token);
        router.push('/dashboard');
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
        <h2 className="text-2xl font-semibold mb-6 text-center text-foreground">Staff Login</h2>

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

          {error && <p className="text-destructive text-sm">{error}</p>}

          <Button
            onClick={handleSubmit}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Login'}
          </Button>
        </div>
      </div>
    </div>
  );
}
