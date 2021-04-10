import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UploadCarImagesUseCase from './UploadCarImagesUseCase';

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const images = request.files as IFiles[];

    const imagesNames = images.map((file) => file.filename);

    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);

    await uploadCarImageUseCase.execute({
      car_id: id,
      images_names: imagesNames,
    });

    return response.status(201).send();
  }
}

export default UploadCarImagesController;
