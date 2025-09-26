import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AdminContextType {
  isAuthenticated: boolean;
  token: string | null;
  admin: any;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  fetchStudentData: () => Promise<any>;
  fetchDashboardStats: () => Promise<any>;
}

const AdminContext = createContext<AdminContextType>({} as AdminContextType);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminToken'));
  const [admin, setAdmin] = useState<any>(null);

  // Initialize admin state from localStorage on mount
  React.useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      // You could also decode the JWT to get admin info if needed
      setAdmin({ username: 'admin' }); // Placeholder admin info
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setToken(data.token);
        setAdmin(data.admin);
        setIsAuthenticated(true);
        localStorage.setItem('adminToken', data.token);
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    setIsAuthenticated(false);
    localStorage.removeItem('adminToken');
  };

  const fetchStudentData = async () => {
    if (!token) throw new Error('No authentication token');

    const response = await fetch('http://localhost:3001/api/admin/student-data', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      // Handle unauthorized - logout user
      logout();
      throw new Error('Session expired. Please login again.');
    }
    
    if (!response.ok) {
      throw new Error('Failed to fetch student data');
    }

    return await response.json();
  };

  const fetchDashboardStats = async () => {
    if (!token) throw new Error('No authentication token');

    const response = await fetch('http://localhost:3001/api/admin/dashboard-stats', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      // Handle unauthorized - logout user
      logout();
      throw new Error('Session expired. Please login again.');
    }
    
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }

    return await response.json();
  };

  const value = {
    isAuthenticated,
    token,
    admin,
    login,
    logout,
    fetchStudentData,
    fetchDashboardStats,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};