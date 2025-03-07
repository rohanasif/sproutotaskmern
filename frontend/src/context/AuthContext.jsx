import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

// Create axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to store token with expiration
  const storeToken = (token, expiresIn) => {
    const expirationDate = new Date(
      new Date().getTime() + parseExpirationTime(expiresIn)
    );
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiration", expirationDate.toISOString());
  };

  // Function to parse expiration time (e.g., "1d" to milliseconds)
  const parseExpirationTime = (expiresIn) => {
    const unit = expiresIn.slice(-1);
    const value = parseInt(expiresIn.slice(0, -1));

    switch (unit) {
      case "d":
        return value * 24 * 60 * 60 * 1000; // days to ms
      case "h":
        return value * 60 * 60 * 1000; // hours to ms
      case "m":
        return value * 60 * 1000; // minutes to ms
      default:
        return 24 * 60 * 60 * 1000; // default 1 day
    }
  };

  // Check token expiration
  const isTokenValid = () => {
    const expiration = localStorage.getItem("tokenExpiration");
    if (!expiration) return false;
    return new Date(expiration) > new Date();
  };

  // API Calls
  const loginUser = async (credentials) => {
    const response = await axiosInstance.post("/auth/login", credentials);
    return {
      user: {
        id: response.data._id,
        username: response.data.username,
        email: response.data.email,
      },
      token: response.data.token,
      expiresIn: response.data.expiresIn,
    };
  };

  const registerUser = async (userData) => {
    const response = await axiosInstance.post("/auth/register", userData);
    return {
      user: {
        id: response.data._id,
        username: response.data.username,
        email: response.data.email,
      },
      token: response.data.token,
      expiresIn: response.data.expiresIn,
    };
  };

  const getCurrentUser = async () => {
    const response = await axiosInstance.get("/auth/me");
    return {
      id: response.data._id,
      username: response.data.username,
      email: response.data.email,
      todos: response.data.todos,
      createdAt: response.data.createdAt,
      updatedAt: response.data.updatedAt,
    };
  };

  const logoutUserRequest = async () => {
    await axiosInstance.post("/auth/logout");
  };

  // Update user data
  const updateUserData = async () => {
    const userData = await getCurrentUser();
    setUser(userData);
    return userData;
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token && isTokenValid()) {
        try {
          await updateUserData();
        } catch (err) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }
      } else if (token) {
        // Token exists but is expired
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    storeToken(data.token, data.expiresIn);
    const userData = await updateUserData();
    return userData;
  };

  const register = async (userData) => {
    const data = await registerUser(userData);
    return data.user;
  };

  const logout = async () => {
    try {
      await logoutUserRequest();
    } finally {
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUserData,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
