
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { Gender } from 'src/utils/types';
export type UserDocument = HydratedDocument<User>;

@Schema()
export  class User {

    _id; 
    
    @Prop()
    firstname: string;

    @Prop()
    lastname: string;

    @Prop()
    phoneNumber: string;

    @Prop()
    email:string;

    @Prop({
        required: true
    })
    password: string;

    @Prop()
    dateBirth: string;

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


