import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './entities/company.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

const hat = require('hat');

@Injectable()
export class CompanyService {

  constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>) {
    
  }
  
 async register (createCompanyDto: CreateCompanyDto) {
       const saltOrRounds = 10;
    createCompanyDto.password = await bcrypt.hash(createCompanyDto.password, saltOrRounds);
    return this.companyModel.create({ ...createCompanyDto, token: hat() });

  }

  async findAll(): Promise<Company[]> {
    return this.companyModel.find();
  }

  async findOne(id: string): Promise<Company>  {
    const company = await this.companyModel.findOne({ _id :id});
    return (company) ;
  }

  async findOneByEmail (email: string): Promise <Company>{
    const company = (await this.companyModel.findOne({ email : email}));
    return company ; 
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    
    if (updateCompanyDto.password) {
      const saltOrRounds = 10;
      updateCompanyDto.password = await bcrypt.hash(updateCompanyDto.password, saltOrRounds);
    }
    return this.companyModel.findOneAndUpdate({ _id : id }, updateCompanyDto);

  }

  remove(id: string) {
    return this.companyModel.findOneAndDelete({_id: id});
  }
}
