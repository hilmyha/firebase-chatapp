import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface User {
  email: string | null;
  username: string | null;
  profileUrl: string | null;
  uid: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<{
    success: boolean;
    msg?: string;
  }>;
  register: (
    email: string,
    password: string,
    username: string,
    profileUrl: string
  ) => Promise<{
    success: boolean;
    msg?: string;
    data?: User;
  }>;
  logout: () => Promise<{
    success: boolean;
  }>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // onAuthStateChanged
    // setTimeout(() => {
    //   setIsAuthenticated(false);
    // }, 3000);
    const unsub = onAuthStateChanged(auth, (user) => {
      // console.log("got user", user);

      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const updateUserData = async (user: any) => {
    const docRef = doc(db, "users", user?.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({
        email: user.email,
        uid: user.uid,
        username: data.username,
        profileUrl: data.profileUrl,
      });

      // console.log("user data context", user);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // signInWithEmailAndPassword
      const response = await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error: any) {
      let msg = error.message;

      if (error.code == "auth/email-already-in-use") {
        msg = "Email already in use";
      } else if (error.code == "auth/weak-password") {
        msg = "Password is too weak";
      } else if (error.code == "auth/invalid-email") {
        msg = "Invalid email";
      } else if (error.code == "auth/invalid-credential") {
        msg = "Invalid credential";
      } else {
        msg = "Failed to login";
      }

      return { success: false, msg: msg };
    }
  };

  const register = async (
    email: string,
    password: string,
    username: string,
    profileUrl: string
  ) => {
    try {
      // createUserWithEmailAndPassword
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // console.log(response.user);
      setIsAuthenticated(true);

      await setDoc(doc(db, "users", response?.user?.uid), {
        username,
        profileUrl,
        userId: response?.user?.uid,
      });
      return { success: true, data: response?.user };
    } catch (error: any) {
      let msg = error.message;

      if (error.code == "auth/email-already-in-use") {
        msg = "Email already in use";
      } else if (error.code == "auth/weak-password") {
        msg = "Password is too weak";
      } else if (error.code == "auth/invalid-email") {
        msg = "Invalid email";
      } else {
        msg = "Failed to register";
      }

      return { success: false, msg: msg };
    }
  };

  const logout = async () => {
    try {
      // signOut
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  };

  const value = { user, isAuthenticated, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return value;
};
