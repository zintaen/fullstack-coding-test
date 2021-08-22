import type { NextApiRequest, NextApiResponse } from "next";

import nookies from "nookies";

import { verifyIdToken } from "services/firebase/admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const cookies = nookies.get({ req });
      await verifyIdToken(cookies.token);
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(200).json({ success: false });
    }
  } else {
    res.status(404).json("Please use GET method");
  }
}
