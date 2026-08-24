import Cookies from "js-cookie";

export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  image: string;
  gender: string;
  phone: string;
  role: string;
}

export function getUserFromCookies(): User | null {
  try {
    const userCookie = Cookies.get("user");
    if (!userCookie) return null;
    
    return JSON.parse(userCookie) as User;
  } catch (error) {
    console.error("Error parsing user cookie:", error);
    return null;
  }
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
