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
    const {data, nome, observacoes, criminosoId} = req.body;

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

      const crime = await db.crimes.create({
        data: {data, nome, observacoes, criminosoId},
      });

      if (!data || !nome || !criminosoId) {
        return res.status(40).json({
          success: true,
          msg: "Preencher todos os campos.",
        });
      }

      if (crime) {
        return res.status(200).json({success: true, msg: "Crime registrado.", data: crime});
      }

      return res.status(500).json({success: false, msg: "Crime não registrado."});
    } catch (error) {
      console.log(error);
      return res.status(500).json({success: false, msg: "ERROR Database."});
    }
  }

  public async show(req: Request, res: Response) {
    const {id} = req.params;

    try {
      const crime = await db.crimes.findUnique({
        where: {id},
        include: {armas: true},
      });

      if (!crime) {
        return res.status(404).json({success: false, msg: "Crime não encontrado."});
      }

      if (crime) {
        return res.status(200).json({success: true, msg: "Lista de armas do crime.", data: crime});
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({success: false, msg: "ERROR Database."});
    }
  }
}

export default CrimeController;
