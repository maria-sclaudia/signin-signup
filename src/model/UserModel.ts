import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//Entidade tabela users
@Entity("users")
class UserModel {
  @PrimaryGeneratedColumn('increment')
  id:       number;

  @Column()
  name:     string;

  @Column()
  email:    string;

  @Column()
  password: string;

  @Column() 
  cpf:      string;
}

export { UserModel }