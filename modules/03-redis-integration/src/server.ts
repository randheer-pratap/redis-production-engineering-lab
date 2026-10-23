import { app } from "./app";
import { env } from "./config/env";
import { redis } from "./infrastructure/redis/redis";

async function startServer() {
  try {
    await redis.connect();

    const response = await redis.ping();

    if (response !== "PONG") {
      throw new Error("Redis health check failed");
    }

    app.listen(env.port, () => {
      console.log(`Server listening on port ${env.port}`);
    });
  } catch (error) {
    console.error("Application startup failed:", error);

    await redis.quit().catch(() => undefined);

    process.exitCode = 1;
  }
}

startServer();