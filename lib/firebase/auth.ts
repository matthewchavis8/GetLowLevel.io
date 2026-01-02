import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  User,
} from "firebase/auth";
import { auth, db } from "./config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const syncUserToFirestore = async (user: User) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userData = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    lastLogin: serverTimestamp(),
    // Initialize counters if they don't exist
    stats: {
      totalCompleted: 0,
      correctCount: 0,
      incorrectCount: 0,
    },
    // Track which questions have been completed (for unique count)
    completedQuestions: []
  };

  try {
    // Using setDoc with merge: true so we don't overwrite existing counters
    await setDoc(userRef, userData, { merge: true });
  } catch (error) {
    console.error("Error syncing user to Firestore:", error);
  }
};

export const signInWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await syncUserToFirestore(result.user);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const signInWithGithub = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    await syncUserToFirestore(result.user);
    return result.user;
  } catch (error) {
    console.error("Error signing in with GitHub:", error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

