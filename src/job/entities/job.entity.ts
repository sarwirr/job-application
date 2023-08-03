import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document, HydratedDocument, Types } from 'mongoose'
import { Company } from 'src/company/entities/company.entity';
import { JOB_TYPES } from 'src/utils/constants';
import { JobTypeLowerCase, Skill } from 'src/utils/types';



export type JobDocument = HydratedDocument<Job>;

@Schema()
export class Job {
  @Prop({ 
    type: mongoose.Schema.Types.ObjectId,  ref: () => "Company" 
})
  recruiter: Company;

  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  description: string

  @Prop({ required: true })
  body: string

  @Prop({ default: 'unpaid', type: String })
  pay?: string

  @Prop({ default: JOB_TYPES[0], type: String })
  type?: JobTypeLowerCase

  @Prop({ default: [] })
  tags?: Skill[]

  @Prop({ default: [] })
  applications?: Types.ObjectId[]

 

  @Prop({ default: [], ref: 'Chat' })
  chats?: []
}

export const JobSchema = SchemaFactory.createForClass(Job);