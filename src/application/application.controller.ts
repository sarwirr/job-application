import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Request, UseGuards, NotFoundException } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JobService } from 'src/job/job.service';
import { Job } from 'src/job/entities/job.entity';
import { Application } from './entities/application.entity';

@UseGuards(JwtAuthGuard)
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService,
    private readonly jobService: JobService) {}

 
  @Post(':jobid')
    @UseInterceptors(FileInterceptor('file', {storage: diskStorage({destination :'/home/sarwir/projects/job-application/filesuploads',filename:(req,file,cb)=>{
    cb(null, `${file.originalname}`)}})})) 
    async create(@Request() req,@Param('jobid') jobId: string, @UploadedFile() file: Express.Multer.File) {  
    return this.applicationService.apply(jobId,req.user.userId,file);
    }

  

  @Get()
  findAll() : Promise <Application[]>{
    return this.applicationService.findall();
  }

  @Get('findappliedJobsbyuser')
  findappliedJobs(@Request() req) : Promise <Application[]>{
    return this.applicationService.findappliedJobs(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) : Promise <Application> {
    return this.applicationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
    return this.applicationService.update(id, updateApplicationDto);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationService.remove(id);
  }

  @Get('user/:userId')
  findUserApplications(@Param('userId') userId: string): Promise<Application[]> {
    return this.applicationService.findUserApplications(userId);
  }
  


}
