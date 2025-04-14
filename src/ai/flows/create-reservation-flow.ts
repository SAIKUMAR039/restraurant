'use server';
/**
 * @fileOverview AI tool that creates a reservation.
 *
 * - createReservation - A function that handles the reservation creation process.
 * - CreateReservationInput - The input type for the createReservation function.
 * - CreateReservationOutput - The return type for the createReservation function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const CreateReservationInputSchema = z.object({
  customerName: z.string().describe('The name of the customer making the reservation.'),
  date: z.string().describe('The date for the reservation (YYYY-MM-DD).'),
  timeSlot: z.string().describe('The time slot for the reservation (HH:MM).'),
  tableNumber: z.number().describe('The table number for the reservation.'),
});
export type CreateReservationInput = z.infer<typeof CreateReservationInputSchema>;

const CreateReservationOutputSchema = z.object({
  success: z.boolean().describe('Indicates if the reservation was successfully created.'),
  reservationId: z.string().describe('The ID of the newly created reservation.'),
});
export type CreateReservationOutput = z.infer<typeof CreateReservationOutputSchema>;

export async function createReservation(input: CreateReservationInput): Promise<CreateReservationOutput> {
  return createReservationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createReservationPrompt',
  input: {
    schema: z.object({
      customerName: z.string().describe('The name of the customer making the reservation.'),
      date: z.string().describe('The date for the reservation.'),
      timeSlot: z.string().describe('The time slot for the reservation.'),
      tableNumber: z.number().describe('The table number for the reservation.'),
    }),
  },
  output: {
    schema: z.object({
      success: z.boolean().describe('Indicates if the reservation was successfully created.'),
      reservationId: z.string().describe('The ID of the newly created reservation.'),
    }),
  },
  prompt: `Create a new reservation with the following details:

Customer Name: {{{customerName}}}
Date: {{{date}}}
Time Slot: {{{timeSlot}}}
Table Number: {{{tableNumber}}}

Return a JSON object indicating the success of the operation and the reservation ID.`,
});

const createReservationFlow = ai.defineFlow<
  typeof CreateReservationInputSchema,
  typeof CreateReservationOutputSchema
>(
  {
    name: 'createReservationFlow',
    inputSchema: CreateReservationInputSchema,
    outputSchema: CreateReservationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
