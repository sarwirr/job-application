import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    try {
      this.companyService.register(createCompanyDto);
      return { "success": "success", "message": "Company created successfully" };
    }
    catch (err) {
      return { "error": "error", "message": err.message };
    }
  }

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
