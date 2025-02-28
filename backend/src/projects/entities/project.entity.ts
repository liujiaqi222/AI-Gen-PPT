import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('json') // MySQL 8+ 支持 JSON 类型
  slides: any;

  @Column()
  userId: string;

  @Column('json', { nullable: true })
  outlines?: any;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ default: false })
  isSellable: boolean;

  @Column({ nullable: true })
  variantId?: string;

  @Column({ nullable: false })
  thumbnail?: string;

  @Column({ default: 'light' })
  themeName?: string;

  @ManyToOne(() => User, (user) => user.ownedProjects)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_PROJECT_USER',
  })
  owner: User; //  CONSTRAINT fk_project_user FOREIGN KEY (userId) REFERENCES user(id)

  @ManyToMany(() => User, (user) => user.purchasedProjects)
  purchasers: User[];
}


