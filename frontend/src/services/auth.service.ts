import api from './api';

const ADMIN_KEY = 'celestia_admin_key';

export const authService = {
  /**
   * Verify the admin secret key
   * @param secret The password/key to verify
   * @returns Promise resolving to boolean (true if valid)
   */
  login: async (secret: string): Promise<boolean> => {
    try {
      const response = await api.post('/auth/login', { secret });
      if (response.status === 200) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(ADMIN_KEY, secret);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout failed (backend):', error);
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(ADMIN_KEY);
      }
    }
  },

  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem(ADMIN_KEY);
  },

  getSecret: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(ADMIN_KEY);
  }
};
