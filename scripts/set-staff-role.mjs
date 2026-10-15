#!/usr/bin/env node
/**
 * MESA personel rolü atama aracı (Firebase Auth custom claims).
 *
 * Kullanım:
 *   npm run staff:role -- <e-posta> <rol> [tenantId] [şirket]
 *   npm run staff:role -- <e-posta> --remove
 *   npm run staff:role -- <e-posta> --show
 *
 * Roller: super_admin | admin | manager | dispatcher | technician | finance | warehouse | customer_admin
 *
 * Kimlik bilgisi: Firebase Console → Proje ayarları → Hizmet hesapları → "Yeni özel anahtar oluştur"
 * ile indirilen JSON dosyasının yolunu GOOGLE_APPLICATION_CREDENTIALS ortam değişkenine verin:
 *   $env:GOOGLE_APPLICATION_CREDENTIALS="C:\anahtarlar\mesa-adminsdk.json"   (PowerShell)
 * Bu dosyayı ASLA repoya eklemeyin (.gitignore kapsamındadır).
 *
 * Not: Kullanıcının yeni rolü, bir sonraki token yenilemesinde (en geç 1 saat) ya da
 * çıkış/giriş yaptığında geçerli olur.
 */
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const ROLES = ['super_admin', 'admin', 'manager', 'dispatcher', 'technician', 'finance', 'warehouse', 'customer_admin'];
const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || 'adanahizlisatis';

const [email, roleArg, tenantArg, ...companyParts] = process.argv.slice(2);

function usage(message) {
  if (message) console.error(`Hata: ${message}\n`);
  console.error('Kullanım: npm run staff:role -- <e-posta> <rol|--remove|--show> [tenantId] [şirket]');
  console.error(`Roller: ${ROLES.join(', ')}`);
  process.exit(1);
}

if (!email || !roleArg) usage();
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) usage('GOOGLE_APPLICATION_CREDENTIALS tanımlı değil (servis hesabı JSON yolu).');

initializeApp({ credential: applicationDefault(), projectId: PROJECT_ID });
const auth = getAuth();

let user;
try {
  user = await auth.getUserByEmail(email.trim().toLowerCase());
} catch (error) {
  usage(`${email} için Firebase Auth kullanıcısı bulunamadı. Önce Firebase Console → Authentication → Kullanıcı ekle. (${error.code || error.message})`);
}

if (roleArg === '--show') {
  console.log(JSON.stringify({ uid: user.uid, email: user.email, disabled: user.disabled, claims: user.customClaims || {} }, null, 2));
  process.exit(0);
}

if (roleArg === '--remove') {
  const { mesaRole, tenantId, company, ...rest } = user.customClaims || {};
  await auth.setCustomUserClaims(user.uid, rest);
  await auth.revokeRefreshTokens(user.uid);
  console.log(`✓ ${user.email} kullanıcısının MESA rolü kaldırıldı ve oturumları sonlandırıldı.`);
  process.exit(0);
}

if (!ROLES.includes(roleArg)) usage(`Geçersiz rol: ${roleArg}`);

const isCustomer = roleArg === 'customer_admin';
if (isCustomer && !tenantArg) usage('customer_admin rolü için tenantId zorunludur (örn. tenant_abc).');

const claims = {
  ...(user.customClaims || {}),
  mesaRole: roleArg,
  tenantId: tenantArg || 'mesa',
  ...(companyParts.length ? { company: companyParts.join(' ') } : {})
};

await auth.setCustomUserClaims(user.uid, claims);
console.log(`✓ ${user.email} → rol: ${claims.mesaRole}, tenant: ${claims.tenantId}${claims.company ? `, şirket: ${claims.company}` : ''}`);
console.log('  Kullanıcı çıkış/giriş yaptığında (veya en geç 1 saat içinde) yeni yetki geçerli olur.');
