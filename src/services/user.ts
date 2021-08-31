import http from './http';

export async function changePassword(data:any) {
    return http.put('/user/password', data);
}

export async function changeProfile(data:any) {
    return http.put('/user/profile', data);
}

export async function changeAvatar(data:any) {
    return http.put('/user/profile/avatar', data);
}
