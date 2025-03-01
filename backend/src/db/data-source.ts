import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Project } from '../projects/entities/project.entity';


export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '', 
  database: 'nest_ai_ppt',
  entities: [User, Project],
  synchronize: true, // 必须关闭
  logging: true, // 开启日志
});
