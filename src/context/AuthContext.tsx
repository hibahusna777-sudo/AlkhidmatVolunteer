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
  signup: (
    account: StoredAccount,
  ) => Promise<{ success: boolean; message?: string }>;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;
  loginWithGoogleProfile: (googleUser: {
    name: string;
    email: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ACCOUNTS_KEY = "alkhidmat_accounts";
const CURRENT_USER_KEY = "currentUser";
const LEGACY_SESSION_KEY = "alkhidmat_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const saveSession = async (sessionUser: User) => {
    await AsyncStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(sessionUser),
    );
    setUser(sessionUser);
  };

  const clearSession = async () => {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
    await AsyncStorage.removeItem(LEGACY_SESSION_KEY);
    setUser(null);
  };

  // Restore session when the app opens
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const currentUser = await AsyncStorage.getItem(CURRENT_USER_KEY);

        if (currentUser) {
          setUser(JSON.parse(currentUser));
          return;
        }

        // Migrate the old session key to the canonical currentUser key.
        const legacySession = await AsyncStorage.getItem(
          LEGACY_SESSION_KEY,
        );

        if (legacySession) {
          const parsedSession: User = JSON.parse(legacySession);

          await AsyncStorage.setItem(
            CURRENT_USER_KEY,
            JSON.stringify(parsedSession),
          );

          await AsyncStorage.removeItem(LEGACY_SESSION_KEY);

          setUser(parsedSession);
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

    await AsyncStorage.setItem(
      ACCOUNTS_KEY,
      JSON.stringify(updatedAccounts),
    );

    const { password: _password, ...publicUser } = account;

    await saveSession(publicUser);

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

    const { password: _password, ...publicUser } = match;

    await saveSession(publicUser);

    return { success: true };
  };

  const loginWithGoogleProfile = async (googleUser: {
    name: string;
    email: string;
  }) => {
    const accounts = await getAccounts();

    const existing = accounts.find(
      (account) =>
        account.email.toLowerCase() === googleUser.email.toLowerCase(),
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

    if (!existing) {
      const updatedAccounts = [
        ...accounts,
        {
          ...publicUser,
          password: "",
        },
      ];

      await AsyncStorage.setItem(
        ACCOUNTS_KEY,
        JSON.stringify(updatedAccounts),
      );
    }

    await saveSession(publicUser);
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) {
      return;
    }

    const updatedUser: User = {
      ...user,
      ...updates,
    };

    await saveSession(updatedUser);

    const accounts = await getAccounts();

    const updatedAccounts = accounts.map((account) => {
      if (
        account.email.toLowerCase() === updatedUser.email.toLowerCase()
      ) {
        return {
          ...account,
          ...updates,
        };
      }

      return account;
    });

    await AsyncStorage.setItem(
      ACCOUNTS_KEY,
      JSON.stringify(updatedAccounts),
    );
  };

  const logout = async () => {
    await clearSession();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signup,
        login,
        loginWithGoogleProfile,
        logout,
        updateProfile,
      }}
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