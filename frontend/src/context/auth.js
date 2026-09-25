import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api, { getErrorMessage, setAuthToken } from '../utils/api';
import { useBusinessType } from '../utils/BusinessTypeContext';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

// Storage can throw or hold corrupt data; never let that break startup
const readStoredSession = () => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = JSON.parse(localStorage.getItem(USER_KEY));
    return token && user ? { token, user } : null;
  } catch {
    return null;
  }
};

const storeSession = (session) => {
  try {
    if (session) {
      localStorage.setItem(TOKEN_KEY, session.token);
      localStorage.setItem(USER_KEY, JSON.stringify(session.user));
    } else {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  } catch {
    // Session still holds in memory for this visit
  }
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { clearBusinessType } = useBusinessType();
  const [session, setSessionState] = useState(() => {
    const stored = readStoredSession();
    setAuthToken(stored?.token ?? null);
    return stored;
  });
  // Only block rendering while checking a stored session with the server
  const [loading, setLoading] = useState(() => Boolean(session));
  const [error, setError] = useState(null);

  const setSession = useCallback((next) => {
    setAuthToken(next?.token ?? null);
    storeSession(next);
    setSessionState(next);
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    clearBusinessType();
  }, [setSession, clearBusinessType]);

  // Confirm a stored session is still valid, and pick up profile changes
  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    api
      .get('/api/auth')
      .then((res) => {
        if (!cancelled) setSession({ token: session.token, user: res.data });
      })
      .catch((err) => {
        // A 401 means the token is invalid or expired. Anything else (server down,
        // offline) keeps the stored session so a blip doesn't sign people out.
        if (!cancelled && err.response?.status === 401) logout();
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // Runs once on startup; later sessions come from login/register
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Any 401 later on (e.g. the token expires mid-visit) signs the user out
  useEffect(() => {
    const id = api.interceptors.response.use(undefined, (err) => {
      if (err.response?.status === 401 && err.config?.url !== '/api/auth/login') logout();
      return Promise.reject(err);
    });
    return () => api.interceptors.response.eject(id);
  }, [logout]);

  const authenticate = useCallback(
    async (path, formData) => {
      setError(null);
      try {
        const res = await api.post(path, formData);
        setSession({ token: res.data.token, user: res.data.user });
        return res.data.user;
      } catch (err) {
        setError(getErrorMessage(err));
        throw err;
      }
    },
    [setSession]
  );

  // Stable identities so pages can safely use them in effect dependencies
  const login = useCallback((formData) => authenticate('/api/auth/login', formData), [authenticate]);
  const register = useCallback(
    (formData) => {
      clearBusinessType(); // A new account starts by choosing its business type
      return authenticate('/api/auth/register', formData);
    },
    [authenticate, clearBusinessType]
  );
  const clearErrors = useCallback(() => setError(null), []);

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      isAuthenticated: Boolean(session),
      loading,
      error,
      login,
      register,
      logout,
      clearErrors,
    }),
    [session, loading, error, login, register, logout, clearErrors]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};

export default AuthContext;
