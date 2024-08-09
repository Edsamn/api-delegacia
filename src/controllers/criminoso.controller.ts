import { Request, Response } from "express";
import db from "../database/prisma.connection";

class CriminosoController {
  public async list(req: Request, res: Response) {
    try {
      const criminosos = await db.criminosos.findMany();

      return res
        .status(200)
        .json({ success: true, msg: "Lista de criminosos.", data: criminosos });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "ERROR Database." });
    }
  }

  public async create(req: Request, res: Response) {
    const { nome, cpf } = req.body;

    try {
      const criminoso = await db.criminosos.create({
        data: { nome, cpf },
      });

      if (criminoso) {
        return res.status(200).json({
          success: true,
          msg: "Criminoso Registrado.",
          data: criminoso,
        });
      }
      return res
        .status(500)
        .json({ success: false, msg: "Criminoso não registrado." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, msg: "ERROR Database." });
    }
  }
}

export default CriminosoController;
