import express, { Application, json, urlencoded } from "express";

// Routes
import router from "./router";
const server = (): Application => {
  const app = express();
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use("/", router);

  return app;
};
export { server };
