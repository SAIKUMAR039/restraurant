// 'use server'
'use server';
/**
 * @fileOverview AI tool that suggests optimal table arrangements based on party size and time of day.
 *
 * - optimizeTableArrangements - A function that handles the table arrangement optimization process.
 * - OptimizeTableArrangementsInput - The input type for the optimizeTableArrangements function.
 * - OptimizeTableArrangementsOutput - The return type for the optimizeTableArrangements function.
 */

import {ai} from '@/ai/ai-instance';
import {getTableArrangementSuggestion} from '@/services/table-optimization';
import {z} from 'genkit';

const OptimizeTableArrangementsInputSchema = z.object({
  partySize: z.number().describe('The number of people in the party.'),
  timeOfDay: z.string().describe('The time of day for the reservation.'),
});
export type OptimizeTableArrangementsInput = z.infer<
  typeof OptimizeTableArrangementsInputSchema
>;

const OptimizeTableArrangementsOutputSchema = z.object({
  tableArrangementSuggestion: z.object({
    description: z
      .string()
      .describe('A description of the suggested table arrangement.'),
  }),
});
export type OptimizeTableArrangementsOutput = z.infer<
  typeof OptimizeTableArrangementsOutputSchema
>;

export async function optimizeTableArrangements(
  input: OptimizeTableArrangementsInput
): Promise<OptimizeTableArrangementsOutput> {
  return optimizeTableArrangementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeTableArrangementsPrompt',
  input: {
    schema: z.object({
      partySize: z.number().describe('The number of people in the party.'),
      timeOfDay: z.string().describe('The time of day for the reservation.'),
    }),
  },
  output: {
    schema: z.object({
      tableArrangementSuggestion: z.object({
        description: z
          .string()
          .describe('A description of the suggested table arrangement.'),
      }),
    }),
  },
  prompt: `You are a restaurant manager AI assistant specializing in optimizing table arrangements.\n
  Based on the party size and time of day, suggest an optimal table arrangement to maximize seating efficiency and accommodate more customers.\n\n  Party Size: {{{partySize}}}\n  Time of Day: {{{timeOfDay}}}`,
});

const optimizeTableArrangementsFlow = ai.defineFlow<
  typeof OptimizeTableArrangementsInputSchema,
  typeof OptimizeTableArrangementsOutputSchema
>(
  {
    name: 'optimizeTableArrangementsFlow',
    inputSchema: OptimizeTableArrangementsInputSchema,
    outputSchema: OptimizeTableArrangementsOutputSchema,
  },
  async input => {
    // Call the table optimization service to get a suggestion
    const tableArrangementSuggestion = await getTableArrangementSuggestion({
      partySize: input.partySize,
      timeOfDay: input.timeOfDay,
    });

    // Return the suggestion in the expected output format
    return {
      tableArrangementSuggestion: {
        description: tableArrangementSuggestion.description,
      },
    };
  }
);
