import { initializeApp } from 'firebase/app';
import { initializeAuth, browserLocalPersistence, connectAuthEmulator, signInAnonymously } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Firebase web identifiers are public. Authorization is enforced by Auth and
// Firestore rules; passwords and service-account keys never belong here.
// The API key is provided via VITE_FIREBASE_API_KEY (.env) — never hardcode it.
const env = import.meta.env;
const emulated = env.DEV && env.VITE_USE_FIREBASE_EMULATORS === 'true';
const config = {
  apiKey: env.VITE_FIREBASE_API_KEY || '',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: emulated ? 'demo-mesa' : (env.VITE_FIREBASE_PROJECT_ID || ''),
  appId: env.VITE_FIREBASE_APP_ID || '',
};

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId);
const app = initializeApp(config, 'mesa-operations');
export const auth = initializeAuth(app, { persistence: browserLocalPersistence });
// A separate database prevents MESA rules from replacing the other site's rules.
export const db = getFirestore(app, env.VITE_FIREBASE_DATABASE_ID || 'mesa');

if (emulated) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
}

let sessionRequest;
export async function ensureSession() {
  await auth.authStateReady();
  if (auth.currentUser) return auth.currentUser;
  if (!sessionRequest) {
    sessionRequest = signInAnonymously(auth)
      .then(({ user }) => user)
      .finally(() => { sessionRequest = undefined; });
  }
  return sessionRequest;
}
