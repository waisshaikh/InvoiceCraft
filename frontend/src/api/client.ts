import { useAppStore } from '../store/useAppStore';
const API_URL = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000/api/v1' : 'https://api.invoicepilotapp.com/api/v1');
export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = useAppStore.getState().token;
  const response = await fetch(`${API_URL}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers } });
  const body = response.status === 204 ? null : await response.json();
  if (!response.ok) throw new Error(body?.message || 'Request failed');
  return body;
}
