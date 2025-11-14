import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import CustomerService from '../services/customer.service';
import Customer, { CustomerAttributes } from '../models/customer.model';
import TokenVersion from '../models/token_version.model';
import AdminService from '../services/admin.service';
import Admin, { AdminAttributes } from '../models/admin.model';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

export let roleEnum = {
    customer: 'customer',
    admin: 'admin'
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    const token = authHeader.substring(7);

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        let tokenRecord: any = await TokenVersion.findOne({
            where: {
                userId: (payload as any).id,
                revokedAt: null
            }
        });
        if (!tokenRecord) {
            return res.status(401).json({ message: 'Token has been revoked' });
        }
        if ((payload as any).tokenVersion < tokenRecord.tokenVersion) {
            return res.status(401).json({ message: 'Previous Token invalidated. Please login again' });
        }
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export const signToken = (payload: object, expiresIn = 3600 * 1000) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export async function loginUser(email: string, password: string, deviceId: string): Promise<Object> {
    const users: any[] = await Promise.all([
        CustomerService.findByEmail(email),
        AdminService.findByEmail(email)]
    );

    const user = users.find(u => u !== null);
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
        throw new Error('Invalid email or password');
    }

    // determine role based on properties present in the user object
    const isAdmin = (u: any): u is AdminAttributes => (u && typeof u === 'object' && 'role' in u);
    let role = isAdmin(user) ? user.role : roleEnum.customer;
    console.log(`User identified: ${user}`);
    let resultToken = await TokenVersion.findOrCreate({
        where: { userId: user.id },
        defaults: {
            userId: user.id,
            deviceId,
            tokenVersion: 0
        }
    });
    let tokenVersion = resultToken[0].tokenVersion;
    if (!resultToken[1] && resultToken[0].deviceId !== deviceId) {
        console.log('Device changed, updating token version');
        // Increment token version to invalidate previous tokens
        tokenVersion = resultToken[0].tokenVersion + 1;
        await TokenVersion.update(
            { tokenVersion, deviceId },
            { where: { userId: user.id } }
        );
    }

    const payload = {
        id: user.id, email: user.email
        , role
        , tokenVersion
    };
    const token = signToken(payload);

    return { token, user: payload };
}

export async function signUp(email: string, password: string, name?: string, kode?: string): Promise<Object> {
    const existing = await CustomerService.findByEmail(email);
    if (existing) {
        throw new Error('Email already in use');
    }

    let role = roleEnum.customer;
    if (kode?.toUpperCase() === 'ADMIN2024') {
        role = roleEnum.admin;
    }
    // replace plain password with hashed value for the subsequent create call
    const hashedPassword = await bcrypt.hash(password, 10);
    if (role !== roleEnum.admin) {
        const newCustomer: CustomerAttributes = await CustomerService.addCustomer({
            email,
            password: hashedPassword,
            name: name ? name : 'userrrr',
            status: 'pending'
        });
        return { success: true, user_id: newCustomer?.id };
    }
    if (role === roleEnum.admin) {
        const newAdmin: AdminAttributes = await AdminService.addAdmin({
            email,
            password: hashedPassword,
            role: roleEnum.admin,
            username: name ? name : 'adminuserrrr',
            status: 'active',
        });
        return { success: true, user_id: newAdmin?.id };
    }
    return { success: false };
}

export default authenticate;
