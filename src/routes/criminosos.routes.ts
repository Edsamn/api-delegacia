import {Request, Response, Router} from "express";
import CriminosoController from "../controllers/criminoso.controller";
const routes = () => {
  const router = Router();
  const controller = new CriminosoController();

  router.get("/", controller.list);
  router.post("/", controller.create);
  router.get("/:id", controller.show);

  return router;
};

export default routes;
