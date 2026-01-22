export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
}

export function getAcessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}
