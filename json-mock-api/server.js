// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const cors = require("cors");

server.use(cors());
// server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/auth/login", (req, res) => {
  if (req.body.email === "admin@admin" && req.body.password === "admin") {
    const rand = function () {
      return Math.random().toString(36).substr(2); // remove `0.`
    };

    const token = function () {
      return rand() + rand(); // to make it longer
    };

    res.json({
      token: token(),
      user: {
        id: 1,
        name: "gabriel",
      },
    });
  } else {
    res.status(401).json({ message: "WRONG_USER" });
  }
});

// server.post("/users", (req, res) => {
//   console.log("aqui", req.body);
// });

// // server.use((req, res, next) => {
// //   console.log(req);
// //   if (req != 2) {
// //     // add your authorization logic here
// //     next(); // continue to JSON Server router
// //   } else {
// //     res.sendStatus(401);
// //   }
// // });
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
