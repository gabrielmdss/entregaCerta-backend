import { Request, Response } from 'express';
import { CloudinaryService } from '../services/cloudinary.service';

export class CloudinaryController {
  constructor(private cloudinaryService: CloudinaryService) {}

  generateSignature = (req: Request, res: Response) => {
    try {
      const folder = req.query.folder?.toString() || 'assistidos';
      const data = this.cloudinaryService.generateSignature(folder);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao gerar assinatura', error });
    }
  };
}
