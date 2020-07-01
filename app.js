const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv')
const morgan = require('morgan')
const passport = require('passport')
const connectDB = require('./config/db')
const method_override = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

// Load config
dotenv.config({ path: './config/config.env' })

// passport config
require('./config/passport')(passport)

// Router
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth")
const adminRouter = require("./routes/admin");

connectDB()

var app = express();

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Session
app.use(session({
  secret: 'rempepe',
  resave: false,
  saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(flash())
app.use(method_override('_method'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + "/public"));
app.use('/sb-admin', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')))

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter)
app.use("/auth", authRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
