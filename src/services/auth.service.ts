export function logout() {
  localStorage.removeItem("accessToken");
}

export function getAcessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}
