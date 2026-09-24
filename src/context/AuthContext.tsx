import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

/*
  TEMPORARY LOCAL AUTH SYSTEM
  ---------------------------
  There is no real backend (Supabase/Firebase) connected yet.
  This stores registered users locally on the device using
  AsyncStorage, so:
    - Signup actually creates an account
    - Login actually checks email + password
    - Every screen shows the REAL logged-in user's name
    - Logout actually clears the session

  When a real backend is connected later, only the functions
  inside this file need to change — every screen that uses
  useAuth() will keep working exactly the same way.
*/

interface User {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  role: "volunteer" | "organizer";
}

interface StoredAccount extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signup: (account: StoredAccount) => Promise<{ success: boolean; message?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  loginWithGoogleProfile: (googleUser: { name: string; email: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ACCOUNTS_KEY = "alkhidmat_accounts";
const SESSION_KEY = "alkhidmat_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session when the app opens
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const savedSession = await AsyncStorage.getItem(SESSION_KEY);
        if (savedSession) {
          setUser(JSON.parse(savedSession));
        }
      } catch (error) {
        console.log("Failed to restore session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const getAccounts = async (): Promise<StoredAccount[]> => {
    const raw = await AsyncStorage.getItem(ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : [];
  };

  const signup = async (
    account: StoredAccount,
  ): Promise<{ success: boolean; message?: string }> => {
    const accounts = await getAccounts();

    const alreadyExists = accounts.some(
      (existing) =>
        existing.email.toLowerCase() === account.email.toLowerCase(),
    );

    if (alreadyExists) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const updatedAccounts = [...accounts, account];
    await AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify(updatedAccounts));

    const { password, ...publicUser } = account;
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(publicUser));
    setUser(publicUser);

    return { success: true };
  };

  const login = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; message?: string }> => {
    const accounts = await getAccounts();

    const match = accounts.find(
      (account) =>
        account.email.toLowerCase() === email.toLowerCase() &&
        account.password === password,
    );

    if (!match) {
      return {
        success: false,
        message: "Incorrect email or password.",
      };
    }

    const { password: _unused, ...publicUser } = match;
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(publicUser));
    setUser(publicUser);

    return { success: true };
  };

  const loginWithGoogleProfile = async (googleUser: {
    name: string;
    email: string;
  }) => {
    const accounts = await getAccounts();

    const existing = accounts.find(
      (account) => account.email.toLowerCase() === googleUser.email.toLowerCase(),
    );

    const publicUser: User = existing
      ? {
          fullName: existing.fullName,
          email: existing.email,
          phone: existing.phone,
          city: existing.city,
          role: existing.role,
        }
      : {
          fullName: googleUser.name,
          email: googleUser.email,
          phone: "",
          city: "",
          role: "volunteer",
        };

    // If this Google account has never signed up before, save it
    // as a real account too (no password needed for Google users).
    if (!existing) {
      const updatedAccounts = [
        ...accounts,
        { ...publicUser, password: "" },
      ];
      await AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
    }

    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(publicUser));
    setUser(publicUser);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signup, login, loginWithGoogleProfile, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}