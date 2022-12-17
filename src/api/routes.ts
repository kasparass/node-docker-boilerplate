import { Application, Router } from "express";
import item from "./routes/item";

const routePaths: [string, Router][] = [["/items", item]];

const routes = (app: Application) => {
  routePaths.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};

export default routes;
