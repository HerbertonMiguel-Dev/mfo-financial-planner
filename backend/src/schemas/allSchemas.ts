// src/schemas/allSchemas.ts
import { z } from 'zod';

export const clientBodySchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  age: z.number().int().positive(),
  status: z.enum(['active', 'inactive']),
  familyProfile: z.object({}).passthrough(),
});

export const clientResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().int().positive(),
  status: z.enum(['active', 'inactive']),
  familyProfile: z.object({}).passthrough(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export const schemas = {
  clientBody: clientBodySchema,
  clientResponse: clientResponseSchema,
};