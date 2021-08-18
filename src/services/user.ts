import http from "./http";

export async function changePassword(data) {
  return http.put("/user/password", data);
}

export async function changeProfile(data) {
  return http.put("/user/profile", data);
}

export async function changeAvatar(data) {
  return http.put("/user/profile/avatar", data);
}
