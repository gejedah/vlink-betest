import express from 'express';
import { setCustomerRoutes } from './routes/customer.routes';
import { setBookRoutes } from './routes/book.routes';
import { handleError } from './middlewares/error.middleware';
import { setAuthRoutes } from './routes/auth.routes';
import { setCartRoutes } from './routes/cart.routes';
import config from './config';
import { rateLimiterMiddleware } from './middlewares/rateLimiter.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiter globally (per IP+route)
app.use(rateLimiterMiddleware);

setAuthRoutes(app);
setCustomerRoutes(app);
setBookRoutes(app);
setCartRoutes(app);

app.use(handleError);

export const port = config.port || 3000;

export default app;
