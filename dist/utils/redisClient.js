"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
// Create a single shared Redis client. Configure REDIS_URL in your environment, e.g. redis://127.0.0.1:6379
const redis = new ioredis_1.default(process.env.REDIS_URL || 'redis://127.0.0.1:6379');
redis.on('error', (err) => {
    // keep logs minimal — the error middleware / logger can be used for more advanced handling
    // eslint-disable-next-line no-console
    console.error('Redis error:', err);
});
exports.default = redis;
