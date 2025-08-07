// src/schemas/clientSchemas.ts

import { z } from 'zod';

// Define o esquema base do cliente para reuso
export const clientBodySchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  age: z.number().int().positive(),
  status: z.enum(['active', 'inactive']),
  familyProfile: z.object({}).passthrough(),
});

// Define o esquema de resposta para o sucesso (e.g., status 201)
// Adicionando a palavra-chave 'export'
export const clientResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().int().positive(),
  status: z.enum(['active', 'inactive']),
  familyProfile: z.object({}).passthrough(),
  // Adicione createdAt e updatedAt, se eles fizerem parte da sua resposta
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

// Define o esquema completo para a rota POST /clients
export const createClientSchema = {
  summary: 'Criar um novo cliente',
  description: 'Cria um novo cliente no banco de dados',
  tags: ['clientes'],
  body: clientBodySchema,
  response: {
    // Agora usando o esquema de resposta exportado
    201: clientResponseSchema,
  },
};

// Exemplo para uma rota GET (apenas para referência)
export const getClientByIdSchema = {
  summary: 'Obter cliente por ID',
  description: 'Busca um cliente pelo seu ID',
  tags: ['clientes'],
  params: z.object({
    id: z.string().uuid(),
  }),
  response: {
    200: clientResponseSchema, // Reutilizando o esquema de resposta
  },
};