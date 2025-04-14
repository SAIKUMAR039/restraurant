
'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import {Icons} from '@/components/icons';
import {useRouter} from 'next/navigation';

interface Reservation {
  id: string;
  customerName: string;
  date: string;
  timeSlot: string;
  tableNumber: number;
}

const DUMMY_RESERVATIONS: Reservation[] = [
  {
    id: '1',
    customerName: 'John Doe',
    date: '2024-08-15',
    timeSlot: '7:00 PM',
    tableNumber: 5,
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    date: '2024-08-16',
    timeSlot: '8:00 PM',
    tableNumber: 3,
  },
  {
    id: '3',
    customerName: 'Alice Johnson',
    date: '2024-08-17',
    timeSlot: '6:30 PM',
    tableNumber: 7,
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Reservation Dashboard</h1>
        <Button onClick={() => router.push('/reservations/add')}>
          <Icons.plus className="mr-2 h-4 w-4" />
          Add Reservation
        </Button>
      </div>

      <Table>
        <TableCaption>A list of your reservations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time Slot</TableHead>
            <TableHead>Table Number</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {DUMMY_RESERVATIONS.map(reservation => (
            <TableRow key={reservation.id}>
              <TableCell>{reservation.customerName}</TableCell>
              <TableCell>{reservation.date}</TableCell>
              <TableCell>{reservation.timeSlot}</TableCell>
              <TableCell>{reservation.tableNumber}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  onClick={() => router.push(`/reservations/edit/${reservation.id}`)}
                  className="mr-2">
                  Edit
                </Button>
                <Button size="sm" variant="destructive">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
