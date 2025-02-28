import { Project } from 'src/projects/entities/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable, Index } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true }) // 别写成@Column({unique:true})不然也会创建一次索引
  @Index('IDX_USER_EMAIL', { unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profileImage?: string;

  @Column({ default: false })
  subscription: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  webhookSecret: string;

  @OneToMany(() => Project, (project) => project.owner)
  ownedProjects: Project[];

  @ManyToMany(() => Project, (project) => project.purchasers)
  @JoinTable({
    name: 'user_projects',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_USER_PROJECTS_USER',
    },
    inverseJoinColumn: {
      name: 'projectId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'FK_USER_PROJECTS_PROJECT',
    },
  })
  purchasedProjects: Project[];
}
