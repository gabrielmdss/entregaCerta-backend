import { Request, Response, NextFunction } from 'express';
import { CloudinaryService } from '../services/cloudinary.service';
import AppError from '../errors/appError';
import * as status from '../utils/http.status';

export class CloudinaryController {
  constructor(private cloudinaryService: CloudinaryService) {}

  generateSignature = (req: Request, res: Response, next: NextFunction) => {
    try {
      const folder = req.query.folder?.toString() || 'assistidos';
      const data = this.cloudinaryService.generateSignature(folder);
      res.json(data);
    } catch (error) {
      next(new AppError('Erro ao gerar assinatura', status.INTERNAL_SERVER, error));
    }
  };
}
