'use client';

import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        const accessToken = localStorage.getItem('access_token'); // Or get from cookie/session
        const headers = accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : {};

        const res = await axios.post('/api/auth/logout', null, { headers });

        if (res.status === 200) {
          localStorage.removeItem('access_token');
        }

        // ✅ Correct redirection
        window.location.href = '/login';
    } catch (err) {
        console.error('Logout failed:', err);
        // ✅ Proper reload fallback
        window.location.href = '/login';
      }
    };

    logout();
  }, [router]);

  return <div>Logging out...</div>;
};

export default LogoutPage;
