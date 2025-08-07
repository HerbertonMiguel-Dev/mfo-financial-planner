// src/routes/clientRoutes.ts
import { FastifyInstance } from 'fastify';
import { createClient } from '../controllers/clientController';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

export default async function clientRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.post('/', {
    schema: {
      summary: 'Criar um novo cliente',
      description: 'Cria um novo cliente no banco de dados',
      tags: ['clientes'],
      body: { $ref: 'clientBody' }, // Usa a referência
      response: {
        201: { $ref: 'clientResponse' }, // Usa a referência
      },
    },
    handler: createClient,
  });
}