'use client';

import React from 'react';
import Link from 'next/link';
import {Icons} from '@/components/icons';

export default function Navigation() {
  return (
    <nav className="bg-secondary p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center text-lg font-semibold">
          <Icons.utensils className="mr-2 h-6 w-6" />
          TableTop Reservations
        </Link>
        <div className="space-x-4">
          <Link href="/reservations" className="hover:text-primary">
            Dashboard
          </Link>
          <Link href="/reservations/add" className="hover:text-primary">
            Add Reservation
          </Link>
          {/* TODO: Conditionally render based on user login status */}
          <Link href="/login" className="hover:text-primary">
            Login
          </Link>
          {/* TODO: Display user information here */}
        </div>
      </div>
    </nav>
  );
}
