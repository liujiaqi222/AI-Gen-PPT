import { Controller, Get,  Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { SessionAuthGuard } from 'src/auth/guards/session-auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(SessionAuthGuard)
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
