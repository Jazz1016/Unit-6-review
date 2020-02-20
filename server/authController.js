const bcrypt = require("bcryptjs");

module.exports = {
  login: async (req, res) => {
    console.log("hit", req.body);
    const { email, password } = req.body;
    const { session } = req;
    const db = req.app.get("db");
    console.log(email);
    let user = await db.check_user([email]);
    console.log(user);
    user = user[0];
    if (!user) {
      return res.status(400).send("Email not found");
    }
    const authenticated = bcrypt.compareSync(password, user.user_password);

    if (authenticated) {
      delete user.user_password;
      session.user = user;
      res.status(202).send(session.user);
    } else {
      // password incorrect
      res.status(400).send("Incorrect Password");
    }
  },
  register: async (req, res) => {
    console.log("hit", req.body);
    const { email, password } = req.body;
    const { session } = req;
    const db = req.app.get("db");

    let user = await db.check_user([email]);
    console.log(user);
    user = user[0];
    if (user) {
      return res.status(400).send("User already exists");
    }
    const salt = bcrypt.genSaltSync(20);
    const hash = bcrypt.hashSync(password, salt);

    let newUser = await db.register_user([{ email, hash }]);
    newUser = newUser[0];
    session.user = newUser;
    res.status(201).send(session.user);
  },
  logout: async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },
  getUser: async (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.status(200).send("");
    }
  }
};
