import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
  private readonly companyService : CompanyService,){}


<<<<<<< HEAD
  async create(createJobDto: CreateJobDto) {
    const company = await this.companyService.findOne(createJobDto.recruiter);
    if (company) {
      const createdjob = new this.jobRepository({...createJobDto, recruiter: company._id.toString()});

      const checkJob = await this.jobRepository.findOne({title: createJobDto.title, recruiter: company._id.toString()});
      if (checkJob)
        throw new ConflictException('Job already exists');

      const savedjob = await createdjob.save();
      company.postings.push(savedjob);
      
      await this.companyService.update(company._id, { postings : company.postings} as UpdateJobDto , company);
      return savedjob;
    } else
      throw new BadRequestException('Company does not exist');
=======
  async create(createJobDto: CreateJobDto , id:string) {
    const company = await this.cs.findOne(id); 
    const createdjob = new this.jobRepository({...createJobDto, recruiter: company._id.toString()});
    const savedjob = await createdjob.save();
    company.postings.push(savedjob);
    await this.cs.update(company._id, { postings : company.postings} as UpdateJobDto );
    return savedjob;
>>>>>>> 1978981 (corrected bugs)
  } 

  async findAll(): Promise<Job[]> {
    return this.jobRepository.find().exec();
  }

  async findOne(id: string) : Promise<Job> {
<<<<<<< HEAD
    const job = await this.jobRepository.findOne({ _id: id}).populate('recruiter').exec();
=======
    const job = await this.jobRepository.findOne({ _id: id}).exec();
>>>>>>> 1978981 (corrected bugs)
    return job;
  }

  async getcompanyIdbyJobId(id: string): Promise<Company>{
<<<<<<< HEAD
    const job = await this.findOne(id);
=======
    
    const job = await this.jobRepository.findOne({ _id : id}).exec();
   
>>>>>>> 1978981 (corrected bugs)
    return job.recruiter ;

  }

  update(id: string, updateJobDto: UpdateJobDto) {
    return this.jobRepository.findByIdAndUpdate(id, updateJobDto);
  }

  //only the company itself can delete the job
  async remove(id: string) {
    await this.jobRepository.findOneAndDelete({_id: id});
  }

  async findAppliedUsers(id: string) {
    const job = await this.findOne(id);
    return job.applications;
  }
}
