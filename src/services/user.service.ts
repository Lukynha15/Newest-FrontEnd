import api from "./api";

export async function createUser(data) {
  const response = await api.post("/user", data);
  return response.data;
}

export async function getUser(id) {
  const response = await api.get(`/user/${id}`);
  return response.data;
}

export async function login(data) {
  const response = await api.post("auth/login", data);
  return response.data;
}
