# Module 2 — Redis Data Structures

## Learning objectives

Understand Redis Strings, Hashes, Lists, Sets, and Sorted Sets.

## Prerequisites

- Module 1 completed
- Redis running locally
- Node.js and TypeScript configured
- Redis Insight installed

## Run the implementation

```bash
npm run module:02
```

## Run automated tests

```bash
npm run test:module2
npm run typecheck
```

## Exercises

1. Create a Hash for a user profile.
2. Update one field without replacing the entire record.
3. Maintain a recent activity List.
4. Use a Set to track unique visitors.
5. Use a Sorted Set to implement a leaderboard.
6. Compare exact unique counting with HyperLogLog.

## Production considerations

- Choose the structure based on access patterns.
- Avoid unbounded Lists and Sets.
- Understand the difference between atomic operations and durable workflows.
- Use Streams or a dedicated queue when reliable event processing is required.
- Use Sorted Sets for score-based ordering and ranking.
- Use HyperLogLog when approximate cardinality is acceptable.

## Cleanup

```bash
docker compose down
```

To remove the Redis data volume:

```bash
docker compose down -v
```
