import { PrismaClient } from "@prisma/client";
import http from "http";
import { server } from "./express";
export const prisma = new PrismaClient();
const PORT = process.env.PORT || 8085;
const corsOptions = {
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
};
const startServer = async () => {
  const app = server();
  // app.use(cors(corsOptions), (req, res, next) => {
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   res.setHeader("Access-Control-Allow-Credentials", "true");
  //   res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  //   res.setHeader(
  //     "Access-Control-Allow-Headers",
  //     "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,**Authorization**"
  //   );
  // });
  http.createServer(app).listen(PORT, () => {
    console.log("Backend is running.. " + PORT);
  });
};
startServer();
