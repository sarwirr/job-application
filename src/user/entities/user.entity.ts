
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {HydratedDocument } from 'mongoose';
import { Application} from 'src/application/entities/application.entity';
import { Gender } from 'src/utils/types';
<<<<<<< 3739d343b0520c93bfdb8f11d6db2c56edfdb0aa
<<<<<<< 3739d343b0520c93bfdb8f11d6db2c56edfdb0aa
import { Exclude } from 'class-transformer';
=======
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { Exclude } from 'class-transformer';
=======
>>>>>>> c6e18d8 (added exp and education to user)
>>>>>>> added exp and education to user
import { GENDERS, ROLES } from 'src/utils/constants';

type experienceAndEducationElement = {
    title: string;
    period: {
      startDate: Date;
      endDate: Date;
    };
    description: string;
  };
  
<<<<<<< 3739d343b0520c93bfdb8f11d6db2c56edfdb0aa
>>>>>>> added exp and education to user
=======
<<<<<<< HEAD
=======
>>>>>>> 29427ba (added exp and education to user)
>>>>>>> c6e18d8 (added exp and education to user)
>>>>>>> added exp and education to user
export type UserDocument = HydratedDocument<User>;

@Schema()
export  class User {
    _id; 
    
    @Prop()
    firstname: string;

    @Prop()
    lastname: string;

<<<<<<< 3739d343b0520c93bfdb8f11d6db2c56edfdb0aa
<<<<<<< 3739d343b0520c93bfdb8f11d6db2c56edfdb0aa
    @Prop()
=======
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
    @Prop()
=======
>>>>>>> 8902e9f (added a description field for user)
>>>>>>> added a description field for user
    @Prop({
        required: false
    })
    description: string;

    @Prop({
        required: true
    })
<<<<<<< 3739d343b0520c93bfdb8f11d6db2c56edfdb0aa
>>>>>>> added a description field for user
=======
<<<<<<< HEAD
=======
>>>>>>> 2226c22 (added a description field for user)
>>>>>>> 8902e9f (added a description field for user)
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

    @Prop({
        default: [],
    })
    skills: [string];

    @Prop(
        {
            default: [],
            type: [Object]
        }
    )
    education: experienceAndEducationElement[];

    @Prop(
        {
            default: [],
            type: [Object]
        }
    )
    experience: experienceAndEducationElement[];

    @Prop()
    profileImage: string;

    @Prop()
    role: string;

    @Prop({ default: Date.now })
    date_added: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);


