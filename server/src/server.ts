//Back-end API RESTful
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const app = Fastify();
const prisma = new PrismaClient();

app.register(cors);

app.get('/', async () => {
	const habits = await prisma.habit.findMany();

	return habits;
});

app.listen({
	port: 8888,
}).then(() => {
	console.log('Server Running ... Listening on Port: 8888 ...');
});
