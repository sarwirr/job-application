import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { Skill } from 'src/utils/types'
import { Job } from 'src/job/entities/job.entity'


export type CompanyDocument = Company & Document

@Schema({ timestamps: true })
export class Company  {

    _id;
    
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  description: string

  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ default: null })
  avatar?: string

  @Prop({ default: null })
  website: string

  @Prop({ required: true })
  state: string

  @Prop({ required: true })
  country: string

  @Prop({ default: [], ref: Job.name })
  postings?: Types.ObjectId[]

  @Prop({ default: [] })
  hired?: []
}

const CompanySchema = SchemaFactory.createForClass(Company)



export { CompanySchema }