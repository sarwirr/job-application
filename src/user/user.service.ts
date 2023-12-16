import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User , UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';

const hat = require('hat');

@Injectable()
export class UserService {
  jwtService: any;
  constructor(@InjectModel(User.name) private userRepository: Model<UserDocument>) { }

  async register(createUserDto: CreateUserDto) {

    const saltOrRounds = 10;
    createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
    return this.userRepository.create({ ...createUserDto, token: hat() });

  }

  
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserbyId(id: string): Promise<User> {
    // console.log(id);
    return this.userRepository.findOne({ _id :id}).exec();
  }

  async findnameofUserbyId(id: string) {
    const user = await this.userRepository.findOne({ _id :id}).populate('name').exec();
    return ({username: user.firstname});
   
  }

  async showmeroles(id: string){
    const user = await this.userRepository.findOne({ _id :id});
    return ({roles: user.role});
  }


  async findOne(email: string): Promise<User | null> {
    return this.userRepository.findOne({ email });
  }



  async update(email: string, updateUserDto: UpdateUserDto) {

    if (updateUserDto.password) {
      const saltOrRounds = 10;
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, saltOrRounds);
    }
    return this.userRepository.findOneAndUpdate({ email }, updateUserDto);
  }

  
  remove(email: string) {
    return this.userRepository.findOneAndDelete({ email });
  }

    // get profile image
    async getProfileImage(id: string): Promise<any> {
      try {
        return await this.userRepository.findById(id, { profileImage: 1 });
      } catch (err) {
        throw new Error(`Error getting profile image: ${err}`);
      }
    }
    // delete profile image
    async deleteProfileImage(id: string): Promise<any> {
      try {
        return await this.userRepository.findByIdAndUpdate(id, { profileImage: null }, { new: true });
      } catch (err) {
        throw new Error(`Error deleting profile image: ${err}`);
      }
    }
  
    async updateProfile(id: string, avatar: Express.Multer.File, updateProfileDto: any): Promise<any> {
      let photo = this.profileImage(avatar);
      try {
        return await this.userRepository.findByIdAndUpdate(
          id,
          { ...updateProfileDto, profileImage: photo },
          { new: true },
        );
      }
      catch (err) {
        throw new Error(`Error updating ${this.userRepository}: ${err}`);
      }
    }
  
    profileImage(avatar: Express.Multer.File): string {
      let photo;
      if (avatar) {
        photo = avatar.path.replace('public', '').split('\\').join('/');
      }
      return photo;
    }
  
  }

