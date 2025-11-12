import Redis from 'ioredis';

// Create a single shared Redis client. Configure REDIS_URL in your environment, e.g. redis://127.0.0.1:6379
const redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');

redis.on('error', (err) => {
  // keep logs minimal — the error middleware / logger can be used for more advanced handling
  // eslint-disable-next-line no-console
  console.error('Redis error:', err);
});

export default redis;
