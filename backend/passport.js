const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("./models/User");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

//this is used for authorisation, for protected routes.
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: "ksr247",
    },
    (payload, done) => {
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
      });
    }
  )
);

//this is used to authenticated local strategy using usernae and password.
passport.use(
  new localStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      //Catch an error if something is wrong with the database
      if (err) return done(err);
      //If the user doesn't exist returns no user.
      if (!user) return done(null, false);
      //If user is found, compare entered password with stored password
      user.comparePassword(password, done);
    });
  })
);
