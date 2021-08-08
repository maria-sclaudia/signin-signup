import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repository/UserRepository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import { setLocale } from 'yup';

class UserController {

  async login(request: Request, response: Response) {
    const {
      email,
      password
    } = request.body;

    const userRepository = getCustomRepository(UserRepository);

    const userExists = await userRepository.findOne({
      where: {
        email
      }
    });

    // VALIDAÇÃO EMAIL PARA SIGN IN
    if(userExists) {
      
      if(await bcrypt.compare(password, userExists.password)) {
        const token = jwt.sign(
          { id: userExists.id }, 
          process.env.APP_SECRET, 
          { expiresIn: 60 }
        )

        const data = {
          id: userExists.id,
          name: userExists.name,
          email: userExists.email,
          cpf: userExists.cpf,
          token
        }

        return response.json(data);

      }else{
        return response.status(400).json({
          error: "Senha inválida!"
        })
      }
    }else{
      return response.status(400).json({
        error: "Esse Email não existe!"
      })
    }


  }

  async list(request: Request, response: Response) {
    const users = await getCustomRepository(UserRepository).find();

    return response.json(users);
  }

  async create(request: Request, response: Response) {
    const { 
      name, 
      email, 
      password,
      cpf
    } = request.body;

    const schema = Yup.object().shape({
      name: Yup
        .string()
        .required('Nome é obrigatório'),
      email: Yup
        .string()
        .required('Email é obrigatório.')
        .email('Email inválido.'),
      password: Yup
        .string()
        .required('Senha é obrigatória.')
        .min(8, 'Senha deve conter no minímo 8 digítos.'),
      cpf: Yup
        .string()
        .required('CPF é obrigatório.')
        .length(14, 'CPF inválido.')
    });

    try {
      await schema.validate(request.body);
    } catch(err) {
      return response.status(400).json(err.errors);
    }

    const passwordHash = await bcrypt.hash(password, 8);
    const userRepository = getCustomRepository(UserRepository);

    const userAlreadyExists = await userRepository.findOne({
      email
    });

    const cpfAlreadyExists = await userRepository.findOne({
      cpf
    });

    // VALIDAÇÃO EMAIL PARA SIGN UP
    if(userAlreadyExists) {
      return response.status(400).json({
        error: "Esse Email já está sendo utilizado!"
      })
    } else {
      // VALIDAÇÃO CPF
      if(cpfAlreadyExists) {
        return response.status(400).json({
          error: "Esse CPF já está sendo utilizado!"
        })
      }
    }

    const account = userRepository.create({
      name, 
      email, 
      password: passwordHash,
      cpf
    });

    await userRepository.save(account);

    return response.json(account);
  }

}

export { UserController }