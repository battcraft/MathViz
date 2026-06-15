import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  User 
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  getDocFromServer
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";
import { UserStats } from "../types";

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const authInstance = getAuth();
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: authInstance.currentUser?.uid,
      email: authInstance.currentUser?.email,
      emailVerified: authInstance.currentUser?.emailVerified,
      isAnonymous: authInstance.currentUser?.isAnonymous,
      tenantId: authInstance.currentUser?.tenantId,
    },
    operationType,
    path
  };
  console.error('Firestore Error details: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// 1. Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId); /* CRITICAL: The app will break without this line */
export const auth = getAuth(app);

const PROVIDER = new GoogleAuthProvider();

// Standard stats definition
export const DEFAULT_STATS = (userId: string = "guest"): UserStats => ({
  userId,
  xp: 0,
  streak: 0,
  lastActiveDate: null,
  screensViewed: [],
  completedScreens: [],
  badges: [],
  quizScores: []
});

interface AuthContextType {
  user: User | null;
  loading: boolean;
  stats: UserStats;
  updateStats: (newStats: Partial<UserStats>) => Promise<void>;
  signIn: () => Promise<void>;
  logout: () => Promise<void>;
  syncWithCloud: () => Promise<void>;
  onlineStatus: "guest" | "logged_in";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem("mathsguru_stats_offline");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_STATS("guest");
      }
    }
    return DEFAULT_STATS("guest");
  });

  // Validates connections once as required by Firebase skill
  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if(error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration. The client is offline.");
        }
      }
    }
    testConnection();
  }, []);

  // Sync / Loading state upon User change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Load stats from Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        try {
          const snapshot = await getDoc(userDocRef);
          if (snapshot.exists()) {
            const cloudData = snapshot.data() as UserStats;
            
            // Compare local stats vs cloud stats (higher XP wins or merge stats)
            const localSaved = localStorage.getItem("mathsguru_stats_offline");
            if (localSaved) {
              try {
                const localData = JSON.parse(localSaved) as UserStats;
                if (localData.xp > cloudData.xp) {
                  // Local copy is newer/better, overwrite cloud
                  const merged = { ...localData, userId: currentUser.uid };
                  await setDoc(userDocRef, merged);
                  setStats(merged);
                  localStorage.setItem("mathsguru_stats_offline", JSON.stringify(merged));
                } else {
                  // Cloud copy wins
                  setStats(cloudData);
                  localStorage.setItem("mathsguru_stats_offline", JSON.stringify(cloudData));
                }
              } catch (e) {
                setStats(cloudData);
                localStorage.setItem("mathsguru_stats_offline", JSON.stringify(cloudData));
              }
            } else {
              setStats(cloudData);
              localStorage.setItem("mathsguru_stats_offline", JSON.stringify(cloudData));
            }
          } else {
            // First time user, register current stats
            const localSaved = localStorage.getItem("mathsguru_stats_offline");
            let initialUserStats = DEFAULT_STATS(currentUser.uid);
            if (localSaved) {
              try {
                const parsed = JSON.parse(localSaved);
                initialUserStats = { ...parsed, userId: currentUser.uid };
              } catch (e) {}
            }
            await setDoc(userDocRef, initialUserStats);
            setStats(initialUserStats);
            localStorage.setItem("mathsguru_stats_offline", JSON.stringify(initialUserStats));
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, "users/" + currentUser.uid);
        }
      } else {
        // Guest mode - restore guest stats from storage if any
        const saved = localStorage.getItem("mathsguru_stats_offline");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (parsed.userId !== "guest") {
              setStats(DEFAULT_STATS("guest"));
            } else {
              setStats(parsed);
            }
          } catch (e) {
            setStats(DEFAULT_STATS("guest"));
          }
        } else {
          setStats(DEFAULT_STATS("guest"));
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async () => {
    try {
      await signInWithPopup(auth, PROVIDER);
    } catch (e) {
      console.error("Sign-in failed", e);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setStats(DEFAULT_STATS("guest"));
      localStorage.removeItem("mathsguru_stats_offline");
    } catch (e) {
      console.error("Sign-out failed", e);
    }
  };

  const updateStats = async (newStats: Partial<UserStats>) => {
    setStats((prev) => {
      const updated = { ...prev, ...newStats };
      
      // Save locally first for instant feedback (offline capacity)
      localStorage.setItem("mathsguru_stats_offline", JSON.stringify(updated));

      // Propagate to Firestore if logged in
      if (user) {
        const path = `users/${user.uid}`;
        setDoc(doc(db, "users", user.uid), updated).catch((err) => {
          handleFirestoreError(err, OperationType.WRITE, path);
        });
      }
      return updated;
    });
  };

  const syncWithCloud = async () => {
    if (user) {
      const path = `users/${user.uid}`;
      try {
        await setDoc(doc(db, "users", user.uid), stats);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, path);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        stats,
        updateStats,
        signIn,
        logout,
        syncWithCloud,
        onlineStatus: user ? "logged_in" : "guest",
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
