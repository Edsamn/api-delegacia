import { Request, Response, Router } from "express";
import ArmaController from "../controllers/arma.controller";
const routes = () => {
  const router = Router();
  const controller = new ArmaController();

  router.get("/", controller.list);
  router.post("/", controller.create);

  return router;
};

export default routes;
