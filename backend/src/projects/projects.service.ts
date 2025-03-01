import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  
  findAll() {
    return { data: '`This action returns all projects`' };
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }


  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
