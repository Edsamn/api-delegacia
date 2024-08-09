import {Request, Response} from "express";
import db from "../database/prisma.connection";

class CrimeController {
  public async list(req: Request, res: Response) {
    try {
      const crimes = await db.crimes.findMany();

      return res.status(200).json({success: true, msg: "Lista de crimes.", data: crimes});
    } catch (error) {
      console.log(error);
      return res.status(500).json({success: false, msg: "ERROR Database."});
    }
  }

  public async create(req: Request, res: Response) {
    const {data, nome, observacoes, criminosoId, armaId} = req.body;

    try {
      const criminoso = await db.criminosos.findUnique({
        where: {id: criminosoId},
      });
      if (!criminoso) {
        return res.status(404).json({
          success: true,
          msg: "Criminoso não encontrado.",
        });
      }

      const arma = await db.armas.findUnique({
        where: {id: armaId},
      });

      if (!arma) {
        return res.status(404).json({
          success: true,
          msg: "Arma não encontrada.",
        });
      }

      if (arma.apreendida === true) {
        return res.status(400).json({
          success: true,
          msg: "Arma já apreendida.",
        });
      }

      const crime = await db.crimes.create({
        data: {data, nome, observacoes, criminosoId, armaId},
      });

      if (crime) {
        await db.armas.update({
          where: {id: armaId},
          data: {apreendida: true},
        });

        return res.status(200).json({
          success: true,
          msg: "Crime Registrado.",
          data: crime,
        });
      }

      return res.status(500).json({success: false, msg: "Crime não registrado."});
    } catch (error) {
      console.log(error);
      return res.status(500).json({success: false, msg: "ERROR Database."});
    }
  }
}

export default CrimeController;
