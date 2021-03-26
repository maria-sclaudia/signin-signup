import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { NotifyRepository } from '../repository/NotifyRepository';
import { SendMailRepository } from '../repository/SendMailRepository';
import { UserRepository } from '../repository/UserRepository';
import SendMailService from '../services/SendMailService';

class SendMailController {

  async execute(request: Request, response: Response) {
    const {
      email, 
      notify_id
    } = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const notifyRepository = getCustomRepository(NotifyRepository);
    const sendMailRepository = getCustomRepository(SendMailRepository);

    const userExists = await userRepository.findOne({ email });

    if(!userExists) {
      return response.status(400).json({
        error: "User does not exists."
      });
    }

    const notify = await notifyRepository.findOne({ id: notify_id });

    if(!notify) {
      return response.status(400).json({
        error: "Notification does not exist!"
      });
    }

    //Salvar info na tabela de envio
    const sendMail = sendMailRepository.create({
      user_id: userExists.id,
      notify_id,
    });
    await sendMailRepository.save(sendMail);

    //Envio email
    await SendMailService.execute(email, notify.title, notify.description);

    return response.json(sendMail);
  }
}

export { SendMailController }