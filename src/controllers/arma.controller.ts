import {Request, Response} from "express";
import db from "../database/prisma.connection";

class ArmaController {
  public async list(req: Request, res: Response) {
    try {
      const armas = await db.armas.findMany();

      return res.status(200).json({success: true, msg: "Lista de armas.", data: armas});
    } catch (error) {
      console.log(error);
      return res.status(500).json({success: false, msg: "ERROR Database."});
    }
  }

  public async create(req: Request, res: Response) {
    const {tipo, apreendida} = req.body;

    try {
      const arma = await db.armas.create({
        data: {tipo, apreendida},
      });

      if (arma) {
        return res.status(200).json({
          success: true,
          msg: "Arma Registrada.",
          data: arma,
        });
      }
      return res.status(500).json({success: false, msg: "Arma não registrada."});
    } catch (error) {
      console.log(error);
      return res.status(500).json({success: false, msg: "ERROR Database."});
    }
  }
}

export default ArmaController;
