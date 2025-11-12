import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';
import redisClient from '../utils/redisClient';

// Configure rate limits via env vars or defaults
const points = parseInt(process.env.RATE_LIMIT_POINTS || '10', 10); // requests
const duration = parseInt(process.env.RATE_LIMIT_DURATION || '60', 10); // per seconds

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient as unknown as Redis,
  keyPrefix: 'rlflx',
  points,
  duration,
});

export const rateLimiterMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Use IP + route path to have limits per endpoint per IP
    const key = `${req.ip}:${req.method}:${req.path}`;
    await rateLimiter.consume(key);
    return next();
  } catch (rejRes) {
    const retrySecs = Math.round((rejRes as any).msBeforeNext / 1000) || 1;
    res.set('Retry-After', String(retrySecs));
    return res.status(429).json({ message: 'Too many requests' });
  }
};

export default rateLimiterMiddleware;
