'use client';

import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useRouter} from 'next/navigation';
import {useToast} from '@/hooks/use-toast';
import {optimizeTableArrangements} from '@/ai/flows/optimize-table-arrangements';
import {useSession} from 'next-auth/react';
import {format} from 'date-fns';
import axios from 'axios';

export default function AddReservationPage() {
  const router = useRouter();
  const {toast} = useToast();
  const {data: session} = useSession();

  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [arrangementSuggestion, setArrangementSuggestion] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!session) {
      toast({
        title: 'Error',
        description: 'You must be logged in to create a reservation.',
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

      const response = await axios.post('http://localhost:8080/reservations', {
        customerName: customerName,
        reservationDate: formattedDate,
        timeSlot: timeSlot,
        tableNumber: parseInt(tableNumber, 10),
        userID: session.user.id,
      });

      if (response.status === 201) {
        toast({
          title: 'Success',
          description: 'Reservation created successfully!',
        });
        router.push('/reservations');
      } else {
        toast({
          title: 'Error',
          description: 'Failed to create reservation.',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Error creating reservation:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create reservation.',
        variant: 'destructive',
      });
    }
  };

  const handleOptimizeTable = async () => {
    try {
      const time = new Date(timeSlot);
      const hours = time.getHours();
      const period = hours < 12 ? 'AM' : 'PM';
      const timeOfDay = `${hours % 12}:${time.getMinutes()} ${period}`;
      const partySize = 4; // TODO: Replace with dynamic value from the form or user input
      const optimizationResult = await optimizeTableArrangements({
        partySize: partySize,
        timeOfDay: timeOfDay,
      });

      setArrangementSuggestion(optimizationResult.tableArrangementSuggestion.description);
      toast({
        title: 'Table Optimization Suggestion',
        description: optimizationResult.tableArrangementSuggestion.description,
      });
    } catch (error) {
      console.error('Error optimizing table arrangement:', error);
      toast({
        title: 'Error',
        description: 'Failed to optimize table arrangement.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Add New Reservation</CardTitle>
          <CardDescription>Fill out the form below to create a new reservation.</CardDescription>
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
            <Button type="submit">Create Reservation</Button>
          </form>
          <Button onClick={handleOptimizeTable} className="mt-4">
            Optimize Table Arrangement
          </Button>
          {arrangementSuggestion && (
            <div className="mt-4">
              <p>Suggested Arrangement: {arrangementSuggestion}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
