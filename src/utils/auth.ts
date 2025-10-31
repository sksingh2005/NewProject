import { useState, useEffect } from "react";

type Role = "admin" |string;

export interface AuthState {
  isSignedIn: boolean;
  role: Role | null;
  username: string | null;
  email: string | null;
  showRoute: (route: string) => boolean;
  loading: boolean;
  roleId: number | null;
}

export function useAuth(): AuthState {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [role, setRole] = useState<Role | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [roleId, setRoleId] = useState<number | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const id=localStorage.getItem("roleId");

    if (token) setIsSignedIn(true);
    setRole(storedRole);
    setUsername(storedUsername);
    setEmail(storedEmail);
    setRoleId(id ? parseInt(id) : null);
    setLoading(false); // Only after all localStorage checks
  }, [role]);

  const showRoute = (route: string): boolean => {
    if (!isSignedIn) return false;

    // Map string role to enum
    const normalizedRole = role?.toLowerCase();
    let roleEnum: UserRoleEnum | undefined = undefined;
    switch (normalizedRole) {
      case 'superadmin':
        roleEnum = UserRoleEnum.SuperAdmin;
        break;
      case 'admin':
        roleEnum = UserRoleEnum.Admin;
        break;
      case 'callcentermanager':
        roleEnum = UserRoleEnum.CallCenterManager;
        break;
      case 'technician':
        roleEnum = UserRoleEnum.Technician;
        break;
      case 'customersupport':
        roleEnum = UserRoleEnum.CustomerSupport;
        break;
      case 'customer':
        roleEnum = UserRoleEnum.Customer;
        break;
      case 'financialcontroller':
        roleEnum = UserRoleEnum.FinancialController;
        break;
      default:
        break;
    }

    // Customer: cannot visit any route
    if (roleEnum === UserRoleEnum.Customer) return false;
    // Technician: cannot visit /admin* routes
    if (roleEnum === UserRoleEnum.Technician && route.startsWith('/admin')) return false;
    // All others: can visit any route
    return true;
  };
  

  return { isSignedIn, role, username, email, showRoute, loading , roleId };
}

// Utility for authentication token management

const ACCESS_TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';
const ACCESS_TOKEN_EXPIRES_KEY = 'tokenExpires';
const REFRESH_TOKEN_EXPIRES_KEY = 'refreshTokenExpires';

// Add UserRoleEnum
export enum UserRoleEnum {
  SuperAdmin = 1,
  Admin = 2,
  CallCenterManager = 3,
  Technician = 4,
  CustomerSupport = 5,
  Customer = 6,
  FinancialController = 7
}

// Save tokens and expiry to localStorage
export function saveAuthTokens(authResponse: any) {
  if (authResponse?.token?.token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, authResponse.token.token);
    localStorage.setItem(ACCESS_TOKEN_EXPIRES_KEY, authResponse.token.expires);
  }
  if (authResponse?.refreshToken?.token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, authResponse.refreshToken.token);
    localStorage.setItem(REFRESH_TOKEN_EXPIRES_KEY, authResponse.refreshToken.expires);
  }
}

// Get access token
export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

// Get refresh token
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

// Check if token is expired or about to expire (within 2 minutes)
function isTokenExpiringSoon() {
  const expires = localStorage.getItem(ACCESS_TOKEN_EXPIRES_KEY);
  if (!expires) return true;
  const expiryTime = new Date(expires).getTime();
  const now = Date.now();
  // 2 minutes before expiry
  return expiryTime - now < 2 * 60 * 1000;
}

// Refresh the access token using the refresh token
export async function refreshAccessTokenIfNeeded() {
  if (!isTokenExpiringSoon()) return getAccessToken();
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error('No refresh token available');
  const response = await fetch('https://brockyapi-b7dtbrhwhjdhhhez.centralindia-01.azurewebsites.net/api/v1/Auth/Refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': '*/*',
      'X-Api-Key': '29F8840C-609B-44AD-B875-5D97326826FC'
    },
    body: JSON.stringify({ refreshToken })
  });
  if (!response.ok) throw new Error('Failed to refresh token');
  const data = await response.json();
  saveAuthTokens(data);
  return data.token.token;
}

// Ensure a valid token (refresh if needed)
export async function ensureValidToken() {
  return await refreshAccessTokenIfNeeded();
}