import {Request, Response, Router} from "express";
import CrimeController from "../controllers/crime.controller";
const routes = () => {
  const router = Router();
  const controller = new CrimeController();

  router.get("/", controller.list);
  router.post("/", controller.create);
  router.get("/:id", controller.show);

  return router;
};

export default routes;
