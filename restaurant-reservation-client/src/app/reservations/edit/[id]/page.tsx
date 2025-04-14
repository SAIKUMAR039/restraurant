'use client';

import React, {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useRouter, useParams} from 'next/navigation';
import {useToast} from '@/hooks/use-toast';
import {useSession} from 'next-auth/react';
import axios from 'axios';
import {format} from 'date-fns';

interface Reservation {
  reservationID: number;
  customerName: string;
  reservationDate: string;
  timeSlot: string;
  tableNumber: number;
}

export default function EditReservationPage() {
  const router = useRouter();
  const params = useParams();
  const reservationId = params.id as string;
  const {toast} = useToast();
  const {data: session} = useSession();

  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [tableNumber, setTableNumber] = useState('');

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/reservations/${reservationId}`);
        const reservation: Reservation = response.data;
        setCustomerName(reservation.customerName);
        setDate(format(new Date(reservation.reservationDate), 'yyyy-MM-dd'));
        setTimeSlot(reservation.timeSlot);
        setTableNumber(reservation.tableNumber.toString());
      } catch (error) {
        console.error('Error fetching reservation:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch reservation data.',
          variant: 'destructive',
        });
      }
    };

    fetchReservation();
  }, [reservationId, toast]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!session) {
      toast({
        title: 'Error',
        description: 'You must be logged in to edit a reservation.',
        variant: 'destructive',
      });
      return;
    }

    if (!customerName || !date || !timeSlot || !tableNumber) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const reservationDate = new Date(date);
      const formattedDate = format(reservationDate, 'yyyy-MM-dd');

      const response = await axios.put(`http://localhost:8080/reservations/${reservationId}`, {
        reservationID: parseInt(reservationId, 10),
        customerName: customerName,
        reservationDate: formattedDate,
        timeSlot: timeSlot,
        tableNumber: parseInt(tableNumber, 10),
        userID: session.user.id,
      });

      if (response.status === 200) {
        toast({
          title: 'Success',
          description: 'Reservation updated successfully!',
        });
        router.push('/reservations'); // Redirect to dashboard after submission
      } else {
        toast({
          title: 'Error',
          description: 'Failed to update reservation.',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Error updating reservation:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update reservation.',
        variant: 'destructive',
      });
    }
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
