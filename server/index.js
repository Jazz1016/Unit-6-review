require("dotenv").config();
const express = require("express");
const massive = require("massive"),
  session = require("express-session"),
  authCtrl = require("./authController"),
  ctrl = require("./controller");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();

app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    rejectUnauthorized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    },
    secret: SESSION_SECRET
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then(db => {
  app.set("db", db);
  app.listen(SERVER_PORT || 4040, () =>
    console.log(`server running on ${SERVER_PORT}`)
  );
  console.log("database connected");
});

//#auth endpoints
//TODO login, register, logout, get user

app.post(`/api/login`, authCtrl.login);
app.post(`/api/register`, authCtrl.register);
app.post(`/api/logout`, authCtrl.logout);
app.get(`/api/user`, authCtrl.getUser);

//#post endpoints
//TODO get post put delete posts
//?user id
app.get(`/api/post/:id`, ctrl.getPosts);
//?user id
app.post(`/api/post/:id`, ctrl.addPost);
//?post id
app.put(`/api/post/:id`, ctrl.editPost);
//?post id
app.delete(`/api/post/:id`, ctrl.deletePost);
