// src/server.ts
import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { ZodTypeProvider, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import clientRoutes from './routes/clientRoutes';
import { clientBodySchema, clientResponseSchema } from './schemas/index'; // Importe os schemas Zod

const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(swagger, {
  swagger: {
    info: {
      title: 'MFO Planner API',
      description: 'Documentação da API para o Multi Family Office',
      version: '1.0.0',
    },
  },
});

app.register(swaggerUi, {
  routePrefix: '/docs',
});

// Registre os schemas
app.addSchema({ $id: 'clientBody', ...clientBodySchema.valueOf() });
app.addSchema({ $id: 'clientResponse', ...clientResponseSchema.valueOf() });

app.register(clientRoutes, { prefix: '/clients' });

const start = async () => {
  try {
    await app.listen({ port: 3001, host: '0.0.0.0' });
    console.log(`Servidor rodando em http://localhost:3001`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();