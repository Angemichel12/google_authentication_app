import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel } from "../db/models/user";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "http://localhost:5000/google/callback",
      passReqToCallback: true,
    },
    async function (
      request: any,
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: (error: any, user?: any) => void
    ) {
      try {
        console.log("+++++++++++", profile.emails);
        const existingUser = await UserModel.findOne({
          where: { email: profile.emails[0].value },
        });

        if (existingUser) {
          // If user already exists, return the existing user
          return done(null, existingUser);
        } else {
          // Create a new user since no user with this email exists
          const newUser = await UserModel.create({
            id: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            profile: profile.photos[0].value,
            isVerified: true,
          });

          // Return the newly created user
          return done(null, newUser);
        }
      } catch (error) {
        console.log("+++++++++++++++", error);
        return done(error);
      }
    }
  )
);

passport.serializeUser(function (
  user: any,
  done: (error: any, user?: any) => void
) {
  done(null, user.id);
});

passport.deserializeUser(async function (
  id: string,
  done: (error: any, user?: any) => void
) {
  try {
    const user = await UserModel.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
