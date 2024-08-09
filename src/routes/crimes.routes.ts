import {Request, Response, Router} from "express";
import CrimeController from "../controllers/crime.controller";
const routes = () => {
  const router = Router();
  const controller = new CrimeController();

  router.get("/", controller.list);
  router.post("/", controller.create);

  return router;
};

export default routes;
