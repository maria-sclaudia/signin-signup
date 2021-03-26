import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { NotifyRepository } from '../repository/NotifyRepository';

class NotifyController {

  async list(request: Request, response: Response) {
    const all = await getCustomRepository(NotifyRepository).find();

    return response.json(all)
  }

  async create(request: Request, response: Response) {
    const {
      title,
      description
    } = request.body;

    const notifyRepository = getCustomRepository(NotifyRepository);

    const notify = notifyRepository.create({
      title,
      description
    });

    await notifyRepository.save(notify);

    return response.status(201).json(notify);
  }

}

export { NotifyController }