import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("send_mail")
class SendMailModel {
  @PrimaryGeneratedColumn('increment')
  id:       number;

  @Column()
  user_id:  number;

  @Column()
  notify_id: number;
}

export { SendMailModel }