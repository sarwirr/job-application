import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
    const testUser = await this.findOne(createUserDto.email);
    if (testUser)
      throw new HttpException("User already exists", 400);
    
    const saltOrRounds = 10;
    createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);

    const result = await this.userRepository.create({ ...createUserDto, token: hat() });

    if (result)
      return {message: "User created successfully", statusCode: 201}
      else
        throw new InternalServerErrorException();
  }

  
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserbyId(id: string): Promise<User> {
    const res = await this.userRepository.findOne({ _id :id}).exec();
    if (res)
      return res
    else
      throw new HttpException("User not found", 404);
  }

  async findnameofUserbyId(id: string) {
    const user = await this.userRepository.findOne({ _id :id}).populate('name').exec();
    return ({username: user.firstname});
   
  }

  async showmeroles(id: string) {
    const user = await this.userRepository.findOne({ _id :id});
    return ({roles: user.role});
  }


  async findOne(email: string): Promise<User | null> {
    return this.userRepository.findOne({ email: email });
  }
  
  async update(email: string, updateUserDto: UpdateUserDto , user:User) {
    if (user.email !== email)
      throw new HttpException("You can only update your own account", 403);
    else
    if (updateUserDto.password) {
      const saltOrRounds = 10;
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, saltOrRounds);
    }
    return this.userRepository.findOneAndUpdate({ email }, updateUserDto);
  }

  
  async remove(email: string , user_id: string) {
    const user = await this.userRepository.findOne({ _id: user_id });
    if (user.email !== email)
      throw new HttpException("You can only delete your own account", 403);
    else 
    return this.userRepository.findOneAndDelete({ email });
  }

<<<<<<< 3739d343b0520c93bfdb8f11d6db2c56edfdb0aa
}
=======
    // get profile image
    async getProfileImage(id: string): Promise<string> {
      try {
        return await this.userRepository.findById(id, { profileImage: 1 });
      } catch (err) {
        throw new Error(`Error getting profile image: ${err}`);
      }
    }
    // delete profile image
    async deleteProfileImage(id: string){
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

>>>>>>> tested routes and corrected bugs
