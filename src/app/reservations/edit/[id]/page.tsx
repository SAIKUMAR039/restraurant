
'use client';

import React from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useRouter} from 'next/navigation';
import {useParams} from 'next/navigation';

interface Reservation {
  id: string;
  customerName: string;
  date: string;
  timeSlot: string;
  tableNumber: number;
}

const DUMMY_RESERVATION: Reservation =   {
    id: '1',
    customerName: 'John Doe',
    date: '2024-08-15',
    timeSlot: '19:00',
    tableNumber: 5,
  };


export default function EditReservationPage() {
  const router = useRouter();
    const params = useParams();
    const reservationId = params.id;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    alert('Form submitted!');
    router.push('/'); // Redirect to dashboard after submission
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Reservation</CardTitle>
          <CardDescription>Modify the form below to update the reservation.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                placeholder="Enter customer name"
                type="text"
                defaultValue={DUMMY_RESERVATION.customerName}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                defaultValue={DUMMY_RESERVATION.date}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="timeSlot">Time Slot</Label>
              <Input
                id="timeSlot"
                type="time"
                defaultValue={DUMMY_RESERVATION.timeSlot}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tableNumber">Table Number</Label>
              <Input
                id="tableNumber"
                placeholder="Enter table number"
                type="number"
                defaultValue={DUMMY_RESERVATION.tableNumber}
              />
            </div>
            <Button type="submit">Update Reservation</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
