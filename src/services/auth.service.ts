export function logout() {
  localStorage.removeItem("acessToken");
}

export function getAcessToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}
