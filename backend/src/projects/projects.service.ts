import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { SessionData } from 'src/auth/type';

@Injectable()
export class ProjectsService {
  @InjectRepository(Project)
  projectRepository: Repository<Project>;

  async findAll(user: SessionData) {
    const projects = await this.projectRepository.find({
      where: {
        userId: user.email,
        isDeleted: false,
      },
      order: {
        updatedAt: 'desc',
      },
    });
    if (!projects.length) return { data: [], message: 'No project found' };
    return { data: projects };
  }
  async findRecentProjects(user: SessionData) {
    const projects = await this.projectRepository.find({
      where: {
        userId: user.email,
        isDeleted:false
      },
      order: {
        updatedAt:'desc'
      },
      take:5
    })

    if (!projects.length) return { data: [], message: 'No recent projects found' };
    return {data:projects}
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
