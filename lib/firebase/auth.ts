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
  
  try {
    // Check if user document exists first
    const { getDoc } = await import("firebase/firestore");
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      // User exists, only update profile info and lastLogin
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastLogin: serverTimestamp(),
      }, { merge: true });
    } else {
      // New user, initialize everything
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastLogin: serverTimestamp(),
        stats: {
          totalCompleted: 0,
          correctCount: 0,
          incorrectCount: 0,
          languages: {},
          topics: {}
        },
        completedQuestions: []
      });
    }
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

