import { Controller, Get, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { SessionAuthGuard } from '../auth/guards/session-auth.guard';
import { AuthRequest } from '../auth/type';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(SessionAuthGuard)
  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.projectsService.findAll(req.user);
  }

  @UseGuards(SessionAuthGuard)
  @Get('/recent')
  findRecent(@Req() req: AuthRequest) {
    return this.projectsService.findRecentProjects(req.user);
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
