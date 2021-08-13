import http from "./http";

export async function chats() {
	return http.get("/chats");
}

export async function createChat(data:{title:string}) {
	return http.post("/chats", data);
}

export async function getToken(data:{id:string}) {
	return http.post(`/chats/token/${data.id}`,{});
}
