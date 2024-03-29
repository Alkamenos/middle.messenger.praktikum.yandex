import http from './http';

export async function user() {
    return http.get('/auth/user');
}

export async function logout() {
    return http.post('/auth/logout',{});
}

export async function login(data: {
    password: string | null;
    login: string | null;
}) {
    return http.post('/auth/signin', data);
}

export async function register(data: {
    // eslint-disable-next-line camelcase
    first_name: string | null;
    // eslint-disable-next-line camelcase
    second_name: string | null;
    login: string | null;
    email: string | null;
    password: string | null;
    phone: string | null;
}) {
    return http.post('/auth/signup', data);
}

