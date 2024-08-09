import { Request, Response, Router } from "express";
import CriminosoController from "../controllers/criminoso.controller";
const routes = () => {
  const router = Router();
  const controller = new CriminosoController();

  router.get("/", controller.list);
  router.post("/", controller.create);

  return router;
};

export default routes;
