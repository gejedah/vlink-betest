import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import CustomerService from '../services/customer.service';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    const token = authHeader.substring(7);

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        console.log('Authenticated user:', payload);
        console.log('Authenticated user:', req.user);
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export const signToken = (payload: object, expiresIn = 1800 * 1000) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export async function loginUser(email: string, password: string, ip: string): Promise<Object> {
    const customer: any = await CustomerService.findByEmail(email);

    if (!customer) {
        throw new Error('Invalid email or password');
    }

    const passwordMatches = await bcrypt.compare(password, customer.password);
    if (!passwordMatches) {
        throw new Error('Invalid email or password');
    }

    const payload = { id: customer.id, email: customer.email, role: 'customer' };
    const token = signToken(payload);

    return { token, user: payload };
}

export async function signUp(email: string, password: string, name?: string, kode?: string): Promise<Object> {
    const existing = await CustomerService.findByEmail(email);
    if (existing) {
        throw new Error('Email already in use');
    }

    let role = 'customer';
    if (kode === 'ADMIN2024') {
        role = 'admin';
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // replace plain password with hashed value for the subsequent create call
    return CustomerService.addCustomer({
        email,
        password: hashedPassword,
        name: name ? name : 'userrrr',
        status: 'pending'
    });
}

export default authenticate;
