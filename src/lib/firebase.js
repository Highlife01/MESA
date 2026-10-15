import { initializeApp } from 'firebase/app';
import {
  initializeAuth, browserLocalPersistence, connectAuthEmulator, signInAnonymously,
  signInWithEmailAndPassword, signOut, onIdTokenChanged
} from 'firebase/auth';

// Firebase web identifiers are public. Authorization is enforced by Auth custom
// claims and Firestore rules; passwords and service-account keys never belong here.
// The API key is provided via VITE_FIREBASE_API_KEY (.env) — never hardcode it.
//
// This module is loaded lazily (dynamic import) only on pages that need auth,
// so ordinary visitors never download the Firebase SDK.
const env = import.meta.env;
const emulated = env.DEV && env.VITE_USE_FIREBASE_EMULATORS === 'true';
const config = {
  apiKey: env.VITE_FIREBASE_API_KEY || '',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: emulated ? 'demo-mesa' : (env.VITE_FIREBASE_PROJECT_ID || ''),
  appId: env.VITE_FIREBASE_APP_ID || '',
};

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId);
export const firestoreDatabaseId = env.VITE_FIREBASE_DATABASE_ID || 'mesa';

let app = null;
let auth = null;

// initializeAuth throws `auth/invalid-api-key` when the config is empty, so the
// SDK is only initialised when a complete configuration is present.
if (isFirebaseConfigured) {
  app = initializeApp(config, 'mesa-operations');
  auth = initializeAuth(app, { persistence: browserLocalPersistence });
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
