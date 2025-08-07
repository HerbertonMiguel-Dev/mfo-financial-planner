import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../utils/prisma';

export const createClient = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name, email, age, status, familyProfile } = request.body as any;
  const client = await prisma.client.create({
    data: { name, email, age, status, familyProfile },
  });
  return reply.code(201).send(client);
};
// Adicione outras funções para o CRUD (get, update, delete)...