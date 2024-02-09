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
    return this.userRepository.findOne({ email: email });
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

}
