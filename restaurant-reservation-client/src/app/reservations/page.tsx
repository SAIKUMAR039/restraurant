'use client';

import React, {useState, useEffect} from 'react';
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
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from '@/components/ui/alert-dialog';
import axios from 'axios';
import {format} from 'date-fns';
import {useSession} from 'next-auth/react';

interface Reservation {
  reservationID: number;
  customerName: string;
  reservationDate: string;
  timeSlot: string;
  tableNumber: number;
}

export default function ReservationsDashboard() {
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const {data: session} = useSession();

  useEffect(() => {
    fetchReservations();
  }, [session]);

  const fetchReservations = async () => {
    try {
      if (!session) {
        console.log('No session found.');
        return;
      }

      const response = await axios.get(`http://localhost:8080/reservations`);
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/reservations/${id}`);
      fetchReservations(); // Refresh the reservation list
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  if (!session) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold">Reservation Dashboard</h1>
        <p>Please log in to view your reservations.</p>
      </div>
    );
  }

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
          {reservations.map(reservation => (
            <TableRow key={reservation.reservationID.toString()}>
              <TableCell>{reservation.customerName}</TableCell>
              <TableCell>{format(new Date(reservation.reservationDate), 'yyyy-MM-dd')}</TableCell>
              <TableCell>{reservation.timeSlot}</TableCell>
              <TableCell>{reservation.tableNumber}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  onClick={() => router.push(`/reservations/edit/${reservation.reservationID}`)}
                  className="mr-2">
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the reservation.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(reservation.reservationID)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
