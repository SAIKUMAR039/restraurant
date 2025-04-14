'use client';

import React from 'react';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to TableTop Reservations!
      </h1>
      <p className="text-lg mb-8">
        Manage your restaurant reservations with ease.
      </p>
      <div className="flex space-x-4">
        <Button onClick={() => router.push('/login')}>
          User Login
        </Button>
        <Button onClick={() => router.push('/admin/login')} variant="secondary">
          Admin Login
        </Button>
      </div>
    </div>
  );
}
