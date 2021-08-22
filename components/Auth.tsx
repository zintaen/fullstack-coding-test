import nookies from "nookies";
import axios from "axios";
import { FC, createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getIdToken,
} from "firebase/auth";

import "services/firebase/client";

type ContextValues = {
  user: null | Record<string, unknown>;
  register: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
} | null;

const AuthContext = createContext<ContextValues>(null);

export const AuthProvider: FC = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const token = await getIdToken(user);
        nookies.set(null, "token", token);
      } else {
        setUser(null);
        nookies.destroy(null, "token");
      }
    });
  }, []);

  const register = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (creds) => {
        setUser(creds.user);
        const token = await creds.user.getIdToken();
        nookies.set(null, "token", token);
        router.replace("/");
      })
      .catch((err) => {
        const message = err.message;
        alert(message);
      });
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.replace("/");
      })
      .catch((err) => {
        const message = err.message;
        alert(message);
      });
  };

  const logout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const api = axios.create({
  baseURL: "/api/auth-verify",
});

const exceptedRoutes = ["/login", "/register"];

export const useAuth = () => {
  const contextValue = useContext(AuthContext);
  const router = useRouter();
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const isExceptPage = exceptedRoutes.includes(router.pathname);

    const checkAuth = async () => {
      const { data } = await api.get("");
      if (!data.success && !isExceptPage) {
        router.replace("/login");
      } else if (data.success && isExceptPage) {
        router.replace("/");
      } else {
        setIsReady(true);
      }
    };
    checkAuth();
  }, []);

  return { ...contextValue, isReady };
};
