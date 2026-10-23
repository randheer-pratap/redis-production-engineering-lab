# Module 1 — Redis Fundamentals and Local Setup

## Learning objectives

- Understand Redis keys and string values.
- Use SET, GET, EXISTS, TYPE, TTL, PTTL, DEL, and INCR.
- Run Redis with Docker Compose.
- Connect using Redis CLI and Redis Insight.
- Access Redis using Node.js and TypeScript.
- Verify behavior with automated tests.

## Prerequisites

- Node.js 24 LTS
- npm
- Docker Desktop with Docker Compose
- Git
- Redis Insight (optional but recommended)

## Setup

1. Clone the repository.
2. Install dependencies using `npm ci`.
3. Copy `.env.example` to `.env`.
4. Start Redis using `docker compose up -d`.
5. Verify connectivity using `docker compose exec redis redis-cli PING`.

## Run

- `npm run dev` — run the TypeScript demo.
- `npm test` — run automated tests.
- `npm run typecheck` — check TypeScript types.
- `npm run redis:cli` — open Redis CLI.

## Exercises

1. Store and retrieve a string.
2. Inspect key existence and type.
3. Create a key with an expiration.
4. Observe TTL countdown and expiration.
5. Compare DEL and expiration.
6. Observe what happens to TTL when SET overwrites a key.
7. Increment a counter and inspect its value in Redis Insight.

## Production lessons

- A missing key is not necessarily an error.
- SET normally replaces a key's existing expiration.
- A client instance is shared only within its process.
- Redis connectivity does not guarantee high availability.
- TTL expiration is not a substitute for business-data consistency.
- Avoid unrestricted KEYS scans on large production databases.

## Cleanup

Run `docker compose down` to stop and remove the lab container.

Run `docker compose down -v` to also delete the named Redis data volume.
