import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './entities/company.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Job , JobDocument } from 'src/job/entities/job.entity';


const hat = require('hat');

@Injectable()
export class CompanyService {

  constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  @InjectModel(Job.name) private jobModel: Model<JobDocument>,
  ) {
    
  }
  
  async register (createCompanyDto: CreateCompanyDto) {
    const testCompany = await this.findOneByEmail(createCompanyDto.email);
    if (testCompany)
      throw new HttpException("Company already exists", 400);

    const saltOrRounds = 10;
    createCompanyDto.password = await bcrypt.hash(createCompanyDto.password, saltOrRounds);

    const result = await this.companyModel.create({ ...createCompanyDto, token: hat() });
    if (result)
      return {message: "Company Created", statusCode: 201}
    else
      throw new InternalServerErrorException();
  }

  async findAll(): Promise<Company[]> {
    return this.companyModel.find().select('-password');
  }

  async findOne(id: string): Promise<Company>  {
    const company = await this.companyModel.findOne({ _id :id}).select('-password');
    if (company)
      return company
    else
      throw new HttpException("Company not found", 404);
  }

  async findOneByEmail(email: string): Promise <Company>{
    const company = await this.companyModel.findOne({ email : email}).select('-password');
    if (company)
      return company
    else
      throw new HttpException("Company not found", 404);
  }

  async findOneByName(name: string): Promise <Company>{
    const company = await this.companyModel.findOne({ name : name}).select('-password');
    if (company)
      return company
    else
      throw new HttpException("Company not found", 404);
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto , company: Company) {
    if (updateCompanyDto.email !== company.email) 
      throw new HttpException('Can Update your own account', 400);
    if (updateCompanyDto.password) {
      const saltOrRounds = 10;
      updateCompanyDto.password = await bcrypt.hash(updateCompanyDto.password, saltOrRounds);
    }
    return this.companyModel.findOneAndUpdate({ _id : id }, updateCompanyDto);

  }

  remove(id: string) {
    return this.companyModel.findOneAndDelete({_id: id});
  }

  async findAppliedJobs(companyId: string) {
    try {
      const company = await this.companyModel
        .findOne({ _id: companyId })
        .populate({
          path: 'postings',
          populate: {
            path: 'applications',
          },
        });

      if (!company) {
        throw new NotFoundException('Company not found');
      }

      const jobsWithApplications = company.postings.map((job) => {
        const { _id, title, applications } = job;
        return {
          _id,
          title,
          applications,
        };
      });

      return jobsWithApplications;

    } catch (error) {
      throw new NotFoundException('Error finding applied jobs');
    }
  }
}
