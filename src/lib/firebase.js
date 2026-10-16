import { initializeApp } from 'firebase/app';
import {
  initializeAuth, indexedDBLocalPersistence, browserSessionPersistence, connectAuthEmulator, signInAnonymously,
  signInWithEmailAndPassword, signOut, onIdTokenChanged
} from 'firebase/auth';

// Firebase web identifiers are public. Authorization is enforced by Auth custom
// claims and Firestore rules; passwords and service-account keys never belong here.
// The API key is provided via VITE_FIREBASE_API_KEY (.env) — never hardcode it.
//
// This module is loaded lazily (dynamic import) only on pages that need auth,
// so ordinary visitors never download the Firebase SDK.
const emulated = import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true';
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: emulated ? 'demo-mesa' : (import.meta.env.VITE_FIREBASE_PROJECT_ID || ''),
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId);
// The Firebase project is shared with other sites. MESA data must live only in its
// own named Firestore database; the project's "(default)" database belongs to others.
const DEDICATED_DATABASE_ID = 'mesa';
export const firestoreDatabaseId = import.meta.env.VITE_FIREBASE_DATABASE_ID || DEDICATED_DATABASE_ID;
if (!emulated && firestoreDatabaseId === '(default)') {
  throw new Error('VITE_FIREBASE_DATABASE_ID must name the dedicated MESA database, not "(default)".');
}

let app = null;
let auth = null;

// initializeAuth throws `auth/invalid-api-key` when the config is empty, so the
// SDK is only initialised when a complete configuration is present.
if (isFirebaseConfigured) {
  app = initializeApp(config, 'mesa-operations');
  // IndexedDB keeps the session across restarts without touching localStorage.
  auth = initializeAuth(app, { persistence: [indexedDBLocalPersistence, browserSessionPersistence] });
  if (emulated) connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
}

export { app, auth, signInWithEmailAndPassword, signOut, onIdTokenChanged };

let sessionRequest;
export async function ensureSession() {
  if (!auth) throw new Error('FIREBASE_NOT_CONFIGURED');
  await auth.authStateReady();
  if (auth.currentUser) return auth.currentUser;
  if (!sessionRequest) {
    sessionRequest = signInAnonymously(auth)
      .then(({ user }) => user)
      .finally(() => { sessionRequest = undefined; });
  }
  return sessionRequest;
}
