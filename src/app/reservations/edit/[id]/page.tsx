'use client';

import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useRouter, useParams} from 'next/navigation';
import {useToast} from '@/hooks/use-toast';

interface Reservation {
  id: string;
  customerName: string;
  date: string;
  timeSlot: string;
  tableNumber: number;
}

const DUMMY_RESERVATION: Reservation = {
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
  const {toast} = useToast();

  const [customerName, setCustomerName] = useState(DUMMY_RESERVATION.customerName);
  const [date, setDate] = useState(DUMMY_RESERVATION.date);
  const [timeSlot, setTimeSlot] = useState(DUMMY_RESERVATION.timeSlot);
  const [tableNumber, setTableNumber] = useState(DUMMY_RESERVATION.tableNumber.toString());

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Basic form validation
    if (!customerName || !date || !timeSlot || !tableNumber) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }

    // TODO: Integrate with database to update the reservation
    console.log('Form data:', {
      id: reservationId,
      customerName,
      date,
      timeSlot,
      tableNumber,
    });

    toast({
      title: 'Success',
      description: 'Reservation updated successfully!',
    });
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
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="timeSlot">Time Slot</Label>
              <Input
                id="timeSlot"
                type="time"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tableNumber">Table Number</Label>
              <Input
                id="tableNumber"
                placeholder="Enter table number"
                type="number"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
              />
            </div>
            <Button type="submit">Update Reservation</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
