import * as firebase from "firebase-admin";
import { NextFunction, Request, Response } from "express";

export interface AuthenticatedRequest extends Request {
  authToken: string;
  firebaseUser: {
    firebaseId: string;
    email: string | undefined;
  };
}

const attachAuthToken = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    req.authToken = "";
  }
  next();
};

export const attachAuthenticatedUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  attachAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      if (!authToken.length) {
        return res
          .status(401)
          .send({ error: "You are not authorized to make this request" });
      }
      const firebaseUser = await firebase.auth().verifyIdToken(authToken);
      req.firebaseUser = {
        firebaseId: firebaseUser.uid,
        email: firebaseUser.email,
      };
      return next();
    } catch (e) {
      return res
        .status(401)
        .send({ error: "You are not authorized to make this request" });
    }
  });
};
