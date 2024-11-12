'use server';

import { cookies } from 'next/headers';
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.AUTH_SECRET_KEY || "";

export async function getToken() {
    const encryptedToken = cookies().get('access_token')?.value;
    if (encryptedToken) {
        const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
        const originalToken = bytes.toString(CryptoJS.enc.Utf8);
        return originalToken;
    }
    return null;
}

export async function getWorkspaceId() {
    const encryptedWorkspaceId = cookies().get('workspace_id')?.value;
    if (encryptedWorkspaceId) {
        const bytes = CryptoJS.AES.decrypt(encryptedWorkspaceId, SECRET_KEY);
        const originalWorkspaceId = bytes.toString(CryptoJS.enc.Utf8);
        return originalWorkspaceId;
    }
    return null;
}

export async function getCurrentUserInfo() {
    return {
        id: 1,
        login: 'user',
        name: 'User Test',
        email: 'example@test.com'
    };
}

export async function login() {
    try {

        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const encryptedToken = CryptoJS.AES.encrypt("only a example token", SECRET_KEY).toString();
        const encryptedSessionType = CryptoJS.AES.encrypt('regular', SECRET_KEY).toString();
        cookies().set('access_token', encryptedToken, { expires, httpOnly: true });
        cookies().set('session_type', encryptedSessionType, { expires, httpOnly: true });

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function logout() {
    try {
        cookies().set('access_token', '', { expires: new Date(0) });
        cookies().set('session_type', '', { expires: new Date(0) });

        return true;
    } catch (e) {
        console.error(e);

        return false;
    }
}