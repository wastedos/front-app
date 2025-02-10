import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function middleware(request: NextRequest) {

    const url = request.nextUrl;

    if (url.pathname.startsWith('/dashboard')) {
        const token = request.cookies.get('token')?.value;
        if (!token) {
            console.log('No token found, redirecting to login');
            return NextResponse.redirect(new URL(`/auth/login`, request.url));
        }

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/protected/role`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const role = response.data.role;
            const allowedRoles = ['admin', 'employee'];
            if (!allowedRoles.includes(role)) {
                console.log('Unauthorized role, redirecting to unauthorized page');
                return NextResponse.redirect(new URL(`/unauthorized`, request.url));
            }
        } catch (err) {
            console.error('Error verifying token:', err.response?.data || err.message);
            return NextResponse.redirect(new URL(`/auth/login`, request.url));
        }
    }


    if (url.pathname.startsWith('/dashboard/users') || url.pathname.startsWith('/dashboard/history')) {
        const token = request.cookies.get('token')?.value;
        if (!token) {
            console.log('No token found, redirecting to login');
            return NextResponse.redirect(new URL(`/auth/login`, request.url));
        }

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/protected/role`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const role = response.data.role;
            const allowedRoles = ['admin'];
            if (!allowedRoles.includes(role)) {
                console.log('Unauthorized role, redirecting to unauthorized page');
                return NextResponse.redirect(new URL(`/unauthorized`, request.url));
            }
        } catch (err) {
            console.error('Error verifying token:', err.response?.data || err.message);
            return NextResponse.redirect(new URL(`/auth/login`, request.url));
        }
    }


}

export const config = {
    matcher: [ '/dashboard/:path*' ],
};
