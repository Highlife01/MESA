// Firestore is loaded on demand so ordinary visitors never download the SDK.
const env = import.meta.env;
const emulated = Boolean(env.DEV && env.VITE_USE_FIREBASE_EMULATORS === 'true');

export const cloudConfigured = Boolean(
  env.VITE_FIREBASE_API_KEY && (emulated || env.VITE_FIREBASE_PROJECT_ID) && env.VITE_FIREBASE_APP_ID
);

let pending;

/** Resolves to { db, fs, auth, ensureSession, onIdTokenChanged } or null when Firebase is not configured. */
export function loadCloud() {
  if (!cloudConfigured) return Promise.resolve(null);
  if (!pending) {
    pending = (async () => {
      const firebase = await import('./firebase');
      if (!firebase.isFirebaseConfigured || !firebase.app) return null;
      const fs = await import('firebase/firestore');
      const db = fs.getFirestore(firebase.app, firebase.firestoreDatabaseId);
      if (emulated) fs.connectFirestoreEmulator(db, '127.0.0.1', 8080);
      return {
        db,
        fs,
        auth: firebase.auth,
        ensureSession: firebase.ensureSession,
        onIdTokenChanged: firebase.onIdTokenChanged,
      };
    })().catch(error => {
      pending = undefined;
      throw error;
    });
  }
  return pending;
}
