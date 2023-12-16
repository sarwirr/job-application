
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { Application} from 'src/application/entities/application.entity';
import { Gender } from 'src/utils/types';
import { Exclude } from 'class-transformer';
import { GENDERS, ROLES } from 'src/utils/constants';
export type UserDocument = HydratedDocument<User>;

@Schema()
export  class User {

    _id; 
    
    @Prop({
        required: true
    })
    firstname: string;

    @Prop({
        required: true
    })
    lastname: string;

    @Prop({
        required: true
    })
    phoneNumber: string;

    @Prop({
        required: true
    })
    email:string;

    @Prop({
        required: true
    })
    password: string;

    @Prop()
    dateBirth: string;

    @Prop({ 
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }]
    })
      appliedJobs: Application[];

    @Prop({ default: GENDERS[0], type: String })
    gender: Gender;

    @Prop()
    address: string;

    @Prop()
    profileImage: string;

    @Prop({ default: ROLES[0], type: String})
    role: string;

    @Prop({ default: Date.now })
    date_added: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);


