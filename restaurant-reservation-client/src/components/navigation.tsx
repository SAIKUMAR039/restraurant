import React from 'react';
import Link from 'next/link';
import {Icons} from '@/components/icons';
import {useSession, signOut} from 'next-auth/react';

export default function Navigation() {
  const {data: session} = useSession();

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
          {session && session.user ? (
            <>
              <span>{session.user.email}</span>
              <button onClick={() => signOut()} className="hover:text-primary">
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/login" className="hover:text-primary">
              Login / Signup
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
