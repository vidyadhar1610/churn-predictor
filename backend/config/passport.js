import dotenv from "dotenv";

dotenv.config();



import { Strategy as GoogleStrategy }
from "passport-google-oauth20";

console.log(
  "CLIENT ID:",
  process.env.GOOGLE_CLIENT_ID
);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        process.env.GOOGLE_CLIENT_ID,

      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET,

      callbackURL:
        "http://localhost:3000/auth/google/callback",
    },

    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      try {
        const user = {
          googleId: profile.id,

          name: profile.displayName,

          email:
            profile.emails?.[0]?.value,

          photo:
            profile.photos?.[0]?.value,
        };

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;