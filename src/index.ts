import app from "./app";

const FASTIFY_PORT = Number(process.env.PORT) || 5000;
const FASTIFY_HOST = process.env.HOST || "192.168.1.39";

app.listen({ port: FASTIFY_PORT, host: FASTIFY_HOST });

console.log(`🚀  Fastify server running on port ${FASTIFY_PORT}`);
