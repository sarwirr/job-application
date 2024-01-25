import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job, JobDocument } from './entities/job.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from 'src/company/entities/company.entity';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class JobService {

  constructor(@InjectModel(Job.name) private jobRepository: Model<JobDocument>,
  @InjectModel(Company.name) private companyRepository: Model<CompanyDocument>,
  private readonly cs : CompanyService,){}


  async create(createJobDto: CreateJobDto , id:string) {
    const company = await this.cs.findOne(id); 
    const createdjob = new this.jobRepository({...createJobDto, recruiter: company._id.toString()});
    const savedjob = await createdjob.save();
    company.postings.push(savedjob);
    await this.cs.update(company._id, { postings : company.postings} as UpdateJobDto );
    return savedjob;
  } 

  async findAll(): Promise<Job[]> {
    return this.jobRepository.find().exec();
  }

  async findOne(id: string) : Promise<Job> {
    const job = await this.jobRepository.findOne({ _id: id}).populate('recruiter').exec();
    return job;
  }

  async getcompanyIdbyJobId(id: string): Promise<Company>{
    const job = await this.findOne(id);
    return job.recruiter ;

  }

  update(id: string, updateJobDto: UpdateJobDto) {
    return this.jobRepository.findByIdAndUpdate(id, updateJobDto);
  }

  async remove(id: string) {
    await this.jobRepository.findOneAndDelete({_id: id});
  }
}
