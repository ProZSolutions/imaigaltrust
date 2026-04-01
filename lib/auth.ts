// lib/auth.ts
export function isAuthenticated() {
  // Client-side check
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("authToken"); // check saved token
  return !!token; // return true if token exists
}