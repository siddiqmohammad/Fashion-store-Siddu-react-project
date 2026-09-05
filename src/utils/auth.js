export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

export function isAdmin(user = getCurrentUser()) {
  return user?.role === "admin";
}
