//Back-end API RESTful
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { appRoutes } from './lib';

const app = Fastify();

app.register(cors);
app.register(appRoutes);

app.listen({
	port: 8888,
}).then(() => {
	console.log('Server Running ... Listening on Port: 8888 ...');
});
