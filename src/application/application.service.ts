import { HttpException, Injectable, UploadedFile } from '@nestjs/common';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Application, ApplicationDocument } from './entities/application.entity';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { HttpService } from "@nestjs/axios";
import { JobService } from 'src/job/job.service';
import { Job, JobDocument } from 'src/job/entities/job.entity';
import { UserDocument } from 'src/user/entities/user.entity';
import { stringify } from 'flatted';
<<<<<<< HEAD
=======
import * as fs from 'fs';
>>>>>>> 1978981 (corrected bugs)
import { UpdateJobDto } from 'src/job/dto/update-job.dto';

@Injectable()
export class ApplicationService {
  constructor(@InjectModel(Job.name) private jobRepository: Model<JobDocument>,
  @InjectModel(Application.name) private applicationModel: Model<ApplicationDocument>,
  private httpService: HttpService,
  private readonly us : UserService,
  private readonly js : JobService,
  ){}


  async apply(jobId: string, userId:string , @UploadedFile() cvfile: Express.Multer.File) {

    // Find the job by its id
    const job = await this.js.findOne(jobId);
<<<<<<< HEAD
<<<<<<< HEAD
    // Find the user by its id
    const user = await this.us.findUserbyId(userId);
=======
    const user = await this.us.findUserbyId(userId);
    

    // Save the CV file to a designated folder or cloud storage
    // Here, you would need to implement the file upload logic based on your storage preference.
>>>>>>> 1978981 (corrected bugs)
=======
    // Find the user by its id
    const user = await this.us.findUserbyId(userId);
>>>>>>> 54c40b3 (tested routes and corrected bugs)
    // Create the application
    const applicationData: Partial<Application> = {
      job: job,
      user: user,
      cv: cvfile.filename,};
<<<<<<< HEAD
<<<<<<< HEAD
    
=======

>>>>>>> 1978981 (corrected bugs)
=======
    
>>>>>>> 54c40b3 (tested routes and corrected bugs)
    const application = new this.applicationModel(applicationData);
    const savedApplication = await application.save();
    // Update the job with the new application details
    job.applications.push(savedApplication);
    await this.js.update(job._id, { applications : job.applications} as UpdateJobDto );
    
    //Update the applied job to the user
    user.appliedJobs.push(savedApplication);
<<<<<<< HEAD
<<<<<<< HEAD
    await this.us.update(user.email, { appliedJobs : user.appliedJobs} as UserDocument , user._id);
=======
    await this.us.update(user.email, { appliedJobs : user.appliedJobs} as UserDocument );
>>>>>>> 54c40b3 (tested routes and corrected bugs)
    
    return this.parseCircularJson(savedApplication);
     // Serialize the object excluding circular references
=======
    return this.parseCircularJson(savedApplication); // Serialize the object excluding circular references
>>>>>>> 1978981 (corrected bugs)
  }
<<<<<<< HEAD
  
=======
>>>>>>> 54c40b3 (tested routes and corrected bugs)

  private parseCircularJson(obj: any): any {
    return JSON.parse(stringify(obj));
  }
   
<<<<<<< HEAD

  async getUserInfo(userId: string) {
  const user = await this.us.findUserbyId(userId);
  return {
    username: user.firstname,
    email : user.email,
    address : user.address,
    phone : user.phoneNumber,
    skills : user.skills,
    experience : user.experience,
    education : user.education,
  }
  
  }
=======
>>>>>>> 54c40b3 (tested routes and corrected bugs)
   async findall(): Promise<Application[]>{
    return await this.applicationModel.find();
  }

  async findCompanyByApplicationId(id : string){
    const application =  await this.findOne(id);
    const job =  application.job;
    return job.recruiter;

  }
 
  async findOne(id: string): Promise<Application> {
    return await this.applicationModel.findById(id);
  }

  update(id: string, updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application`;
  }

  async remove(appplication_id: string , company_id: string) {
    const company = await  this.findCompanyByApplicationId(appplication_id);
    if (company_id !== company._id.toString())
      throw new HttpException("You can only delete your own applications", 403);
    else  
    return this.applicationModel.findByIdAndDelete(appplication_id);
  }

  async findappliedJobs(userId: string): Promise<Application[]> {
    const user = await this.us.findUserbyId(userId);
    const appliedJobs = user.appliedJobs;
    return appliedJobs;
  }
  
}
