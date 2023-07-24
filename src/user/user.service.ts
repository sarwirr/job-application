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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
