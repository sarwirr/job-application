import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
<<<<<<< HEAD
import { Request } from '@nestjs/common';

=======




>>>>>>> 2020039 (corrected payload bug)
@UseGuards(JwtAuthGuard)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
<<<<<<< HEAD
=======

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.register(createCompanyDto);
  }

>>>>>>> 2020039 (corrected payload bug)
  
  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get('findcompanybyemail/:email')
  findByEmail(@Param('email') email: string){
    return this.companyService.findOneByEmail(email);
  }

  @Get('findcompanyById/:id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Get('findcompanybyname/:name')
  findByName(@Param('name') name: string){
    return this.companyService.findOneByName(name);
  }

  @Get('findappliedjobs/:id')
  findAppliedJobs(@Request() req){
    return this.companyService.findAppliedJobs(req.company._id);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto , @Request() req) {
    return this.companyService.update(id, updateCompanyDto , req.company);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
