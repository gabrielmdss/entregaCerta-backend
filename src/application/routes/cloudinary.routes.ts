import { Router } from 'express';
import { CloudinaryService } from '../services/cloudinary.service';
import { CloudinaryController } from '../controllers/cloudinary.controller';

const cloudinaryRoutes = Router();
const cloudinaryService = new CloudinaryService();
const cloudinaryController = new CloudinaryController(cloudinaryService);

cloudinaryRoutes.get('/imagem/upload', cloudinaryController.generateSignature);

export default cloudinaryRoutes;
