import axios from 'axios';
import { Request } from 'express';
import express from 'express';

import { JWT } from '../JWT';
import { AuthMiddleWare } from '../middleware/AuthMiddleware';
import { User, UserModel } from '../model/user.model';

const google_auth_token_url = 'https://oauth2.googleapis.com/token';
const google_auth_get_profile_url =
  'https://www.googleapis.com/oauth2/v1/userinfo';
const google_auth_client_url = 'https://accounts.google.com/o/oauth2/v2/auth';

const UserRouter = express.Router();

UserRouter.get('/auth/create-google-auth-link', async (req, res, next) => {
  try {
    const googleAuthUrl = `${google_auth_client_url}?client_id=${
      process.env.GOOGLE_CLIENT_ID
    }&redirect_uri=${
      process.env.GOOGLE_REDIRECT_URI
    }&response_type=code&scope=${encodeURI('profile email')}`;
    console.log(googleAuthUrl);
    res.send(googleAuthUrl).status(200);
  } catch (error: any) {
    console.error('Error:', error);
    next(error);
  }
});

UserRouter.post('/auth/google', async (req, res, next) => {
  const { code } = req.body;

  try {
    if (!code) {
      next({
        message: 'Missing Required Verification Code!',
        statusCode: 400,
      });
    }

    // Exchange authorization code for access token
    const { data } = await axios.post(google_auth_token_url, {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      code,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const { access_token, id_token } = data;

    // Use access_token or id_token to fetch user profile
    const { data: profile } = await axios.get(google_auth_get_profile_url, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    console.log(data);
    if (!profile) {
      next({ message: 'Not found', statusCode: 404 });
    }

    let user;

    const possibleExistingUser = await UserModel.findOne({
      email: profile.email,
    }).lean();

    if (!possibleExistingUser) {
      [user] = await UserModel.create([
        {
          name: profile.name,
          picture: profile.picture,
          emailVerified: profile.verified_email,
          email: profile.email,
        },
      ]);
    } else {
      user = possibleExistingUser;
    }

    if (!user) {
      next({
        message: 'Interal server error',
        statusCode: 500,
      });
    }

    const token = JWT.sign(user._id.toHexString());
    res.send({ token, user }).status(200);
  } catch (e: any) {
    next(e);
  }
});

UserRouter.post(
  '/auth/refresh-token',
  AuthMiddleWare,
  async (req, res, next) => {
    const user = (req as Request & { context: { user: User } }).context.user;

    try {
      const newToken = JWT.sign(user._id.toHexString());

      res.send({ token: newToken });
    } catch (e) {
      next({
        message: `Something went wrong while refreshing JWT token for user: ${user._id}`,
        statusCode: 500,
      });
    }
  },
);

export default UserRouter;
