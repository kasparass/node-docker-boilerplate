import express, { Application } from "express";
import routes from "../api/routes";

export default (app: Application) => {
  app.use(express.json());
  routes(app);
};
