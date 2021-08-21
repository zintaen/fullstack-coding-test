import { FC, createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import firebase from 'firebase/app';
import "firebase/auth";

import { initFirebaseClient } from 'services/firebase/client';

type ContextValues = {
  user: null | Record<string, unknown>;
  register: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
} | null

const AuthContext = createContext<ContextValues>(null);

export const AuthProvider: FC = ({ children }) => {
  initFirebaseClient();

  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      // expired or unauthenticated
      if (!user) {
        setUser(null);
        nookies.set(null, "token", "");
        return;
      }
      // success to authenticate
      setUser(user);
      const token = await user.getIdToken();
      nookies.set(null, "token", token);
    });
  }, []);

  const register = async (email: string, password: string) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (data) => {
        setUser(data.user);
        const token = await data.user.getIdToken();
        nookies.set(null, "token", token);
        router.replace('/');
      })
      .catch(err => {
        const message = err.message;
        alert(message);
      });
  }

  const login = async (email: string, password: string) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        router.replace('/');
      })
      .catch(err => {
        const message = err.message;
        alert(message);
      });
  }

  return (
    <AuthContext.Provider value={{ user, register, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const contextValue = useContext(AuthContext);
  return contextValue;
};
