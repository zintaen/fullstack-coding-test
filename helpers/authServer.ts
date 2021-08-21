import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

import { verifyIdToken } from 'services/firebase/admin';

export const serverAuthenticate = async (context: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    return token;
  } catch (err) {
    context.res.writeHead(302, { location: "/login" });
    context.res.end();
    return null;
  }
};