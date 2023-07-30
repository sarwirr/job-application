import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, HydratedDocument, Types } from 'mongoose'
import { JOB_TYPES } from 'src/utils/constants';
import { JobTypeLowerCase, Skill } from 'src/utils/types';



export type JobDocument = HydratedDocument<Job>;

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true, ref: 'Company' })
  company: Types.ObjectId

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

  @Prop({ required: true })
  transactionId: string

  @Prop({ default: [], ref: 'Chat' })
  chats?: []
}

export const JobSchema = SchemaFactory.createForClass(Job);