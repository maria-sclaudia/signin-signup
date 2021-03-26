import { Router } from 'express';
import { NotifyController } from '../controller/NotifyController';
import { SendMailController } from '../controller/SendMailController';
import { UserController } from '../controller/UserController';

const router = Router();
const userController = new UserController();
const notifyController = new NotifyController();
const sendMailController = new SendMailController();

//SIGN IN / SIGN UP
router.post('/login', userController.login);
router.get('/list', userController.list);
router.post('/register', userController.create);

//NOTIFICAÇÃO EMAIL
router.get('/notifications', notifyController.list);
router.post('/notify', notifyController.create);

//ENVIO EMAIL
router.post('/sendmail', sendMailController.execute);

export { router }