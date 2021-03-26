import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("notify")
class NotifyModel {
  @PrimaryGeneratedColumn('increment')
  id:       number;

  @Column()
  title:     string;

  @Column()
  description: string;
}

export { NotifyModel }