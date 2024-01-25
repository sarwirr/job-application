
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { Application} from 'src/application/entities/application.entity';
import { Gender } from 'src/utils/types';
import { Exclude } from 'class-transformer';
export type UserDocument = HydratedDocument<User>;

@Schema()
export  class User {
    _id; 
    
    @Prop()
    firstname: string;

    @Prop()
    lastname: string;

<<<<<<< 3739d343b0520c93bfdb8f11d6db2c56edfdb0aa
    @Prop()
=======
    @Prop({
        required: false
    })
    description: string;

    @Prop({
        required: true
    })
>>>>>>> added a description field for user
    phoneNumber: string;

    @Prop()
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

    @Prop({ default: null, type: String })
    gender: Gender;

    @Prop()
    address: string;

    @Prop()
    profileImage: string;

    @Prop()
    role: string;

    @Prop({ default: Date.now })
    date_added: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);


