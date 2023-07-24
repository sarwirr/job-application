
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { Gender } from '../enums/profileGender';
export type UserDocument = HydratedDocument<User>;

@Schema()
export  class User {
    @Prop()
    firstname: string;

    @Prop()
    lastname: string;

    @Prop()
    phoneNumber: string;

    @Prop({
        required: true
    })
    password: string;

    @Prop()
    dateBirth: string;

    @Prop({ type: String, enum: Gender })
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


