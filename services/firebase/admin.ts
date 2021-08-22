import admin, { ServiceAccount } from 'firebase-admin';

import creds from './creds.json';

export const verifyIdToken = async (token: string) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(creds as ServiceAccount),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
    });
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch(err => { 
      throw err 
    });
};
