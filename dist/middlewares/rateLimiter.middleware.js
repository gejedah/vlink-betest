"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiterMiddleware = void 0;
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const redisClient_1 = __importDefault(require("../utils/redisClient"));
// Configure rate limits via env vars or defaults
const points = parseInt(process.env.RATE_LIMIT_POINTS || '10', 10); // requests
const duration = parseInt(process.env.RATE_LIMIT_DURATION || '60', 10); // per seconds
const rateLimiter = new rate_limiter_flexible_1.RateLimiterRedis({
    storeClient: redisClient_1.default,
    keyPrefix: 'rlflx',
    points,
    duration,
});
const rateLimiterMiddleware = async (req, res, next) => {
    try {
        // Use IP + route path to have limits per endpoint per IP
        const key = `${req.ip}:${req.method}:${req.path}`;
        await rateLimiter.consume(key);
        return next();
    }
    catch (rejRes) {
        const retrySecs = Math.round(rejRes.msBeforeNext / 1000) || 1;
        res.set('Retry-After', String(retrySecs));
        return res.status(429).json({ message: 'Too many requests' });
    }
};
exports.rateLimiterMiddleware = rateLimiterMiddleware;
exports.default = exports.rateLimiterMiddleware;
